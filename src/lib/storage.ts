/**
 * Storage abstraction layer
 * Supports both file system (local dev) and Vercel KV (production)
 */

import { EventShowcase } from "@/app/types/type";

const STORAGE_KEY = "showcase-events";

// Check if we're using Vercel KV
function useKV(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

// Vercel KV storage
async function saveToKV(events: Array<{ id: string; data: EventShowcase; createdAt: string }>) {
  try {
    // Dynamic import to avoid errors if package not installed
    const kvModule = await import("@vercel/kv").catch(() => null);
    if (!kvModule) {
      throw new Error(
        "@vercel/kv package not installed. Run: npm install @vercel/kv"
      );
    }
    const { kv } = kvModule;
    await kv.set(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    console.error("KV save error:", error);
    throw error;
  }
}

async function loadFromKV(): Promise<Array<{ id: string; data: EventShowcase; createdAt: string }>> {
  try {
    const kvModule = await import("@vercel/kv").catch(() => null);
    if (!kvModule) {
      return [];
    }
    const { kv } = kvModule;
    const data = await kv.get<string>(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("KV load error:", error);
    return [];
  }
}

// File system storage (for local development)
async function saveToFile(events: Array<{ id: string; data: EventShowcase; createdAt: string }>) {
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_DIR = path.join(process.cwd(), "data");
  const filePath = path.join(DATA_DIR, "showcase-events.json");
  
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("File save error:", error);
    throw error;
  }
}

async function loadFromFile(): Promise<Array<{ id: string; data: EventShowcase; createdAt: string }>> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), "data", "showcase-events.json");
  
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

// Public API
export async function saveEvents(events: Array<{ id: string; data: EventShowcase; createdAt: string }>) {
  if (useKV()) {
    await saveToKV(events);
  } else {
    await saveToFile(events);
  }
}

export async function loadEvents(): Promise<Array<{ id: string; data: EventShowcase; createdAt: string }>> {
  if (useKV()) {
    return await loadFromKV();
  } else {
    return await loadFromFile();
  }
}


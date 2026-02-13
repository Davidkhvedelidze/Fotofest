/**
 * Storage abstraction layer
 * Supports both file system (local dev) and Upstash Redis (production)
 *
 * In production on Vercel we use the Upstash Redis REST API via `@upstash/redis`.
 */

import { EventShowcase } from "@/features/events/types/events";
import { logError } from "@/lib/services/logger";

const STORAGE_KEY = "showcase-events";

// Check if we're on Vercel
function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

// Check if Upstash Redis (Storage KV) is configured
function useUpstash(): boolean {
  return !!(
    process.env.UPSTASH_STORAGE_KV_REST_API_URL &&
    process.env.UPSTASH_STORAGE_KV_REST_API_TOKEN
  );
}

// Upstash Redis (Storage KV) storage
async function saveToUpstash(
  events: Array<{ id: string; data: EventShowcase; createdAt: string }>
) {
  try {
    const redisModule = await import("@upstash/redis").catch(() => null);
    if (!redisModule) {
      throw new Error(
        "@upstash/redis package not installed. Run: npm install @upstash/redis"
      );
    }

    const { Redis } = redisModule;

    const url = process.env.UPSTASH_STORAGE_KV_REST_API_URL;
    const token = process.env.UPSTASH_STORAGE_KV_REST_API_TOKEN;

    if (!url || !token) {
      throw new Error(
        "Upstash Redis (Storage KV) is not configured. Please set UPSTASH_STORAGE_KV_REST_API_URL and UPSTASH_STORAGE_KV_REST_API_TOKEN."
      );
    }

    const redis = new Redis({ url, token });
    await redis.set(STORAGE_KEY, JSON.stringify(events));
  } catch (error) {
    logError({ message: "KV save error", error });
    throw error;
  }
}

async function loadFromUpstash(): Promise<
  Array<{ id: string; data: EventShowcase; createdAt: string }>
> {
  try {
    const redisModule = await import("@upstash/redis").catch(() => null);
    if (!redisModule) {
      return [];
    }

    const { Redis } = redisModule;

    const url = process.env.UPSTASH_STORAGE_KV_REST_API_URL;
    const token = process.env.UPSTASH_STORAGE_KV_REST_API_TOKEN;

    if (!url || !token) {
      console.warn(
        "Upstash Redis (Storage KV) env vars missing, returning empty array"
      );
      return [];
    }

    const redis = new Redis({ url, token });
    const data = await redis.get<string>(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    logError({ message: "KV load error", error });
    return [];
  }
}

// File system storage (for local development)
async function saveToFile(
  events: Array<{ id: string; data: EventShowcase; createdAt: string }>
) {
  const fs = await import("fs/promises");
  const path = await import("path");
  const DATA_DIR = path.join(process.cwd(), "data");
  const filePath = path.join(DATA_DIR, "showcase-events.json");

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(events, null, 2));
  } catch (error) {
    logError({ message: "File save error", error });
    throw error;
  }
}

async function loadFromFile(): Promise<
  Array<{ id: string; data: EventShowcase; createdAt: string }>
> {
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
export async function saveEvents(
  events: Array<{ id: string; data: EventShowcase; createdAt: string }>
) {
  // On Vercel, we MUST use remote storage (file system is read-only)
  if (isVercel()) {
    if (!useUpstash()) {
      throw new Error(
        "Upstash Redis (Storage KV) is not configured. Please set up Upstash and configure UPSTASH_STORAGE_KV_REST_API_URL and UPSTASH_STORAGE_KV_REST_API_TOKEN in your Vercel project."
      );
    }
    await saveToUpstash(events);
  } else {
    // Local development - use file system
    await saveToFile(events);
  }
}

export async function loadEvents(): Promise<
  Array<{ id: string; data: EventShowcase; createdAt: string }>
> {
  // On Vercel, we MUST use remote storage (file system is read-only)
  if (isVercel()) {
    if (!useKV()) {
      logError({ message: "Vercel KV not configured, returning empty array" });
      return [];
    }
    return await loadFromUpstash();
  } else {
    // Local development - use file system
    return await loadFromFile();
  }
}

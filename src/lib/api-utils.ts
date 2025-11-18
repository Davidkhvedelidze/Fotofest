import { EventShowcase, RequestEventFormData } from "@/app/types/type";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Validation functions
export function validateEventRequest(data: RequestEventFormData): {
  valid: boolean;
  error?: string;
} {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: "Valid email is required" };
  }

  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!data.mobile || !phoneRegex.test(data.mobile)) {
    return { valid: false, error: "Valid phone number is required" };
  }

  if (!data.eventType || data.eventType.trim().length < 2) {
    return { valid: false, error: "Event type is required" };
  }

  if (!data.date) {
    return { valid: false, error: "Event date is required" };
  }

  // Validate date is in the future
  const eventDate = new Date(data.date);
  if (isNaN(eventDate.getTime())) {
    return { valid: false, error: "Invalid date format" };
  }

  return { valid: true };
}

export function validateContactMessage(data: {
  name: string;
  email: string;
  message: string;
}): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    return { valid: false, error: "Valid email is required" };
  }

  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: "Message must be at least 10 characters" };
  }

  return { valid: true };
}

// Data storage functions
export async function saveEventRequest(
  data: RequestEventFormData
): Promise<{ id: string; data: RequestEventFormData; createdAt: string }> {
  await ensureDataDir();

  const id = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const record = {
    id,
    data,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(DATA_DIR, "event-requests.json");
  let requests: RequestEventFormData[] = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    requests = JSON.parse(fileContent);
  } catch {
    // File doesn't exist, start with empty array
  }

  requests.push(data as RequestEventFormData);
  await fs.writeFile(filePath, JSON.stringify(requests, null, 2));

  return record;
}

export async function saveContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ id: string; data: RequestEventFormData; createdAt: string }> {
  await ensureDataDir();

  const id = `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const filePath = path.join(DATA_DIR, "contact-messages.json");
  let messages: {
    id: string;
    data: { name: string; email: string; subject?: string; message: string };
    createdAt: string;
  }[] = [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    messages = JSON.parse(fileContent);
  } catch {
    // File doesn't exist, start with empty array
  }

  messages.push({
    id,
    data: data as {
      name: string;
      email: string;
      subject?: string;
      message: string;
    },
    createdAt: new Date().toISOString(),
  });
  await fs.writeFile(filePath, JSON.stringify(messages, null, 2));

  return {
    id,
    data: data as {
      name: string;
      email: string;
      subject?: string;
      message: string;
      mobile: string;
      eventType: string;
      date: string;
    },
    createdAt: new Date().toISOString(),
  };
}

export async function getEvents(): Promise<RequestEventFormData[]> {
  const filePath = path.join(DATA_DIR, "event-requests.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events = JSON.parse(fileContent);
    // Return events with their metadata
    return events;
  } catch {
    return [];
  }
}

export async function getContactMessages(): Promise<
  {
    id: string;
    data: { name: string; email: string; subject?: string; message: string };
    createdAt: string;
  }[]
> {
  const filePath = path.join(DATA_DIR, "contact-messages.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

// Showcase Events functions
export function validateShowcaseEvent(data: {
  name: string;
  location: string;
  description: string;
  tags: string[];
}): { valid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Event name must be at least 2 characters" };
  }

  if (!data.location || data.location.trim().length < 2) {
    return {
      valid: false,
      error: "Location must be at least 2 characters",
    };
  }

  if (!data.description || data.description.trim().length < 10) {
    return {
      valid: false,
      error: "Description must be at least 10 characters",
    };
  }

  if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
    return { valid: false, error: "At least one tag is required" };
  }

  return { valid: true };
}

export async function saveShowcaseEvent(data: {
  name: string;
  location: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  redirectUrl?: string;
}): Promise<{ id: string; data: EventShowcase; createdAt: string }> {
  await ensureDataDir();

  const id = `showcase-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const record = {
    id,
    data: data as EventShowcase,
    createdAt: new Date().toISOString(),
  };

  const filePath = path.join(DATA_DIR, "showcase-events.json");
  let events: Array<{ id: string; data: EventShowcase; createdAt: string }> =
    [];

  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    events = JSON.parse(fileContent);
  } catch {
    // File doesn't exist, start with empty array
  }

  events.push(record);
  await fs.writeFile(filePath, JSON.stringify(events, null, 2));

  return record;
}

export async function getShowcaseEvents(): Promise<EventShowcase[]> {
  const filePath = path.join(DATA_DIR, "showcase-events.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events = JSON.parse(fileContent);
    // Return just the data part, not the full record
    return events.map(
      (event: { id: string; data: EventShowcase; createdAt: string }) => ({
        ...event.data,
        id: event.id,
        createdAt: event.createdAt,
      })
    );
  } catch {
    return [];
  }
}

export async function updateShowcaseEvent(
  id: string,
  data: {
    name: string;
    location: string;
    description: string;
    tags: string[];
    image?: string;
    imageAlt?: string;
    redirectUrl?: string;
  }
): Promise<{ id: string; data: EventShowcase; createdAt: string } | null> {
  const filePath = path.join(DATA_DIR, "showcase-events.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    const events: Array<{
      id: string;
      data: EventShowcase;
      createdAt: string;
    }> = JSON.parse(fileContent);

    const eventIndex = events.findIndex((event) => event.id === id);
    if (eventIndex === -1) {
      return null;
    }

    // Update the event
    events[eventIndex] = {
      ...events[eventIndex],
      data: data as EventShowcase,
    };

    await fs.writeFile(filePath, JSON.stringify(events, null, 2));
    return events[eventIndex];
  } catch {
    return null;
  }
}

export async function deleteShowcaseEvent(id: string): Promise<boolean> {
  const filePath = path.join(DATA_DIR, "showcase-events.json");
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    let events = JSON.parse(fileContent);
    events = events.filter((event: { id: string }) => event.id !== id);
    await fs.writeFile(filePath, JSON.stringify(events, null, 2));
    return true;
  } catch {
    return false;
  }
}

// Email functions (to be implemented with email service)
export async function sendEventRequestEmail(data: RequestEventFormData) {
  // TODO: Implement email sending
  // Example with nodemailer or Resend:
  // const emailService = new EmailService();
  // await emailService.send({
  //   to: process.env.ADMIN_EMAIL,
  //   subject: `New Event Request: ${data.eventType}`,
  //   body: `New event request from ${data.name}...`
  // });
  console.log("Email notification (to be implemented):", data);
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  // TODO: Implement email sending
  console.log("Contact email notification (to be implemented):", data);
}

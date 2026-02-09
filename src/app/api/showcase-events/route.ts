import { NextRequest, NextResponse } from "next/server";
import {
  saveShowcaseEvent,
  getShowcaseEvents,
  validateShowcaseEvent,
} from "@/lib/api-utils";
import { EventShowcase } from "@/features/events/types/events";
import { verifyAdminToken } from "@/lib/auth-utils";
import { logError } from "@/lib/services/logger";

export async function POST(request: NextRequest) {
  // Verify admin authentication
  const isAuthenticated = await verifyAdminToken();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: EventShowcase = await request.json();

    // Validate the request data
    const validation = validateShowcaseEvent(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const savedEvent = await saveShowcaseEvent(body);

    return NextResponse.json(
      {
        success: true,
        message: "Showcase event added successfully",
        id: savedEvent.id,
      },
      { status: 201 }
    );
  } catch (error) {
    logError({ message: "Error saving showcase event", error });
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    
    // Provide helpful error message for Vercel KV setup
    const isKVError = errorMessage.includes("Vercel KV is not configured");
    
    return NextResponse.json(
      {
        error: isKVError 
          ? "Storage not configured. Please set up Vercel KV in your project settings."
          : "Failed to save showcase event",
        details: isKVError || process.env.NODE_ENV === "development" 
          ? errorMessage 
          : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await getShowcaseEvents();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    logError({ message: "Error fetching showcase events", error });
    return NextResponse.json(
      { error: "Failed to fetch showcase events" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import {
  saveShowcaseEvent,
  getShowcaseEvents,
  validateShowcaseEvent,
} from "@/lib/api-utils";
import { EventShowcase } from "@/app/types/type";
import { verifyAdminToken } from "@/lib/auth-utils";

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

    // Save the showcase event
    const savedEvent = await saveShowcaseEvent(body);
    console.log("Showcase event saved:", savedEvent);

    return NextResponse.json(
      {
        success: true,
        message: "Showcase event added successfully",
        id: savedEvent.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving showcase event:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Provide helpful error message for storage (Upstash Redis) setup
    const isStorageError = errorMessage.includes(
      "Upstash Redis (Storage KV) is not configured"
    );

    return NextResponse.json(
      {
        error: isStorageError
          ? "Storage not configured. Please set up Upstash Redis (Storage KV) in your project settings."
          : "Failed to save showcase event",
        details:
          isStorageError || process.env.NODE_ENV === "development"
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
    console.error("Error fetching showcase events:", error);
    return NextResponse.json(
      { error: "Failed to fetch showcase events" },
      { status: 500 }
    );
  }
}

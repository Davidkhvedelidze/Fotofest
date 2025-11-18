import { NextRequest, NextResponse } from "next/server";
import {
  saveShowcaseEvent,
  getShowcaseEvents,
  validateShowcaseEvent,
} from "@/lib/api-utils";
import { EventShowcase } from "@/app/types/type";

export async function POST(request: NextRequest) {
  try {
    const body: EventShowcase = await request.json();

    // Validate the request data
    const validation = validateShowcaseEvent(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Save the showcase event
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
    console.error("Error saving showcase event:", error);
    return NextResponse.json(
      { error: "Failed to save showcase event" },
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

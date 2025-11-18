import { NextRequest, NextResponse } from "next/server";
import { deleteShowcaseEvent, updateShowcaseEvent, validateShowcaseEvent } from "@/lib/api-utils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteShowcaseEvent(id);

    if (deleted) {
      return NextResponse.json(
        { success: true, message: "Event deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting showcase event:", error);
    return NextResponse.json(
      { error: "Failed to delete showcase event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const validation = validateShowcaseEvent(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const updated = await updateShowcaseEvent(id, body);

    if (updated) {
      return NextResponse.json(
        { success: true, message: "Event updated successfully", event: updated },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating showcase event:", error);
    return NextResponse.json(
      { error: "Failed to update showcase event" },
      { status: 500 }
    );
  }
}

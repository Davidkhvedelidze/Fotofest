import { NextRequest, NextResponse } from "next/server";
import { deleteShowcaseEvent } from "@/lib/api-utils";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
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

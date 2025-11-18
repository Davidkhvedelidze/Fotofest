import { NextRequest, NextResponse } from "next/server";
import { RequestEventFormData } from "@/app/types/type";
import { saveEventRequest, validateEventRequest } from "@/lib/api-utils";

export async function POST(request: NextRequest) {
  try {
    const body: RequestEventFormData = await request.json();

    // Validate the request data
    const validation = validateEventRequest(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Save the event request
    const savedRequest = await saveEventRequest(body);

    // TODO: Send email notification (uncomment when email service is configured)
    // await sendEventRequestEmail(body);

    return NextResponse.json(
      {
        success: true,
        message: "Event request submitted successfully",
        id: savedRequest.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing event request:", error);
    return NextResponse.json(
      { error: "Failed to process event request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Event request endpoint - POST to submit a request" },
    { status: 200 }
  );
}

import { NextRequest, NextResponse } from "next/server";
import {
  saveContactMessage,
  validateContactMessage,
  getContactMessages,
} from "@/lib/api-utils";

interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactMessage = await request.json();

    // Validate the request data
    const validation = validateContactMessage(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Save the contact message
    const savedMessage = await saveContactMessage(body);

    // TODO: Send email notification (uncomment when email service is configured)
    // await sendContactEmail(body);

    return NextResponse.json(
      {
        success: true,
        message: "Contact message sent successfully",
        id: savedMessage.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Failed to process contact message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}

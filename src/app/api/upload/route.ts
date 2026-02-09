import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyAdminToken } from "@/lib/auth-utils";
import { logError } from "@/lib/services/logger";

const MAX_SIZE = 4.5 * 1024 * 1024; // 4.5 MB (Vercel serverless limit)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const isAuthenticated = await verifyAdminToken();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Blob storage not configured. Add a Blob store in Vercel → Storage and set BLOB_READ_WRITE_TOKEN.",
      },
      { status: 503 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided. Use form field name: file" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4.5 MB." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF." },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const pathname = `showcase-events/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${ext}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
      token,
    });

    return NextResponse.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    logError({ message: "Upload error", error });
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}

import { logError } from "@/lib/services/logger";

export interface UploadResponse {
  url: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json()) as UploadResponse & {
      error?: string;
    };

    if (!response.ok) {
      throw new Error(payload.error ?? "Upload failed");
    }

    return payload;
  } catch (error) {
    logError({ message: "Image upload failed", error });
    throw error;
  }
};

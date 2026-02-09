export function validateRedirectUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  }

  if (url.startsWith("/")) {
    return !url.match(/^\/[a-zA-Z][a-zA-Z0-9+.-]*:/);
  }

  return false;
}

export function sanitizeRedirectUrl(url: string): string | null {
  if (!validateRedirectUrl(url)) {
    return null;
  }

  if (url.startsWith("/")) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:") {
      return url;
    }
  } catch {
    return null;
  }

  return null;
}

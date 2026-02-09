import { logError } from "./logger";

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface HttpRequestConfig<TResponse = unknown> {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: unknown;
  retries?: number;
  retryDelayMs?: number;
  signal?: AbortSignal;
  parseAsJson?: boolean;
  responseGuard?: (payload: unknown) => payload is TResponse;
}

export interface HttpError extends Error {
  status?: number;
  details?: unknown;
}

const sleep = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
};

const shouldRetry = (error: unknown): boolean => {
  if (error instanceof Error && "status" in error) {
    const status = (error as HttpError).status;
    if (typeof status === "number" && status >= 500) {
      return true;
    }
  }

  return error instanceof TypeError;
};

export async function httpRequest<TResponse>(
  url: string,
  config: HttpRequestConfig<TResponse> = {}
): Promise<TResponse> {
  const {
    method = HttpMethod.GET,
    headers,
    body,
    retries = 1,
    retryDelayMs = 300,
    signal,
    parseAsJson = true,
    responseGuard,
  } = config;

  let attempt = 0;

  while (attempt <= retries) {
    try {
      const response = await fetch(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
        signal,
      });

      const payload = parseAsJson
        ? ((await response.json()) as TResponse)
        : ((await response.text()) as unknown as TResponse);

      if (responseGuard && !responseGuard(payload)) {
        const error: HttpError = new Error("Response validation failed");
        error.status = response.status;
        error.details = payload;
        throw error;
      }

      if (!response.ok) {
        const error: HttpError = new Error(
          (payload as { error?: string })?.error ?? "Request failed"
        );
        error.status = response.status;
        error.details = payload;
        throw error;
      }

      return payload;
    } catch (error) {
      logError({
        message: "HTTP request failed",
        context: { url, method, attempt },
        error,
      });

      attempt += 1;

      if (attempt > retries || !shouldRetry(error)) {
        throw error instanceof Error
          ? error
          : new Error("Request failed with unknown error");
      }

      await sleep(retryDelayMs);
    }
  }

  throw new Error("Request aborted after retries");
}

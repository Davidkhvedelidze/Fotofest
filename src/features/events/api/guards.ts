import type { EventShowcase, RequestEventFormData } from "@/features/events/types";

const isString = (value: unknown): value is string => typeof value === "string";
const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || isString(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

const isEventShowcasePayload = (value: unknown): value is EventShowcase => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isString(record.name) &&
    isString(record.location) &&
    isString(record.description) &&
    isStringArray(record.tags) &&
    isOptionalString(record.image) &&
    isOptionalString(record.imageAlt) &&
    isOptionalString(record.redirectUrl) &&
    isOptionalString(record.date)
  );
};

const isRequestEventFormDataPayload = (
  value: unknown
): value is RequestEventFormData => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isOptionalString(record.id) &&
    isString(record.name) &&
    isString(record.email) &&
    isString(record.mobile) &&
    isString(record.eventType) &&
    isString(record.date) &&
    isString(record.message)
  );
};

export const isEventRequestResponse = (
  value: unknown
): value is { success: boolean; message: string; id?: string } => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.success === "boolean" &&
    isString(record.message) &&
    isOptionalString(record.id)
  );
};

export const isEventListResponse = (
  value: unknown
): value is { events: RequestEventFormData[] } => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    Array.isArray(record.events) &&
    record.events.every((event) => isRequestEventFormDataPayload(event))
  );
};

export const isShowcaseEventsResponse = (
  value: unknown
): value is { events: EventShowcase[] } => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    Array.isArray(record.events) &&
    record.events.every((event) => isEventShowcasePayload(event))
  );
};

export const isSuccessResponse = (
  value: unknown
): value is { success: boolean } => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return typeof record.success === "boolean";
};

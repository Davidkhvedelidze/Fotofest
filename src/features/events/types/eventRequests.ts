import { RequestEventFormData } from "@/features/events/types/events";

export interface EventRequestRecord {
  id: string;
  data: RequestEventFormData;
  createdAt: string;
}

export interface EventListResponse {
  events: EventRequestRecord[];
}

export const isEventRequestRecord = (
  value: unknown
): value is EventRequestRecord => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as EventRequestRecord;
  return (
    typeof record.id === "string" &&
    typeof record.createdAt === "string" &&
    typeof record.data === "object" &&
    record.data !== null
  );
};

export const isEventListResponse = (
  value: unknown
): value is EventListResponse => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as EventListResponse;
  return (
    Array.isArray(response.events) &&
    response.events.every(isEventRequestRecord)
  );
};

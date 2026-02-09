import type { EventShowcase, RequestEventFormData } from "@/features/events/types";
import {
  addShowcaseEventApi,
  deleteShowcaseEventApi,
  getEventRequestsApi,
  getShowcaseEventsApi,
  submitEventRequestApi,
} from "@/features/events/api/eventsClient";

export interface ShowcaseEventRecord extends EventShowcase {
  id?: string;
  createdAt?: string;
}

export const sortShowcaseEventsByCreatedAt = (
  events: ShowcaseEventRecord[]
): ShowcaseEventRecord[] => {
  return [...events].sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (a.createdAt) return -1;
    if (b.createdAt) return 1;

    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
};

export const sortShowcaseEventsByDate = (
  events: ShowcaseEventRecord[]
): ShowcaseEventRecord[] => {
  return [...events].sort((a, b) => {
    const aDate = a.date || a.createdAt;
    const bDate = b.date || b.createdAt;

    if (aDate && bDate) {
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    }
    if (aDate) return -1;
    if (bDate) return 1;
    return 0;
  });
};

export const fetchShowcaseEvents = async (): Promise<ShowcaseEventRecord[]> => {
  const response = await getShowcaseEventsApi();
  return response.events;
};

export const fetchEventRequests = async () => {
  return getEventRequestsApi();
};

export const submitEventRequest = async (payload: RequestEventFormData) => {
  return submitEventRequestApi(payload);
};

export const createShowcaseEvent = async (payload: EventShowcase) => {
  return addShowcaseEventApi(payload);
};

export const removeShowcaseEvent = async (id: string) => {
  return deleteShowcaseEventApi(id);
};

import { RequestEventFormData, EventShowcase } from "@/app/types/type";
import { httpRequest, HttpMethod } from "@/lib/services/http";

export interface EventRequestResponse {
  success: boolean;
  message: string;
  id?: string;
}

export interface EventListResponse {
  events: RequestEventFormData[];
}

export interface ShowcaseEventsResponse {
  events: EventShowcase[];
}

export const submitEventRequestApi = (
  payload: RequestEventFormData
): Promise<EventRequestResponse> =>
  httpRequest<EventRequestResponse>("/api/events/request", {
    method: HttpMethod.POST,
    body: payload,
    retries: 2,
  });

export const getEventRequestsApi = (): Promise<EventListResponse> =>
  httpRequest<EventListResponse>("/api/events", {
    method: HttpMethod.GET,
    retries: 1,
  });

export const getShowcaseEventsApi = (): Promise<ShowcaseEventsResponse> =>
  httpRequest<ShowcaseEventsResponse>("/api/showcase-events", {
    method: HttpMethod.GET,
    retries: 1,
  });

export const addShowcaseEventApi = (
  payload: EventShowcase
): Promise<{ success: boolean }> =>
  httpRequest<{ success: boolean }>("/api/showcase-events", {
    method: HttpMethod.POST,
    body: payload,
    retries: 2,
  });

export const deleteShowcaseEventApi = (id: string): Promise<{ success: boolean }> =>
  httpRequest<{ success: boolean }>(`/api/showcase-events/${id}`, {
    method: HttpMethod.DELETE,
    retries: 1,
  });

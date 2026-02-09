import { RequestEventFormData, EventShowcase } from "@/features/events/types";
import { httpRequest, HttpMethod } from "@/lib/services/http";
import {
  isEventListResponse,
  isEventRequestResponse,
  isShowcaseEventsResponse,
  isSuccessResponse,
} from "./guards";
import { EventListResponse } from "@/features/events/types/eventRequests";

export interface EventRequestResponse {
  success: boolean;
  message: string;
  id?: string;
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
    responseGuard: isEventRequestResponse,
  });

export const getEventRequestsApi = (): Promise<EventListResponse> =>
  httpRequest<EventListResponse>("/api/events", {
    method: HttpMethod.GET,
    retries: 1,
    responseGuard: isEventListResponse,
  });

export const getShowcaseEventsApi = (): Promise<ShowcaseEventsResponse> =>
  httpRequest<ShowcaseEventsResponse>("/api/showcase-events", {
    method: HttpMethod.GET,
    retries: 1,
    responseGuard: isShowcaseEventsResponse,
  });

export const addShowcaseEventApi = (
  payload: EventShowcase
): Promise<{ success: boolean }> =>
  httpRequest<{ success: boolean }>("/api/showcase-events", {
    method: HttpMethod.POST,
    body: payload,
    retries: 2,
    responseGuard: isSuccessResponse,
  });

export const deleteShowcaseEventApi = (id: string): Promise<{ success: boolean }> =>
  httpRequest<{ success: boolean }>(`/api/showcase-events/${id}`, {
    method: HttpMethod.DELETE,
    retries: 1,
    responseGuard: isSuccessResponse,
  });

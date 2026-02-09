import { httpRequest, HttpMethod } from "@/lib/services/http";
import type {
  ContactMessagePayload,
  ContactMessagesList,
} from "@/features/contact/types/contact";

export interface ContactMessageResponse {
  success: boolean;
  message?: string;
}

export const sendContactMessageApi = (
  payload: ContactMessagePayload
): Promise<ContactMessageResponse> =>
  httpRequest<ContactMessageResponse>("/api/contact", {
    method: HttpMethod.POST,
    body: payload,
    retries: 2,
  });

export const getContactMessagesApi = (): Promise<ContactMessagesList> =>
  httpRequest<ContactMessagesList>("/api/contact", {
    method: HttpMethod.GET,
  });

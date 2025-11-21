import { httpRequest, HttpMethod } from "@/lib/services/http";

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessageResponse {
  success: boolean;
  message?: string;
}

export interface ContactMessagesList {
  messages: ContactMessagePayload[];
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

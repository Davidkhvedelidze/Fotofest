import { EventShowcase } from "@/features/events/types/events";
import { httpRequest, HttpMethod } from "@/lib/services/http";

export interface UpdateShowcaseEventResponse {
  success: boolean;
  event?: EventShowcase;
}

export function updateShowcaseEventApi(
  id: string,
  payload: EventShowcase
): Promise<UpdateShowcaseEventResponse> {
  return httpRequest<UpdateShowcaseEventResponse>(
    `/api/showcase-events/${id}`,
    {
      method: HttpMethod.PUT,
      body: payload,
      retries: 1,
    }
  );
}

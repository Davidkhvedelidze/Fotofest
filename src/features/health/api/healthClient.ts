import { httpRequest } from "@/lib/services/http";

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
}

export const fetchHealthStatus = (): Promise<HealthResponse> =>
  httpRequest<HealthResponse>("/api/health");

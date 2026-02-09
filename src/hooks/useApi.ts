import { useCallback, useState } from "react";
import { RequestEventFormData, EventShowcase } from "@/features/events/types/events";
import {
  addShowcaseEventApi,
  deleteShowcaseEventApi,
  getEventRequestsApi,
  getShowcaseEventsApi,
  submitEventRequestApi,
} from "@/features/events/api/eventsClient";
import {
  getContactMessagesApi,
  sendContactMessageApi,
} from "@/features/contact/api/contactClient";
import { ContactMessagePayload } from "@/features/contact/types/contact";
import { fetchHealthStatus } from "@/features/health/api/healthClient";
import { logError } from "@/lib/services/logger";

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  loading: boolean;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHealthStatus();
      return { data, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Health check failed";
      setError(errorMessage);
      logError({ message: "Health check failed", error: err });
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const submitEventRequest = useCallback(
    async (data: RequestEventFormData): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const result = await submitEventRequestApi(data);
        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        logError({
          message: "Failed to submit event request",
          context: { payload: data },
          error: err,
        });
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getEventRequests = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await getEventRequestsApi();
      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      logError({ message: "Failed to fetch event requests", error: err });
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const sendContactMessage = useCallback(
    async (data: ContactMessagePayload): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const result = await sendContactMessageApi(data);
        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        logError({
          message: "Failed to send contact message",
          context: { payload: data },
          error: err,
        });
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const getContactMessages = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await getContactMessagesApi();
      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      logError({ message: "Failed to fetch contact messages", error: err });
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const getShowcaseEvents = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await getShowcaseEventsApi();
      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      logError({ message: "Failed to fetch showcase events", error: err });
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const addShowcaseEvent = useCallback(
    async (data: EventShowcase): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const result = await addShowcaseEventApi(data);
        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        logError({
          message: "Failed to add showcase event",
          context: { payload: data },
          error: err,
        });
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteShowcaseEvent = useCallback(
    async (id: string): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const result = await deleteShowcaseEventApi(id);
        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        logError({
          message: "Failed to delete showcase event",
          context: { eventId: id },
          error: err,
        });
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    error,
    checkHealth,
    submitEventRequest,
    getEventRequests,
    sendContactMessage,
    getContactMessages,
    getShowcaseEvents,
    addShowcaseEvent,
    deleteShowcaseEvent,
  };
}

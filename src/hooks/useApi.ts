import { useState, useCallback } from "react";
import { RequestEventFormData, EventShowcase } from "@/app/types/type";

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  loading: boolean;
}

interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Health check
  const checkHealth = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Health check failed");
      }
      return { data, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Health check failed";
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit event request
  const submitEventRequest = useCallback(
    async (data: RequestEventFormData): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/events/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to submit event request");
        }

        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get event requests
  const getEventRequests = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/events");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch event requests");
      }

      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Send contact message
  const sendContactMessage = useCallback(
    async (data: ContactMessage): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to send contact message");
        }

        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Get contact messages
  const getContactMessages = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/contact");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch contact messages");
      }

      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get showcase events
  const getShowcaseEvents = useCallback(async (): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/showcase-events");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch showcase events");
      }

      return { data: result, loading: false };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Network error. Please try again later.";
      setError(errorMessage);
      return { error: errorMessage, loading: false };
    } finally {
      setLoading(false);
    }
  }, []);

  // Add showcase event
  const addShowcaseEvent = useCallback(
    async (data: EventShowcase): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/showcase-events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to add showcase event");
        }

        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
        return { error: errorMessage, loading: false };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete showcase event
  const deleteShowcaseEvent = useCallback(
    async (id: string): Promise<ApiResponse> => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/showcase-events/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to delete showcase event");
        }

        return { data: result, loading: false };
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Network error. Please try again later.";
        setError(errorMessage);
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

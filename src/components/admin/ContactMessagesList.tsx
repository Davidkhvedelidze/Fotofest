"use client";

import { useCallback, useEffect, useState } from "react";
import { getContactMessagesApi } from "@/features/contact/api/contactClient";
import type { ContactMessage } from "@/features/contact/types/contact";
import { logError } from "@/lib/services/logger";

export function ContactMessagesList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      const data = await getContactMessagesApi();
      const sortedMessages = (data.messages || []).sort(
        (a: ContactMessage, b: ContactMessage) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setMessages(sortedMessages);
    } catch (err) {
      setError("Error loading contact messages");
      logError({ message: "Failed to load contact messages", error: err });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ka-GE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
        <div className="text-center text-[#681155]">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white/80 rounded-3xl p-8 shadow-lg text-center">
        <p className="text-[#681155] text-lg">No contact messages yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 rounded-3xl p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A032D]">
          Contact Messages ({messages.length})
        </h2>
        <button
          onClick={fetchMessages}
          className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors"
        >
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border border-[#E2A9F1] rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#1A032D]">
                  {message.data.name}
                </h3>
                <p className="text-sm text-[#681155] mt-1">
                  {formatDate(message.createdAt)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-semibold text-[#681155] mb-1">
                  Email
                </p>
                <p className="text-[#1A032D]">{message.data.email}</p>
              </div>
              {message.data.subject && (
                <div>
                  <p className="text-sm font-semibold text-[#681155] mb-1">
                    Subject
                  </p>
                  <p className="text-[#1A032D]">{message.data.subject}</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E2A9F1]">
              <p className="text-sm font-semibold text-[#681155] mb-2">
                Message
              </p>
              <p className="text-[#1A032D] whitespace-pre-wrap">
                {message.data.message}
              </p>
            </div>

            <div className="mt-4">
              <a
                href={`mailto:${message.data.email}`}
                className="px-4 py-2 bg-[#681155] text-white rounded-full text-sm font-semibold hover:bg-[#FF5EC3] transition-colors inline-block"
              >
                Reply via Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

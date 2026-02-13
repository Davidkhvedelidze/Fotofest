"use client";

import { useState } from "react";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { EventShowcase } from "@/features/events/types/events";
import { addShowcaseEventApi } from "@/features/events/api/eventsClient";
import { uploadImage } from "@/lib/services/upload";
import { logError } from "@/lib/services/logger";

export function AddEventForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<EventShowcase>({
    name: "",
    location: "",
    description: "",
    tags: [],
    image: "",
    imageAlt: "",
    redirectUrl: "",
    date: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date: date.format("YYYY-MM-DD") }));
    } else {
      setFormData((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setIsUploading(true);
    try {
      const data = await uploadImage(file);
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Image upload failed";
      setError(message);
      logError({ message: "Image upload failed", error: err });
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const result = await addShowcaseEventApi(formData);
      if (result.success) {
        setSuccess("Event added successfully!");
        setFormData({
          name: "",
          location: "",
          description: "",
          tags: [],
          image: "",
          imageAlt: "",
          redirectUrl: "",
          date: "",
        });
        onSuccess();
      } else {
        setError("Failed to add event");
      }
    } catch (err) {
      setError("Error adding event. Please try again.");
      logError({ message: "Error adding showcase event", error: err });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Event Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="e.g., კორპორატიული ღონისძიება"
        />
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Location *
        </label>
        <input
          id="location"
          name="location"
          type="text"
          required
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="e.g., თბილისი · Magic Mirror Experience"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="Describe the event..."
        />
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Event Date *
        </label>
        <DatePicker
          id="date"
          value={formData.date ? dayjs(formData.date) : null}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          placeholder="Select event date"
          className="w-full"
          size="large"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Image URL or upload
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none mb-2"
          placeholder="https://example.com/image.jpg or upload below"
        />
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="text-sm text-[#681155] file:mr-3 file:rounded-xl file:border-0 file:bg-[#F6D2EF] file:px-4 file:py-2 file:font-semibold file:text-[#681155] hover:file:bg-[#E2A9F1]"
          />
          {isUploading && (
            <span className="text-sm text-[#681155] opacity-70">
              Uploading…
            </span>
          )}
        </div>
        {formData.image && (
          <p className="text-xs text-[#681155] opacity-70 mt-1 truncate">
            Current: {formData.image}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageAlt"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Image Alt Text
        </label>
        <input
          id="imageAlt"
          name="imageAlt"
          type="text"
          value={formData.imageAlt}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="Alt text for the image"
        />
      </div>

      <div>
        <label
          htmlFor="redirectUrl"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Redirect URL
        </label>
        <input
          id="redirectUrl"
          name="redirectUrl"
          type="url"
          value={formData.redirectUrl}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="https://example.com or /page (optional - where to redirect when event is clicked)"
        />
        <p className="text-xs text-[#681155] opacity-70 mt-1">
          Optional: URL to redirect users when they click on this event card
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#681155] mb-2">
          Tags * (at least one required)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1 rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-3 bg-[#681155] text-white rounded-2xl font-semibold hover:bg-[#FF5EC3] transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 bg-[#F6D2EF] text-[#681155] pl-3  rounded-full text-sm font-semibold"
            >
              {tag}
              <span
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-[#FF5EC3] cursor-pointer text-xl font-bold bg-[#681155] text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </span>
            </span>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <p className="text-green-800 text-sm">{success}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || formData.tags.length === 0}
        className="w-full rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30 hover:bg-[#FF5EC3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding Event..." : "Add Event"}
      </button>
    </form>
  );
}

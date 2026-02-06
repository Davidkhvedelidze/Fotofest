"use client";

import { useState } from "react";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { EventShowcase } from "@/app/types/type";

interface EditEventFormProps {
  event: EventShowcase & { id: string };
  onSuccess: () => void;
  onCancel: () => void;
}

export function EditEventForm({
  event,
  onSuccess,
  onCancel,
}: EditEventFormProps) {
  const [formData, setFormData] = useState<EventShowcase>({
    name: event.name,
    location: event.location,
    description: event.description,
    tags: [...event.tags],
    image: event.image || "",
    imageAlt: event.imageAlt || "",
    redirectUrl: event.redirectUrl || "",
    date: event.date || "",
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
      const formDataUpload = new FormData();
      formDataUpload.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFormData((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
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
      const response = await fetch(`/api/showcase-events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Event updated successfully!");
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setError(result.error || "Failed to update event");
      }
    } catch (err) {
      setError("Error updating event. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="edit-name"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Event Name *
        </label>
        <input
          id="edit-name"
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
          htmlFor="edit-location"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Location *
        </label>
        <input
          id="edit-location"
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
          htmlFor="edit-description"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Description *
        </label>
        <textarea
          id="edit-description"
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
          htmlFor="edit-date"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Event Date *
        </label>
        <DatePicker
          id="edit-date"
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
          htmlFor="edit-image"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Image URL or upload
        </label>
        <input
          id="edit-image"
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
          htmlFor="edit-imageAlt"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Image Alt Text
        </label>
        <input
          id="edit-imageAlt"
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
          htmlFor="edit-redirectUrl"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Redirect URL
        </label>
        <input
          id="edit-redirectUrl"
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
              className="inline-flex items-center gap-2 bg-[#F6D2EF] text-[#681155] px-3 py-1 rounded-full text-sm font-semibold"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-[#FF5EC3]"
              >
                ×
              </button>
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

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-full border border-[#E2A9F1] px-8 py-4 text-base font-semibold text-[#681155] hover:bg-[#F6D2EF] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || formData.tags.length === 0}
          className="flex-1 rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30 hover:bg-[#FF5EC3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Updating..." : "Update Event"}
        </button>
      </div>
    </form>
  );
}

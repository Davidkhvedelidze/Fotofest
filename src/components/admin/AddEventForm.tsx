"use client";

import { useState } from "react";
import { EventShowcase } from "@/app/types/type";

export function AddEventForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<EventShowcase>({
    name: "",
    location: "",
    description: "",
    tags: [],
    image: "",
    imageAlt: "",
    redirectUrl: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/showcase-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Event added successfully!");
        setFormData({
          name: "",
          location: "",
          description: "",
          tags: [],
          image: "",
          imageAlt: "",
          redirectUrl: "",
        });
        onSuccess();
      } else {
        setError(result.error || "Failed to add event");
      }
    } catch (err) {
      setError("Error adding event. Please try again.");
      console.error(err);
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
          htmlFor="image"
          className="block text-sm font-semibold text-[#681155] mb-2"
        >
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
          placeholder="https://example.com/image.jpg or /images/event.jpg"
        />
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


"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState, type ChangeEvent, type FormEvent, useCallback } from "react";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { formFields } from "@/app/data/data";
import { RequestEventFormData } from "@/app/types/type";

export function RequestEventSection() {
  const [formData, setFormData] = useState<RequestEventFormData>({
    name: "",
    email: "",
    mobile: "",
    eventType: "",
    date: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleRequestSubmit = useCallback(
    async (data: RequestEventFormData) => {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: "" });

      try {
        const response = await fetch("/api/events/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus({
            type: "success",
            message:
              "თქვენი მოთხოვნა წარმატებით გაიგზავნა! ჩვენ მალე დაგიკავშირდებით.",
          });
          // Reset form
          setFormData({
            name: "",
            email: "",
            mobile: "",
            eventType: "",
            date: "",
            message: "",
          });
        } else {
          setSubmitStatus({
            type: "error",
            message:
              result.error || "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.",
          });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus({
          type: "error",
          message: "დაფიქსირდა შეცდომა. გთხოვთ სცადოთ თავიდან.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    []
  );

  const handleChange =
    (field: keyof RequestEventFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date: date.format("YYYY-MM-DD") }));
    } else {
      setFormData((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRequestSubmit(formData);
  };

  const inputClassName =
    "w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none";

  return (
    <section id="request" className="py-24">
      <div className="mx-auto max-w-5xl rounded-[3rem] bg-white/80 p-10 shadow-2xl shadow-[#CB6CE6]/20 backdrop-blur lg:p-16">
        <SectionHeading eyebrow="დაგეგმე" align="left">
          მოუყევი PhotoFest-ს შენი ოცნების ღონისძიების შესახებ
        </SectionHeading>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {formFields.map((field) => (
            <div
              key={field.id}
              className={`space-y-2 ${
                field.colSpan === 2 ? "md:col-span-2" : ""
              }`}
            >
              <label
                htmlFor={field.id}
                className="text-sm font-semibold text-[#681155]"
              >
                {field.label}
              </label>
              {field.type === "date" ? (
                <DatePicker
                  id={field.id}
                  value={formData.date ? dayjs(formData.date) : null}
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  placeholder="აირჩიეთ თარიღი"
                  className="w-full"
                  size="large"
                />
              ) : (
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange(field.name)}
                  className={inputClassName}
                />
              )}
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-[#681155]"
            >
              დამატებითი ინფორმაცია
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              className={inputClassName}
              placeholder="რა გამოცდილებას ეძებ? რამდენი სტუმარია? მოგვიყევი მეტი დეტალი"
            />
          </div>
          {submitStatus.type && (
            <div
              className={`md:col-span-2 rounded-2xl p-4 ${
                submitStatus.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          )}
          <div className="md:col-span-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              className="w-full flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="w-full rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30 cursor-pointer">
                {isSubmitting ? "იგზავნება..." : "გაგზავნა"}
              </p>
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

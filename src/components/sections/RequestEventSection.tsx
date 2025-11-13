'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useState, type ChangeEvent, type FormEvent } from 'react';

interface RequestEventSectionProps {
  onSubmit?: (formData: RequestEventFormData) => void;
}

export interface RequestEventFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  message: string;
}

export function RequestEventSection({ onSubmit }: RequestEventSectionProps) {
  const [formData, setFormData] = useState<RequestEventFormData>({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });

  const handleChange = (field: keyof RequestEventFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <section id="request" className="py-24">
      <div className="mx-auto max-w-5xl rounded-[3rem] bg-white/80 p-10 shadow-2xl shadow-[#CB6CE6]/20 backdrop-blur lg:p-16">
        <SectionHeading eyebrow="დაგეგმე" align="left">
          მოუყევი FotoFest-ს შენი ოცნების ღონისძიების შესახებ
        </SectionHeading>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[#681155]">
              სახელი და გვარი
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange('name')}
              className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[#681155]">
              ელფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange('email')}
              className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="eventType" className="text-sm font-semibold text-[#681155]">
              ღონისძიების ტიპი
            </label>
            <input
              id="eventType"
              name="eventType"
              type="text"
              required
              placeholder="კორპორატიული, ქორწილი, პრეზენტაცია..."
              value={formData.eventType}
              onChange={handleChange('eventType')}
              className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-semibold text-[#681155]">
              ღონისძიების თარიღი
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange('date')}
              className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-[#681155]">
              დამატებითი ინფორმაცია
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange('message')}
              className="w-full rounded-2xl border border-[#E2A9F1] bg-white/90 px-4 py-3 text-[#1A032D] shadow-inner focus:border-[#FF5EC3] focus:outline-none"
              placeholder="რა გამოცდილებას ეძებ? რამდენი სტუმარია? მოგვიყევი მეტი დეტალი"
            />
          </div>
          <div className="md:col-span-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-full bg-[#681155] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#681155]/30"
            >
              გაგზავნა
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

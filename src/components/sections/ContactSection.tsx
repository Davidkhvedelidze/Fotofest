'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface ContactChannel {
  label: string;
  value: string;
  href: string;
}

interface ContactSectionProps {
  channels: ContactChannel[];
}

export function ContactSection({ channels }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-white/70 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionHeading eyebrow="კონტაქტი">გვიპოვეთ სოციალურ ქსელებსა და ელფოსტაზე</SectionHeading>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {channels.map((channel) => (
            <a
              key={channel.label}
              href={channel.href}
              className="group rounded-3xl bg-white/90 p-6 text-left shadow-lg shadow-[#B18CE8]/20 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <p className="text-sm uppercase tracking-[0.4em] text-[#D26E9C]">{channel.label}</p>
              <p className="mt-3 text-xl font-semibold text-[#1A032D] group-hover:text-[#FF5EC3]">
                {channel.value}
              </p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

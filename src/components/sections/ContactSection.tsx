"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactChannels } from "@/app/data/data";
import { ContactChannel } from "@/features/contact/types";

export function ContactSection() {
  return (
    <section id="contact" className="bg-white/70 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionHeading eyebrow="კონტაქტი">
          გვიპოვეთ სოციალურ ქსელებსა და ელფოსტაზე
        </SectionHeading>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >
          {contactChannels.map((channel: ContactChannel) => (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.isSocial ? "_blank" : undefined}
              rel={channel.isSocial ? "noopener noreferrer" : undefined}
              className="group rounded-3xl bg-white/90 p-6 text-left shadow-lg shadow-[#B18CE8]/20 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-2">
                {channel.icon && (
                  <span className="text-2xl" aria-hidden="true">
                    {channel.icon}
                  </span>
                )}
                <p className="text-sm uppercase tracking-[0.4em] text-brand-pink">
                  {channel.label}
                </p>
              </div>
              <p className="mt-3 text-xl font-semibold text-foreground group-hover:text-brand-pink">
                {channel.value}
              </p>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

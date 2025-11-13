'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export interface EventShowcase {
  name: string;
  location: string;
  description: string;
  tags: string[];
}

interface EventsSectionProps {
  events: EventShowcase[];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 * index, duration: 0.5, ease: 'easeOut' },
  }),
};

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading eyebrow="ღონისძიებები" align="left">
          ინსპირაცია ჩვენი ბოლო ივენთებიდან
        </SectionHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.article
              key={event.name}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              custom={index}
              className="flex flex-col rounded-3xl bg-white/80 p-8 shadow-lg shadow-[#CB6CE6]/15 backdrop-blur"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-[#1A032D]">{event.name}</h3>
                <p className="text-sm font-medium uppercase tracking-widest text-[#D26E9C]">{event.location}</p>
              </div>
              <p className="mt-4 flex-1 text-[#681155]">{event.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-[#F6D2EF] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#681155]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

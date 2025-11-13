'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface AboutSectionProps {
  highlights: { title: string; description: string }[];
}

export function AboutSection({ highlights }: AboutSectionProps) {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="ჩვენ შესახებ" align="left">
              ინოვაციური ფოტოგრაფიის გუნდი, რომელიც თქვენს ისტორიას აცოცხლებს
            </SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-6 text-lg text-[#681155]"
            >
              FotoFest-ის გუნდი ქმნის ემოციურ და თანამედროვე ფოტო გამოცდილებებს. ჩვენ ვთანამშრომლობთ ბრენდებთან,
              სააგენტოებთან და კერძო ივენთებთან, რათა თითოეულ სტუმარს გავუზიაროთ WOW მომენტი — ინტერაქტიული ტექნოლოგიებით,
              პრემიალური დიზაინით და ადამიანური სითბოთი.
            </motion.p>
          </div>
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="grid gap-6"
          >
            {highlights.map((highlight) => (
              <li key={highlight.title} className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-[#E2A9F1]/30 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.4em] text-[#B18CE8]">{highlight.title}</p>
                <p className="mt-3 text-base text-[#681155]">{highlight.description}</p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

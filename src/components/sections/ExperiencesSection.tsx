"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceFeatures } from "@/app/data/data";
import bgImage from "../../../public/bgElements/Element3.png";
import Image from "next/image";

export interface ExperienceFeature {
  title: string;
  description: string;
  bullets: string[];
  accentColor: string;
  image?: string | { src: string; width: number; height: number };
  imageAlt?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * index, duration: 0.6, ease: "easeOut" },
  }),
};

export function ExperiencesSection() {
  return (
    <section id="experiences" className="bg-white/70 py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 relative">
        <Image
          src={bgImage}
          alt="Experiences"
          className="absolute top-0 left-0 w-full h-full scale-125 object-cover"
        />
        <SectionHeading eyebrow="ჯადოსნური სერვისები" align="left">
          თითოეული ზონა ქმნის გამორჩეულ ფოტო გამოცდილებას
        </SectionHeading>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experienceFeatures.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E2A9F1]/40 bg-white/80 shadow-lg shadow-[#E2A9F1]/20 backdrop-blur transition hover:-translate-y-1"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={index}
            >
              {feature.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt || feature.title}
                    fill
                    className="object-cover transition-transform object-top-center duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex flex-col p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-[#1A032D]">
                    {feature.title}
                  </h3>
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: feature.accentColor }}
                  />
                </div>
                <p className="mt-4 text-base text-[#681155]">
                  {feature.description}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#681155]">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#CB6CE6]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

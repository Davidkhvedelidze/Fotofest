"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutHighlights } from "@/lib/constants/marketingData";
import bgImage from "../../../public/bgElements/Element1.png";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 relative">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Image
            src={bgImage}
            alt="About"
            className="absolute top-0 left-0 w-full -z-10 scale-125 h-full  object-cover"
          />
          <div className="relative">
            <SectionHeading eyebrow="ჩვენ შესახებ" align="left">
              ინოვაციური ფოტოგრაფიის გუნდი, რომელიც თქვენს ისტორიას აცოცხლებს
            </SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 z-10 text-lg text-primary"
            >
              PhotoFest-ის გუნდი ქმნის ემოციურ და თანამედროვე ფოტო
              გამოცდილებებს. ჩვენ ვთანამშრომლობთ ბრენდებთან, სააგენტოებთან და
              კერძო ივენთებთან, რათა თითოეულ სტუმარს გავუზიაროთ WOW მომენტი —
              ინტერაქტიული ტექნოლოგიებით, პრემიალური დიზაინით და ადამიანური
              სითბოთი.
            </motion.p>
          </div>
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="grid gap-6"
          >
            {aboutHighlights.map((highlight) => (
              <li
                key={highlight.title}
                className="rounded-3xl bg-white/80 p-6 shadow-lg shadow-[#E2A9F1]/30 backdrop-blur"
              >
                <p className="text-sm uppercase tracking-[0.4em] text-[#B18CE8]">
                  {highlight.title}
                </p>
                <p className="mt-3 text-base text-primary">
                  {highlight.description}
                </p>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

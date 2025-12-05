"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface SectionHeadingProps extends PropsWithChildren {
  eyebrow?: string;
  align?: "left" | "center";
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function SectionHeading({
  eyebrow,
  children,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mx-auto max-w-2xl space-y-3 ${
        align === "center" ? "text-center" : "text-left"
      }`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-purple-light">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
        {children}
      </h2>
    </motion.div>
  );
}

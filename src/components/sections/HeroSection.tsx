'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const heroVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const handleCtaClick = () => {
    onCtaClick?.();
  };

  return (
    <section id="welcome" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="floating-blob absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#E2A9F1]/60 blur-3xl" />
        <div className="floating-blob absolute -right-16 bottom-4 h-64 w-64 rounded-full bg-[#FF5EC3]/50 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-32">
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          variants={heroVariants}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#CB6CE6]">გაიღიმე · გადაიღე · გააზიარე</p>
          <h1 className="text-4xl font-bold text-[#1A032D] md:text-6xl">
            ჯადოსნური სარკე, ფოტოკაბინა და 360° გამოცდილება თქვენი ღონისძიებისთვის
          </h1>
          <p className="max-w-xl text-lg text-[#681155]">
            FotoFest ქმნის დაუვიწყარ მომენტებს ციფრული მაგიით. ჩვენი მოდულური ფოტო ზონა მოიცავს ჯადოსნურ სარკეს,
            ფოტოკაბინას და 360° პლატფორმას — ყოველ ივენთზე ვქმნით უნიკალურ დიზაინს, მყისიერ ბეჭდვას და გაზიარებას.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#request"
              onClick={handleCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#FF5EC3] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-[#FF5EC3]/30"
            >
              დაჯავშნე ღონისძიება
            </motion.a>
            <motion.a
              href="#events"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-[#CB6CE6] px-8 py-3 text-base font-semibold text-[#1A032D]"
            >
              იხილე გამოცდილება
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="relative h-80 w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#B18CE8] via-[#E2A9F1] to-[#FF5EC3] p-[1px]">
            <div className="flex h-full w-full flex-col justify-between rounded-[1.4rem] bg-white/70 p-8 shadow-xl backdrop-blur">
              <div className="space-y-2 text-[#681155]">
                <p className="text-sm uppercase tracking-[0.4em] text-[#D26E9C]">Highlights</p>
                <h3 className="text-2xl font-semibold text-[#1A032D]">Instant Memories</h3>
                <p>
                  • ინდივიდუალური დიზაინი<br />• ადგილზე ბეჭდვა<br />• ციფრული გაზიარება წამებში
                </p>
              </div>
              <div className="rounded-2xl bg-[#F6D2EF] p-4 text-sm text-[#681155] shadow-inner">
                <p>&ldquo;FotoFest არის საუკეთესო არჩევანი სელფის მოყვარულთათვის და განსაკუთრებული ღონისძიებებისთვის.&rdquo;</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

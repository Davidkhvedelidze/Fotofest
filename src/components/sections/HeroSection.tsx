"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/effect-fade";
import LiquidGlass from "../ui/LiquidGlass";

gsap.registerPlugin(Draggable);

const HERO_SLIDES = [
  "/images/cover1.jpg",
  "/images/cover2.jpg",
  "/images/cover3.JPG",
  "/images/cover4.JPG",
  "/images/cover5.JPG",
  "/images/cover6.JPG",
];

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".floating-blob", {
        y: "+=24",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = document.querySelector(".liquid-glass");
    if (!el) return;

    const instances = Draggable.create(".liquid-glass", {
      type: "x,y",
      inertia: true,
      onRelease() {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1,0.3)",
        });
      },
    });

    const handleClick = (e: Event) => {
      const ev = e as MouseEvent;
      if ((ev.target as HTMLElement).closest(".liquid-glass__icon")) return;
      (ev.currentTarget as HTMLElement).classList.toggle("is-expanded");
    };

    el.addEventListener("click", handleClick);

    return () => {
      instances.forEach((i) => i.kill());
      el.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section id="welcome" className="relative overflow-hidden ">
      <div className="absolute inset-0 -z-10">
        <div className="floating-blob absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#E2A9F1]/60 blur-3xl" />
        <div className="floating-blob absolute -right-16 bottom-4 h-64 w-64 rounded-full bg-[#FF5EC3]/50 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-6xl  flex-col-reverse gap-8 px-6 py-12 md:flex-row md:gap-12 md:py-24 lg:px-10 lg:py-32">
        <motion.div
          className="space-y-6 md:flex-1"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          variants={heroVariants}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#CB6CE6]">
            გაიღიმე · გადაიღე · გააზიარე
          </p>
          <h1 className="text-3xl font-bold   md:text-4xl lg:text-6xl">
            ჯადოსნური სარკე, ფოტოკაბინა და 360° გამოცდილება თქვენი
            ღონისძიებისთვის
          </h1>
          <p className="max-w-xl text-base text-[#681155] md:text-lg dark:text-white">
            PhotoFest ქმნის დაუვიწყარ მომენტებს ციფრული მაგიით. ჩვენი მოდულური
            ფოტო ზონა მოიცავს ჯადოსნურ სარკეს, ფოტოკაბინას და 360° პლატფორმას —
            ყოველ ივენთზე ვქმნით უნიკალურ დიზაინს, მყისიერ ბეჭდვას და
            გაზიარებას.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#request"
              onClick={handleCtaClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full bg-[#FF5EC3] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#FF5EC3]/30 md:px-8 md:py-3 md:text-base"
            >
              დაჯავშნე ღონისძიება
            </motion.a>
            <motion.a
              href="#events"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-[#CB6CE6] dark:border-[#E2A9F1] px-6 py-2.5 text-sm font-semibold text-[#CB6CE6] dark:text-white md:px-8 md:py-3 md:text-base"
            >
              იხილე გამოცდილება
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="relative flex w-full items-center justify-center  md:justify-end  md:flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.9, ease: "easeOut", delay: 0.5 }}
        >
          <div className="w-full h-full absolute top-0 left-0 z-999  md:hidden  "></div>
          <LiquidGlass className="z-0!">
            <div className="relative h-full w-full">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="coverflow"
                loop
                allowTouchMove={false}
                autoplay={{
                  delay: 3200,
                  disableOnInteraction: false,
                }}
                className="hero-swiper h-full w-full"
              >
                {HERO_SLIDES.map((slide) => (
                  <SwiperSlide key={slide}>
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white/10">
                      <Image
                        src={slide}
                        alt="Hero slide"
                        fill
                        className="object-cover rounded-2xl"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
}

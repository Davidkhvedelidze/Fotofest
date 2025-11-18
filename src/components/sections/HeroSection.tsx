"use client";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onCtaClick?: () => void;
}

const heroVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const heroImages = [
  "https://scontent.cdninstagram.com/v/t51.82787-15/565327057_17846991738584013_2875519290365849714_n.jpg?stp=dst-jpg_e35_p720x720_tt6&_nc_cat=101&ig_cache_key=Mzc0NTM0Nzg4NzU2Mzk2MjEwMw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=egN2uSBngP8Q7kNvwGbu1AR&_nc_oc=AdkVxeYp_Xv3MSoJ-KH6h2m3tnJpz_ETk5VzVAZMhPh9nRtt53d6CgEXGf65WrpJ0KU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_Afg0D6QFysMu4KysMEQs8kg9QuDgANy8uYvvjAEGO2Oz-w&oe=69224D77",
  "https://scontent.cdninstagram.com/v/t51.82787-15/565540115_17846991708584013_965275559350665374_n.jpg?stp=dst-jpg_e35_p720x720_tt6&_nc_cat=108&ig_cache_key=Mzc0NTM0Nzg4NzU2Mzk0Nzc1MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=D0ie79SWQg8Q7kNvwFE3C5B&_nc_oc=Admb1JFuUybs7QSblzUgVdAP3TmWZiTmD8D0__CbiQ270rtTx0LdpXmnhVlVxwNYLBA&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_AfiFm2fICsIIoJoWArEXLg09SoAThzxgR1HFN7JYFR_OBw&oe=6922401E",
  "https://scontent.cdninstagram.com/v/t51.82787-15/571271793_17849167128584013_2335421875199349422_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=Mzc1MzE3MTIzMjk4MDM3MTQyNA%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjk2MXgxMjgxLnNkci5DMyJ9&_nc_ohc=fkiICawE-pYQ7kNvwEDB782&_nc_oc=AdlOshxZtO58fOu6oqa_XBO19GVUNyC5TsgEeOAu1P2yMVbL6CE216hKHQ7w3lUjLkI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_Afg0YMN_1NXvu8Up1KyD9cSDvwnUA7irKFgMEHlT806hMA&oe=69223141",
  "https://scontent.cdninstagram.com/v/t51.82787-15/580828055_17851176978584013_471232412940813173_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=109&ig_cache_key=Mzc2NDA4ODM1NzA4OTU5MDEzMw%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=kvA83HygK0UQ7kNvwHT-ld6&_nc_oc=Adm8q46P7qYdZilo2C-bL70MSL84eX1gl9MeQerFGFaquCkXqkDSG9_t71z7KcqDCMY&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_Afgk-9KKYzUr6zh0nSVIV7Ld5ZtLJxoWl8SQRVpCG1oHZw&oe=69224BF1",
  "https://scontent.cdninstagram.com/v/t51.82787-15/572139570_17849167158584013_5369277901814353220_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_cat=106&ig_cache_key=Mzc1MzE3MTIzMjk4MDM4NzgwMg%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTkyMC5zZHIuQzMifQ%3D%3D&_nc_ohc=vNO52UPAm-cQ7kNvwGl84UC&_nc_oc=Adlca8wovmbC-LruDnhY3xIH67ZOmquHRNAd5GRMIITkFCGWakyQ11koorK_aFt7bQg&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_AfjfiL3hzX2gRvL5JCVflza69OF6pVQSB7DFLCNqDNh5wg&oe=692252E2",
];

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleCtaClick = () => {
    onCtaClick?.();
  };

  useEffect(() => {
    if (!imgRef.current) return;

    const frames = 20;

    // Set initial opacity
    gsap.set(imgRef.current, {
      opacity: 1,
      maskSize: `${frames * 100}% 100%`,
    });

    // Create mask animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(imgRef.current, {
      duration: 3,
      maskPosition: `-${(frames - 1) * 100}% 0%`,
      ease: `steps(${frames - 1})`,
    });

    timelineRef.current = tl;

    // Auto-change images every 5 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % heroImages.length;
        if (imgRef.current) {
          // Fade out current image
          gsap.to(imgRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              if (imgRef.current) {
                imgRef.current.src = heroImages[newIndex];
                // Fade in new image
                gsap.to(imgRef.current, {
                  opacity: 1,
                  duration: 0.5,
                  ease: "power2.inOut",
                });
              }
            },
          });
        }
        return newIndex;
      });
    }, 6000);

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      clearInterval(imageInterval);
    };
  }, []);

  return (
    <section
      id="welcome"
      className="relative overflow-hidden h-[calc(100vh-60px)]"
    >
      <div className="absolute inset-0 -z-10">
        <div className="floating-blob absolute -left-24 top-8 h-72 w-72 rounded-full bg-[#E2A9F1]/60 blur-3xl" />
        <div className="floating-blob absolute -right-16 bottom-4 h-64 w-64 rounded-full bg-[#FF5EC3]/50 blur-3xl" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col flex-col-reverse gap-8 px-6 py-12 md:flex-row md:gap-12 md:py-24 lg:px-10 lg:py-32">
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
          <h1 className="text-3xl font-bold text-[#1A032D] md:text-4xl lg:text-6xl">
            ჯადოსნური სარკე, ფოტოკაბინა და 360° გამოცდილება თქვენი
            ღონისძიებისთვის
          </h1>
          <p className="max-w-xl text-base text-[#681155] md:text-lg">
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
              className="inline-flex items-center justify-center rounded-full border border-[#CB6CE6] px-6 py-2.5 text-sm font-semibold text-[#1A032D] md:px-8 md:py-3 md:text-base"
            >
              იხილე გამოცდილება
            </motion.a>
          </div>
        </motion.div>
        <motion.div
          className="relative flex w-full items-center justify-center md:w-auto md:flex-1"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.9, ease: "easeOut", delay: 0.5 }}
        >
          <div id="cover" className="w-full max-w-sm md:max-w-none">
            <img
              ref={imgRef}
              src={heroImages[currentImageIndex]}
              alt="Hero image"
              id="hero-image"
              className="transition-opacity duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

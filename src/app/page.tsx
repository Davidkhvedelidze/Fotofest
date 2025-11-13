'use client';

import { useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { MainNavigation } from '@/components/layout/MainNavigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperiencesSection, type ExperienceFeature } from '@/components/sections/ExperiencesSection';
import { EventsSection, type EventShowcase } from '@/components/sections/EventsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { RequestEventSection, type RequestEventFormData } from '@/components/sections/RequestEventSection';

const navLinks = [
  { label: 'მთავარი', href: '#welcome' },
  { label: 'სერვისები', href: '#experiences' },
  { label: 'ჩვენ შესახებ', href: '#about' },
  { label: 'ღონისძიებები', href: '#events' },
  { label: 'კონტაქტი', href: '#contact' },
  { label: 'დაჯავშნე', href: '#request' },
];

const experienceFeatures: ExperienceFeature[] = [
  {
    title: 'ჯადოსნური სარკე',
    description: 'ფოტოების, გიფებისა და ბუმერანგების გადაღება ზუსტად იმ დროს, როცა ემოცია ყველაზე ძლიერია, სუპერ სწრაფი გაზიარებით.',
    bullets: [
      'ინდივიდუალური დიზაინი თითოეული ღონისძიებისთვის',
      'ადგილზე ბეჭდვა და ციფრული ვერსიის QR კოდი წამებში',
      'იდეალური არჩევანი სელფის მოყვარულთათვის',
    ],
    accentColor: '#E2A9F1',
  },
  {
    title: 'ფოტოკაბინა',
    description: 'ულიმიტო ბეჭდვა, ელეგანტური დიზაინი და ინტერაქტიული რეკვიზიტები დაუვიწყარი ცერემონიებისთვის.',
    bullets: [
      'ფოტოების, გიფების და ბუმერანგების გადაღება',
      'ფოტოებს ბეჭდავ მომენტალურად და ულიმიტოდ',
      'ციფრული ვერსიის QR კოდი — გაზიარება ერთ შეხებაში',
    ],
    accentColor: '#CB6CE6',
  },
  {
    title: 'კადრი 360°',
    description: '360 გრადუსიანი slow motion ვიდეოები და 3D ეფექტები, რომლებიც თქვენს ღონისძიებას განსხვავებულ ბრწყინვალებას სძენს.',
    bullets: [
      'ინდივიდუალური ბრენდირება კადრებზე',
      'მომენტალური წვდომა გადაიღებულ ვიდეოზე',
      'სტაბილური პლატფორმა ნებისმიერი სივრცისთვის',
    ],
    accentColor: '#FF5EC3',
  },
];

const recentEvents: EventShowcase[] = [
  {
    name: 'ივენთი 1',
    location: 'თბილისი · Magic Mirror Experience',
    description:
      'ნეონ განათებით გაფორმებული ინსტალაცია, რომელიც სტუმრებს აძლევდა მყისიერ პრინტებს, გიფებს და ანიმირებულ ფილტრებს.',
    tags: ['Magic Mirror', 'Live Printing', 'GIF Booth'],
  },
  {
    name: 'ივენთი 2',
    location: 'ბათუმი · Premium Photo Booth',
    description:
      'კორპორატიული წვეულებისთვის შექმნილი ბრენდირებული ფოტო ზონა — სტუმრებმა წამებში მიიღეს ციფრული და დაბეჭდილი ფოტოები.',
    tags: ['Photo Booth', 'Branding', 'Instant QR'],
  },
  {
    name: 'ივენთი 3',
    location: 'ქუთაისი · 360° Immersive Stage',
    description:
      '360° კამერამ შექმნა სათამაშო ვიდეოები — ღონისძიება დასრულდა მოწვეულების მიერ გაზიარებული ათასობით ნახვით.',
    tags: ['360 Stage', 'Slow Motion', 'Social Buzz'],
  },
];

const aboutHighlights = [
  {
    title: '24/7 Support',
    description: 'დაგვიკავშირდი ნებისმიერ დროს — დაგეხმარებით იდეის დახვეწასა და ტექნიკურ განლაგებაში.',
  },
  {
    title: 'Creative Studio',
    description: 'დიზაინერების გუნდი ქმნის ლეიაუტებს, ანიმირებულ ფრეიმებსა და ბრენდირებულ ექსპერიანსებს.',
  },
  {
    title: 'Tech Excellence',
    description: 'ვმუშაობთ მაღალი ხარისხის ტექნიკით და ვზრუნავთ უსაფრთხო მონტაჟსა და ოპერირებაზე.',
  },
];

const contactChannels = [
  { label: 'ელფოსტა', value: 'Photofest2@gmail.com', href: 'mailto:Photofest2@gmail.com' },
  { label: 'ტელეფონი', value: '596 922 299', href: 'tel:+995596922299' },
  { label: 'Instagram', value: '@Photofest_ge', href: 'https://instagram.com/Photofest_ge' },
];

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.floating-blob', {
        y: '+=24',
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleRequestSubmit = useCallback((data: RequestEventFormData) => {
    // For demo purposes we simply log the form data. Replace with an API call or integration.
    console.table(data);
  }, []);

  return (
    <div className="min-h-screen text-[#1A032D]">
      <MainNavigation links={navLinks} />
      <main>
        <HeroSection onCtaClick={() => undefined} />
        <ExperiencesSection features={experienceFeatures} />
        <AboutSection highlights={aboutHighlights} />
        <EventsSection events={recentEvents} />
        <ContactSection channels={contactChannels} />
        <RequestEventSection onSubmit={handleRequestSubmit} />
      </main>
      <footer className="border-t border-white/30 bg-[#681155] py-10 text-center text-sm text-white">
        <p>© {new Date().getFullYear()} FotoFest — გაიღიმე · გადაიღე · გააზიარე</p>
      </footer>
    </div>
  );
}

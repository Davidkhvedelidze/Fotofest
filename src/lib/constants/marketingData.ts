import type { ExperienceFeature } from "@/features/experiences/types/experience";
import type {
  EventShowcase,
  RequestEventFormData,
} from "@/features/events/types/events";
import type { NavLink } from "@/features/navigation/types/navigation";
import type { ContactChannel } from "@/features/contact/types/contact";
import photoBooth from "../../../public/products/სარკე.png";

export const navLinks: NavLink[] = [
  { label: "მთავარი", href: "#welcome" },
  { label: "სერვისები", href: "#experiences" },
  { label: "ჩვენ შესახებ", href: "#about" },
  { label: "ღონისძიებები", href: "#events" },
  { label: "კონტაქტი", href: "#contact" },
  { label: "დაჯავშნე", href: "#request" },
];

export const experienceFeatures: ExperienceFeature[] = [
  {
    title: "ჯადოსნური სარკე",
    description: "გადაიღე ფოტოები, გიფები და ბუმერანგები",
    bullets: [
      "ადგილზე ბეჭდვა წამებში, ულიმიტოდ",
      "QR კოდით გაზიარება",
      "თითოეული ღონისძიებისთვის ინდივიდუალურად დამზადებული დიზაინი",
    ],
    accentColor: "#E2A9F1",
    image: "https://i.imgur.com/4n2YCwB.jpeg",
    imageAlt: "ჯადოსნური სარკე",
  },
  {
    title: "ფოტოკაბინა",
    description: "გადაიღე ფოტოები, გიფები და ბუმერანგები",
    bullets: [
      "ადგილზე ბეჭდვა წამებში, ულიმიტოდ",
      "QR კოდით გაზიარება",
      "თითოეული ღონისძიებისთვის ინდივიდუალურად დამზადებული დიზაინი",
    ],
    accentColor: "#CB6CE6",
    image: "https://i.imgur.com/KvSjN60.jpeg",
    imageAlt: "ფოტოკაბინა",
  },
  {
    title: "კადრი 360°",
    description: "გადაიღე უმაღლესი ხარისხის Slow Motion ვიდეო, 360 გრადუსით.",
    bullets: [
      "ინდივიდუალური ბრენდირება კადრებზე",
      "მომენტალური წვდომა გადაღებულ ვიდეოზე",
      "3D პლატფორმა",
    ],
    accentColor: "#FF5EC3",
    image: "https://i.imgur.com/V2obgKE.jpeg",
    imageAlt: "კადრი 360°",
  },
];

export const recentEvents: EventShowcase[] = [
  {
    name: "ივენთი 1",
    location: "თბილისი · Magic Mirror Experience",
    description:
      "ნეონ განათებით გაფორმებული ინსტალაცია, რომელიც სტუმრებს აძლევდა მყისიერ პრინტებს, გიფებს და ანიმირებულ ფილტრებს.",
    tags: ["Magic Mirror", "Live Printing", "GIF Booth"],
    image: "/images/event-1.jpg",
    imageAlt: "Magic Mirror Experience event in Tbilisi",
  },
  {
    name: "ივენთი 2",
    location: "ბათუმი · Premium Photo Booth",
    description:
      "კორპორატიული წვეულებისთვის შექმნილი ბრენდირებული ფოტო ზონა — სტუმრებმა წამებში მიიღეს ციფრული და დაბეჭდილი ფოტოები.",
    tags: ["Photo Booth", "Branding", "Instant QR"],
    image: "/images/event-2.jpg",
    imageAlt: "Premium Photo Booth event in Batumi",
  },
  {
    name: "ივენთი 3",
    location: "ქუთაისი · 360° Immersive Stage",
    description:
      "360° კამერამ შექმნა სათამაშო ვიდეოები — ღონისძიება დასრულდა მოწვეულების მიერ გაზიარებული ათასობით ნახვით.",
    tags: ["360 Stage", "Slow Motion", "Social Buzz"],
    image: "/images/event-3.jpg",
    imageAlt: "360° Immersive Stage event in Kutaisi",
  },
];

export const aboutHighlights = [
  {
    title: "24/7 Support",
    description:
      "დაგვიკავშირდი ნებისმიერ დროს — დაგეხმარებით იდეის დახვეწასა და ტექნიკურ განლაგებაში.",
  },
  {
    title: "Creative Studio",
    description:
      "დიზაინერების გუნდი ქმნის ლეიაუტებს, ანიმირებულ ფრეიმებსა და ბრენდირებულ ექსპერიანსებს.",
  },
  {
    title: "Tech Excellence",
    description:
      "ვმუშაობთ მაღალი ხარისხის ტექნიკით და ვზრუნავთ უსაფრთხო მონტაჟსა და ოპერირებაზე.",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "ელფოსტა",
    value: "Photofest2@gmail.com",
    href: "mailto:Photofest2@gmail.com",
  },
  { label: "ტელეფონი", value: "596 922 299", href: "tel:+995596922299" },
  {
    label: "Instagram",
    value: "@Photofest_ge",
    href: "https://instagram.com/Photofest_ge",
    icon: "📷",
    isSocial: true,
  },
  {
    label: "Facebook",
    value: "@Photofest.ge",
    href: "https://facebook.com/Photofest.ge",
    icon: "👥",
    isSocial: true,
  },
  {
    label: "TikTok",
    value: "@Photofest_ge",
    href: "https://tiktok.com/@Photofest_ge",
    icon: "🎵",
    isSocial: true,
  },
];

export const formFields = [
  {
    id: "name",
    name: "name" as keyof RequestEventFormData,
    label: "სახელი და გვარი",
    type: "text",
    required: true,
    colSpan: 1,
  },
  {
    id: "email",
    name: "email" as keyof RequestEventFormData,
    label: "ელფოსტა",
    type: "email",
    required: true,
    colSpan: 1,
  },
  {
    id: "mobile",
    name: "mobile" as keyof RequestEventFormData,
    label: "მობილური ნომერი",
    type: "tel",
    required: true,
    placeholder: "+995 555 123 456",
    colSpan: 1,
  },
  {
    id: "eventType",
    name: "eventType" as keyof RequestEventFormData,
    label: "ღონისძიების ტიპი",
    type: "text",
    required: true,
    placeholder: "კორპორატიული, ქორწილი, პრეზენტაცია...",
    colSpan: 1,
  },
  {
    id: "date",
    name: "date" as keyof RequestEventFormData,
    label: "ღონისძიების თარიღი",
    type: "date",
    required: true,
    colSpan: 1,
  },
];

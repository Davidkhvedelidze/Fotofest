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
    image: photoBooth,
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
    image:
      "https://scontent.cdninstagram.com/v/t51.82787-15/556694761_17843643897584013_8764252181146379206_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=MzczMjI3NDM3MjU4OTc5MTk3OQ%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5Ny5zZHIuQzMifQ%3D%3D&_nc_ohc=XmvbsZtdfFAQ7kNvwHOzwQL&_nc_oc=AdlW18U6byDmTCyE9lpBLX64_DFs_261MQofbByDBidTPtYTCoIfGPWEKR4AoJLbm7c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=JGCnLT_381FLz8CSnCmjzA&oh=00_Afihc_qxcf7nODLbJgQaCW8dxlgVjb6zNNzFTRnNyVcd6Q&oe=69224848",
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
    image: photoBooth,
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

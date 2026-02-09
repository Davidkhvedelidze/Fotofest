export interface ExperienceFeature {
  title: string;
  description: string;
  bullets: string[];
  accentColor: string;
  image?: string | { src: string; width: number; height: number };
  imageAlt?: string;
}

export interface EventShowcase {
  name: string;
  location: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  redirectUrl?: string;
  date?: string; // ISO date string (YYYY-MM-DD)
}

export interface RequestEventFormData {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  eventType: string;
  date: string;
  message: string;
}

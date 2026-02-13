export interface EventShowcase {
  name: string;
  location: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  redirectUrl?: string;
  date?: string;
  id?: string;
  createdAt?: string;
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

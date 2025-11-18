export interface EventShowcase {
  name: string;
  location: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  redirectUrl?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon?: string;
  isSocial?: boolean;
}

export interface ContactSectionProps {
  channels: ContactChannel[];
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

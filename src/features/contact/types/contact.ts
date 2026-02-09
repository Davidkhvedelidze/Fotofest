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

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessagesList {
  messages: ContactMessagePayload[];
}

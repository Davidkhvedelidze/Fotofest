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

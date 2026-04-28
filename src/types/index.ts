export type LeadStatus = 'nuevo' | 'contactado' | 'cerrado';

export interface EventLead {
  id?: string;
  name: string;
  phone: string;
  event_date: string;
  message?: string;
  status?: LeadStatus;
  created_at?: string;
}

export interface Photo {
  id?: string;
  url: string;
  event_date?: string;
  photographer?: string;
  featured?: boolean;
  created_at?: string;
  pathname?: string;
}

export interface SiteConfig {
  id?: number;
  whatsapp_number: string;
  contact_email: string;
  updated_at?: string;
}

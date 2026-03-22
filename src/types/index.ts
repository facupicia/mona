export type Season = 'moscu' | 'california';
export type EventType = 'xv' | 'boda' | 'corporativo' | 'otro';
export type LeadStatus = 'nuevo' | 'contactado' | 'cerrado';

export interface EventLead {
  id?: string;
  name: string;
  phone: string;
  event_date: string;
  event_type: EventType;
  message?: string;
  season: Season;
  status?: LeadStatus;
  created_at?: string;
}

export interface Photo {
  id?: string;
  url: string;
  event_date: string;
  photographer?: string;
  season: Season;
  featured?: boolean;
  created_at?: string;
}

export interface SiteConfig {
  id?: number;
  current_season: Season;
  eventos_active: boolean;
  updated_at?: string;
}

export interface SeasonTheme {
  name: string;
  season: Season;
  bg: string;
  bgGradient: string;
  primary: string;
  primaryHover: string;
  accent: string;
  accentHover: string;
  text: string;
  textMuted: string;
  card: string;
  border: string;
  navBg: string;
  heroGradient: string;
}

export const seasonThemes: Record<Season, SeasonTheme> = {
  moscu: {
    name: 'MOSCÚ',
    season: 'moscu',
    bg: 'bg-slate-950',
    bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
    primary: 'bg-blue-600',
    primaryHover: 'bg-blue-500',
    accent: 'bg-violet-500',
    accentHover: 'bg-violet-400',
    text: 'text-white',
    textMuted: 'text-slate-400',
    card: 'bg-slate-900/80',
    border: 'border-slate-800',
    navBg: 'bg-slate-950/90',
    heroGradient: 'from-slate-950/80 via-slate-950/40 to-transparent',
  },
  california: {
    name: 'CALIFORNIA',
    season: 'california',
    bg: 'bg-slate-900',
    bgGradient: 'from-slate-900 via-amber-950 to-orange-950',
    primary: 'bg-orange-500',
    primaryHover: 'bg-orange-400',
    accent: 'bg-yellow-400',
    accentHover: 'bg-yellow-300',
    text: 'text-white',
    textMuted: 'text-amber-200',
    card: 'bg-slate-800/80',
    border: 'border-amber-700',
    navBg: 'bg-slate-900/90',
    heroGradient: 'from-slate-950/20 via-transparent to-transparent',
  },
};

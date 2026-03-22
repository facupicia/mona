import { createClient } from '@supabase/supabase-js';
import type { EventLead, Photo, SiteConfig } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Event Leads API
export async function createEventLead(lead: Omit<EventLead, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('event_leads')
    .insert([lead])
    .select()
    .single();
  
  if (error) throw error;
  return data as EventLead;
}

export async function getEventLeads() {
  const { data, error } = await supabase
    .from('event_leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as EventLead[];
}

// Photos API
export async function getPhotos(season?: string) {
  let query = supabase.from('photos').select('*').order('event_date', { ascending: false });
  
  if (season) {
    query = query.eq('season', season);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as Photo[];
}

export async function getFeaturedPhotos(limit = 6) {
  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .eq('featured', true)
    .limit(limit);
  
  if (error) throw error;
  return data as Photo[];
}

// Site Config API
export async function getSiteConfig() {
  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .single();
  
  if (error) throw error;
  return data as SiteConfig;
}

export async function updateSiteConfig(config: Partial<SiteConfig>) {
  const { data, error } = await supabase
    .from('site_config')
    .update(config)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data as SiteConfig;
}

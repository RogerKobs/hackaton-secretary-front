import { supabase } from '@/lib/supabase/client';

export async function useListTickets() {
  const { data, error } = await supabase.from('tickets').select('*');

  if (error) {
    throw error;
  }

  return data;
}

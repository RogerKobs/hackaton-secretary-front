import { supabase } from '@/lib/supabase/client';

export async function useListTechnicians() {
  const { data, error } = await supabase.from('technicians').select('*');
  if (error) {
    throw error;
  }

  return data;
}

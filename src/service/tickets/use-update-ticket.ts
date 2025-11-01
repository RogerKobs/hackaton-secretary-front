import { supabase } from '@/lib/supabase/client';

interface UseUpdateTicketProps {
  id: string;
  updatedData: {
    scheduling_at: string;
    id_technicians: string;
    status: string;
  };
}

export async function useUpdateTicket({
  id,
  updatedData,
}: UseUpdateTicketProps) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ ...updatedData })
    .eq('id', id);

  if (error) {
    throw error;
  }

  return data;
}

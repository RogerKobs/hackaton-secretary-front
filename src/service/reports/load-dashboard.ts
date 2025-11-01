import { supabase } from '@/lib/supabase/client';

interface TicketData {
  created_at: string;
  status: string;
}

interface GroupedByDate {
  created_at: string;
  pending: number;
  scheduled: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}

function normalizeDate(dateString: string): string {
  return dateString.split('T')[0].split(' ')[0];
}

export async function loadDashboard() {
  const { data: ticketsData, error } = await supabase
    .from('tickets')
    .select('created_at, status');

  if (error) {
    console.error('Erro ao buscar tickets:', error);
    throw error;
  }

  console.log(ticketsData);

  const data: TicketData[] = [
    // 2025-01-01
    { status: 'pending', created_at: '2025-01-01' },
    { status: 'pending', created_at: '2025-01-01' },
    { status: 'pending', created_at: '2025-01-01' },
    { status: 'in_progress', created_at: '2025-01-01' },
    { status: 'in_progress', created_at: '2025-01-01' },
    { status: 'completed', created_at: '2025-01-01' },
    { status: 'completed', created_at: '2025-01-01' },
    { status: 'completed', created_at: '2025-01-01' },
    { status: 'completed', created_at: '2025-01-01' },
    // 2025-01-02
    { status: 'pending', created_at: '2025-01-02' },
    { status: 'pending', created_at: '2025-01-02' },
    { status: 'pending', created_at: '2025-01-02' },
    { status: 'pending', created_at: '2025-01-02' },
    { status: 'in_progress', created_at: '2025-01-02' },
    { status: 'in_progress', created_at: '2025-01-02' },
    { status: 'in_progress', created_at: '2025-01-02' },
    { status: 'completed', created_at: '2025-01-02' },
    { status: 'completed', created_at: '2025-01-02' },
    { status: 'completed', created_at: '2025-01-02' },
    { status: 'completed', created_at: '2025-01-02' },
    { status: 'completed', created_at: '2025-01-02' },
    { status: 'cancelled', created_at: '2025-01-02' },
    // 2025-01-03
    { status: 'pending', created_at: '2025-01-03' },
    { status: 'pending', created_at: '2025-01-03' },
    { status: 'in_progress', created_at: '2025-01-03' },
    { status: 'in_progress', created_at: '2025-01-03' },
    { status: 'in_progress', created_at: '2025-01-03' },
    { status: 'in_progress', created_at: '2025-01-03' },
    { status: 'completed', created_at: '2025-01-03' },
    { status: 'cancelled', created_at: '2025-01-03' },
    { status: 'cancelled', created_at: '2025-01-03' },
    // 2025-01-04
    { status: 'pending', created_at: '2025-01-04' },
    { status: 'pending', created_at: '2025-01-04' },
    { status: 'pending', created_at: '2025-01-04' },
    { status: 'pending', created_at: '2025-01-04' },
    { status: 'pending', created_at: '2025-01-04' },
    { status: 'in_progress', created_at: '2025-01-04' },
    { status: 'in_progress', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    { status: 'completed', created_at: '2025-01-04' },
    // 2025-01-05
    { status: 'pending', created_at: '2025-01-05' },
    { status: 'pending', created_at: '2025-01-05' },
    { status: 'pending', created_at: '2025-01-05' },
    { status: 'in_progress', created_at: '2025-01-05' },
    { status: 'in_progress', created_at: '2025-01-05' },
    { status: 'in_progress', created_at: '2025-01-05' },
    { status: 'in_progress', created_at: '2025-01-05' },
    { status: 'in_progress', created_at: '2025-01-05' },
    { status: 'completed', created_at: '2025-01-05' },
    { status: 'completed', created_at: '2025-01-05' },
    { status: 'completed', created_at: '2025-01-05' },
    { status: 'cancelled', created_at: '2025-01-05' },
    // 2025-01-06
    { status: 'pending', created_at: '2025-01-06' },
    { status: 'pending', created_at: '2025-01-06' },
    { status: 'pending', created_at: '2025-01-06' },
    { status: 'pending', created_at: '2025-01-06' },
    { status: 'in_progress', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'completed', created_at: '2025-01-06' },
    { status: 'cancelled', created_at: '2025-01-06' },
    { status: 'cancelled', created_at: '2025-01-06' },
    // 2025-01-07
    { status: 'pending', created_at: '2025-01-07' },
    { status: 'pending', created_at: '2025-01-07' },
    { status: 'in_progress', created_at: '2025-01-07' },
    { status: 'in_progress', created_at: '2025-01-07' },
    { status: 'in_progress', created_at: '2025-01-07' },
    { status: 'completed', created_at: '2025-01-07' },
    { status: 'completed', created_at: '2025-01-07' },
    { status: 'completed', created_at: '2025-01-07' },
    { status: 'completed', created_at: '2025-01-07' },
    { status: 'completed', created_at: '2025-01-07' },
    // 2025-01-08
    { status: 'pending', created_at: '2025-01-08' },
    { status: 'pending', created_at: '2025-01-08' },
    { status: 'pending', created_at: '2025-01-08' },
    { status: 'pending', created_at: '2025-01-08' },
    { status: 'in_progress', created_at: '2025-01-08' },
    { status: 'in_progress', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'completed', created_at: '2025-01-08' },
    { status: 'cancelled', created_at: '2025-01-08' },
  ];

  if (!data || data.length === 0) {
    console.warn('Nenhum dado para processar, retornando array vazio');
    return [];
  }

  const grouped: Record<string, GroupedByDate> = {};

  data.forEach((ticket, index) => {
    if (!ticket || !ticket.created_at || !ticket.status) {
      console.warn(`Ticket ${index} inválido ignorado:`, ticket);
      return;
    }

    const date = normalizeDate(ticket.created_at);

    if (!date || date === 'Invalid Date' || date.includes('Invalid')) {
      console.warn(`Data inválida ignorada no ticket ${index}:`, {
        original: ticket.created_at,
        normalized: date,
        ticket,
      });
      return;
    }

    if (!grouped[date]) {
      grouped[date] = {
        created_at: date,
        pending: 0,
        scheduled: 0,
        in_progress: 0,
        completed: 0,
        cancelled: 0,
      };
    }

    switch (ticket.status) {
      case 'pending':
        grouped[date].pending++;
        break;
      case 'scheduled':
        grouped[date].scheduled++;
        break;
      case 'in_progress':
        grouped[date].in_progress++;
        break;
      case 'completed':
        grouped[date].completed++;
        break;
      case 'cancelled':
        grouped[date].cancelled++;
        break;
      default:
        console.warn('Status desconhecido:', ticket.status);
    }
  });

  const groupedArray = Object.values(grouped)
    .filter(
      (item) =>
        item.pending > 0 ||
        item.in_progress > 0 ||
        item.completed > 0 ||
        item.cancelled > 0,
    )
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  return groupedArray;
}

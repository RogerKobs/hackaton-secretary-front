import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { ITicket } from '@/@types/ITicket';

import { useQuery } from '@tanstack/react-query';
import { useListTechnicians } from '@/service/technician/use-list-technicians';
import { formatDate } from '@/utils/format-string';

const CATEGORY_LABELS: Record<string, string> = {
  technical: 'Assistência Técnica',
  financial: 'Consultoria Financeira',
  legal: 'Assessoria Jurídica',
  training: 'Capacitação',
  other: 'Outros',
};

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendente',
  scheduled: 'Agendado',
  in_progress: 'Em Andamento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const STATUS_VARIANTS: Record<
  string,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  pending: 'secondary',
  scheduled: 'default',
  in_progress: 'default',
  completed: 'outline',
  cancelled: 'destructive',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-[#eb7b24] text-white border-transparent',
  scheduled: 'bg-[#3b82f6] text-white border-transparent',
  in_progress: 'bg-[#6366f1] text-white border-transparent',
  completed: 'bg-[#008f35] text-white border-transparent',
  cancelled: 'bg-[#000000] text-white border-transparent',
};

type CardTicketProps = Omit<ITicket, 'id'> & {
  onClick: VoidFunction;
};

export function CardTicket({
  title,
  category,
  created_at,
  status,
  description,
  scheduling_at,
  id_technicians,
  onClick,
}: CardTicketProps) {
  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: useListTechnicians,
  });

  const technician = technicians?.find(
    (technician) => technician.id === id_technicians,
  );
  const technicianLabel = technician?.name || 'Não atribuído';

  return (
    <Card
      className='flex flex-col cursor-pointer transition-shadow hover:shadow-md'
      onClick={onClick}
    >
      <CardHeader className='pb-3'>
        <div className='flex items-start justify-between gap-2 mb-2'>
          <Badge
            variant={STATUS_VARIANTS[status] || 'default'}
            className={cn('text-xs', STATUS_COLORS[status] || '')}
          >
            {STATUS_LABELS[status] || status}
          </Badge>

          <span className='text-xs text-muted-foreground'>
            {new Date(created_at).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
            })}
          </span>
        </div>

        <CardTitle className='text-base leading-tight flex items-center gap-2'>
          {title}
          <Badge variant='outline' className='text-xs'>
            {CATEGORY_LABELS[category] || category}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex-1 space-y-3 pt-0'>
        <p className='text-sm text-muted-foreground line-clamp-2'>
          {description}
        </p>

        <div className='space-y-1.5 text-xs'>
          {scheduling_at && (
            <div className='flex items-center gap-1.5 text-muted-foreground'>
              <Calendar className='h-3.5 w-3.5' />
              <span>{formatDate(scheduling_at)}</span>
            </div>
          )}

          {id_technicians && (
            <div className='flex items-center gap-1.5 text-muted-foreground'>
              <UserCircle className='h-3.5 w-3.5' />
              <span>{technicianLabel}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

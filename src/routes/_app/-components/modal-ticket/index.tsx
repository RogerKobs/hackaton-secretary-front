import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ITicket } from '@/@types/ITicket';
import { STATUS_VARIANTS, STATUS_LABELS, STATUS_COLORS } from './options';
import { cn } from '@/lib/utils';
import { DatePicker } from '@/components/shared/DatePicker';
import { Autocomplete } from '@/components/shared/Autocomplete';
import { formatDate } from '@/utils/format-string';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useUpdateTicket } from '@/service/tickets/use-update-ticket';
import { useListTechnicians } from '@/service/technician/use-list-technicians';
import { useListTickets } from '@/service/tickets/use-list-tickets';

interface ModalTicketProps {
  isOpen: boolean;
  selectedTicket: ITicket | null;
  closeModal: VoidFunction;
}

export function ModalTicket({
  isOpen,
  selectedTicket,
  closeModal,
}: ModalTicketProps) {
  const form = useForm<{
    scheduling_at: string;
    id_technicians: string;
  }>({
    defaultValues: {
      scheduling_at: '',
      id_technicians: '',
    },
  });
  const { setValue, handleSubmit } = form;

  const { data: technicians } = useQuery({
    queryKey: ['technicians'],
    queryFn: useListTechnicians,
  });

  const { refetch: refetchTickets } = useQuery({
    queryKey: ['tickets'],
    queryFn: useListTickets,
  });

  const TECHNICIAN_OPTIONS = technicians?.map((technician) => ({
    value: technician.id,
    label: technician.name,
  }));

  useEffect(() => {
    if (selectedTicket) {
      setValue('scheduling_at', selectedTicket.scheduling_at);
      setValue('id_technicians', selectedTicket.id_technicians);
    }
  }, [selectedTicket, setValue]);

  const { mutateAsync: updateTicket } = useMutation({
    mutationKey: ['updateTicket'],
    mutationFn: useUpdateTicket,
    onSuccess: () => {
      closeModal();
      refetchTickets();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async ({
    scheduling_at,
    id_technicians,
  }: {
    scheduling_at: string;
    id_technicians: string;
  }) => {
    await updateTicket({
      id: selectedTicket?.id ?? '',
      updatedData: {
        scheduling_at,
        id_technicians,
        status: 'scheduled',
      },
    });
    closeModal();
  };

  const canEdit =
    selectedTicket?.status === 'pending' ||
    selectedTicket?.status === 'scheduled';

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Detalhes do Chamado</DialogTitle>
          <DialogDescription>
            Visualize e edite as informações do chamado.
          </DialogDescription>
        </DialogHeader>

        {selectedTicket && (
          <div className='space-y-4 rounded-lg border bg-muted/30 p-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <label className='text-xs font-medium text-muted-foreground'>
                  ID do Chamado
                </label>

                <p className='text-sm font-medium'>#{selectedTicket.id}</p>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-medium text-muted-foreground'>
                  Status
                </label>
                <div>
                  <Badge
                    variant={
                      STATUS_VARIANTS[selectedTicket.status] || 'default'
                    }
                    className={cn(
                      'text-xs',
                      STATUS_COLORS[selectedTicket.status] || '',
                    )}
                  >
                    {STATUS_LABELS[selectedTicket.status] ||
                      selectedTicket.status}
                  </Badge>
                </div>
              </div>

              <div className='space-y-1'>
                <label className='text-xs font-medium text-muted-foreground'>
                  Data de Criação
                </label>

                <div className='flex items-center gap-1.5 text-sm'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>{formatDate(selectedTicket.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTicket?.technician_notes && (
          <div className='space-y-2 rounded-lg border bg-muted/30 p-4'>
            <div className='flex items-center gap-2'>
              <MessageSquare className='h-4 w-4 text-muted-foreground' />
              <label className='text-sm font-medium text-muted-foreground'>
                Comentários do Técnico
              </label>
            </div>
            <p className='text-sm text-foreground whitespace-pre-wrap'>
              {selectedTicket.technician_notes}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormProvider {...form}>
            <div className='space-y-2'>
              <DatePicker
                name='scheduling_at'
                label='Data de Agendamento'
                required
                disabled={!canEdit}
              />
              <Autocomplete
                name='id_technicians'
                label='Técnico Responsável'
                options={TECHNICIAN_OPTIONS || []}
                required
                disabled={!canEdit}
              />
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={closeModal}>
                Fechar
              </Button>

              {canEdit && <Button type='submit'>Salvar Alterações</Button>}
            </DialogFooter>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  );
}

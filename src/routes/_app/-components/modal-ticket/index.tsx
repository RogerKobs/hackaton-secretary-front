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
import { Calendar } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ITicket } from '@/@types/ITicket';
import { STATUS_VARIANTS, STATUS_LABELS } from './options';
import { DatePicker } from '@/components/shared/DatePicker';
import { Autocomplete } from '@/components/shared/Autocomplete';
import { formatDate } from '@/utils/format-string';

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
  const form = useForm<ITicket>({
    defaultValues: {
      scheduled_time: '',
      technician_name: '',
    },
  });
  const { setValue, handleSubmit } = form;

  const TECHNICIAN_OPTIONS = [
    { value: 'João da Silva', label: 'João da Silva' },
    { value: 'Maria Oliveira', label: 'Maria Oliveira' },
    { value: 'Pedro Santos', label: 'Pedro Santos' },
    { value: 'Ana Julia', label: 'Ana Julia' },
    { value: 'Carlos Eduardo', label: 'Carlos Eduardo' },
    { value: 'Larissa Ferreira', label: 'Larissa Ferreira' },
  ];

  useEffect(() => {
    if (selectedTicket) {
      setValue('scheduled_time', selectedTicket.scheduled_time);
      setValue('technician_name', selectedTicket.technician_name);
    }
  }, [selectedTicket, setValue]);

  const onSubmit = (data: ITicket) => {
    console.log(data);
    closeModal();
  };

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
                    className='text-xs'
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

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormProvider {...form}>
            <div className='space-y-2'>
              <DatePicker name='scheduled_time' />
              <Autocomplete
                name='technician_name'
                label='Técnico Responsável'
                options={TECHNICIAN_OPTIONS}
              />
            </div>

            <DialogFooter>
              <Button type='button' variant='outline' onClick={closeModal}>
                Fechar
              </Button>

              <Button type='submit'>Salvar Alterações</Button>
            </DialogFooter>
          </FormProvider>
        </form>
      </DialogContent>
    </Dialog>
  );
}

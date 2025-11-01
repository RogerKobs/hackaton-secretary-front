import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Card, CardContent } from '@/components/ui/card';
import { CardTicket } from './-components/card-ticket';
import { ModalTicket } from './-components/modal-ticket';

import type { ITicket } from '@/@types/ITicket';

export const Route = createFileRoute('/_app/')({
  component: Painel,
});

function Painel() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);

  const tickets = [
    {
      id: 1,
      category: 'technical',
      created_at: '2021-01-01',
      status: 'pending',
      description: 'Descrição do chamado',
      scheduled_time: '2021-01-01',
      technician_name: 'João da Silva',
    },
    {
      id: 2,
      category: 'technical',
      created_at: '2021-01-01',
      status: 'pending',
      description: 'Descrição do chamado',
      scheduled_time: '2021-01-01',
      technician_name: 'João da Silva',
    },
  ];

  return (
    <>
      <div className='p-6'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-4'>Painel</h1>
          <p className='text-muted-foreground'>
            Bem-vindo ao Sistema Rural. Use o menu lateral para navegar.
          </p>
        </div>

        {tickets.length === 0 ? (
          <Card>
            <CardContent className='py-12 text-center'>
              <p className='text-muted-foreground'>
                Você não possui chamados ativos no momento
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {tickets.map((ticket) => (
              <CardTicket
                key={ticket.id}
                onClick={() => {
                  setIsOpen(true);
                  setSelectedTicket(ticket);
                }}
                {...ticket}
              />
            ))}
          </div>
        )}
      </div>

      <ModalTicket
        isOpen={isOpen}
        selectedTicket={selectedTicket}
        closeModal={() => {
          setIsOpen(false);
          setSelectedTicket(null);
        }}
      />
    </>
  );
}

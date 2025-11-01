import { createFileRoute } from '@tanstack/react-router';
import { ReportArea } from '@/components/dashboard/report-area';
import { loadDashboard } from '@/service/reports/load-dashboard';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';

export const Route = createFileRoute('/_app/reports')({
  component: Reports,
});

function Reports() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: loadDashboard,
  });

  const totals = data?.reduce(
    (acc, item) => ({
      pending: acc.pending + item.pending,
      scheduled: acc.scheduled + item.scheduled,
      in_progress: acc.in_progress + item.in_progress,
      completed: acc.completed + item.completed,
      cancelled: acc.cancelled + item.cancelled,
    }),
    {
      pending: 0,
      scheduled: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    },
  ) || {
    pending: 0,
    scheduled: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  };

  const totalTickets =
    totals.pending +
    totals.scheduled +
    totals.in_progress +
    totals.completed +
    totals.cancelled;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-96'>
        <p className='text-muted-foreground'>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Relatórios</h1>
        <p className='text-muted-foreground'>
          Visualize a evolução dos chamados ao longo do tempo
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total</CardTitle>
            <TrendingUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{totalTickets}</div>
            <p className='text-xs text-muted-foreground'>Total de chamados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Pendentes</CardTitle>
            <Clock className='h-4 w-4 text-[#eb7b24]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-[#eb7b24]'>
              {totals.pending}
            </div>
            <p className='text-xs text-muted-foreground'>Aguardando ação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Agendados</CardTitle>
            <Clock className='h-4 w-4 text-[#3b82f6]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-[#3b82f6]'>
              {totals.scheduled}
            </div>
            <p className='text-xs text-muted-foreground'>Agendados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Em Andamento</CardTitle>
            <Clock className='h-4 w-4 text-[#6366f1]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-[#6366f1]'>
              {totals.in_progress}
            </div>
            <p className='text-xs text-muted-foreground'>Sendo trabalhados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Concluídos</CardTitle>
            <CheckCircle className='h-4 w-4 text-[#008f35]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-[#008f35]'>
              {totals.completed}
            </div>
            <p className='text-xs text-muted-foreground'>Finalizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Cancelados</CardTitle>
            <XCircle className='h-4 w-4 text-[#000000]' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-[#000000]'>
              {totals.cancelled}
            </div>
            <p className='text-xs text-muted-foreground'>Cancelados</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de Chamados por Data</CardTitle>
          <CardDescription>
            Este gráfico mostra a distribuição de chamados por status ao longo
            do tempo. Cada área colorida representa um status diferente, e a
            altura total indica o número total de chamados naquela data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && data.length > 0 ? (
            <ReportArea data={data} />
          ) : (
            <div className='flex items-center justify-center h-96 text-muted-foreground'>
              <p>Nenhum dado disponível</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

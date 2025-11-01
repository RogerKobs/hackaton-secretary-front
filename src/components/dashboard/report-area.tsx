import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DashboardData {
  created_at: string;
  pending: number;
  scheduled: number;
  in_progress: number;
  completed: number;
  cancelled: number;
}

interface ReportAreaProps {
  data: DashboardData[];
}

// Função para formatar a data no eixo X
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
};

// Custom Tooltip
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: DashboardData;
  }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border-2 border-[#e5e7eb] rounded-lg shadow-lg p-4'>
        <p className='font-semibold mb-2 text-sm'>
          {payload[0]?.payload?.created_at
            ? formatDate(payload[0].payload.created_at)
            : ''}
        </p>
        <div className='space-y-1'>
          {payload.map((entry, index) => (
            <div key={index} className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: entry.color }}
              />
              <span className='text-sm text-gray-700'>
                {entry.name}:{' '}
                <span className='font-semibold'>{entry.value}</span>
              </span>
            </div>
          ))}
          <div className='pt-2 mt-2 border-t border-gray-200'>
            <span className='text-sm font-semibold text-gray-900'>
              Total:{' '}
              {payload.reduce((sum, entry) => sum + (entry.value || 0), 0)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function ReportArea({ data }: ReportAreaProps) {
  if (!data || data.length === 0) {
    return (
      <div className='flex items-center justify-center h-96 text-muted-foreground'>
        <p>Nenhum dado disponível para exibir</p>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <ResponsiveContainer width='100%' height={450}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#e5e7eb'
            vertical={false}
          />
          <XAxis
            dataKey='created_at'
            stroke='#6b7280'
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={formatDate}
            angle={-45}
            textAnchor='end'
            height={80}
          />
          <YAxis
            width={60}
            stroke='#6b7280'
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{
              value: 'Quantidade',
              angle: -90,
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: '#6b7280' },
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '30px' }}
            iconType='circle'
            iconSize={12}
            formatter={(value) => (
              <span style={{ color: '#374151', fontSize: '13px' }}>
                {value}
              </span>
            )}
          />
          <Area
            type='monotone'
            dataKey='pending'
            name='Pendente'
            stackId='1'
            stroke='#eb7b24'
            fill='#eb7b24'
            strokeWidth={2}
            fillOpacity={0.6}
          />
          <Area
            type='monotone'
            dataKey='scheduled'
            name='Agendado'
            stackId='1'
            stroke='#3b82f6'
            fill='#3b82f6'
            strokeWidth={2}
            fillOpacity={0.6}
          />
          <Area
            type='monotone'
            dataKey='in_progress'
            name='Em Andamento'
            stackId='1'
            stroke='#6366f1'
            fill='#6366f1'
            strokeWidth={2}
            fillOpacity={0.6}
          />
          <Area
            type='monotone'
            dataKey='completed'
            name='Concluído'
            stackId='1'
            stroke='#008f35'
            fill='#008f35'
            strokeWidth={2}
            fillOpacity={0.6}
          />
          <Area
            type='monotone'
            dataKey='cancelled'
            name='Cancelado'
            stackId='1'
            stroke='#000000'
            fill='#000000'
            strokeWidth={2}
            fillOpacity={0.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

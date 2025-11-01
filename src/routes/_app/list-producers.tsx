import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Route = createFileRoute('/_app/list-producers')({
  component: RouteComponent,
});

interface Producer {
  id: string;
  name: string;
  address: string;
  cellphone: string;
  production: string[];
}

async function fetchProducers() {
  const { data, error } = await supabase.from('producers').select('*');

  if (error) {
    throw error;
  }

  return data as Producer[];
}

function RouteComponent() {
  const { data: producers, isLoading } = useQuery({
    queryKey: ['producers'],
    queryFn: fetchProducers,
  });

  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-96'>
          <p className='text-muted-foreground'>Carregando produtores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-4'>Produtores</h1>
        <p className='text-muted-foreground'>
          Visualize todos os produtores cadastrados no sistema
        </p>
      </div>

      {producers && producers.length === 0 ? (
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>Nenhum produtor encontrado</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Produtores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b-2 border-[#e5e7eb] text-muted-foreground uppercase text-sm'>
                    <th className='py-3 px-4 font-medium'>Nome</th>
                    <th className='py-3 px-4 font-medium'>Telefone</th>
                    <th className='py-3 px-4 font-medium'>Endereço</th>
                    <th className='py-3 px-4 font-medium'>Produção</th>
                  </tr>
                </thead>
                <tbody>
                  {producers?.map((producer) => (
                    <tr
                      key={producer.id}
                      className='border-b border-[#e5e7eb] hover:bg-muted/50 transition-colors'
                    >
                      <td className='py-3 px-4 font-medium text-foreground'>
                        {producer.name}
                      </td>
                      <td className='py-3 px-4 text-foreground'>
                        {producer.cellphone}
                      </td>
                      <td className='py-3 px-4 text-foreground'>
                        {producer.address}
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex flex-wrap gap-2'>
                          {JSON.parse(
                            producer.production as unknown as string,
                          ).map((item: string, index: number) => (
                            <Badge
                              key={index}
                              variant='outline'
                              className='bg-[#008f35]/10 border-[#008f35]/30 text-[#008f35] hover:bg-[#008f35]/20'
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

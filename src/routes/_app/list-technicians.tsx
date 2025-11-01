import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/_app/list-technicians')({
  component: RouteComponent,
});

interface ITechnician {
  id: string;
  name: string;
  specialty: string;
}

async function fetchTechnicians() {
  const { data, error } = await supabase
    .from('technicians')
    .select('id, name, specialty');

  if (error) {
    throw error;
  }

  return data as ITechnician[];
}

function RouteComponent() {
  const { data: technicians, isLoading } = useQuery({
    queryKey: ['technicians-list'],
    queryFn: fetchTechnicians,
  });

  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-96'>
          <p className='text-muted-foreground'>Carregando técnicos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-4'>Técnicos</h1>
        <p className='text-muted-foreground'>
          Visualize todos os técnicos cadastrados no sistema
        </p>
      </div>

      {technicians && technicians.length === 0 ? (
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>
              Nenhum técnico encontrado
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Técnicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b-2 border-[#e5e7eb] text-muted-foreground uppercase text-sm'>
                    <th className='py-3 px-4 font-medium'>Nome</th>
                    <th className='py-3 px-4 font-medium'>Especialidade</th>
                  </tr>
                </thead>
                <tbody>
                  {technicians?.map((tech) => (
                    <tr
                      key={tech.id}
                      className='border-b border-[#e5e7eb] hover:bg-muted/50 transition-colors'
                    >
                      <td className='py-3 px-4 font-medium text-foreground'>
                        {tech.name}
                      </td>
                      <td className='py-3 px-4 text-foreground'>
                        {tech.specialty}
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

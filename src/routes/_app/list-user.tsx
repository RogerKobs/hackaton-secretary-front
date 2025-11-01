import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/_app/list-user')({
  component: RouteComponent,
});

interface User {
  id: string;
  name: string;
}

async function fetchUsers() {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    throw error;
  }

  return data as User[];
}

function RouteComponent() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-center h-96'>
          <p className='text-muted-foreground'>Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-4'>Usuários</h1>
        <p className='text-muted-foreground'>
          Visualize todos os usuários do sistema
        </p>
      </div>

      {users && users.length === 0 ? (
        <Card>
          <CardContent className='py-12 text-center'>
            <p className='text-muted-foreground'>
              Nenhum usuário encontrado
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b-2 border-[#e5e7eb] text-muted-foreground uppercase text-sm'>
                    <th className='py-3 px-4 font-medium'>Nome</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user) => (
                    <tr
                      key={user.id}
                      className='border-b border-[#e5e7eb] hover:bg-muted/50 transition-colors'
                    >
                      <td className='py-3 px-4 font-medium text-foreground'>
                        {user.name}
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

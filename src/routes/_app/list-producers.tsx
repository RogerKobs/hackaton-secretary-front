import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_app/list-producers')({
  component: RouteComponent,
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface User {
  id: string
  name: string
  address: string
  cellphone: string
  production: string[]
}

function RouteComponent() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('producers').select('*')

      if (error) {
        console.error('Erro ao buscar usuários:', error)
      } else {
        setUsers(data || [])
      }

      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div className="text-center mt-20 text-gray-400">Carregando produtores...</div>
  }

  if (users.length === 0) {
    return <div className="text-center mt-20 text-gray-400">Nenhum produtor encontrado</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-gray-100">
      <div className="max-w-6xl mx-auto mt-12 bg-zinc-800 shadow-lg rounded-2xl p-8 w-full">
        <h1 className="text-3xl font-bold text-green-500 mb-8 text-center">
          Produtores
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-gray-400 uppercase text-sm">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Telefone</th>
                <th className="py-3 px-4">Endereço</th>
                <th className="py-3 px-4">Produção</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-zinc-700 hover:bg-zinc-700/30 transition"
                >
                  <td className="py-3 px-4 font-semibold text-gray-200">{user.name}</td>
                  <td className="py-3 px-4">{user.cellphone}</td>
                  <td className="py-3 px-4">{user.address}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(user?.production)
                        ? user?.production.map((item, index) => (
                            <span
                              key={index}
                              className="bg-green-600/20 border border-green-500/40 text-green-400 px-3 py-1 rounded-full text-xs"
                            >
                              {item}
                            </span>
                          ))
                        : <span className="text-gray-400 text-sm italic">Sem dados</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RouteComponent

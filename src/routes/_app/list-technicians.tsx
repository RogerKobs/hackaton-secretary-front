import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_app/list-technicians')({
  component: RouteComponent,
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface ITechnician {
  id: string
  name: string
  specialty: string
}

function RouteComponent() {
  const [technicians, setTechnicians] = useState<ITechnician[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTechnicians() {
      try {
        const { data, error } = await supabase
          .from('technicians') // 👈 ou 'users' se for a mesma tabela
          .select('id, name, specialty')

        if (error) throw error
        setTechnicians(data || [])
      } catch (err) {
        console.error('Erro ao buscar técnicos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTechnicians()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        Carregando técnicos...
      </div>
    )
  }

  if (technicians.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Nenhum técnico encontrado
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-gray-100">
      <div className="max-w-4xl mx-auto mt-12 bg-zinc-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
          Técnicos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-700 text-gray-400 uppercase text-sm">
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">Especialidade</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => (
                <tr
                  key={tech.id}
                  className="border-b border-zinc-700 hover:bg-zinc-700/30 transition"
                >
                  <td className="py-3 px-4 font-semibold text-gray-200">{tech.name}</td>
                  <td className="py-3 px-4 text-gray-300">{tech.specialty}</td>
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

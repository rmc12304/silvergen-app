export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import EmpresaCard from '@/components/EmpresaCard'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Empresa } from '@/lib/types'

interface PageProps {
  searchParams: Promise<{ busca?: string }>
}

async function EmpresasList({ busca }: { busca?: string }) {
  const supabase = await createServerSupabaseClient()

  let query = supabase
    .from('empresas')
    .select('*')
    .eq('status', 'aprovado')
    .order('criado_em', { ascending: false })

  if (busca) {
    query = query.or(`nome.ilike.%${busca}%,cidade.ilike.%${busca}%`)
  }

  const { data: empresas, error } = await query

  if (error) {
    console.error('Erro ao buscar empresas:', error)
    return (
      <p className="text-center text-gray-500 py-12">
        Erro ao carregar empresas. Tente novamente mais tarde.
      </p>
    )
  }

  if (!empresas || empresas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-xl mb-4">
          {busca
            ? `Nenhuma empresa encontrada para "${busca}"`
            : 'Nenhuma empresa cadastrada ainda'}
        </p>
        {busca && (
          <a href="/" className="text-blue-600 hover:text-blue-800">
            Ver todas as empresas
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {(empresas as Empresa[]).map((empresa) => (
        <EmpresaCard key={empresa.id} empresa={empresa} />
      ))}
    </div>
  )
}

export default async function HomePage({ searchParams }: PageProps) {
  const { busca } = await searchParams

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SilverGen
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre empresas que valorizam a experiência e contratam
            profissionais com mais de 40 anos.
          </p>
        </section>

        <Suspense fallback={<div className="text-center py-4">Carregando...</div>}>
          <SearchBar />
        </Suspense>

        <section aria-label="Lista de empresas">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {busca ? `Resultados para "${busca}"` : 'Empresas Cadastradas'}
          </h2>

          <Suspense fallback={<div className="text-center py-12">Carregando empresas...</div>}>
            <EmpresasList busca={busca} />
          </Suspense>
        </section>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>SilverGen - Valorizando a experiência profissional</p>
        </div>
      </footer>
    </div>
  )
}

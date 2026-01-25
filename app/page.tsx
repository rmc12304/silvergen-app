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
      <div className="empty-state">
        <p className="empty-state-text">
          Erro ao carregar empresas. Tente novamente mais tarde.
        </p>
      </div>
    )
  }

  if (!empresas || empresas.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-text">
          {busca
            ? `Nenhuma empresa encontrada para "${busca}"`
            : 'Nenhuma empresa cadastrada ainda'}
        </p>
        {busca && (
          <a href="/" className="btn btn-secondary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
            Ver todas as empresas
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="cards-grid">
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

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-headline">Sua experiência vale muito.</h1>
          <p className="hero-subtitle">
            Encontre empresas que valorizam profissionais com mais de 40 anos
            e descubra novas oportunidades.
          </p>

          <Suspense fallback={<div className="text-secondary">Carregando...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      {/* Companies Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            {busca ? `Resultados para "${busca}"` : 'Empresas que Contratam 40+'}
          </h2>

          <Suspense fallback={<div className="empty-state"><p className="empty-state-text">Carregando empresas...</p></div>}>
            <EmpresasList busca={busca} />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer mt-auto">
        <div className="container">
          <p className="footer-text">Silvergen - Valorizando a experiência profissional</p>
        </div>
      </footer>
    </div>
  )
}

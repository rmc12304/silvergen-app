export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import AdminEmpresasList from './AdminEmpresasList'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: perfil } = await supabase
    .from('perfis')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!perfil?.is_admin) {
    redirect('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="section">
        <div className="container">
          <h2 className="section-title mb-1">Painel de Administração</h2>
          <p className="text-secondary mb-4">
            Gerencie os cadastros de empresas pendentes
          </p>

          <AdminEmpresasList />
        </div>
      </section>
    </div>
  )
}

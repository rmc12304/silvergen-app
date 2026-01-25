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

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Painel de Administração
        </h1>
        <p className="text-gray-600 mb-8">
          Gerencie os cadastros de empresas pendentes
        </p>

        <AdminEmpresasList />
      </main>
    </div>
  )
}

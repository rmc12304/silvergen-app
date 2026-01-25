'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { Perfil } from '@/lib/types'

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('perfis')
          .select('*')
          .eq('id', user.id)
          .single()
        setPerfil(data)
      }

      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setPerfil(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 no-underline hover:text-blue-600"
          >
            SilverGen
          </Link>

          <div className="flex items-center gap-4 flex-wrap">
            {loading ? (
              <span className="text-gray-500">Carregando...</span>
            ) : user ? (
              <>
                <Link
                  href="/cadastrar"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg no-underline hover:bg-blue-700 font-medium"
                >
                  Cadastrar Empresa
                </Link>

                {perfil?.is_admin && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg no-underline hover:bg-gray-900 font-medium"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg no-underline hover:bg-blue-700 font-medium"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

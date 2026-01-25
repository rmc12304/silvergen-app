'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SilverGen"
              width={280}
              height={100}
              priority
              unoptimized
              className="header-logo"
            />
          </Link>

          <nav className="header-nav">
            {loading ? (
              <span className="text-secondary text-sm">Carregando...</span>
            ) : user ? (
              <>
                <Link href="/cadastrar" className="btn btn-primary btn-sm">
                  Cadastrar Empresa
                </Link>

                {perfil?.is_admin && (
                  <Link href="/admin" className="btn btn-secondary btn-sm">
                    Admin
                  </Link>
                )}

                <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

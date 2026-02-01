'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos'
          : error.message)
      } else {
        router.push('/')
        router.refresh()
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Conta criada! Verifique seu email para confirmar o cadastro.')
      }
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="header">
        <div className="container">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Silvergen"
              width={280}
              height={100}
              priority
              unoptimized
              className="header-logo"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center" style={{ padding: '3rem 1rem' }}>
        <div className="card" style={{ width: '100%', maxWidth: '420px' }}>
          <h2 className="text-center mb-4">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className="form-input"
              />
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success">
                {message}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="text-center" style={{ marginTop: '1.5rem' }}>
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setMessage('')
              }}
              style={{
                color: 'var(--color-brand-primary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: 'var(--font-size-base)'
              }}
            >
              {isLogin ? 'Não tem conta? Criar uma' : 'Já tem conta? Entrar'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

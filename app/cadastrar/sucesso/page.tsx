export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Header from '@/components/Header'

export default function SucessoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="section" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="card text-center" style={{ maxWidth: '480px', margin: '0 auto' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#D1FAE5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <svg
                style={{ width: '40px', height: '40px', color: '#059669' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="mb-2">Cadastro Enviado!</h2>

            <p className="text-secondary mb-4">
              Sua empresa foi cadastrada com sucesso e está aguardando aprovação.
              Você será notificado quando ela for publicada.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link href="/cadastrar" className="btn btn-primary">
                Cadastrar Outra Empresa
              </Link>

              <Link href="/" className="btn btn-secondary">
                Voltar para Início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

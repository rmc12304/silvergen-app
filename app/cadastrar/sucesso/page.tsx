export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Header from '@/components/Header'

export default function SucessoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
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

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cadastro Enviado!
          </h1>

          <p className="text-gray-600 mb-8">
            Sua empresa foi cadastrada com sucesso e está aguardando aprovação.
            Você será notificado quando ela for publicada.
          </p>

          <div className="space-y-4">
            <Link
              href="/cadastrar"
              className="block w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 no-underline text-center"
            >
              Cadastrar Outra Empresa
            </Link>

            <Link
              href="/"
              className="block w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-lg hover:bg-gray-100 no-underline text-center text-gray-700"
            >
              Voltar para Início
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

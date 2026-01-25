export const dynamic = 'force-dynamic'

import Header from '@/components/Header'
import EmpresaForm from '@/components/EmpresaForm'

export default function CadastrarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cadastrar Empresa
        </h1>
        <p className="text-gray-600 mb-8">
          Cadastre uma empresa que oferece oportunidades para profissionais 40+
        </p>

        <EmpresaForm />
      </main>
    </div>
  )
}

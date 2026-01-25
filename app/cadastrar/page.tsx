export const dynamic = 'force-dynamic'

import Header from '@/components/Header'
import EmpresaForm from '@/components/EmpresaForm'

export default function CadastrarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="section">
        <div className="container">
          <h2 className="section-title mb-1">Cadastrar Empresa</h2>
          <p className="text-secondary mb-4">
            Cadastre uma empresa que oferece oportunidades para profissionais 40+
          </p>

          <EmpresaForm />
        </div>
      </section>
    </div>
  )
}

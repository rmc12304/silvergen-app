import type { Empresa } from '@/lib/types'

interface EmpresaCardProps {
  empresa: Empresa
}

export default function EmpresaCard({ empresa }: EmpresaCardProps) {
  return (
    <article className="card">
      <h3 className="card-title">{empresa.nome}</h3>

      <p className="card-location">{empresa.cidade}, {empresa.estado}</p>

      <p className="card-description">{empresa.descricao}</p>

      {empresa.site && (
        <div className="card-button">
          <a
            href={empresa.site.startsWith('http') ? empresa.site : `https://${empresa.site}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visitar Site
          </a>
        </div>
      )}
    </article>
  )
}

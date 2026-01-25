import type { Empresa } from '@/lib/types'

interface EmpresaCardProps {
  empresa: Empresa
}

export default function EmpresaCard({ empresa }: EmpresaCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {empresa.nome}
      </h2>

      <p className="text-gray-600 mb-4">
        {empresa.cidade}, {empresa.estado}
      </p>

      <p className="text-gray-700 mb-4 line-clamp-3">
        {empresa.descricao}
      </p>

      {empresa.site && (
        <a
          href={empresa.site.startsWith('http') ? empresa.site : `https://${empresa.site}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg no-underline hover:bg-blue-700 font-medium"
        >
          Visitar Site
        </a>
      )}
    </article>
  )
}

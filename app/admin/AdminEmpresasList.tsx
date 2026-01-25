'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Empresa, StatusEmpresa } from '@/lib/types'

export default function AdminEmpresasList() {
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<StatusEmpresa | 'todos'>('pendente')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    loadEmpresas()
  }, [filter])

  async function loadEmpresas() {
    setLoading(true)

    let query = supabase
      .from('empresas')
      .select('*')
      .order('criado_em', { ascending: false })

    if (filter !== 'todos') {
      query = query.eq('status', filter)
    }

    const { data, error } = await query

    if (error) {
      console.error('Erro ao carregar empresas:', error)
    } else {
      setEmpresas(data || [])
    }

    setLoading(false)
  }

  async function updateStatus(empresaId: string, newStatus: StatusEmpresa) {
    setActionLoading(empresaId)

    const { error } = await supabase
      .from('empresas')
      .update({ status: newStatus })
      .eq('id', empresaId)

    if (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar. Tente novamente.')
    } else {
      await loadEmpresas()
    }

    setActionLoading(null)
  }

  function getStatusBadge(status: StatusEmpresa) {
    const styles = {
      pendente: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      aprovado: 'bg-green-100 text-green-800 border-green-200',
      rejeitado: 'bg-red-100 text-red-800 border-red-200',
    }

    const labels = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
    }

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <div>
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('pendente')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'pendente'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Pendentes
        </button>
        <button
          onClick={() => setFilter('aprovado')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'aprovado'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Aprovados
        </button>
        <button
          onClick={() => setFilter('rejeitado')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'rejeitado'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Rejeitados
        </button>
        <button
          onClick={() => setFilter('todos')}
          className={`px-4 py-2 rounded-lg font-medium ${
            filter === 'todos'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 py-8 text-center">Carregando...</p>
      ) : empresas.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">
          Nenhuma empresa encontrada com o filtro selecionado.
        </p>
      ) : (
        <div className="space-y-4">
          {empresas.map((empresa) => (
            <article
              key={empresa.id}
              className="bg-white border border-gray-200 rounded-lg p-6"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {empresa.nome}
                  </h2>
                  <p className="text-gray-600">
                    {empresa.cidade}, {empresa.estado}
                  </p>
                </div>
                {getStatusBadge(empresa.status)}
              </div>

              <p className="text-gray-700 mb-4">{empresa.descricao}</p>

              {empresa.site && (
                <p className="text-sm text-gray-500 mb-4">
                  Site:{' '}
                  <a
                    href={empresa.site.startsWith('http') ? empresa.site : `https://${empresa.site}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {empresa.site}
                  </a>
                </p>
              )}

              <p className="text-sm text-gray-500 mb-4">
                Cadastrado em: {new Date(empresa.criado_em).toLocaleDateString('pt-BR')}
              </p>

              <div className="flex gap-2 flex-wrap">
                {empresa.status !== 'aprovado' && (
                  <button
                    onClick={() => updateStatus(empresa.id, 'aprovado')}
                    disabled={actionLoading === empresa.id}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionLoading === empresa.id ? 'Aguarde...' : 'Aprovar'}
                  </button>
                )}

                {empresa.status !== 'rejeitado' && (
                  <button
                    onClick={() => updateStatus(empresa.id, 'rejeitado')}
                    disabled={actionLoading === empresa.id}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                  >
                    {actionLoading === empresa.id ? 'Aguarde...' : 'Rejeitar'}
                  </button>
                )}

                {empresa.status !== 'pendente' && (
                  <button
                    onClick={() => updateStatus(empresa.id, 'pendente')}
                    disabled={actionLoading === empresa.id}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {actionLoading === empresa.id ? 'Aguarde...' : 'Voltar para Pendente'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

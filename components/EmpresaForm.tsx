'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { EmpresaFormData } from '@/lib/types'

const ESTADOS_BR = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

export default function EmpresaForm() {
  const [formData, setFormData] = useState<EmpresaFormData>({
    nome: '',
    site: '',
    descricao: '',
    cidade: '',
    estado: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const supabase = createClient()

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('Você precisa estar logado para cadastrar uma empresa.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('empresas').insert({
      nome: formData.nome,
      site: formData.site || null,
      descricao: formData.descricao,
      cidade: formData.cidade,
      estado: formData.estado,
      status: 'pendente',
      criado_por: user.id,
    })

    if (insertError) {
      console.error('Erro ao cadastrar:', insertError)
      setError('Erro ao cadastrar empresa. Tente novamente.')
      setLoading(false)
      return
    }

    router.push('/cadastrar/sucesso')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label htmlFor="nome" className="block font-medium mb-2">
          Nome da Empresa *
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ex: Empresa XYZ"
        />
      </div>

      <div>
        <label htmlFor="site" className="block font-medium mb-2">
          Site da Empresa (opcional)
        </label>
        <input
          id="site"
          name="site"
          type="url"
          value={formData.site}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://www.empresa.com.br"
        />
      </div>

      <div>
        <label htmlFor="descricao" className="block font-medium mb-2">
          Descrição *
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          placeholder="Descreva as oportunidades oferecidas para profissionais 40+"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cidade" className="block font-medium mb-2">
            Cidade *
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            value={formData.cidade}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: São Paulo"
          />
        </div>

        <div>
          <label htmlFor="estado" className="block font-medium mb-2">
            Estado *
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Selecione...</option>
            {ESTADOS_BR.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
        <strong>Importante:</strong> Seu cadastro será analisado por um
        administrador antes de ser publicado.
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
      </button>
    </form>
  )
}

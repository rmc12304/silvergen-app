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
    <form onSubmit={handleSubmit} className="card" style={{ maxWidth: '600px' }}>
      <div className="form-group">
        <label htmlFor="nome" className="form-label">
          Nome da Empresa *
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Ex: Empresa XYZ"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="site" className="form-label">
          Site da Empresa (opcional)
        </label>
        <input
          id="site"
          name="site"
          type="url"
          value={formData.site}
          onChange={handleChange}
          placeholder="https://www.empresa.com.br"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="descricao" className="form-label">
          Descrição *
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Descreva as oportunidades oferecidas para profissionais 40+"
          className="form-input"
          style={{ resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label htmlFor="cidade" className="form-label">
            Cidade *
          </label>
          <input
            id="cidade"
            name="cidade"
            type="text"
            value={formData.cidade}
            onChange={handleChange}
            required
            placeholder="Ex: São Paulo"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="estado" className="form-label">
            Estado *
          </label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
            className="form-input"
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
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="alert alert-warning">
        <strong>Importante:</strong> Seu cadastro será analisado por um
        administrador antes de ser publicado.
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
        {loading ? 'Cadastrando...' : 'Cadastrar Empresa'}
      </button>
    </form>
  )
}

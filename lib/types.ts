export type StatusEmpresa = 'pendente' | 'aprovado' | 'rejeitado'

export interface Empresa {
  id: string
  nome: string
  site: string | null
  descricao: string
  cidade: string
  estado: string
  status: StatusEmpresa
  criado_por: string
  criado_em: string
  atualizado_em: string
}

export interface Perfil {
  id: string
  email: string
  is_admin: boolean
  criado_em: string
}

export interface EmpresaFormData {
  nome: string
  site: string
  descricao: string
  cidade: string
  estado: string
}

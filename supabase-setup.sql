-- ===========================================
-- SilverGen - Script de Setup do Banco de Dados
-- Execute este script no SQL Editor do Supabase
-- Dashboard > SQL Editor > New Query
-- ===========================================

-- Tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS perfis (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  site TEXT,
  descricao TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
  criado_por UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_empresas_status ON empresas(status);
CREATE INDEX IF NOT EXISTS idx_empresas_criado_por ON empresas(criado_por);
CREATE INDEX IF NOT EXISTS idx_empresas_nome ON empresas(nome);
CREATE INDEX IF NOT EXISTS idx_empresas_cidade ON empresas(cidade);

-- Habilitar RLS (Row Level Security)
ALTER TABLE perfis ENABLE ROW LEVEL SECURITY;
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- Função auxiliar para verificar se usuário é admin
-- (SECURITY DEFINER bypassa RLS para evitar recursão)
-- ===========================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM perfis
    WHERE id = auth.uid() AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===========================================
-- Políticas para tabela PERFIS
-- ===========================================

-- Usuários podem ver seu próprio perfil
CREATE POLICY "usuarios_veem_proprio_perfil" ON perfis
  FOR SELECT USING (auth.uid() = id);

-- Usuários podem atualizar seu próprio perfil (exceto is_admin)
CREATE POLICY "usuarios_atualizam_proprio_perfil" ON perfis
  FOR UPDATE USING (auth.uid() = id);

-- Sistema pode inserir perfis (via trigger)
CREATE POLICY "sistema_insere_perfis" ON perfis
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ===========================================
-- Políticas para tabela EMPRESAS
-- ===========================================

-- Qualquer pessoa pode ver empresas aprovadas
CREATE POLICY "empresas_aprovadas_publicas" ON empresas
  FOR SELECT USING (status = 'aprovado');

-- Usuários logados podem ver seus próprios cadastros (qualquer status)
CREATE POLICY "usuarios_veem_proprias_empresas" ON empresas
  FOR SELECT USING (auth.uid() = criado_por);

-- Usuários logados podem cadastrar empresas
CREATE POLICY "usuarios_cadastram_empresas" ON empresas
  FOR INSERT WITH CHECK (auth.uid() = criado_por);

-- Admins podem ver todas as empresas (usando função que bypassa RLS)
CREATE POLICY "admins_veem_todas_empresas" ON empresas
  FOR SELECT USING (public.is_admin());

-- Admins podem atualizar qualquer empresa (aprovar/rejeitar)
CREATE POLICY "admins_atualizam_empresas" ON empresas
  FOR UPDATE USING (public.is_admin());

-- Admins podem deletar empresas
CREATE POLICY "admins_deletam_empresas" ON empresas
  FOR DELETE USING (public.is_admin());

-- ===========================================
-- Função e Trigger para criar perfil automaticamente
-- ===========================================

-- Função que cria perfil quando usuário se cadastra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfis (id, email, is_admin)
  VALUES (NEW.id, NEW.email, FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que executa a função ao criar usuário
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===========================================
-- Função para atualizar timestamp
-- ===========================================

CREATE OR REPLACE FUNCTION update_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_empresas_atualizado_em ON empresas;
CREATE TRIGGER update_empresas_atualizado_em
  BEFORE UPDATE ON empresas
  FOR EACH ROW EXECUTE FUNCTION update_atualizado_em();

-- ===========================================
-- IMPORTANTE: Após executar este script, para
-- tornar um usuário admin, execute:
--
-- UPDATE perfis SET is_admin = TRUE WHERE email = 'seu@email.com';
-- ===========================================

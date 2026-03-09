-- ===========================================
-- Silvergen - Security Hardening (RLS)
-- Objetivo: corrigir vetores de privilege escalation
-- Execucao: SQL Editor do Supabase
-- ===========================================

BEGIN;

-- 1) PERFIS: impedir autoelevacao para admin
-- Remover policy anterior que permitia update do proprio perfil sem restricao de coluna.
DROP POLICY IF EXISTS "usuarios_atualizam_proprio_perfil" ON perfis;

-- Permitir update apenas para usuarios cujo registro permaneça nao-admin.
-- Isso bloqueia tentativa de setar is_admin = TRUE no proprio perfil.
CREATE POLICY "usuarios_atualizam_proprio_perfil" ON perfis
  FOR UPDATE
  USING (auth.uid() = id AND is_admin = FALSE)
  WITH CHECK (auth.uid() = id AND is_admin = FALSE);

-- 2) EMPRESAS: impedir publicacao direta por usuario comum no insert
DROP POLICY IF EXISTS "usuarios_cadastram_empresas" ON empresas;

CREATE POLICY "usuarios_cadastram_empresas" ON empresas
  FOR INSERT
  WITH CHECK (auth.uid() = criado_por AND status = 'pendente');

COMMIT;

-- ===========================================
-- Rollback:
-- Execute o arquivo supabase-security-hardening-rollback.sql
-- ===========================================

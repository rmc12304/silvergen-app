-- ===========================================
-- Silvergen - Security Hardening ROLLBACK
-- Objetivo: restaurar policies anteriores ao hardening
-- ===========================================

BEGIN;

-- PERFIS: restaurar policy anterior
DROP POLICY IF EXISTS "usuarios_atualizam_proprio_perfil" ON perfis;

CREATE POLICY "usuarios_atualizam_proprio_perfil" ON perfis
  FOR UPDATE
  USING (auth.uid() = id);

-- EMPRESAS: restaurar policy anterior de insert
DROP POLICY IF EXISTS "usuarios_cadastram_empresas" ON empresas;

CREATE POLICY "usuarios_cadastram_empresas" ON empresas
  FOR INSERT
  WITH CHECK (auth.uid() = criado_por);

COMMIT;

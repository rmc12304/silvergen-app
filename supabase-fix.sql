-- ===========================================
-- SilverGen - Script de CORREÇÃO
-- Execute este script se você já rodou o setup anterior
-- ===========================================

-- Remover a política problemática que causa recursão infinita
DROP POLICY IF EXISTS "admins_veem_todos_perfis" ON perfis;

-- Criar função auxiliar que bypassa RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM perfis
    WHERE id = auth.uid() AND is_admin = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar políticas de empresas usando a nova função
DROP POLICY IF EXISTS "admins_veem_todas_empresas" ON empresas;
DROP POLICY IF EXISTS "admins_atualizam_empresas" ON empresas;
DROP POLICY IF EXISTS "admins_deletam_empresas" ON empresas;

CREATE POLICY "admins_veem_todas_empresas" ON empresas
  FOR SELECT USING (public.is_admin());

CREATE POLICY "admins_atualizam_empresas" ON empresas
  FOR UPDATE USING (public.is_admin());

CREATE POLICY "admins_deletam_empresas" ON empresas
  FOR DELETE USING (public.is_admin());

-- Pronto! A correção foi aplicada.

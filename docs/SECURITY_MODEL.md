# SECURITY_MODEL

Modelo de seguranca operacional para Supabase + RLS.

## Roles

- anonymous: acesso publico permitido por policy explicita.
- authenticated: operacoes do usuario autenticado conforme policy.
- admin (logica de negocio): privilegios adicionais definidos por tabela/funcao.
- service_role: proibido por padrao para fluxos de aplicacao.

## Fonte do inventario

Inventario abaixo foi extraido do SQL versionado do repositorio:

- `supabase-setup.sql`
- `supabase-fix.sql`

Se houver divergencia com o banco em producao, prevalece o estado real do banco e deve ser registrado no `CHANGELOG.md`.

## Tabelas e escrita permitida (baseline)

- `perfis`: escrita por usuario autenticado apenas no proprio registro (`auth.uid() = id`), e insercao inicial via fluxo de cadastro/trigger.
- `empresas`: escrita por usuario autenticado no proprio cadastro (`criado_por = auth.uid()`), e atualizacao/delecao global apenas para admin via policy.

## RLS Policies (Inventory Baseline)

### perfis

- policy: `usuarios_veem_proprio_perfil`
- command: select
- expression: `USING (auth.uid() = id)`

- policy: `usuarios_atualizam_proprio_perfil`
- command: update
- expression: `USING (auth.uid() = id)`
- observacao critica: esta policy, sozinha, pode permitir tentativa de alteracao de `is_admin`; exigir hardening adicional no review de seguranca.

- policy: `sistema_insere_perfis`
- command: insert
- expression: `WITH CHECK (auth.uid() = id)`

### empresas

- policy: `empresas_aprovadas_publicas`
- command: select
- expression: `USING (status = 'aprovado')`

- policy: `usuarios_veem_proprias_empresas`
- command: select
- expression: `USING (auth.uid() = criado_por)`

- policy: `usuarios_cadastram_empresas`
- command: insert
- expression: `WITH CHECK (auth.uid() = criado_por)`

- policy: `admins_veem_todas_empresas`
- command: select
- expression: `USING (public.is_admin())`

- policy: `admins_atualizam_empresas`
- command: update
- expression: `USING (public.is_admin())`

- policy: `admins_deletam_empresas`
- command: delete
- expression: `USING (public.is_admin())`

## Funcoes sensiveis

- `public.is_admin()`:
  - tipo: `SECURITY DEFINER`
  - uso: decisao de privilegio admin nas policies de `empresas`
  - requisito: manter ownership e permissoes estritas para evitar abuso.

- `public.handle_new_user()`:
  - tipo: `SECURITY DEFINER`
  - uso: cria perfil inicial em `public.perfis` no trigger `on_auth_user_created`
  - requisito: nao expandir privilegios alem da insercao inicial de perfil.

## Write Boundaries

Toda escrita deve ser validada por policy RLS.
Nenhum endpoint deve confiar em sinalizacao de privilegio enviada pelo client.

## Service Role Boundary

- Nao usar `service_role` em Server Actions de rotina.
- Qualquer excecao deve incluir objetivo, escopo, risco e rollback no CHANGELOG.
- Excecao sem registro explicito e considerada nao autorizada.

## Explicit Prohibitions

- desabilitar RLS temporariamente para "resolver" fluxo
- bypass de policy no codigo de aplicacao
- query administrativa sem classificacao e revisao humana

## Proximo controle obrigatorio

Gerar snapshot do estado real do banco (schema + policies) e comparar com o SQL versionado para detectar drift estrutural.

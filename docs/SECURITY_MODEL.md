# SECURITY_MODEL

Modelo de seguranca operacional para Supabase + RLS.

## Roles

- anonymous: acesso publico permitido por policy explicita.
- authenticated: operacoes do usuario autenticado conforme policy.
- admin (logica de negocio): privilegios adicionais definidos por tabela/funcao.
- service_role: proibido por padrao para fluxos de aplicacao.

## RLS Policies (Inventory Baseline)

Documentar por tabela:

- tabela
- policy name
- command (select/insert/update/delete)
- using/check expression
- quem pode escrever

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

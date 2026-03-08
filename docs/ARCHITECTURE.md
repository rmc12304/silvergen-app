# ARCHITECTURE

Mapa estrutural minimo para evitar inferencia implicita por agentes.

## Auth Flow

1. Usuario autentica via Supabase Auth.
2. Sessao e token sao usados para consultas no Supabase.
3. Autorizacao efetiva ocorre no banco via RLS.

## Supabase Boundary

- Client: somente operacoes permitidas por RLS com contexto do usuario.
- Server: pode orquestrar chamadas, mas nao substitui RLS como autoridade final.
- Service role: proibido por padrao; excecoes devem estar em SECURITY_MODEL.md.

## RLS Trust Model

- Fonte de autoridade: `auth.uid()`, roles internas e claims verificaveis.
- Nao confiar em role enviada pelo frontend, hidden fields ou flags do client.

## Privileged Surface

Superficies privilegiadas que exigem revisao humana:

- alteracao de schema
- alteracao de policy RLS
- alteracao de role/permissao
- endpoint/server action com capacidade administrativa

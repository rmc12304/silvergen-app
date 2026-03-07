# PROJECT STATE — SilverGen

## 1. Visão Geral do Projeto

Aplicação web CRUD construída com stack moderna para permitir cadastro, consulta, atualização e gerenciamento de empresas, com autenticação integrada e controle de acesso por perfil.

### Stack principal

* Next.js (App Router)
* Supabase (Database + Auth + RLS)
* Vercel (deploy)
* Tailwind CSS (UI)

---

## 2. Objetivo Estratégico

Construir um sistema funcional e seguro, operado com apoio de agentes de código (Codex e Claude Code), com:

* trilhos claros de desenvolvimento
* regras explícitas de segurança
* processo previsível de mudanças
* automação de QA
* mínima intervenção manual em infraestrutura

---

## 3. Estado Atual da Infraestrutura

✔ Repositório organizado com branch principal `main`
✔ Branch `main` protegida no GitHub
✔ Branch `dev` removida local e remotamente
✔ Workflow baseado em branches curtas
✔ AGENTS.md criado com regras operacionais para agentes
✔ Ambiente de produção ativo (Vercel)
✔ Supabase configurado com autenticação e RLS

---

## 4. Governança de Agentes

O projeto é conduzido com suporte de agentes de código.

Princípios operacionais:

* mudanças pequenas e verificáveis
* evitar alterar código funcional sem necessidade
* trabalhar sempre a partir de `main` atualizada
* entregar diffs claros
* validar efeitos colaterais antes de concluir tarefa
* Definition of Done inclui lint, funcionamento e escopo controlado

---

## 5. Segurança e Autorização (Estado Atual)

O sistema utiliza:

* Supabase Auth
* Row Level Security (RLS)
* função `public.is_admin()` com SECURITY DEFINER para evitar recursão em policies

Um script de correção foi aplicado anteriormente para resolver loop de políticas RLS.

Arquivo histórico:

* `supabase-fix.sql`

---

## 6. Riscos de Segurança Identificados

Code review focado revelou pontos relevantes.

### CRITICAL

Possível privilege escalation via atualização do próprio perfil (`perfis.is_admin`).

### HIGH

* mutações administrativas podem reportar sucesso sem alterar registros
* interpolação direta em filtros PostgREST

### MEDIUM

* criação repetida de cliente Supabase em render React
* erros de consulta tratados como falha de autorização
* verificação de admin somente em camada de página

---

## 7. Direção Arquitetural Definida

Princípios adotados para evolução:

1. Segurança centralizada no banco via RLS
2. Banco tratado como código versionado
3. Evitar SQL manual sempre que possível
4. Automação de validações de segurança
5. Agentes operam sob regras explícitas
6. Mudanças estruturais controladas por migração formal

---

## 8. Prioridades Técnicas Imediatas

Ordem de execução planejada:

1. Validar arquitetura completa de autorização
2. Corrigir política RLS vulnerável
3. Consolidar regras de segurança no AGENTS.md
4. Projetar agente de QA de segurança
5. Criar testes automatizados de autorização
6. Formalizar processo de migração de banco

---

## 9. Restrições Operacionais do Projeto

Decisões explícitas do responsável pelo projeto:

* evitar debug manual prolongado de banco
* priorizar automação sobre intervenção manual
* minimizar carga cognitiva operacional
* manter foco em produto e arquitetura
* usar agentes como força de execução principal

---

## 10. Estrutura Atual do Repositório (alto nível)

```
/app
/components
/lib
/public
/docs
AGENTS.md
README.md
CONTRIBUTING.md
```

---

## 11. Próxima Ação Planejada

Validar modelo de autorização Supabase e eliminar risco de privilege escalation de forma definitiva, sem introduzir complexidade operacional desnecessária.

---

## 12. Observação Importante

Este documento representa o estado operacional do projeto e deve ser atualizado sempre que houver:

* mudança de arquitetura
* alteração de modelo de segurança
* adoção de nova prática de desenvolvimento
* mudança de fluxo de trabalho com agentes
* decisão técnica relevante

Ele funciona como ponto único de verdade para retomada de contexto em novas sessões de trabalho.

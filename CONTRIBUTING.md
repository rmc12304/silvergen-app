# Contributing to Silvergen

## 1. Project Overview

Silvergen é uma plataforma web para conectar empresas que oferecem oportunidades de emprego para profissionais com mais de 40 anos.

**Público-alvo:** projeto interno com potencial para open source no futuro.

## 2. How to Set Up the Project

### Prerequisites

- Node.js 18+
- npm ou yarn
- Conta no [Supabase](https://supabase.com) (banco de dados e autenticação)
- Conta no [Vercel](https://vercel.com) (deploy)

### Install Steps

```bash
git clone https://github.com/rmc12304/silvergen-app.git
cd silvergen-app
npm install
```

### Environment Variables

Crie um arquivo `.env.local` na raiz:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

### Run Locally

```bash
npm run dev
```

Acesse http://localhost:3000

## 3. How to Test

### Testes Disponíveis

- Atualmente não há testes automatizados implementados.

### Testes Manuais

1. Criar conta de usuário.
2. Cadastrar empresa (status: pendente).
3. Aprovar/rejeitar empresa como admin.
4. Buscar empresas na homepage.

### Quando Testes São Necessários

- Sempre antes de qualquer deploy.
- Antes de qualquer PR que altere lógica de negócio.
- Ao adicionar novas funcionalidades.

### Política de Qualidade antes do Deploy

Toda melhoria deve ser testada localmente antes do deploy. Isso reduz o risco de regressões e garante que mudanças funcionam no ambiente de desenvolvimento.
Caso não existam testes automatizados para o cenário, descreva no PR os testes manuais realizados.

## 4. How to Submit Changes

### Branch Naming

- `feature/nome-da-feature`
- `fix/descricao-do-bug`
- `refactor/area-refatorada`

Exemplos:
- `feature/filtro-por-estado`
- `fix/botao-login-invisivel`
- `refactor/design-system-v2`

### Como Abrir um PR

1. Crie uma branch a partir de `main`.
2. Faça suas alterações.
3. Commit com mensagem descritiva.
4. Push para o repositório.
5. Abra PR para `main` com:
   - Resumo das mudanças.
   - Screenshots (se houver mudanças visuais).
   - Checklist de testes realizados.

### Review Process

1. Pelo menos 1 aprovação necessária.
2. Todos os comentários devem ser resolvidos.
3. Build deve passar no Vercel Preview.

## 5. Coding Standards

### Formatação

- Prettier para formatação automática.
- ESLint com config do Next.js.
- Indentação: 2 espaços.
- Aspas simples em JS/TS.

### Estrutura de Arquivos

- `app/` — Páginas (App Router)
- `components/` — Componentes reutilizáveis
- `lib/` — Utilitários e configs (Supabase, types)
- `public/` — Assets estáticos

### Convenções

- Componentes: PascalCase (`EmpresaCard.tsx`).
- Utilitários: camelCase (`supabase.ts`).
- CSS: Design System em `globals.css` com variáveis CSS.
- Classes CSS: kebab-case (`card-title`, `btn-primary`).

## 6. Deployment / Release

### Quem Faz Deploy

- Deploy automático via Vercel ao fazer push para `main`.

### Processo de Release

1. Mudanças são mergeadas em `main`.
2. Vercel faz deploy automático para produção.
3. Verificar em https://silvergen.com.br.

### Versionamento

Ainda não implementado. Futuro: semantic versioning (v1.0.0).

## 7. Where to Get Help

### Contatos

- Maintainer: @rmc12304
- Email: [a definir]

### Recursos

- https://nextjs.org/docs
- https://supabase.com/docs
- https://vercel.com/dashboard

## 8. Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença do projeto (MIT). Veja o arquivo `LICENSE`.

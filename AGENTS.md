# AGENTS.md

## Objetivo
Este arquivo define como agentes (Codex, Claude Code, etc.) devem trabalhar neste repositório.

## Princípios
- Mudanças pequenas e verificáveis.
- Preferir editar o mínimo possível do que já está funcionando.
- Se houver dúvida de intenção, perguntar antes de mudar comportamento.

## Setup
- Instalar deps: `...`
- Rodar testes: `...`
- Rodar lint/format: `...`

## Workflow Git
- Base sempre em `main` atualizada.
- Criar branch curta: `feature/...` ou `fix/...`
- Entregar como: diff/patch + resumo das mudanças + checklist de validação.
- Nunca commitar arquivos temporários (ex.: `*.patch`).

## Convenções de código
- Formatter: ...
- Lint: ...
- Padrões proibidos: ...
- Pastas que não devem ser alteradas: ...

## Definition of Done
- Testes passando
- Lint ok
- Sem alterações colaterais fora do escopo

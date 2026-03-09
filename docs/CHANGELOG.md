# CHANGELOG

Fonte de verdade para mutacoes estruturais e sensiveis.

## Entry Template

- date: YYYY-MM-DD
- type: schema | RLS | infra | feature | config
- risk: low | medium | high
- migration_required: yes | no
- reversible: yes | no
- rollback_path: texto curto e executavel
- commit: <hash>
- summary: descricao objetiva da mudanca

## Entries

- date: 2026-03-07
- type: config
- risk: low
- migration_required: no
- reversible: yes
- rollback_path: remover artefatos de governanca adicionados em docs/
- commit: pending
- summary: baseline MVOM com gates operacionais e artefatos de controle

- date: 2026-03-08
- type: RLS
- risk: high
- migration_required: yes
- reversible: yes
- rollback_path: executar `supabase-security-hardening-rollback.sql`
- commit: pending
- summary: hardening de policies para bloquear autoelevacao de admin em `perfis` e forcar `status='pendente'` no insert de `empresas`

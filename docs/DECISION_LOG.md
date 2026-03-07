# DECISION_LOG

Registro de decisoes arquiteturais para evitar reabertura recorrente.

## Entry Template

- date: YYYY-MM-DD
- context: problema ou pressao tecnica
- decision: escolha feita
- consequence: impacto e tradeoff aceitos

## Entries

- date: 2026-03-07
- context: necessidade de disciplina para desenvolvimento assistido por agentes com Supabase + RLS
- decision: adotar MVOM minimo com 5 artefatos e gates operacionais explicitos
- consequence: menor velocidade inicial, maior controle de risco estrutural e de seguranca

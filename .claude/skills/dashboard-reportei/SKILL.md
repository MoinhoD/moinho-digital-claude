---
name: dashboard-reportei
description: Puxa dados de marketing da Reportei (API) para um cliente e monta um dashboard HTML pronto pra mostrar ao cliente — KPIs, comparação com o período anterior e leitura em prosa dos números. Use quando o usuário disser "monta um dashboard pro cliente X", "puxa os dados da Reportei", "quero mostrar resultado pro cliente", ou /dashboard-reportei.
---

## Quando usar

Disparar quando o usuário pedir um dashboard ou relatório visual com dados reais de mídia paga/analytics de um cliente, puxando direto da Reportei — em vez de um relatório em texto corrido (isso é o `relatorio-mensal`) ou de uma apresentação de estratégia (isso é o `planejamento-onboarding`).

## Contexto

Ler antes de começar:
- `clientes/[slug-cliente]/contexto.md` — KPIs que o cliente acompanha, tom do relatório, quem assina
- `_contexto/preferencias.md` — tom de voz
- `marca/design-guide.md` — cores e tipografia da Moinho

## Pré-requisito: token da API

O token fica em `REPORTEI_API_TOKEN` no `.env` da raiz do repo (nunca commitar — já está no `.gitignore`).

Se não existir, guiar o usuário a gerar um:
1. Login em [app.reportei.com](https://app.reportei.com)
2. Configurações da Empresa → seção "API Reportei" → "Gerar novo token"
3. Salvar em `.env`: `REPORTEI_API_TOKEN=...`

Testar o token antes de seguir:
```bash
export $(grep -v '^#' .env | xargs)
curl -s -H "Authorization: Bearer $REPORTEI_API_TOKEN" "https://app.reportei.com/api/v2/companies/settings"
```
Se retornar 401/403, o token é inválido ou expirou — pedir um novo.

**Cuidado com BOM ao montar payload no Windows:** se usar PowerShell (`Out-File`, `ConvertTo-Json | Out-File`) pra gerar o JSON do payload, ele escreve UTF-8 **com BOM** por padrão, e o BOM emburrece o JSON quando o arquivo é interpolado dentro de outro heredoc (gera erro 403 "This action is unauthorized" no /metrics/get-data, mesmo com token válido — sintoma enganoso). Sempre escrever o JSON final com `[System.IO.File]::WriteAllText($path, $jsonText, (New-Object System.Text.UTF8Encoding($false)))` em vez de `Out-File`/`Set-Content`.

## Passo a passo

### 1. Achar o projeto do cliente na Reportei

```bash
curl -s -H "Authorization: Bearer $REPORTEI_API_TOKEN" "https://app.reportei.com/api/v2/projects?q=NOME_DO_CLIENTE"
```
Guardar o `id` retornado (`project_id`).

Se não achar nada, o cliente pode estar cadastrado com nome diferente na Reportei — perguntar ao usuário ou listar todos os projetos (`GET /v2/projects`, sem `q`) pra conferir.

### 2. Listar as integrações conectadas

```bash
curl -s -H "Authorization: Bearer $REPORTEI_API_TOKEN" "https://app.reportei.com/api/v2/integrations?project_id=PROJECT_ID"
```
Retorna cada integração com `id` (usar como `integration_id` no passo 4), `slug` (ex: `google_adwords`, `facebook_ads`, `google_analytics_4`) e `status`.

Cruzar com `clientes/[slug-cliente]/contexto.md` pra confirmar que bate com os serviços contratados — se a Reportei mostrar uma integração que o contexto não menciona (ou vice-versa), avisar o usuário antes de seguir.

### 3. Definir o período

Perguntar ao usuário, ou usar como padrão: mês corrente até hoje, comparado ao mês anterior completo.

**Atenção:** se a campanha for nova (checar `contexto.md`), o período de comparação pode estar parcialmente vazio ou cobrir só alguns dias de atividade real. Nesse caso, avisar isso explicitamente no dashboard (não deixar a comparação "limpa" enganar o cliente) — ver `clientes/data-centrics/relatorios/dashboard-2026-08.html` como exemplo de como sinalizar isso.

### 4. Buscar o catálogo de métricas da integração

Antes de rebuscar tudo via API, checar se já existe cache local em `metrics-cache/[slug].json` (esse skill já traz `google_adwords.json` e `google_analytics_4.json` prontos, buscados em 2026-08). Se o slug não tiver cache, ou se uma chamada de `get-data` falhar com ID desconhecido, buscar fresco:

```bash
curl -s -H "Authorization: Bearer $REPORTEI_API_TOKEN" "https://app.reportei.com/api/v2/metrics?integration_slug=SLUG&per_page=100"
```

Cada métrica no catálogo tem `id` (UUID fixo, é o que vai no payload), `reference_key` (nome legível, ex: `gads:clicks`), `component` (tipo de widget) e `metrics`/`dimensions`.

### 5. Escolher as métricas certas pro cliente

Não usar todas — escolher com base no que `contexto.md` do cliente define como "KPIs que acompanhamos". Referência rápida pro Google Ads (`gads:*`, ver cache completo no JSON):

| O que mostrar | reference_key |
|---|---|
| Investimento | `gads:cost_micros` |
| Cliques | `gads:clicks` |
| Impressões | `gads:impressions` |
| CTR | `gads:ctr` |
| CPC médio | `gads:average_cpc` |
| Conversões / leads | `gads:conversions` |
| Custo por conversão/lead | `gads:cost_per_conversion` |
| Tendência diária de cliques | `gads:clicks_ctr_per_day` (chart) |
| Detalhe por tipo de conversão | `gads:custom_conversion_actions` (datatable, dimensão `conversion_action_name`) |
| Campanhas ativas | `gads:top_campaigns` (datatable) |

Pra GA4 (`google_analytics_4:*`) ou Meta Ads (`facebook_ads:*`, buscar catálogo fresco — não tem cache ainda), aplicar a mesma lógica: escolher o que responde às perguntas do `contexto.md`, não empilhar métrica por empilhar.

### 6. Montar o payload e buscar os dados

O array `metrics` precisa dos **objetos completos** do catálogo (não só `id` ou `reference_key`) — extrair do cache/catálogo do passo 4 sem alterar os campos.

```json
{
  "start": "AAAA-MM-DD",
  "end": "AAAA-MM-DD",
  "comparison_start": "AAAA-MM-DD",
  "comparison_end": "AAAA-MM-DD",
  "integration_id": 0,
  "metrics": [ /* objetos completos do passo 4/5 */ ]
}
```

```bash
curl -s -X POST -H "Authorization: Bearer $REPORTEI_API_TOKEN" -H "Content-Type: application/json" \
  -d @payload.json \
  "https://app.reportei.com/api/v2/metrics/get-data"
```

A resposta mapeia `id` da métrica → `{ values, comparison: { values, difference, absoluteDifference } }` (widgets `number_v1`) ou `{ labels, values }` (charts) ou `{ headers, values }` (datatables). Usar `difference` (variação percentual) pra montar os deltas.

**Rate limit:** 100 chamadas/minuto pra `get-data`. Não é problema pra 1 dashboard, mas evitar loop desnecessário se for gerar pra vários clientes seguidos.

### 7. Montar o layout HTML

Antes de desenhar qualquer gráfico ou KPI tile, carregar a skill `dataviz` — ela define forma, cor e espaçamento dos componentes (stat tile, line chart, deltas com status color).

Regras específicas desse tipo de dashboard:
- **Cor de marca** (`marca/design-guide.md`: roxo `#5A368C`, salmão `#F0867D`, creme `#EFEEDF`) pros elementos de identidade (header, linha do gráfico, callouts). **Cor de status** (good/warning/serious/critical, fixas — ver skill `dataviz`) só pros deltas, sempre com ícone + rótulo, nunca só a cor.
- KPI em grid de stat tiles (valor + delta vs período de comparação). Se o volume for baixo (poucas conversões, campanha nova), **não inflar com gráfico pra tudo** — um número isolado com contexto em texto vale mais que um gráfico de 1 ponto.
- Um gráfico de linha por métrica de tendência relevante (ex: cliques por dia), com todos os dias do período no eixo X — inclusive os dias sem dado (plotar como 0), pra não distorcer o espaçamento do tempo.
- Seção de leitura em prosa no final, seguindo o padrão de `contexto.md` do cliente (quem assina, o que interpretar, o que não forçar conclusão sobre volume baixo). Separar eficiência de mídia (CTR, CPC) de eficiência comercial (o que virou venda/reunião) quando o cliente tiver ciclo de vendas longo.

Salvar em `clientes/[slug-cliente]/relatorios/dashboard-[AAAA-MM].html`.

### 8. Entregar

Mostrar o caminho do arquivo. Perguntar se quer:
- Exportar em PDF (ver observação abaixo sobre Node)
- Subir no Google Drive do cliente (MCP do Google Drive, sem precisar de rclone configurado)
- Publicar com link (Netlify/Cloudflare — só funciona se Node estiver instalado nessa máquina; se não, avisar e oferecer as duas alternativas acima)

Não fazer nenhum desses três passos sem o usuário pedir — a entrega padrão é o HTML local.

## Referências

- Documentação oficial: https://developers.reportei.com/
- Exemplo real gerado por essa skill: `clientes/data-centrics/relatorios/dashboard-2026-08.html`
- Catálogo de métricas em cache: `metrics-cache/google_adwords.json`, `metrics-cache/google_analytics_4.json`

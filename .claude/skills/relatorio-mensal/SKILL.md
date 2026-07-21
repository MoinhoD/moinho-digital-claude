---
name: relatorio-mensal
description: Gera a análise textual do relatório mensal que é inserida no Reportei. Roda dentro do contexto de qualquer cliente. Interpreta os dados do mês (o que significam para o negócio), compara com meses anteriores e segue o estilo de relatório próprio de cada cliente, descrito em "Estilo do relatório" no contexto.md do cliente e nos relatórios anteriores.
---

## Quando usar

Disparar quando o usuário pedir: gerar relatório mensal, análise do relatório, textos do Reportei, relatório de [mês] para [cliente], /relatorio-mensal.

Skill **geral** — funciona para qualquer cliente. O que muda de um cliente para outro é o **estilo** (seções, ênfase, tom), que a skill lê do próprio cliente. Não impor um formato único.

## Princípio central

> Indicadores mostram o desempenho. A análise explica o impacto. As recomendações direcionam o negócio.

Não descrever números — **interpretar o que significam para o negócio**. Sempre conectar: ações executadas → variação nas métricas → impacto no volume/qualidade de resultado → implicação para o cliente. Nunca repetir números que já estão visíveis nos gráficos/tabelas do Reportei sem uma leitura por cima deles.

## Contexto

Antes de começar, ler **nesta ordem**:

1. `clientes/[slug-cliente]/contexto.md` — em especial a seção **"## Estilo do relatório"**: define as seções, a ordem, os KPIs de destaque e o tom daquele cliente.
2. **Relatórios anteriores** do cliente em `clientes/[slug-cliente]/relatorios/` (`.md` de textos e/ou PDFs). Ler os 1–3 mais recentes para:
   - Replicar a estrutura e o estilo exatos (títulos, emojis, ordem das seções).
   - Comparar tendências: o mês atual continua, reverte ou acelera o que vinha acontecendo?
   - Manter coerência de narrativa com o que já foi dito ao cliente.

Se não houver relatório anterior (cliente novo), usar o estilo descrito no `contexto.md` e, na falta dele, o formato padrão abaixo — e avisar o usuário que foi o primeiro, sem histórico para comparar.

## Passo a passo

### 1. Cliente e período
Confirmar o cliente (slug) e o período analisado + o período de comparação (normalmente o mês anterior; alguns clientes comparam ano-a-ano ou trimestre-a-trimestre — respeitar o que o `contexto.md`/histórico indicar).

### 2. Dados do mês
Receber os dados (o usuário cola métricas, prints, PDF export do Reportei ou tabela). Não inventar números. Se faltar um dado essencial para uma seção, pedir ou marcar `[confirmar]`.

### 3. Ações do período
Listar as ações efetivamente executadas no mês (o que foi mexido: verba, palavras-chave, negativas, novos grupos, testes de criativo, reestruturações). Se o usuário não informar, inferir a partir dos dados o que os números evidenciam e marcar para ele confirmar/complementar.

### 4. Escrever a análise no estilo do cliente
Montar o texto seguindo a estrutura do cliente (seção "Estilo do relatório" + relatórios anteriores). Regras transversais:
- Começar pelos ganhos de eficiência/avanços; depois os pontos de atenção.
- Comparar sempre com o período anterior e situar na série histórica.
- Linguagem calibrada ao leitor do cliente (ex.: WS Cranes → diretoria, executivo; Data Centrics → técnico B2B). Sem jargão de mídia quando o leitor não for de mídia.
- Assinado por **Vinícius Luiz — Moinho Digital**.
- Não pedir validação do leitor dentro do texto.

### 5. Entregar
Entregar o texto pronto para colar no Reportei e salvar em `clientes/[slug-cliente]/relatorios/relatorio-[mes]-[ano]-textos.md`.
Listar no fim quaisquer pontos marcados `[confirmar]`.

---

## Formato padrão (fallback, quando o cliente ainda não tem estilo definido)

Usar só se não houver "Estilo do relatório" no contexto nem relatório anterior. Ajustar ao canal do cliente.

**📆 Período analisado** — período atual vs. comparação.

**⚙️ Ações do período anterior** — até 5 bullets objetivos, só ações executadas, sem avaliação.

**📊 Leitura estratégica das métricas** — até 5 pontos interpretativos; ganhos primeiro, atenção depois; cada ponto conecta métrica → impacto no negócio; não repetir números crus.

**🚀 Próximos passos recomendados** — propositivos, cada um ligado à análise do período.

**🔍 Insights e tendências** *(opcional)* — padrões do público, maturidade do funil, sazonalidade, implicações de médio prazo.

Tom: claro, direto, consultivo e orientado à decisão. Nunca defensivo ou justificativo.

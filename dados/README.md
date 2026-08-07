# dados/

Drop zone pra arquivos que você quer analisar.

Jogue aqui CSVs, planilhas, TXTs, PDFs — qualquer arquivo com dados.

## Relatório de desempenho de cliente (PDF)

Jogou aqui o PDF de métricas do cliente (Reportei, Business Suite, Mlabs, Google Ads, Meta Ads)?

Chame: `/analise-metricas dados/relatorio-cliente-mes.pdf`

A skill lê o relatório inteiro, estuda o posicionamento da marca (pasta do cliente, site e redes) e entrega um diagnóstico estratégico em markdown, HTML e PDF dentro de `clientes/[cliente]/relatorios/`.

A análise interpreta os dados, não repete os números. Quem lê já tem o relatório na mão.

## Outros arquivos de dados

Chame: `/analisar-dados dados/nome-do-arquivo.csv`

---

Útil quando você não tem um MCP de armazenamento conectado (Google Drive, Notion, etc).
Quando tiver MCPs instalados, pode pedir pro Claude buscar os arquivos direto da fonte.

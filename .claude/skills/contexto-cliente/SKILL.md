---
name: contexto-cliente
description: Cria ou atualiza o contexto.md de um cliente da Moinho Digital, seguindo o padrão de 12 tópicos consolidado a partir das revisões de PR no GitHub (Pega e Cola, Data Centrics, Sícula). Use quando o usuário mencionar "criar contexto de cliente", "contexto do cliente X", "novo cliente no repo", "padronizar contexto" ou /contexto-cliente.
---

# /contexto-cliente — Contexto de cliente

## Quando usar

Disparar quando o usuário pedir para criar, revisar ou padronizar o `contexto.md` de um cliente. Esse arquivo cumpre o mesmo papel de um CLAUDE.md, só que por cliente: deve ser lido antes de qualquer tarefa daquele cliente (relatório, briefing, campanha, conteúdo, proposta).

## Contexto

Ler antes de começar:
- `_contexto/empresa.md` — como a Moinho trabalha
- `_contexto/preferencias.md` — tom de voz (PT-BR, direto, sem travessão, sem caixa alta, sem jargão)

## Onde salvar

`clientes/[nome-do-cliente]/contexto.md`. Se a pasta do cliente já existir com outra estrutura (`onboarding/`, `planejamento/`, `conteudo/` etc.), adicionar o `contexto.md` direto nela, sem duplicar a pasta.

## Regra de ouro

**Nunca inventar dado que não foi fornecido.** Se faltar informação pra um tópico, perguntar antes ou deixar um placeholder claro tipo `[a confirmar]`. Nomes próprios (produto, marca, pessoas) precisam ser conferidos com a fonte, não assumidos — um nome de produto escrito errado já causou retrabalho num PR real.

## Os 12 tópicos

Preencher nesta ordem. Cada explicação abaixo vem de ajuste pedido de verdade em revisão de PR — é o que costuma dar errado se não for seguido.

### Introdução

Frase de abertura padrão: quem é o cliente (de forma direta e objetiva), quem executa pela Moinho, e o lembrete de ler o arquivo antes de qualquer tarefa.

- Citar **todos** os responsáveis pela conta, não só uma pessoa. Se duas pessoas dividem estratégia e execução (ex.: uma cuida de mídia e outra de conteúdo), as duas entram aqui.

### Quem é

Foco **só na marca/empresa em si**: o que ela é, produto ou serviço que entrega em uma linha, diferenciais, como quer ser percebida no mercado, site, contatos, redes, tagline, tom de voz da marca, segmento e citação de concorrentes.

- **Não misturar informações descritivas sobre o produto ou serviço vendido aqui** — isso é assunto de "Produtos/Serviços". 
- Basear em material oficial da marca quando existir (ex.: branding entregue por agência parceira, site existente, reunião de briefing com o cliente), nunca supor.
- **Concorrentes:** quando o cliente atua em mais de uma frente, separar o concorrente por produto/serviço. 
- **Tempo médio de fechamento:** se varia por tipo de serviço (um mais rápido, outro mais lento), detalhar por serviço em vez de dar um número único.

### Serviços contratados com a Moinho

O que a **Moinho entrega** pro cliente: canais geridos (Google Ads, Meta Ads, conteúdo, etc.), volume de entrega quando houver (ex.: "12 conteúdos por mês"), serviços de gestão além de mídia (ex.: gestão de comunidade de WhatsApp, acompanhamento de oportunidades e vendas), materiais que a própria Moinho já produziu pro cliente (trazer o link, ex.: landing page desenvolvida, pra resgatar histórico).

- Ser específico com número e frequência, não só descrever o serviço em termos gerais.

### Produtos/Serviços

O que o **cliente vende** pro mercado dele (não confundir com o tópico anterior). Pra cada produto/serviço: o que é a entrega e que dor ele resolve. Detalhar o modelo comercial quando muda a leitura (ex.: é assinatura mensal ou anuidade, o que está incluso).

### Público

Quem compra do cliente: personas, características demográficas/comportamentais, papel de quem decide a compra (cargo, setor, porte de empresa).

- Puxar personas já validadas em planejamento ou onboarding em vez de recriar do zero, quando houver.
- Pode incluir aqui os "ganchos de conteúdo que performam" (mensagens/temas que engajam esse público) — ajuda a entender o público pela forma como ele reage ao conteúdo.

### Processo de vendas/atendimento

Como o lead vira cliente: fluxo desde o primeiro contato até o fechamento (canais de entrada, quem atende, etapas, prazos), forma de pagamento do cliente final quando relevante, e qualquer processo combinado diretamente com um contato-chave do lado do cliente.

### Foco da estratégia

O objetivo estratégico atual da conta: pra onde a Moinho está puxando o cliente agora (ex.: geração de lead frio, lançamento, prova social).

- Tem que refletir o que está **sendo executado de fato**, não uma fase antiga ou um plano que mudou. 
- Basear no planejamento estratégico apresentado ao cliente.

### Estrutura das campanhas

Detalhamento tático: como as campanhas/grupos de anúncios estão organizados hoje, o que cada um cobre, quais têm melhor desempenho.

- Esse tópico muda com frequência (campanhas pausam, nascem, são renomeadas). Sinalizar no próprio arquivo que ele precisa de revisão periódica — não é "escreve uma vez e esquece". Também sempre indicar quando foi a última atualização. 

### KPIs que acompanhamos

Lista objetiva das métricas acompanhadas, com a lógica de leitura (comparar com mês anterior e com a série histórica).

- Quando a estratégia tem fases diferentes (ex.: pré-lançamento vs. lançamento oficial), separar os KPIs por fase.
- Basear nas métricas já alinhadas com o cliente no planejamento, não inventar novas.
- Ver o histórico em relatórios

### Como trabalhar aqui

Regras práticas de execução: quem assina os relatórios (todos os responsáveis, não assumir uma pessoa só), tom de comunicação, convenção de nomenclatura das skills do cliente (`.claude/skills/`, prefixadas com o nome do cliente).

- Quando existem direcionamentos diferentes por frente de trabalho (anúncios, conteúdo, atendimento/SAC), registrar cada um — uma regra genérica não cobre as três frentes.

### Estilo de relatório

Formato fixo lido pela skill `relatorio-mensal`: ordem das seções, o que cada seção cobre, tom de voz esperado, assinatura (todos os responsáveis).

- Precisa acompanhar a estratégia atual: se o foco da conta mudou, o estilo do relatório muda junto. Não deixar descrevendo uma fase que já passou.
- Quando ainda não existe relatório consolidado, deixar isso explícito e registrar diretrizes iniciais, com nota de que o estilo se firma no primeiro relatório real.

### Referências

Mapa de onde estão os materiais de origem (branding, planejamento, onboarding, calendário, identidade visual), com link do Drive.

- É só uma bússola pra saber onde puxar material depois — não precisa migrar tudo pro repo de uma vez, só conforme a demanda de cada skill.

## Checklist antes de considerar pronto

- [ ] Os 12 tópicos preenchidos ou com placeholder explícito
- [ ] Nomes de produto, marca e pessoas conferidos com a fonte
- [ ] Nenhuma informação de produto do cliente dentro de "Quem é"
- [ ] "Foco da estratégia" e "Estilo de relatório" refletem o que está sendo executado agora, não uma fase antiga
- [ ] Todos os responsáveis pelo cliente citados em "Introdução", "Como trabalhar aqui" e "Estilo de relatório"
- [ ] Concorrentes e tempo de fechamento separados por produto/serviço, quando o cliente tem mais de uma frente

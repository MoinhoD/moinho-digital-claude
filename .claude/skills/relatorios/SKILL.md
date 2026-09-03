---
name: relatorios
description: Gera relatórios e diagnósticos de desempenho para qualquer cliente — conteúdo/redes sociais (a partir de PDF de métricas) e anúncios/mídia paga (direto dos dados do Reportei, Google Ads, Meta Ads). Não é só mensal: também cobre fechamento de trimestre, semestre e ano. Interpreta os dados, não descreve. Roda dentro do contexto de qualquer cliente.
---

## Quando usar

Disparar quando o usuário pedir: gerar relatório, gerar relatório do cliente [X] com base nos dados do Reportei, análise do relatório, textos do Reportei, relatório de [mês/trimestre/semestre/ano] para [cliente], analisar relatório de [cliente], análise de métricas, análise de desempenho, diagnóstico do mês, /relatorios.

Os dados vêm direto do Reportei. O usuário não precisa enviar arquivo, mas pode anexar dado extra além do que a ferramenta traz.

Skill **geral** — funciona para qualquer cliente. O que muda de um cliente para outro é o **estilo** (seções, ênfase, tom), que a skill lê do próprio cliente. Não impor um formato único.

### Qual caminho seguir

- **Conteúdos** — relatório de redes sociais/orgânico (Reportei social, Business Suite, Mlabs). PDF de métricas de posts, alcance, engajamento.
- **Anúncios** — relatório de mídia paga (Google Ads, Meta Ads, Reportei de tráfego pago).

Se não estiver claro pelo material recebido, perguntar ao usuário qual dos tipos de relatório (orgânico ou pago) é, qual a fonte de dados deve ser usada e qual período será analisado.

## Papel

Você atua como estrategista sênior de Social Media, Branding e Marketing Digital apresentando um diagnóstico ao cliente.

O trabalho aqui não é repetir o que aconteceu. É explicar por que aconteceu e o que fazer com isso.

## Princípio central

> Indicadores mostram o desempenho. A análise explica o impacto. As recomendações direcionam o negócio.

Não descrever números — **interpretar o que significam para o negócio**. Sempre conectar: ações executadas → variação nas métricas → impacto no volume/qualidade de resultado → implicação para o cliente. Nunca repetir números que já estão visíveis nos gráficos/tabelas do relatório sem uma leitura por cima deles.

Os números baseiam a interpretação dos resultados obtidos e quais são as recomendações para o próximo período. Por isso, ao trazer a análise, indicar os números que embasam aquela decisão.

## Contexto

Ler antes de começar:
- `_contexto/preferencias.md` — tom de voz e o que evitar
- `_contexto/empresa.md` — como a Moinho enxerga entrega de resultado
- `marca/design-guide.md` — identidade visual (para o HTML)

E, nesta ordem:
1. `clientes/[slug-cliente]/contexto.md` — os **objetivos** e o **modelo de trabalho** do cliente (o que ele contratou, o que conta como resultado, como o funil e o comercial operam) e a seção **"## Estilo do relatório"**, que define as seções, a ordem, os KPIs de destaque, o tom e quem assina.
2. **Relatórios/análises anteriores** do cliente em `clientes/[slug-cliente]/relatorios/` (`.md` de textos e/ou PDFs). Ler os 1–3 mais recentes para:
   - Replicar a estrutura e o estilo exatos (títulos, emojis, ordem das seções).
   - Comparar tendências: o período atual continua, reverte ou acelera o que vinha acontecendo?
   - Manter coerência de narrativa com o que já foi dito ao cliente.

Se não houver relatório anterior (cliente novo), perguntar ao usuário se existe algum relatório anterior ou dado que possa servir de comparação antes de seguir. Sem retorno, usar o estilo descrito no `contexto.md` e, na falta dele, o formato padrão em "Estrutura da Entrega" — avisando o usuário que foi o primeiro, sem histórico para comparar.

A leitura do período sai errada se for feita contra um objetivo que não é o do cliente.

## Passo a passo Conteúdos

### 1. Cliente e período

Confirmar o cliente (slug) e o período analisado + o período de comparação (normalmente o mês anterior; alguns clientes comparam ano a ano ou trimestre a trimestre, respeitar o que o `contexto.md`/histórico indicar).

**Fechamentos de trimestre, semestre e ano (1TRI, 1SEM, ANO):** além da análise mensal, fazer também a **análise do período fechado**. O comparativo depende do histórico do cliente:

- **Mais de 12 meses de histórico** — comparar com o **mesmo período do ano anterior** (ex.: 1TRI/2026 vs. 1TRI/2025).
- **Menos de 12 meses de histórico** — comparar com o **período imediatamente anterior de mesma duração** (ex.: 1TRI/2026 vs. 4TRI/2025).

### 2. Identificar o material

Localizar o PDF em `dados/`. Se houver mais de um candidato, listar e perguntar qual analisar.

Extrair do arquivo e do nome do arquivo: nome do cliente, período coberto, canais incluídos, se há comparativo com período anterior.

Derivar o slug do cliente em kebab-case sem acento. Verificar se já existe pasta em `clientes/[slug]/` (a grafia da pasta pode variar, checar antes de criar uma nova).

### 3. Ler o relatório inteiro

PDFs de relatório costumam passar de 10 páginas. Ler em blocos com o parâmetro `pages`, no máximo 20 páginas por chamada, até o fim do documento. Não analisar com leitura parcial.

Montar uma tabela de trabalho interna (não vai para a entrega) com:
- Cada indicador, valor do período e variação versus período anterior
- Ranking de posts por alcance, por engajamento e por salvamento
- Formato, tema e data de cada post do topo e do fundo do ranking
- Dias e horários com melhor desempenho, se o relatório trouxer
- Dados demográficos e de origem do tráfego, se houver

Essa tabela é a fonte de evidência. Todo número citado na análise precisa sair dela literalmente.

Se o relatório estiver incompleto, sem comparativo ou com dados inconsistentes, dizer isso antes de analisar e seguir com a ressalva registrada.

### 4. Estudar o posicionamento do cliente

Ordem de busca:

**Primeiro, a pasta do cliente.** Ler o que existir em `clientes/[slug]/`: `onboarding/briefing.md`, `planejamento/`, `marca/identidade.md`, `relatorios/`.

**Depois, o site.** Se a URL aparecer no briefing ou no relatório, usar WebFetch na home e nas páginas de serviço, produto e sobre. Se não aparecer, perguntar a URL ao usuário antes de continuar.

**Por último, as redes.** Buscar o perfil público para observar frequência, consistência visual, bio e formato dominante.

Fechar essa etapa com um dossiê interno cobrindo: posicionamento, proposta de valor, público-alvo, produtos e serviços, diferenciais competitivos, tom de comunicação, objetivos aparentes do negócio e maturidade digital da marca.

Nada da análise pode contrariar esse dossiê. Se o conteúdo publicado contrariar, isso é um achado e entra na seção de posicionamento.

### 5. Escrever a análise

Seguir a estrutura de **"Estrutura Padrão Conteúdos"**, em "Estrutura da Entrega" abaixo, respeitando as "Regras de escrita".

Salvar em `clientes/[slug]/relatorios/analise-[mes]-[ano].md`.

## Passo a passo Anúncios

### 1. Cliente e período

Confirmar o cliente (slug) e o período analisado + o período de comparação (normalmente o mês anterior; alguns clientes comparam ano a ano ou trimestre a trimestre, respeitar o que o `contexto.md`/histórico indicar).

**Fechamentos de trimestre, semestre e ano (1TRI, 1SEM, ANO):** além da análise mensal, fazer também a **análise do período fechado**. O comparativo depende do histórico do cliente:

- **Mais de 12 meses de histórico** — comparar com o **mesmo período do ano anterior** (ex.: 1TRI/2026 vs. 1TRI/2025).
- **Menos de 12 meses de histórico** — comparar com o **período imediatamente anterior de mesma duração** (ex.: 1TRI/2026 vs. 4TRI/2025).

### 2. Dados do período

Puxar os dados do Reportei e questionar o usuário se é preciso analisar mais algum dado além dos que estão na ferramenta.

### 3. Ações do período

Listar as ações efetivamente executadas no período (o que foi mexido: verba, palavras-chave, negativas, novos grupos, testes de criativo, reestruturações). Se o usuário não informar, inferir a partir dos dados o que os números evidenciam e marcar para ele confirmar/complementar.

### 4. Escrever a análise no estilo do cliente

Montar o texto seguindo a estrutura do cliente (seção "Estilo do relatório" do `contexto.md` + relatórios anteriores) ou, na falta dela, **"Formato Padrão Anúncios"** em "Estrutura da Entrega" abaixo. Respeitar as "Regras de escrita". Regras transversais:
- Começar pelos ganhos de eficiência/avanços; depois os pontos de atenção.
- Comparar sempre com o período anterior e situar na série histórica.
- Linguagem calibrada ao leitor do cliente (ex.: WS Cranes → diretoria, executivo; Data Centrics → técnico B2B). Sem jargão de mídia quando o leitor não for de mídia.
- **Assinatura: puxar do `contexto.md` do cliente** quem assina o relatório daquele período — é a linha "Assinado por" dentro da seção "Estilo do relatório". Varia de cliente para cliente (o Sícula, por exemplo, é assinado por Vinícius Luiz e Sarah). Não fixar nome; se o `contexto.md` não disser quem assina, perguntar antes de fechar o texto.
- Não pedir validação do leitor dentro do texto.

Salvar em `clientes/[slug-cliente]/relatorios/relatorio-[mes]-[ano]-textos.md`.

## Conteúdos e Anúncios juntos

Quando o cliente pede relatório das duas frentes no mesmo período, a produção continua separada: rodar o "Passo a passo Conteúdos" e o "Passo a passo Anúncios" cada um do seu jeito, com sua própria coleta de dado, seu próprio dossiê (Conteúdos) e sua própria escrita. Não misturar as duas coletas nem escrever as duas análises ao mesmo tempo — é isso que mantém cada leitura rigorosa.

Só depois das duas análises prontas, unir os dois materiais num documento final único: abertura conjunta situando as duas frentes, os achados de Conteúdos e de Anúncios na sequência (mantendo a estrutura própria de cada um), e um fechamento de recomendações que olha as duas frentes juntas, não duas listas soltas.

Seguir então os passos de "Entrega" uma única vez, para o documento unido.

## Entrega

Depois de escrever a análise — Conteúdos, Anúncios, ou o documento unido das duas — o fechamento é o mesmo.

### 1. Gerar o HTML

O relatório é um carrossel de slides (mesmo motor do `/proposta`), não uma página de rolagem única — cada seção é um ou mais slides completos, navegáveis por seta/teclado/swipe. Os padrões de slide por seção, incluindo como dividir uma seção longa em mais de um slide, estão em `.claude/skills/relatorios/blocos.md`.

Ler `.claude/skills/relatorios/template.html`, substituir os placeholders e salvar em `clientes/[slug]/relatorios/analise-[slug]-[mes]-[ano].html` (Conteúdos), `clientes/[slug]/relatorios/relatorio-[slug]-[mes]-[ano].html` (Anúncios) ou `clientes/[slug]/relatorios/relatorio-completo-[slug]-[mes]-[ano].html` (Conteúdos + Anúncios unidos).

| Placeholder | Conteúdo |
|---|---|
| `{{CLIENTE}}` | Nome do cliente como a marca se escreve |
| `{{PERIODO}}` | Ex: `Julho de 2026` |
| `{{DATA}}` | Data da análise por extenso |
| `{{CANAIS}}` | Canais analisados, separados por vírgula |
| `{{LOGO_SRC}}` | Deixar o placeholder, o script injeta |

Os demais placeholders são **seções completas** (título + subtítulo + conteúdo, o bloco `.secao` inteiro). Cada um vira string vazia quando não se aplica ao tipo de relatório — é assim que o mesmo `template.html` serve pra Conteúdos, Anúncios ou o documento unido, sem seção órfã aparecendo em branco.

**Conteúdos:**

| Placeholder | Conteúdo |
|---|---|
| `{{VISAO_GERAL}}` | Seção "Visão geral do período" — dois `<p>` |
| `{{APRENDIZADOS}}` | Seção "Principais aprendizados" — blocos `.aprendizado` |
| `{{INDICADORES}}` | Seção "Interpretação dos indicadores" — blocos `.bloco-indicador` |
| `{{CONTEUDO_RESULTADO}}` | Seção "Relação entre conteúdo e resultado" — `<p>` e blocos `.padrao` |
| `{{POSICIONAMENTO}}` | Seção "Relação com o posicionamento da marca" — `<p>` e, se houver lacunas, um bloco `.lacuna` |
| `{{OPORTUNIDADES}}` | Seção "Oportunidades" — blocos `.oportunidade` |
| `{{RECOMENDACOES}}` | Seção "Recomendações práticas" — blocos `.recomendacao` |

**Anúncios:**

| Placeholder | Conteúdo |
|---|---|
| `{{PERIODO_ANALISADO}}` | Seção "📆 Período analisado" — texto curto, período atual vs. comparação |
| `{{ACOES_PERIODO}}` | Seção "⚙️ Ações do período anterior" — lista `.acao-lista`, até 5 itens |
| `{{LEITURA_METRICAS}}` | Seção "📊 Leitura estratégica das métricas" — blocos `.leitura` (variante `.atencao` pra ponto de atenção) |
| `{{PROXIMOS_PASSOS}}` | Seção "🚀 Próximos passos recomendados" — blocos `.proximo-passo` |
| `{{INSIGHTS_TENDENCIAS}}` | Seção "🔍 Insights e tendências" — blocos `.insight`. Opcional mesmo em relatório de Anúncios: string vazia se não houver insight relevante no período |

**Compartilhado:**

| Placeholder | Conteúdo |
|---|---|
| `{{RESSALVA}}` | Bloco `.ressalva` se o relatório tiver limitação relevante, senão string vazia |

Os padrões de HTML de cada bloco estão em `.claude/skills/relatorios/blocos.md`.

O HTML final cobre as duas estruturas quando fizerem parte do relatório: um relatório só de Anúncios preenche só os placeholders de Anúncios (os de Conteúdos ficam vazios); um relatório só de Conteúdos faz o inverso; o documento unido preenche os dois conjuntos, na ordem em que aparecem no `template.html` — todos os blocos de Conteúdos primeiro, depois todos os de Anúncios, como descrito em "Conteúdos e Anúncios juntos".

### 2. Injetar o logo

Verificar se o Node está disponível:

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
node --version
```

**Com Node:**

```powershell
node ".claude/skills/relatorios/injetar-logo.js" "clientes/[slug]/relatorios/[arquivo].html"
```

Se `marca/md-1-branco.png` não existir, o script aplica o lettering em texto automaticamente e avisa no console.

**Sem Node:** substituir as duas ocorrências de `{{LOGO_SRC}}` pelo data URI do lettering que está em `blocos.md`, seção "LOGO_SRC sem Node". O HTML fica completo do mesmo jeito.

### 3. Exportar o PDF

Depende de Node e Playwright. Verificar: `npx playwright --version`
Se não estiver instalado: `npm install -D playwright && npx playwright install chromium`

```powershell
node ".claude/skills/relatorios/exportar-pdf.js" "clientes/[slug]/relatorios/[arquivo].html" "clientes/[slug]/relatorios/[arquivo].pdf"
```

**Se o Node não estiver instalado nesta máquina:** entregar markdown e HTML, avisar que o PDF não foi gerado e orientar a alternativa manual, que dá o mesmo resultado: abrir o HTML no navegador, `Ctrl+P`, destino "Salvar como PDF", A4 paisagem, margens nenhuma, gráficos de plano de fundo ligados.

Não instalar Node por conta própria. Perguntar antes.

### 4. Retornar resultado

**Conteúdos:** informar os caminhos gerados (md, html, pdf), dizer explicitamente se o PDF saiu ou não, e perguntar se o usuário quer subir o arquivo para a pasta do cliente no Drive. Só subir após confirmação.

**Anúncios:** entregar o texto pronto para colar no Reportei. Listar no fim quaisquer pontos marcados `[confirmar]`. Se também tiver sido gerado HTML/PDF, informar os caminhos e seguir a mesma regra de só subir ao Drive após confirmação.

**Conteúdos + Anúncios unidos:** informar os caminhos do documento único gerado, seguir a mesma regra de confirmação antes de subir ao Drive.

## Estrutura da Entrega

### Estrutura Padrão Conteúdos

**Visão geral do período** — leitura executiva, no máximo dois parágrafos. Cobrir o comportamento geral do perfil, se houve fortalecimento de presença digital, quais movimentos mais chamam atenção e se a audiência mudou de comportamento. Abrir com a conclusão do período, não com contexto.

**Principais aprendizados** — entre 5 e 8, cada um com um título curto e duas a três frases de explicação. Cobrir uma mistura de: formatos que performaram, temas que geraram interesse, sinais de autoridade, comportamento da comunidade, oportunidades percebidas e gargalos. Pelo menos um aprendizado precisa ser desconfortável — diagnóstico sem gargalo identificado é relatório de vaidade, não consultoria.

**Interpretação dos indicadores** — não analisar métrica por métrica. Agrupar por função no funil:
- **Descoberta** — alcance, impressões, alcance de não seguidores.
- **Relacionamento** — engajamento, comentários, compartilhamentos.
- **Intenção** — salvamentos, cliques, visitas ao perfil.
- **Consolidação** — crescimento de base, retenção, recorrência.

Ler também as tensões entre blocos. Descoberta alta com intenção baixa significa uma coisa; relacionamento alto sem crescimento significa outra.

**Relação entre conteúdo e resultado** — identificar padrões concretos de tema, formato, linguagem, frequência, timing, identidade visual, CTA e storytelling. Nomear os posts e os temas específicos, não categorias vagas. Para cada padrão, explicar a hipótese que o sustenta.

**Relação com o posicionamento da marca** — comparar o que a marca diz ser (site, briefing, planejamento) com o que ela demonstrou ser no conteúdo do período. Se um pilar do planejamento não apareceu no período, isso é lacuna e precisa ser dito.

**Oportunidades** — de 4 a 6, cada uma amarrada a uma evidência do período, citando tema, formato ou pilar específico daquele cliente.

**Recomendações práticas** — de 4 a 6, cada uma com **o que fazer**, **por que fazer** e **impacto esperado**. Ordenar por relação entre impacto e esforço, começando pelo que dá mais retorno.

### Formato Padrão Anúncios

Usar só se não houver "Estilo do relatório" no `contexto.md` do cliente nem relatório anterior. Ajustar ao canal do cliente.

**📆 Período analisado** — período atual vs. comparação.

**⚙️ Ações do período anterior** — até 5 bullets objetivos, só ações executadas, sem avaliação.

**📊 Leitura estratégica das métricas** — até 5 pontos interpretativos; ganhos primeiro, atenção depois; cada ponto conecta métrica → impacto no negócio; não repetir números crus.

**🚀 Próximos passos recomendados** — propositivos, cada um ligado à análise do período.

**🔍 Insights e tendências** *(opcional)* — padrões do público, maturidade do funil, sazonalidade, implicações de médio prazo.

## Regras de escrita

### Regra dos números

Esta é a regra que define a qualidade da entrega.

**Proibido:** frase cujo sujeito é a métrica. "O alcance foi de X." "Os seguidores aumentaram Y." "O CPC caiu Z." Isso já está no relatório.

**Obrigatório:** frase cujo sujeito é o negócio, a audiência ou o conteúdo. O número entra depois, entre parênteses, apenas como comprovação de uma afirmação de direção.

- Errado: "O alcance cresceu 18% e as impressões 12%."
- Certo: "O conteúdo educativo se consolidou como principal porta de entrada da marca, e a maior parte do ganho de audiência veio de fora da base atual (alcance de não seguidores +34%)."

Regras de aplicação:
- Toda afirmação de aumento, queda, melhora ou piora precisa vir com o número do relatório que a comprova. Afirmação de direção sem evidência não pode existir.
- No máximo uma evidência numérica por parágrafo ou por aprendizado.
- Nenhuma seção abre com número.
- Nunca listar métricas em sequência nem reescrever tabelas e gráficos do relatório em texto.
- Todo número citado precisa aparecer literalmente no relatório de origem. Não calcular médias novas, não estimar, não criar comparativos que o relatório não traz.

### Contra a generalidade

Frases que serviriam para qualquer cliente não entram. Antes de fechar cada seção, testar: trocando o nome do cliente, o texto continua verdadeiro? Se continuar, está genérico e precisa ser reescrito com o tema, o formato ou o pilar específico daquela marca.

Banidas: "manter a constância", "conhecer melhor o público", "apostar em vídeo", "engajamento é fundamental", "seguir monitorando os resultados".

Cada ideia aparece uma vez só. Se um achado é forte o bastante para voltar em outra seção, ele volta com um ângulo novo, nunca com a mesma frase.

### Tom

Consultor sênior apresentando diagnóstico. Linguagem clara, executiva e estratégica. Voz ativa, frases curtas, ordem direta.

Registro um pouco mais formal que o padrão interno da Moinho, mas sem virar corporativês.

Não usar: emoji, travessão, títulos em caixa alta, jargão de marketing, jargão de IA, linguagem rebuscada, adjetivo elogioso sem evidência.

## Regras gerais

- Nunca inventar dado que não está no relatório de origem nem inferir número que ele não mostra
- Nunca analisar sem antes ter lido o `contexto.md` do cliente (Anúncios) ou estudado o posicionamento (Conteúdos)
- Se faltar comparativo com período anterior, dizer que a leitura de tendência fica limitada e analisar o que for possível
- Se existir análise/relatório anterior em `relatorios/`, verificar quais recomendações foram executadas e comentar o resultado delas
- Interpretação sempre conectada à decisão de negócio. Insight que não muda nada no próximo período não é insight

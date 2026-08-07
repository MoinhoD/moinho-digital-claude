---
name: analise-metricas
description: Analisa relatórios de desempenho de clientes em PDF (Reportei, Business Suite, Mlabs, Google Ads, Meta Ads) e gera um diagnóstico estratégico interpretativo, não descritivo. Estuda o posicionamento da marca antes de analisar. Entrega markdown + HTML + PDF na pasta do cliente.
---

## Quando usar

Disparar quando o usuário mencionar: analisar relatório de [cliente], análise de métricas, análise de desempenho, diagnóstico do mês, ler o relatório da pasta dados, /analise-metricas.

Também disparar quando o usuário apontar para um PDF de métricas em `dados/`.

## Contexto

Ler antes de começar:
- `_contexto/preferencias.md` — tom de voz e o que evitar
- `_contexto/empresa.md` — como a Moinho enxerga entrega de resultado
- `marca/design-guide.md` — identidade visual (para o HTML)

---

## Papel

Você atua como estrategista sênior de Social Media, Branding e Marketing Digital apresentando um diagnóstico ao cliente.

Quem vai ler já tem o relatório na mão e já viu todos os números. O trabalho aqui não é repetir o que aconteceu. É explicar por que aconteceu e o que fazer com isso.

---

## Passo a passo

### 1. Identificar o material

Localizar o PDF em `dados/`. Se houver mais de um candidato, listar e perguntar qual analisar.

Extrair do arquivo e do nome do arquivo:
- Nome do cliente
- Período coberto (mês/ano ou intervalo)
- Canais incluídos (Instagram, LinkedIn, Meta Ads, Google Ads, site)
- Se há comparativo com período anterior

Derivar o slug do cliente em kebab-case sem acento. Verificar se já existe pasta em `clientes/[slug]/` (a grafia da pasta pode variar, checar antes de criar uma nova).

### 2. Ler o relatório inteiro

PDFs de relatório costumam passar de 10 páginas. Ler em blocos com o parâmetro `pages`, no máximo 20 páginas por chamada, até o fim do documento. Não analisar com leitura parcial.

Montar uma tabela de trabalho interna (não vai para a entrega) com:
- Cada indicador, valor do período e variação versus período anterior
- Ranking de posts por alcance, por engajamento e por salvamento
- Formato, tema e data de cada post do topo e do fundo do ranking
- Dias e horários com melhor desempenho, se o relatório trouxer
- Dados demográficos e de origem do tráfego, se houver

Essa tabela é a fonte de evidência. Todo número citado na análise precisa sair dela literalmente.

Se o relatório estiver incompleto, sem comparativo ou com dados inconsistentes, dizer isso antes de analisar e seguir com a ressalva registrada.

### 3. Estudar o posicionamento do cliente

Ordem de busca:

**Primeiro, a pasta do cliente.** Ler o que existir em `clientes/[slug]/`:
- `onboarding/briefing.md` — objetivo, diferenciais, público
- `planejamento/` — pilares de conteúdo, personas, tom definido
- `marca/identidade.md` — identidade e atributos
- `relatorios/` — análises anteriores, para comparar evolução e não repetir recomendação já dada

**Depois, o site.** Se a URL aparecer no briefing ou no relatório, usar WebFetch na home e nas páginas de serviço, produto e sobre. Se não aparecer, perguntar a URL ao usuário antes de continuar.

**Por último, as redes.** Buscar o perfil público para observar frequência, consistência visual, bio e formato dominante.

Fechar essa etapa com um dossiê interno cobrindo: posicionamento, proposta de valor, público-alvo, produtos e serviços, diferenciais competitivos, tom de comunicação, objetivos aparentes do negócio e maturidade digital da marca.

Nada da análise pode contrariar esse dossiê. Se o conteúdo publicado contrariar, isso é um achado e entra na seção de posicionamento.

### 4. Escrever a análise

Seguir a estrutura da seção "Estrutura da entrega" abaixo, respeitando as regras de escrita.

Salvar em `clientes/[slug]/relatorios/analise-[mes]-[ano].md`.

### 5. Gerar o HTML

Ler `.claude/skills/analise-metricas/template.html`, substituir os placeholders e salvar em:
`clientes/[slug]/relatorios/analise-[slug]-[mes]-[ano].html`

| Placeholder | Conteúdo |
|---|---|
| `{{CLIENTE}}` | Nome do cliente como a marca se escreve |
| `{{PERIODO}}` | Ex: `Julho de 2026` |
| `{{DATA}}` | Data da análise por extenso |
| `{{CANAIS}}` | Canais analisados, separados por vírgula |
| `{{VISAO_GERAL}}` | Dois `<p>` |
| `{{APRENDIZADOS}}` | Blocos `.aprendizado` |
| `{{INDICADORES}}` | Blocos `.bloco-indicador` |
| `{{CONTEUDO_RESULTADO}}` | `<p>` e blocos `.padrao` |
| `{{POSICIONAMENTO}}` | `<p>` e, se houver lacunas, um bloco `.lacuna` |
| `{{OPORTUNIDADES}}` | Blocos `.oportunidade` |
| `{{RECOMENDACOES}}` | Blocos `.recomendacao` |
| `{{RESSALVA}}` | Bloco `.ressalva` se o relatório tiver limitação relevante, senão string vazia |
| `{{LOGO_SRC}}` | Deixar o placeholder, o script injeta |

Os padrões de HTML de cada bloco estão em `.claude/skills/analise-metricas/blocos.md`.

### 6. Injetar o logo

Verificar se o Node está disponível:

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
node --version
```

**Com Node:**

```powershell
node ".claude/skills/analise-metricas/injetar-logo.js" "clientes/[slug]/relatorios/analise-[slug]-[mes]-[ano].html"
```

Se `marca/md-1-branco.png` não existir, o script aplica o lettering em texto automaticamente e avisa no console.

**Sem Node:** substituir as duas ocorrências de `{{LOGO_SRC}}` pelo data URI do lettering que está em `blocos.md`, seção "LOGO_SRC sem Node". O HTML fica completo do mesmo jeito.

### 7. Exportar o PDF

Depende de Node e Playwright. Verificar: `npx playwright --version`
Se não estiver instalado: `npm install -D playwright && npx playwright install chromium`

```powershell
node ".claude/skills/analise-metricas/exportar-pdf.js" "clientes/[slug]/relatorios/analise-[slug]-[mes]-[ano].html" "clientes/[slug]/relatorios/analise-[slug]-[mes]-[ano].pdf"
```

**Se o Node não estiver instalado nesta máquina:** entregar markdown e HTML, avisar que o PDF não foi gerado e orientar a alternativa manual, que dá o mesmo resultado: abrir o HTML no navegador, `Ctrl+P`, destino "Salvar como PDF", A4 retrato, margens nenhuma, gráficos de plano de fundo ligados.

Não instalar Node por conta própria. Perguntar antes.

### 8. Retornar resultado

Informar os caminhos gerados, dizer explicitamente se o PDF saiu ou não, e perguntar se o usuário quer subir o arquivo para a pasta do cliente no Drive. Só subir após confirmação.

---

## Estrutura da entrega

### Visão geral do período

Leitura executiva, no máximo dois parágrafos. Cobrir o comportamento geral do perfil, se houve fortalecimento de presença digital, quais movimentos mais chamam atenção e se a audiência mudou de comportamento.

Abrir com a conclusão do mês, não com contexto. O primeiro parágrafo precisa entregar o veredito; o segundo, a nuance por trás dele.

### Principais aprendizados

Entre 5 e 8 aprendizados estratégicos, cada um com um título curto e duas a três frases de explicação.

Cobrir uma mistura de: formatos que performaram, temas que geraram interesse, sinais de autoridade, comportamento da comunidade, oportunidades percebidas e gargalos. Nunca oito aprendizados sobre a mesma dimensão.

Pelo menos um aprendizado precisa ser desconfortável. Diagnóstico sem gargalo identificado é relatório de vaidade, não consultoria.

### Interpretação dos indicadores

Não analisar métrica por métrica. Agrupar por função no funil e explicar o que cada bloco revela sobre o negócio:

- **Descoberta** — alcance, impressões, alcance de não seguidores. O que a marca conseguiu em território novo.
- **Relacionamento** — engajamento, comentários, compartilhamentos. Que tipo de vínculo a audiência aceita ter.
- **Intenção** — salvamentos, cliques, visitas ao perfil. Quem saiu do consumo passivo e demonstrou interesse comercial.
- **Consolidação** — crescimento de base, retenção, recorrência. O que ficou depois que o mês acabou.

Ler também as tensões entre blocos. Descoberta alta com intenção baixa significa uma coisa; relacionamento alto sem crescimento significa outra. É nessas relações que está o insight.

### Relação entre conteúdo e resultado

Identificar padrões concretos de temas, formatos, linguagem, frequência, timing, identidade visual, CTA e storytelling. Nomear os posts e os temas específicos, não categorias vagas.

Para cada padrão, explicar a hipótese que o sustenta. Um padrão sem explicação de causa é observação, não análise.

### Relação com o posicionamento da marca

Comparar o que a marca diz ser (site, briefing, planejamento) com o que ela demonstrou ser no conteúdo do período.

Responder: os conteúdos reforçam o posicionamento; existe coerência entre marca e comunicação; onde há oportunidade de fortalecer autoridade; quais lacunas aparecem.

Se um pilar do planejamento não apareceu no conteúdo do mês, isso é lacuna e precisa ser dito.

### Oportunidades

De 4 a 6 oportunidades estratégicas para o mês seguinte, cada uma amarrada a uma evidência do período.

Podem envolver novos formatos, mais profundidade, séries, prova social, humanização, bastidores, conteúdo institucional ou distribuição. Escolher pelo que os dados pedem, não pela lista.

Cada oportunidade precisa citar tema, formato ou pilar específico daquele cliente. Oportunidade que serviria para qualquer marca deve ser reescrita.

### Recomendações práticas

De 4 a 6 recomendações acionáveis. Cada uma com três partes explícitas:

- **O que fazer** — a ação, específica o suficiente para entrar no planejamento da semana
- **Por que fazer** — o achado do período que justifica
- **Impacto esperado** — qual indicador deve reagir e em que direção

Ordenar por relação entre impacto e esforço, começando pelo que dá mais retorno.

---

## Regras de escrita

### Regra dos números

Esta é a regra que define a qualidade da entrega.

**Proibido:** frase cujo sujeito é a métrica. "O alcance foi de X." "Os seguidores aumentaram Y." "As impressões chegaram a Z." Isso já está no relatório.

**Obrigatório:** frase cujo sujeito é o negócio, a audiência ou o conteúdo. O número entra depois, entre parênteses, apenas como comprovação de uma afirmação de direção.

Formato: afirmação interpretativa, seguida da evidência curta.

- Errado: "O alcance cresceu 18% e as impressões 12%."
- Certo: "O conteúdo educativo se consolidou como principal porta de entrada da marca, e a maior parte do ganho de audiência veio de fora da base atual (alcance de não seguidores +34%)."

Regras de aplicação:
- Toda afirmação de aumento, queda, melhora ou piora precisa vir com o número do relatório que a comprova. Afirmação de direção sem evidência não pode existir.
- No máximo uma evidência numérica por parágrafo ou por aprendizado.
- Nenhuma seção abre com número.
- Nunca listar métricas em sequência nem reescrever tabelas e gráficos do relatório em texto.
- Todo número citado precisa aparecer literalmente no PDF. Não calcular médias novas, não estimar, não criar comparativos que o relatório não traz.

### Contra a generalidade

Frases que serviriam para qualquer cliente não entram. Antes de fechar cada seção, testar: trocando o nome do cliente, o texto continua verdadeiro? Se continuar, está genérico e precisa ser reescrito com o tema, o formato ou o pilar específico daquela marca.

Banidas: "manter a constância", "conhecer melhor o público", "apostar em vídeo", "engajamento é fundamental", "seguir monitorando os resultados".

Cada ideia aparece uma vez só. Se um achado é forte o bastante para voltar em outra seção, ele volta com um ângulo novo, nunca com a mesma frase.

### Tom

Consultor sênior apresentando diagnóstico. Linguagem clara, executiva e estratégica. Voz ativa, frases curtas, ordem direta.

Registro um pouco mais formal que o padrão interno da Moinho, mas sem virar corporativês.

Não usar: emoji, travessão, títulos em caixa alta, jargão de marketing, jargão de IA, linguagem rebuscada, adjetivo elogioso sem evidência.

---

## Regras gerais

- Nunca inventar dado que não está no PDF nem inferir número que o relatório não mostra
- Nunca analisar sem antes estudar o posicionamento do cliente
- Se faltar comparativo com período anterior, dizer que a leitura de tendência fica limitada e analisar o que for possível
- Se a análise anterior existir em `relatorios/`, verificar quais recomendações foram executadas e comentar o resultado delas
- Interpretação sempre conectada à decisão de negócio. Insight que não muda nada no próximo mês não é insight

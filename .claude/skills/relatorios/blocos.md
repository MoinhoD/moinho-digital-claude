# Padrões de HTML dos blocos

Referência para preencher os placeholders de `template.html`. Cada placeholder de seção é o **slide inteiro** — `<div class="slide ...">` completo, container, título e conteúdo. Quando a seção não se aplica ao relatório (ex.: placeholder de Anúncios num relatório só de Conteúdos), o placeholder vira string vazia e nenhum slide órfão aparece no carrossel.

O relatório é um carrossel (mesmo motor do `/proposta`): um slide por seção, navegação por setas/teclado/swipe, contador e barra de progresso. Impressão gera uma página A4 paisagem por slide — o que não coube na tela do slide não aparece no PDF, então nunca contar com rolagem interna para caber conteúdo.

**Dividindo uma seção em mais de um slide:** nas seções em grade de duas colunas (Aprendizados, Indicadores, Conteúdo x Resultado, Oportunidades, Recomendações, Leitura de métricas, Próximos passos, Insights), se os cards não couberem confortavelmente em um slide — referência: até 4 cards por slide — dividir em slides consecutivos, todos com a mesma classe de fundo da seção. Repetir o `<h2>` e o `<p class="subtitulo">` em cada slide (idêntico, sem numerar "parte 1/2"), continuando a grade de onde parou no slide anterior.

---

## Conteúdos

### VISAO_GERAL

Slide de abertura, sem grade — só o veredito do período.

```html
<div class="slide bg-roxo">
  <div class="container">
    <p class="label-tag">Visão geral do período</p>
    <p class="lead-relatorio">[Veredito do período. Primeira frase entrega a conclusão, não o contexto.]</p>
    <p class="lead-relatorio">[A nuance por trás do veredito: o que mudou no comportamento da audiência e o que isso significa para o negócio.]</p>
  </div>
</div>
```

### APRENDIZADOS

Entre 5 e 8 cards, numerados em sequência, em grade de duas colunas.

```html
<div class="slide bg-creme slide-tall">
  <div class="container">
    <div class="secao">
      <h2>Principais aprendizados</h2>
      <p class="subtitulo">O que o período ensinou sobre a marca e a audiência</p>
      <div class="aprendizados-grid">
        <div class="aprendizado">
          <div class="num">1</div>
          <div>
            <h3>[Título curto, afirmativo, específico da marca]</h3>
            <p>[Duas a três frases explicando o aprendizado e a hipótese que o sustenta. Se afirmar direção, incluir a evidência do relatório entre parênteses.]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### INDICADORES

Um card por função no funil: Descoberta, Relacionamento, Intenção, Consolidação. Para tensões entre blocos, usar a variante `tensao` — incluir pelo menos uma quando os dados mostrarem descompasso.

```html
<div class="slide">
  <div class="container">
    <div class="secao">
      <h2>Interpretação dos indicadores</h2>
      <p class="subtitulo">O que os dados revelam, agrupados por função no funil</p>
      <div class="indicadores-grid">
        <div class="bloco-indicador">
          <h3>Descoberta</h3>
          <p>[O que a marca conseguiu em território novo e por quê. Interpretação, não listagem.]</p>
        </div>
        <div class="bloco-indicador tensao">
          <h3>Tensão identificada</h3>
          <p>[Ex: o descompasso entre volume de descoberta e sinais de intenção comercial, e o que ele indica sobre a jornada do público.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### CONTEUDO_RESULTADO

Um parágrafo de abertura com a leitura geral do padrão, depois os cards em grade.

```html
<div class="slide bg-creme">
  <div class="container">
    <div class="secao">
      <h2>Relação entre conteúdo e resultado</h2>
      <p class="subtitulo">Padrões identificados e as hipóteses que os explicam</p>
      <p>[Leitura geral: qual lógica organiza o que funcionou e o que não funcionou no período.]</p>
      <div class="padroes-grid">
        <div class="padrao">
          <h3>[Dimensão: tema, formato, linguagem, frequência, timing, identidade visual, CTA ou storytelling]</h3>
          <p>[O padrão observado, nomeando conteúdos e temas específicos, mais a hipótese de causa.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### POSICIONAMENTO

Parágrafos de análise e, quando houver descolamento entre marca e comunicação, um ou dois blocos de lacuna.

```html
<div class="slide">
  <div class="container">
    <div class="secao">
      <h2>Relação com o posicionamento da marca</h2>
      <p class="subtitulo">Coerência entre o que a marca diz ser e o que ela comunicou</p>
      <p>[Comparação entre o que a marca diz ser no site e nos materiais e o que ela demonstrou ser no conteúdo do período.]</p>
      <p>[Onde há oportunidade de fortalecer autoridade, considerando a maturidade digital da marca.]</p>
      <div class="lacuna">
        <h3>Lacuna: [nome curto da lacuna]</h3>
        <p>[Qual pilar, promessa ou diferencial do posicionamento não apareceu no conteúdo e qual o custo disso.]</p>
      </div>
    </div>
  </div>
</div>
```

### OPORTUNIDADES

De 4 a 6 cards em grade.

```html
<div class="slide bg-creme slide-tall">
  <div class="container">
    <div class="secao">
      <h2>Oportunidades</h2>
      <p class="subtitulo">Movimentos estratégicos para o próximo período</p>
      <div class="oportunidades-grid">
        <div class="oportunidade">
          <h3>[Movimento específico, com tema ou formato nomeado]</h3>
          <p>[O que fazer e a evidência do período que justifica esse movimento agora.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### RECOMENDACOES

De 4 a 6 cards em grade, ordenados por impacto sobre esforço.

```html
<div class="slide slide-tall">
  <div class="container">
    <div class="secao">
      <h2>Recomendações práticas</h2>
      <p class="subtitulo">Ordenadas por relação entre impacto e esforço</p>
      <div class="recomendacoes-grid">
        <div class="recomendacao">
          <h3>[Ação em uma linha]</h3>
          <div class="linha">
            <span class="rot">O que fazer</span>
            <p>[Específico o suficiente para entrar no planejamento da semana: formato, tema, frequência.]</p>
          </div>
          <div class="linha">
            <span class="rot">Por que fazer</span>
            <p>[O achado do período que sustenta a decisão.]</p>
          </div>
          <div class="linha">
            <span class="rot">Impacto esperado</span>
            <p>[Qual indicador deve reagir e em que direção.]</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Anúncios

### PERIODO_ANALISADO

Slide de abertura, sem grade. Sem número solto como texto de entrada — a frase é o veredito, o número vem depois.

```html
<div class="slide bg-roxo">
  <div class="container">
    <p class="label-tag">📆 Período analisado</p>
    <p class="lead-relatorio">[Ex: julho de 2026, comparado a junho de 2026 e situado na série histórica desde novembro de 2025.]</p>
  </div>
</div>
```

### Blocos de análise: métricas → leitura → tabelas

Relatório de Anúncios se organiza por **bloco de análise** — normalmente um por fonte de dado
(ex.: "Contatos e Vendas" do CRM e "Google Ads" da mídia). Dentro de cada bloco, sempre a mesma
sequência de slides, na ordem em que o cliente já lê o relatório da ferramenta:

1. **Métricas** — um slide de KPIs com os números do período e a variação sobre o período anterior.
2. **Leitura** — os slides de interpretação daquele bloco (cards em grade, até 4 por slide).
3. **Tabelas** — os slides de tabela daquele bloco.

Todos os slides do bloco repetem o mesmo `<h2>` (o nome do bloco); o `<p class="subtitulo">` diz em
que etapa está ("Métricas do período", "Leitura do período", "Tabelas do período"). Terminado um
bloco, começa o próximo com a mesma sequência. Não juntar as métricas de todos os blocos num slide
só, nem empurrar todas as tabelas para o fim do relatório: isso quebra a leitura por bloco.

#### Slide de métricas (KPIs)

Até 8 KPIs por slide, em grade de 4 colunas. A variação vai colorida por **efeito no negócio**, não
pelo sinal: `bom` (roxo) para o que melhorou, `ruim` (vermelho) para o que piorou, sem classe para o
que é neutro. Uma queda em "oportunidades perdidas" é `bom`; uma alta em "custo por conversão" é `ruim`.

```html
<div class="slide bg-creme">
  <div class="container">
    <div class="secao">
      <h2>[Nome do bloco]</h2>
      <p class="subtitulo">Métricas do período · [fonte do dado]</p>
      <div class="kpi-grid">
        <div class="kpi">
          <span class="rot">[Nome da métrica]</span>
          <span class="val">[Valor do período]</span>
          <span class="var bom">[+X%]</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### Slide de tabelas

Uma tabela por slide, ou duas lado a lado dentro de `.tabela-dupla` quando forem curtas. Cabeçalho e
células numéricas usam `class="num"` (alinha à direita). A linha de fechamento usa `class="total"`.
Destaques pontuais com `.alta` (roxo) e `.baixa` (vermelho) — não colorir a tabela inteira. A
`p.legenda` explica origem do dado ou ressalva de método, e é onde entram as notas de apuração:
o relatório não tem slide de ressalva quando a limitação é só de uma tabela.

Tabela não rola: o que não couber na tela do slide some do PDF. Passou de ~11 linhas, dividir em
dois slides ou cortar linhas para as que sustentam a análise.

```html
<div class="slide bg-creme">
  <div class="container">
    <div class="secao">
      <h2>[Nome do bloco]</h2>
      <p class="subtitulo">Tabelas do período</p>
      <div class="tab-bloco">
        <h3>[Título da tabela]</h3>
        <table class="dados">
          <thead><tr><th>[Dimensão]</th><th class="num">[Período anterior]</th><th class="num">[Período]</th></tr></thead>
          <tbody>
            <tr><td>[Linha]</td><td class="num">[valor]</td><td class="num"><span class="alta">[valor]</span></td></tr>
            <tr class="total"><td>Total</td><td class="num">[valor]</td><td class="num">[valor]</td></tr>
          </tbody>
        </table>
        <p class="legenda">[Origem do dado e ressalva de método, quando houver.]</p>
      </div>
    </div>
  </div>
</div>
```

### ACOES_PERIODO

Até 5 itens, objetivos, só o que foi executado — sem avaliação aqui, a leitura fica pra próxima seção.

```html
<div class="slide bg-creme">
  <div class="container">
    <div class="secao">
      <h2>⚙️ Ações do período anterior</h2>
      <p class="subtitulo">O que foi executado, sem avaliação</p>
      <ul class="acao-lista">
        <li>[Ação objetiva executada no período]</li>
        <li>[Outra ação objetiva]</li>
      </ul>
    </div>
  </div>
</div>
```

### LEITURA_METRICAS

Até 5 cards em grade, ganhos primeiro, atenção depois. Usar a variante `atencao` pros pontos que pedem cuidado.

```html
<div class="slide slide-tall">
  <div class="container">
    <div class="secao">
      <h2>📊 Leitura estratégica das métricas</h2>
      <p class="subtitulo">Ganhos primeiro, pontos de atenção depois</p>
      <div class="leitura-grid">
        <div class="leitura">
          <h3>[Título curto do ganho]</h3>
          <p>[Ponto interpretativo, conectando métrica → impacto no negócio.]</p>
        </div>
        <div class="leitura atencao">
          <h3>[Título curto do ponto de atenção]</h3>
          <p>[Ponto interpretativo de atenção, com a métrica que embasa.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### PROXIMOS_PASSOS

Cards em grade, propositivos, ligados à leitura estratégica acima.

```html
<div class="slide bg-creme slide-tall">
  <div class="container">
    <div class="secao">
      <h2>🚀 Próximos passos recomendados</h2>
      <p class="subtitulo">Propositivos, ligados à análise do período</p>
      <div class="proximos-grid">
        <div class="proximo-passo">
          <h3>[Ação recomendada em uma linha]</h3>
          <p>[Por que fazer, ligado ao que foi visto na leitura estratégica.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### INSIGHTS_TENDENCIAS

Opcional — só incluir quando houver padrão real de público, funil ou sazonalidade. Sem padrão relevante, o placeholder vira string vazia.

```html
<div class="slide">
  <div class="container">
    <div class="secao">
      <h2>🔍 Insights e tendências</h2>
      <p class="subtitulo">Padrões, maturidade do funil e sazonalidade</p>
      <div class="insights-grid">
        <div class="insight">
          <h3>[Padrão identificado]</h3>
          <p>[O que esse padrão indica sobre o público ou o momento da conta.]</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Compartilhado

### LOGO_SRC sem Node

Se o Node não estiver disponível na máquina, substituir `{{LOGO_SRC}}` (as duas ocorrências: capa e fechamento) por este valor, que renderiza o lettering em texto sem depender de arquivo externo:

```
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNjAgNDAiPjx0ZXh0IHg9IjAiIHk9IjI4IiBmb250LWZhbWlseT0iTm90byBTZXJpZiwgR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9IiNFRkVFREYiPm1vaW5obyBkaWdpdGFsPC90ZXh0Pjwvc3ZnPg==
```

### RESSALVA

Só incluir quando o relatório tiver limitação que afete a leitura. Caso contrário, substituir o placeholder por string vazia — sem slide de ressalva.

```html
<div class="slide bg-creme">
  <div class="container">
    <div class="ressalva-box">
      <strong>Sobre esta análise:</strong> [ex: o relatório do período não traz comparativo com o mês anterior em parte dos indicadores, o que limita a leitura de tendência nesses pontos.]
    </div>
  </div>
</div>
```

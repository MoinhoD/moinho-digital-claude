# Padrões de HTML dos blocos

Referência para preencher os placeholders de `template.html`. Cada placeholder de seção é o bloco `.secao` **completo** — cabeçalho incluído, não só o conteúdo interno. Quando a seção não se aplica ao relatório (ex.: placeholder de Anúncios num relatório só de Conteúdos), o placeholder vira string vazia e nada é renderizado ali, sem cabeçalho órfão.

---

## Conteúdos

### VISAO_GERAL

```html
<div class="secao">
  <h2>Visão geral do período</h2>
  <p class="subtitulo">Leitura executiva do mês</p>
  <p>[Veredito do período. Primeira frase entrega a conclusão, não o contexto.]</p>
  <p>[A nuance por trás do veredito: o que mudou no comportamento da audiência e o que isso significa para o negócio.]</p>
</div>
```

### APRENDIZADOS

Entre 5 e 8 blocos, numerados em sequência.

```html
<div class="secao">
  <h2>Principais aprendizados</h2>
  <p class="subtitulo">O que o período ensinou sobre a marca e a audiência</p>
  <div class="aprendizado">
    <div class="num">1</div>
    <div>
      <h3>[Título curto, afirmativo, específico da marca]</h3>
      <p>[Duas a três frases explicando o aprendizado e a hipótese que o sustenta. Se afirmar direção, incluir a evidência do relatório entre parênteses.]</p>
    </div>
  </div>
</div>
```

### INDICADORES

Um bloco por função no funil: Descoberta, Relacionamento, Intenção, Consolidação. Para tensões entre blocos, usar a variante `tensao` — incluir pelo menos uma quando os dados mostrarem descompasso.

```html
<div class="secao">
  <h2>Interpretação dos indicadores</h2>
  <p class="subtitulo">O que os dados revelam, agrupados por função no funil</p>
  <div class="bloco-indicador">
    <h3>Descoberta</h3>
    <p>[O que a marca conseguiu em território novo e por quê. Interpretação, não listagem.]</p>
  </div>
  <div class="bloco-indicador tensao">
    <h3>Tensão identificada</h3>
    <p>[Ex: o descompasso entre volume de descoberta e sinais de intenção comercial, e o que ele indica sobre a jornada do público.]</p>
  </div>
</div>
```

### CONTEUDO_RESULTADO

Um parágrafo de abertura com a leitura geral do padrão, depois os blocos.

```html
<div class="secao">
  <h2>Relação entre conteúdo e resultado</h2>
  <p class="subtitulo">Padrões identificados e as hipóteses que os explicam</p>
  <p>[Leitura geral: qual lógica organiza o que funcionou e o que não funcionou no período.]</p>
  <div class="padrao">
    <h3>[Dimensão: tema, formato, linguagem, frequência, timing, identidade visual, CTA ou storytelling]</h3>
    <p>[O padrão observado, nomeando conteúdos e temas específicos, mais a hipótese de causa.]</p>
  </div>
</div>
```

### POSICIONAMENTO

Parágrafos de análise e, quando houver descolamento entre marca e comunicação, um ou dois blocos de lacuna.

```html
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
```

### OPORTUNIDADES

De 4 a 6 blocos.

```html
<div class="secao">
  <h2>Oportunidades</h2>
  <p class="subtitulo">Movimentos estratégicos para o próximo período</p>
  <div class="oportunidade">
    <h3>[Movimento específico, com tema ou formato nomeado]</h3>
    <p>[O que fazer e a evidência do período que justifica esse movimento agora.]</p>
  </div>
</div>
```

### RECOMENDACOES

De 4 a 6 blocos, ordenados por impacto sobre esforço.

```html
<div class="secao">
  <h2>Recomendações práticas</h2>
  <p class="subtitulo">Ordenadas por relação entre impacto e esforço</p>
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
```

---

## Anúncios

### PERIODO_ANALISADO

Texto curto. Sem número solto como abertura — a frase é o veredito, o número vem depois.

```html
<div class="secao">
  <h2>📆 Período analisado</h2>
  <p class="subtitulo">Período atual e período de comparação</p>
  <p class="periodo-txt">[Ex: julho de 2026, comparado a junho de 2026 e situado na série histórica desde novembro de 2025.]</p>
</div>
```

### ACOES_PERIODO

Até 5 itens, objetivos, só o que foi executado — sem avaliação aqui, a leitura fica pra próxima seção.

```html
<div class="secao">
  <h2>⚙️ Ações do período anterior</h2>
  <p class="subtitulo">O que foi executado, sem avaliação</p>
  <ul class="acao-lista">
    <li>[Ação objetiva executada no período]</li>
    <li>[Outra ação objetiva]</li>
  </ul>
</div>
```

### LEITURA_METRICAS

Até 5 pontos, ganhos primeiro, atenção depois. Usar a variante `atencao` pros pontos que pedem cuidado.

```html
<div class="secao">
  <h2>📊 Leitura estratégica das métricas</h2>
  <p class="subtitulo">Ganhos primeiro, pontos de atenção depois</p>
  <div class="leitura">
    <h3>[Título curto do ganho]</h3>
    <p>[Ponto interpretativo, conectando métrica → impacto no negócio.]</p>
  </div>
  <div class="leitura atencao">
    <h3>[Título curto do ponto de atenção]</h3>
    <p>[Ponto interpretativo de atenção, com a métrica que embasa.]</p>
  </div>
</div>
```

### PROXIMOS_PASSOS

Propositivos, ligados à leitura estratégica acima.

```html
<div class="secao">
  <h2>🚀 Próximos passos recomendados</h2>
  <p class="subtitulo">Propositivos, ligados à análise do período</p>
  <div class="proximo-passo">
    <h3>[Ação recomendada em uma linha]</h3>
    <p>[Por que fazer, ligado ao que foi visto na leitura estratégica.]</p>
  </div>
</div>
```

### INSIGHTS_TENDENCIAS

Opcional — só incluir quando houver padrão real de público, funil ou sazonalidade. Sem padrão relevante, o placeholder vira string vazia.

```html
<div class="secao">
  <h2>🔍 Insights e tendências</h2>
  <p class="subtitulo">Padrões, maturidade do funil e sazonalidade</p>
  <div class="insight">
    <h3>[Padrão identificado]</h3>
    <p>[O que esse padrão indica sobre o público ou o momento da conta.]</p>
  </div>
</div>
```

---

## Compartilhado

### LOGO_SRC sem Node

Se o Node não estiver disponível na máquina, substituir `{{LOGO_SRC}}` (as duas ocorrências) por este valor, que renderiza o lettering em texto sem depender de arquivo externo:

```
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNjAgNDAiPjx0ZXh0IHg9IjAiIHk9IjI4IiBmb250LWZhbWlseT0iTm90byBTZXJpZiwgR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9IiNFRkVFREYiPm1vaW5obyBkaWdpdGFsPC90ZXh0Pjwvc3ZnPg==
```

### RESSALVA

Só incluir quando o relatório tiver limitação que afete a leitura. Caso contrário, substituir o placeholder por string vazia.

```html
<div class="ressalva">
  <strong>Sobre esta análise:</strong> [ex: o relatório do período não traz comparativo com o mês anterior em parte dos indicadores, o que limita a leitura de tendência nesses pontos.]
</div>
```

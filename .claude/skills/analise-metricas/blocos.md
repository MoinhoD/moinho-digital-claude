# Padrões de HTML dos blocos

Referência para preencher os placeholders de `template.html`.

---

## VISAO_GERAL

Dois parágrafos. Nada além disso.

```html
<p>[Veredito do período. Primeira frase entrega a conclusão, não o contexto.]</p>
<p>[A nuance por trás do veredito: o que mudou no comportamento da audiência e o que isso significa para o negócio.]</p>
```

---

## APRENDIZADOS

Entre 5 e 8 blocos, numerados em sequência.

```html
<div class="aprendizado">
  <div class="num">1</div>
  <div>
    <h3>[Título curto, afirmativo, específico da marca]</h3>
    <p>[Duas a três frases explicando o aprendizado e a hipótese que o sustenta. Se afirmar direção, incluir a evidência do relatório entre parênteses.]</p>
  </div>
</div>
```

---

## INDICADORES

Um bloco por função no funil: Descoberta, Relacionamento, Intenção, Consolidação.

```html
<div class="bloco-indicador">
  <h3>Descoberta</h3>
  <p>[O que a marca conseguiu em território novo e por quê. Interpretação, não listagem.]</p>
</div>
```

Para as tensões entre blocos, usar a variante `tensao`. Incluir pelo menos uma quando os dados mostrarem descompasso.

```html
<div class="bloco-indicador tensao">
  <h3>Tensão identificada</h3>
  <p>[Ex: o descompasso entre volume de descoberta e sinais de intenção comercial, e o que ele indica sobre a jornada do público.]</p>
</div>
```

---

## CONTEUDO_RESULTADO

Um parágrafo de abertura com a leitura geral do padrão, depois os blocos.

```html
<p>[Leitura geral: qual lógica organiza o que funcionou e o que não funcionou no período.]</p>

<div class="padrao">
  <h3>[Dimensão: tema, formato, linguagem, frequência, timing, identidade visual, CTA ou storytelling]</h3>
  <p>[O padrão observado, nomeando conteúdos e temas específicos, mais a hipótese de causa.]</p>
</div>
```

---

## POSICIONAMENTO

Parágrafos de análise e, quando houver descolamento entre marca e comunicação, um ou dois blocos de lacuna.

```html
<p>[Comparação entre o que a marca diz ser no site e nos materiais e o que ela demonstrou ser no conteúdo do período.]</p>
<p>[Onde há oportunidade de fortalecer autoridade, considerando a maturidade digital da marca.]</p>

<div class="lacuna">
  <h3>Lacuna: [nome curto da lacuna]</h3>
  <p>[Qual pilar, promessa ou diferencial do posicionamento não apareceu no conteúdo e qual o custo disso.]</p>
</div>
```

---

## OPORTUNIDADES

De 4 a 6 blocos.

```html
<div class="oportunidade">
  <h3>[Movimento específico, com tema ou formato nomeado]</h3>
  <p>[O que fazer e a evidência do período que justifica esse movimento agora.]</p>
</div>
```

---

## RECOMENDACOES

De 4 a 6 blocos, ordenados por impacto sobre esforço.

```html
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
```

---

## LOGO_SRC sem Node

Se o Node não estiver disponível na máquina, substituir `{{LOGO_SRC}}` (as duas ocorrências) por este valor, que renderiza o lettering em texto sem depender de arquivo externo:

```
data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAyNjAgNDAiPjx0ZXh0IHg9IjAiIHk9IjI4IiBmb250LWZhbWlseT0iTm90byBTZXJpZiwgR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9IiNFRkVFREYiPm1vaW5obyBkaWdpdGFsPC90ZXh0Pjwvc3ZnPg==
```

---

## RESSALVA

Só incluir quando o relatório tiver limitação que afete a leitura. Caso contrário, substituir o placeholder por string vazia.

```html
<div class="ressalva">
  <strong>Sobre esta análise:</strong> [ex: o relatório do período não traz comparativo com o mês anterior em parte dos indicadores, o que limita a leitura de tendência nesses pontos.]
</div>
```

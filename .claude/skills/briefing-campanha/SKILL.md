---
name: briefing-campanha
description: Gera o briefing de uma nova campanha de mídia paga (Google Ads ou Meta Ads) no padrão da Moinho. Roda dentro do contexto de qualquer cliente. Produz o briefing em markdown e uma versão HTML com a identidade visual da Moinho. Google = configuração de campanha (grupos, palavras-chave, RSA, UTM, negativas, extensões). Meta = briefing de criativo (legenda, cards, CTAs).
---

## Quando usar

Disparar quando o usuário pedir: gerar briefing de campanha, briefing de anúncios, montar campanha nova para [cliente], briefing Google Ads / Meta Ads, /briefing-campanha.

Skill **geral** — funciona para qualquer cliente já existente ou novo. Não é específica de um cliente.

## Contexto

Antes de começar, ler:
- `clientes/[slug-cliente]/contexto.md` — quem é o cliente, produto, público, canais, KPIs, tom de voz. **Sempre ler.**
- `marca/design-guide.md` — identidade visual da Moinho (cores, fontes) para a versão HTML.

Se já houver briefings anteriores em `clientes/[slug-cliente]/campanhas/`, ler para manter consistência de nomenclatura (UTM, nomes de campanha/grupo).

## Passo a passo

### 1. Cliente e canal

1. Confirmar o cliente. Derivar o slug (kebab-case, sem acento). Se a pasta `clientes/[slug]/campanhas/` não existir, criar.
2. Perguntar o **canal**: **Google Ads** ou **Meta Ads**. (Se o usuário já disse, não repergunta.)
   - Google → seguir `estrutura-google.md`
   - Meta → seguir `estrutura-meta.md`

### 2. Coletar as informações

Verificar se há um brief/transcrição em `dados/` ou na pasta do cliente. Se houver, extrair de lá.

Se não houver, perguntar **uma de cada vez** só o que faltar (o `contexto.md` já cobre parte):

**Comum aos dois canais:**
1. Objetivo da campanha (leads/WhatsApp, vendas, tráfego, download, reconhecimento?)
2. Destino do clique (site, landing page, WhatsApp, formulário?) — URL exata
3. Orçamento (diário ou mensal) e período de veiculação
4. Público/localização, se diferente do que está no `contexto.md`
5. Produto/oferta/tema específico desta campanha

**Só Google:** palavras-chave prioritárias ou a evitar; padrão de UTM se o cliente já usa um (checar campanhas anteriores).
**Só Meta:** formato (carrossel, imagem única, vídeo, stories), nº de cards, ângulo criativo.

Não inventar dados de negócio. O que não for respondido nem estiver no contexto, marcar como `[a definir]`.

### 3. Gerar o briefing em markdown

Montar o conteúdo seguindo a estrutura do canal (`estrutura-google.md` ou `estrutura-meta.md`), calibrado ao cliente.

Regras de qualidade:
- **Google:** respeitar limites — títulos ≤ 30 caracteres, descrições ≤ 90. Contar os caracteres e mostrar na tabela. Mínimo de 10–12 títulos e 3 descrições por grupo. UTM consistente e explicado. Sempre incluir palavras-chave negativas e extensões.
- **Meta:** legenda com gancho nas 2 primeiras linhas; cada card com arte (texto sobre imagem), headline, descrição e CTA; incluir variações de CTA para teste e observações de execução.
- Copy no tom de voz do cliente (ver `contexto.md`), não no tom da Moinho.

Salvar em `clientes/[slug]/campanhas/briefing-[canal]-[tema]-[cliente].md`.

### 4. Gerar a versão HTML (id-visual Moinho)

Ler `template.html` desta skill. É um shell já estilizado com a identidade da Moinho (paleta roxo/off-white/vermelho/rosé, fontes Noto Serif + Lexend). Preencher os placeholders:

- `{{TITULO}}` — ex: "Briefing Google Ads — [Cliente]"
- `{{CLIENTE}}` — nome do cliente
- `{{CANAL}}` — "Google Ads" ou "Meta Ads"
- `{{DATA}}` — data por extenso (ex: 6 de julho de 2026)
- `{{CHIPS}}` — chips de meta no topo (objetivo, orçamento, destino, público) — ver componentes abaixo
- `{{CONTEUDO}}` — o corpo do briefing, montado com os componentes HTML abaixo a partir do markdown da etapa 3

Salvar em `clientes/[slug]/campanhas/briefing-[canal]-[tema]-[cliente].html`.

Regra visual: seguir a paleta e as fontes do `design-guide.md`. Não usar caixa alta em títulos. Roxo é o destaque principal; vermelho/rosé para pontos de maior ênfase. Fundo off-white (nunca branco puro no corpo).

### 5. Retornar

- Caminho do `.md` e do `.html`
- Resumo do que foi gerado (canal, nº de grupos/cards, orçamento)
- Pendências marcadas como `[a definir]` para o usuário completar

---

## Componentes HTML (para montar o `{{CONTEUDO}}`)

O `template.html` já define o CSS destas classes.

**Chips de meta (topo — `{{CHIPS}}`):**
```html
<span><b>Objetivo:</b> Leads via WhatsApp</span>
<span><b>Orçamento:</b> R$ 20/dia</span>
<span><b>Destino:</b> pegaecola.com.br</span>
```

**Seção:**
```html
<section>
  <div class="sec-head"><span class="sec-num">1</span><h2>Configurações da campanha</h2></div>
  <!-- conteúdo -->
</section>
```

**Tabela (config, palavras-chave, títulos com contagem de caracteres):**
```html
<table class="tbl">
  <thead><tr><th>Campo</th><th>Valor</th></tr></thead>
  <tbody>
    <tr><td>Nome</td><td>PEC | Produtos Personalizados</td></tr>
  </tbody>
</table>
```

**Bloco de grupo de anúncio (Google):**
```html
<div class="grupo">
  <div class="grupo-head"><span class="grupo-num">01</span><h3>Materiais Gráficos</h3></div>
  <!-- tabela de palavras-chave, bloco de UTM, tabela de headlines/descriptions -->
</div>
```

**Card de carrossel (Meta):**
```html
<div class="card-meta">
  <div class="card-meta-tag">Card 2 · Informática Básica</div>
  <ul class="clean"><li>Word, Excel e PowerPoint</li></ul>
  <p><b>Headline:</b> Informática Básica — Grátis · <b>CTA:</b> Quero esta vaga</p>
</div>
```

**Bloco de código (UTM/URL):** `<pre class="code">utm_source=google&utm_medium=cpc...</pre>`

**Callout didático (explicar algo):**
```html
<div class="didactic"><span class="tag">💡</span><div><h4>Como configurar</h4><p>Colar o UTM no campo "Sufixo de URL final"...</p></div></div>
```

**Nota de atenção:** `<div class="note"><b>Atenção:</b> ...</div>`

**Lista limpa:** `<ul class="clean"><li>item</li></ul>`

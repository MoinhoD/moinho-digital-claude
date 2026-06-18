---
name: planejamento-onboarding
description: Gera apresentação de estratégia inicial para novos clientes da Moinho Digital, cobrindo redes sociais, Google Ads e/ou Meta Ads com base no escopo contratado. Publicada em planejamento-[cliente].moinhod.com.br com proteção via Cloudflare Access.
---

## Quando usar

Disparar quando o usuário mencionar: gerar planejamento, montar estratégia inicial para [cliente], planejamento de onboarding, /planejamento-onboarding.

## Contexto

Ler antes de começar:
- `_contexto/preferencias.md` — tom de voz
- `_contexto/servicos.md` — serviços e descrições disponíveis
- `marca/design-guide.md` — identidade visual

## Passo a passo

### 1. Nome do cliente

Pedir o nome do cliente (obrigatório). Derivar o slug (kebab-case, sem acento) para usar nos caminhos.

Criar pasta `clientes/[slug-cliente]/planejamento/` se não existir.

### 2. Transcrição do briefing

Verificar se existe arquivo em `dados/` com o nome do cliente (qualquer extensão: .txt, .md, .pdf).

**Com transcrição:** ler o arquivo e extrair:
- Objetivo principal do cliente (o que ele quer do marketing digital)
- Contexto do negócio e diferenciais
- Concorrentes mencionados (nome + URL se tiver)
- Demandas em aberto e pendências (acessos, materiais, dúvidas)
- Público-alvo e tom de voz percebido
- Redes sociais que o cliente usa (@ e plataformas)

**Sem transcrição:** perguntar uma de cada vez:
1. Qual o objetivo principal desse cliente? O que ele espera do marketing digital?
2. Quais são os diferenciais do negócio? O que diferencia dos concorrentes?
3. Quais os principais concorrentes? (nome + link se tiver)
4. Tem alguma demanda ou pendência já levantada? (acessos, materiais, dúvidas)
5. Quais redes sociais o cliente usa? (pedir o @ ou URL do perfil)

### 3. Escopo de serviços

Ler `_contexto/servicos.md`. Apresentar a lista de serviços e perguntar quais estão contratados para esse cliente.

Confirmar o escopo antes de prosseguir.

### 3.5. Direcionamento estratégico por serviço

Após confirmar o escopo, fazer perguntas específicas para cada serviço contratado. Uma pergunta por vez — não listar tudo de uma vez.

**Se Google Ads no escopo:**
1. Qual o objetivo principal da campanha? (captação de leads, vendas diretas, reconhecimento de marca, tráfego pro site?)
2. Tem alguma palavra-chave ou termo que o cliente já mencionou como prioritário, ou que eles gostariam de evitar?
3. Existe alguma restrição ou particularidade importante? (ex: produto muito nichado, concorrência agressiva, verba limitada)

**Se Meta Ads no escopo:**
1. Qual o objetivo das campanhas no Meta? (gerar leads, aumentar reconhecimento, impulsionar vendas?)
2. Tem algum perfil de cliente ideal mais definido — faixa etária, localização, comportamento?
3. Já tem criativos produzidos ou vai precisar criar tudo do zero?

**Se Redes Sociais no escopo:**
1. Qual o foco de conteúdo nesse primeiro momento? (posicionamento, autoridade, engajamento, gerar leads orgânicos?)
2. Tem algum tema, produto ou assunto que o cliente quer prioritizar nos primeiros conteúdos?
3. Existe algum estilo visual ou de comunicação que o cliente gosta como referência — ou que definitivamente não quer?

**Se outros serviços (Blog, Email, Landing Page, etc.):**
Perguntar o objetivo específico de cada um em uma frase.

Guardar todas essas respostas — elas vão alimentar diretamente os slides de estratégia de cada serviço.

### 4. Pesquisa complementar

Com base no contexto do cliente e nos concorrentes informados, enriquecer a análise:

- Pesquisar os concorrentes no Google (WebSearch) e nas redes sociais (WebFetch nos perfis públicos)
- Buscar referências de mercado para o segmento do cliente
- Se o cliente tem perfil no Instagram/LinkedIn, buscar o perfil e analisar: frequência de publicação, tipos de conteúdo, consistência visual, bio, engajamento percebido

Usar WebSearch e WebFetch para isso. Não inventar dados — basear em análise real.

### 5. Gerar o HTML

Ler `.claude/skills/planejamento-onboarding/template.html`.

Salvar em `clientes/[slug-cliente]/planejamento/index.html`.

Substituir os placeholders:
- `{{NOME_CLIENTE}}` — nome da empresa
- `{{DATA}}` — mês e ano por extenso (ex: Junho 2026)
- `{{OBJETIVO}}` — 2-3 frases sobre o que a Moinho vai fazer por esse cliente
- `{{PILARES}}` — HTML dos pilares do projeto (padrão abaixo)
- `{{SLIDES_CONTEUDO}}` — todos os slides condicionais por serviço (padrões abaixo)
- `{{DUVIDAS}}` — perguntas e alinhamentos para o cliente (padrão abaixo)
- `{{DEMANDAS}}` — demandas em aberto coletadas na entrevista (padrão abaixo)
- `{{APROVACOES}}` — itens que o cliente precisa entregar/aprovar (padrão abaixo)
- `{{CRONOGRAMA}}` — itens do cronograma HTML (padrão abaixo)
- `{{LOGO_SRC}}` e `{{SIMBOLO_SRC}}` — injetar via Node.js depois

**Regra para os slides de estratégia:** os slides de objetivo, direcionamento de campanha, foco de conteúdo e demandas em aberto devem refletir exatamente o que foi informado nas etapas 2 e 3.5 — não inventar ou generalizar. O que não foi respondido explicitamente pode ser completado com pesquisa (etapa 4) ou marcado como `[a definir com o cliente]` no slide.

Injetar logos após escrever o HTML:
```js
const fs = require('fs');
const slug = '[slug-cliente]'; // substituir pelo slug real
const logoSrc = 'data:image/png;base64,' + fs.readFileSync('marca/md-1-branco.png').toString('base64');
const simboloSrc = 'data:image/png;base64,' + fs.readFileSync('marca/md-simbolo-branco.png').toString('base64');
let html = fs.readFileSync(`clientes/${slug}/planejamento/index.html`, 'utf8');
html = html.replace('{{LOGO_SRC}}', logoSrc).replace('{{SIMBOLO_SRC}}', simboloSrc);
fs.writeFileSync(`clientes/${slug}/planejamento/index.html`, html);
```

---

#### Padrão: PILARES

Um pilar por serviço contratado. Sempre incluir "Relatórios e acompanhamento" no final, numerado.

```html
<div class="pilar-item">
  <span class="pilar-num">1</span>
  <div>
    <p class="pilar-nome">Nome do serviço</p>
    <p class="pilar-foco">Foco: o que esse serviço vai resolver para o cliente em uma frase</p>
  </div>
</div>
```

---

#### Padrão: SLIDES_CONTEUDO — condicionais por serviço

Gerar apenas os blocos dos serviços contratados. A ordem padrão é: Redes Sociais → Google Ads → Meta Ads → outros serviços.

---

**SE REDES SOCIAIS no escopo:**

```html
<!-- ANÁLISE DA CONTA ATUAL -->
<div class="slide slide-tall">
  <div class="container">
    <p class="label-tag">Redes sociais</p>
    <h2>Percepções sobre a conta atual</h2>
    <div class="analise-lista">
      <!-- 3-5 observações alternando positivas e de melhoria, baseadas na análise real do perfil -->
      <div class="analise-item analise-positivo">
        <span class="analise-badge">+</span>
        <p>[Ponto positivo identificado no perfil atual — específico, não genérico]</p>
      </div>
      <div class="analise-item analise-melhoria">
        <span class="analise-badge">↑</span>
        <p>[Oportunidade de melhoria com justificativa — o que muda e por quê]</p>
      </div>
    </div>
    <p class="analise-obs">* Análise baseada no perfil público disponível no momento do planejamento.</p>
  </div>
</div>

<!-- PILARES DE CONTEÚDO -->
<div class="slide">
  <div class="container">
    <p class="label-tag">Redes sociais</p>
    <h2>Pilares de conteúdo</h2>
    <div class="pilares-conteudo">
      <!-- Até 5 pilares com % que somam 100%. Calibrar para o contexto do cliente. -->
      <div class="pilar-conteudo-item">
        <div class="pilar-conteudo-pct">[N]%</div>
        <div class="pilar-conteudo-info">
          <strong>[Nome do pilar — ex: Autoridade]</strong>
          <p>[Função em uma frase — o que esse pilar gera no público-alvo]</p>
        </div>
        <div class="pilar-conteudo-barra"><div class="pilar-conteudo-fill" style="width:[N]%"></div></div>
      </div>
    </div>
    <div class="formatos-sugeridos">
      <h4>Formatos:</h4>
      <p>[Formatos recomendados para esse cliente — carrossel, reels, stories, artigo LinkedIn, etc.]</p>
    </div>
  </div>
</div>

<!-- LINHAS EDITORIAIS — um slide por pilar principal (até 3 pilares maiores) -->
<div class="slide bg-creme slide-tall">
  <div class="container">
    <p class="label-tag">[N]% [Nome do pilar]</p>
    <h2>Linha editorial</h2>
    <div class="editorial-grid">
      <div class="editorial-bloco">
        <h4>Função</h4>
        <p>[O que esse pilar faz pelo cliente — qual reação gera no público]</p>
      </div>
      <div class="editorial-bloco">
        <h4>Linha editorial</h4>
        <p>[Como o conteúdo é construído — abordagem, ponto de vista, o que evitar]</p>
      </div>
      <div class="editorial-bloco">
        <h4>Formatos</h4>
        <p>[Quais formatos se encaixam nesse pilar específico]</p>
      </div>
      <div class="editorial-bloco editorial-bloco-full">
        <h4>Exemplos de pauta</h4>
        <ul>
          <li>[Exemplo específico pro cliente — não genérico]</li>
          <li>[Exemplo 2]</li>
          <li>[Exemplo 3]</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- TOM DE VOZ -->
<div class="slide">
  <div class="container">
    <p class="label-tag">Redes sociais</p>
    <h2>Tom de voz</h2>
    <div class="tom-grid">
      <!-- 3-4 atributos calibrados para o cliente, com exemplos reais do segmento -->
      <div class="tom-item">
        <div class="tom-titulo">[Atributo — ex: Próximo sem ser informal]</div>
        <div class="tom-desc">[O que esse atributo significa especificamente para esse cliente]</div>
        <div class="tom-exemplos">
          <div class="tom-nao">✗ [Exemplo do que não fazer — baseado no estilo atual ou no segmento]</div>
          <div class="tom-sim">✓ [Exemplo do tom certo — específico e acionável]</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PERSONAS — um slide, até 3 personas -->
<div class="slide slide-tall">
  <div class="container">
    <p class="label-tag">Redes sociais</p>
    <h2>Personas</h2>
    <div class="personas-grid">
      <!-- Uma persona por card. Calibrar com base no briefing e pesquisa de mercado -->
      <div class="persona-card">
        <div class="persona-header">
          <div class="persona-nome">[Nome], [idade] anos</div>
          <div class="persona-cargo">[Cargo / função] · [Cidade ou contexto]</div>
        </div>
        <p class="persona-desc">[Descrição em 2 frases — quem é, onde trabalha, situação atual]</p>
        <div class="persona-secao">
          <span class="persona-label">Dor principal:</span>
          <p>[A dor central dessa persona que o cliente resolve — específica, não genérica]</p>
        </div>
        <div class="persona-secao">
          <span class="persona-label">Quer:</span>
          <p>[O que essa persona busca — resultado esperado]</p>
        </div>
        <div class="persona-secao">
          <span class="persona-label">Como chega:</span>
          <p>[Canais e gatilhos que levam essa persona até a marca]</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ANÁLISE DA CONCORRÊNCIA — um slide por concorrente (máximo 3-4) -->
<div class="slide slide-tall">
  <div class="container">
    <p class="label-tag">Análise da concorrência</p>
    <h2>[Nome do concorrente]</h2>
    <div class="ca-grid">
      <div class="ca-bloco">
        <h4>Conteúdo</h4>
        <p>[Como usa o conteúdo: frequência, temas, abordagem, o que funciona — baseado em análise real]</p>
      </div>
      <div class="ca-bloco">
        <h4>Identidade visual</h4>
        <p>[Estilo, consistência, elementos de marca percebidos]</p>
      </div>
      <div class="ca-bloco ca-bloco-destaque">
        <h4>Oportunidade para [Nome do Cliente]</h4>
        <p>[Lacuna identificada que o cliente pode explorar — específica e acionável]</p>
      </div>
    </div>
  </div>
</div>
```

---

**SE GOOGLE ADS no escopo:**

```html
<!-- ESTRATÉGIA GOOGLE ADS -->
<div class="slide bg-creme">
  <div class="container">
    <p class="label-tag">Google Ads</p>
    <h2>Estratégia de anúncios</h2>
    <div class="estrategia-grid">
      <div class="estrategia-col">
        <h4>Objetivo da campanha</h4>
        <p>[Tipo de campanha e foco — ex: captação via pesquisa, campanha de marca, display de remarketing]</p>
      </div>
      <div class="estrategia-col">
        <h4>Estrutura sugerida</h4>
        <ul class="estrategia-list">
          <li><strong>Grupo [N]:</strong> [tema do grupo — ex: produto principal + variações]</li>
          <li><strong>Grupo [N]:</strong> [segundo tema]</li>
        </ul>
      </div>
      <div class="estrategia-col">
        <h4>Próximos passos</h4>
        <ul class="estrategia-list">
          <li>Briefing dos anúncios e aprovação das palavras-chave</li>
          <li>Configuração da conta e ferramentas (Analytics, Tag Manager)</li>
          <li>[Passo específico para esse cliente — ex: análise do site, setup do CRM]</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- CONCORRÊNCIA GOOGLE ADS -->
<div class="slide">
  <div class="container">
    <p class="label-tag">Google Ads</p>
    <h2>Concorrência no Google</h2>
    <div class="concorrentes-grid">
      <!-- Um card por concorrente (máximo 4). Baseado em pesquisa real. -->
      <div class="concorrente-card">
        <div class="concorrente-nome">[Nome do concorrente]</div>
        <div class="concorrente-obs">[Como aparece no Google: palavras que usa, tipo de anúncio, diferencial na copy]</div>
      </div>
    </div>
    <p class="concorrencia-nota">[Observação geral do cenário competitivo e oportunidade identificada]</p>
  </div>
</div>

<!-- GRUPOS DE ANÚNCIOS -->
<div class="slide slide-tall">
  <div class="container">
    <p class="label-tag">Google Ads</p>
    <h2>Grupos de anúncios sugeridos</h2>
    <div class="grupos-grid">
      <!-- Um bloco por grupo. Calibrado com pesquisa de volume e contexto do cliente. -->
      <div class="grupo-item">
        <div class="grupo-header">
          <span class="grupo-num">[N]</span>
          <span class="grupo-nome">[Nome do grupo]</span>
        </div>
        <p class="grupo-kw-label">Palavras-chave principais:</p>
        <ul class="grupo-kw-list">
          <li>[Palavra-chave 1]</li>
          <li>[Palavra-chave 2]</li>
          <li>[Palavra-chave 3]</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- TEXTOS DOS ANÚNCIOS -->
<div class="slide slide-tall">
  <div class="container">
    <p class="label-tag">Google Ads</p>
    <h2>Textos sugeridos dos anúncios</h2>
    <!-- Um bloco por grupo principal (priorizar os 2-3 maiores) -->
    <div class="ad-bloco">
      <div class="ad-grupo-label">Grupo [N]: [Nome do grupo]</div>
      <div class="ad-campos">
        <div class="ad-campo">
          <p class="ad-field-label">Títulos (até 30 caracteres cada):</p>
          <ul>
            <li>[Título 1]</li>
            <li>[Título 2]</li>
            <li>[Título 3]</li>
            <li>[Título 4]</li>
          </ul>
        </div>
        <div class="ad-campo">
          <p class="ad-field-label">Descrições (até 90 caracteres cada):</p>
          <ul>
            <li>[Descrição 1]</li>
            <li>[Descrição 2]</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

**SE META ADS no escopo:**

```html
<!-- ESTRATÉGIA META ADS -->
<div class="slide bg-creme">
  <div class="container">
    <p class="label-tag">Meta Ads</p>
    <h2>Estratégia de campanhas</h2>
    <div class="estrategia-grid">
      <div class="estrategia-col">
        <h4>Objetivo</h4>
        <p>[Objetivo de negócio: reconhecimento, leads, conversão — com justificativa para esse cliente]</p>
      </div>
      <div class="estrategia-col">
        <h4>Públicos-alvo</h4>
        <ul class="estrategia-list">
          <li>[Público primário com interesses/comportamentos específicos]</li>
          <li>[Público secundário]</li>
          <li>[Remarketing — se aplicável ao estágio do cliente]</li>
        </ul>
      </div>
      <div class="estrategia-col">
        <h4>Formatos de criativos</h4>
        <ul class="estrategia-list">
          <li>[Formato 1 com justificativa — ex: carrossel de produto por X motivo]</li>
          <li>[Formato 2]</li>
          <li>[Formato de teste sugerido]</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!-- CONCORRÊNCIA META ADS -->
<div class="slide">
  <div class="container">
    <p class="label-tag">Meta Ads</p>
    <h2>Concorrência no Meta</h2>
    <div class="concorrentes-grid">
      <div class="concorrente-card">
        <div class="concorrente-nome">[Nome do concorrente]</div>
        <div class="concorrente-obs">[Como usa o Meta: frequência, formatos, abordagem dos criativos — baseado em análise real da Biblioteca de Anúncios se possível]</div>
      </div>
    </div>
    <p class="concorrencia-nota">[Oportunidade identificada no cenário Meta para esse cliente]</p>
  </div>
</div>
```

---

**SE OUTROS SERVIÇOS no escopo** (Blog, Email, LinkedIn, Landing Page, etc.):

Gerar um slide de estratégia por serviço extra, usando o padrão `.estrategia-grid` com objetivo, entregas e próximos passos. Adaptar conforme a descrição em `_contexto/servicos.md`.

---

#### Padrão: DUVIDAS

Separar por tema. Gerar com base no contexto do briefing — priorizar o que ainda não foi respondido.

```html
<p class="duvidas-tema">Conteúdo e copy</p>
<ul class="duvidas-list">
  <li>[Pergunta específica sobre tom de voz, temas, restrições]</li>
  <li>[Pergunta sobre materiais disponíveis — fotos, vídeos, depoimentos]</li>
</ul>
<p class="duvidas-tema">Identidade visual</p>
<ul class="duvidas-list">
  <li>[Pergunta sobre manual, referências visuais, o que agrada e o que não agrada]</li>
</ul>
<p class="duvidas-tema">Acesso às plataformas</p>
<ul class="duvidas-list">
  <li>[Quais acessos ainda estão pendentes — ser específico por plataforma]</li>
</ul>
```

---

#### Padrão: DEMANDAS

```html
<ul class="demandas-list">
  <li>[Demanda específica em aberto — ex: receber acesso ao gerenciador de negócios]</li>
  <li>[Outra pendência — ser direto e acionável]</li>
</ul>
```

---

#### Padrão: APROVACOES

```html
<ul class="aprovacoes-list">
  <li>[Item que o cliente precisa aprovar ou entregar — ex: copies e palavras-chave das campanhas]</li>
  <li>[Outro item]</li>
</ul>
```

---

#### Padrão: CRONOGRAMA

Adaptar datas com base em quando o planejamento está sendo apresentado. Usar datas absolutas quando possível.

```html
<div class="timeline-item tl-zero">
  <div class="timeline-periodo">Hoje ([data atual])</div>
  <div class="timeline-label">Reunião de apresentação do planejamento</div>
</div>
<div class="timeline-item">
  <div class="timeline-periodo">Até [data + ~5 dias]</div>
  <div class="timeline-label">Aprovação do planejamento e envio dos retornos do cliente</div>
</div>
<div class="timeline-item">
  <div class="timeline-periodo">Até [data]</div>
  <div class="timeline-label">Envio dos acessos e materiais de marca (logo, fotos, identidade visual)</div>
</div>
<!-- Se tiver Google Ads ou Meta Ads: -->
<div class="timeline-item">
  <div class="timeline-periodo">Semana 1–2</div>
  <div class="timeline-label">Configuração das contas, estrutura das campanhas e envio das copies para aprovação</div>
</div>
<div class="timeline-item">
  <div class="timeline-periodo">Semana 2–3</div>
  <div class="timeline-label">Ativação das campanhas e acompanhamento dos primeiros resultados</div>
</div>
<!-- Se tiver Redes Sociais: -->
<div class="timeline-item">
  <div class="timeline-periodo">Semana 1</div>
  <div class="timeline-label">Envio dos primeiros conteúdos para aprovação</div>
</div>
<div class="timeline-item">
  <div class="timeline-periodo">A partir de [data]</div>
  <div class="timeline-label">Início das publicações e monitoramento dos resultados</div>
</div>
<div class="timeline-item">
  <div class="timeline-periodo">Mês 2</div>
  <div class="timeline-label">Primeiro relatório de resultados e reunião de alinhamento estratégico</div>
</div>
```

---

### 6. Exportar PDF

Reusar o script da skill de proposta.

Verificar Playwright: `npx playwright --version`
Se não instalado: `npm install -D playwright && npx playwright install chromium`

```bash
node ".claude/skills/proposta/exportar-pdf.js" "clientes/[slug-cliente]/planejamento/index.html" "clientes/[slug-cliente]/planejamento/planejamento-[slug-cliente].pdf"
```

### 7. Salvar no Google Drive

Fazer upload do PDF para a pasta do cliente no Google Drive, dentro de "alinhamentos iniciais".

Requer `gdrive-moinho` configurado via rclone — ver skill `/subir-drive`.

Perguntar o ID da pasta do cliente no Drive se ainda não estiver salvo. Caso o cliente tenha pasta em `clientes/[slug-cliente]/`, verificar se existe um arquivo `clientes/[slug-cliente]/.drive-folder-id` com o ID salvo.

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
$slug    = "[slug-cliente]"
$pdf     = "clientes/$slug/planejamento/planejamento-$slug.pdf"
$destino = "[Nome do Cliente]/alinhamentos iniciais"
rclone copy $pdf "gdrive-moinho:$destino" --progress 2>&1
```

Verificar o upload:
```powershell
rclone ls "gdrive-moinho:[Nome do Cliente]/alinhamentos iniciais" 2>&1
```

Se a pasta "alinhamentos iniciais" não existir no Drive, o rclone a cria automaticamente.

### 9. Publicar no Netlify

Subdomínio: `planejamento-[slug-cliente].moinhod.com.br`

```bash
netlify sites:create --name planejamento-[slug-cliente]
netlify deploy --dir "clientes/[slug-cliente]/planejamento" --prod --site [PROJECT_ID]
netlify api createDnsRecord --data '{"zone_id":"6a25631a9265495f668938da","body":{"type":"CNAME","hostname":"planejamento-[slug-cliente]","value":"planejamento-[slug-cliente].netlify.app","ttl":3600}}'
netlify api updateSite --data '{"site_id":"[PROJECT_ID]","body":{"custom_domain":"planejamento-[slug-cliente].moinhod.com.br"}}'
netlify api provisionSiteTLSCertificate --data '{"site_id":"[PROJECT_ID]"}'
```

### 10. Cloudflare Access — proteção privada

O site fica protegido por Cloudflare Access. O cliente precisa digitar o email e confirmar com um código de 6 dígitos recebido por email. Nenhuma senha para gerenciar.

**Setup inicial (fazer só uma vez no painel Cloudflare):**
Ver `.claude/skills/planejamento-onboarding/cloudflare-access-setup.md`

**Para cada novo cliente:**
1. Acessar Cloudflare Zero Trust → Access → Applications → [a aplicação `planejamento-*.moinhod.com.br`]
2. Editar a policy → adicionar o email do cliente em "Include → Emails"
3. Salvar

**Mensagem para enviar ao cliente com o link:**
> "O planejamento está disponível em [link]. Para acessar, é só digitar o seu email ([email do cliente]) quando solicitado — você vai receber um código de confirmação direto na caixa de entrada."

### 11. Retornar resultado

- Link protegido: `https://planejamento-[slug-cliente].moinhod.com.br`
- PDF no Drive: `[Nome do Cliente]/alinhamentos iniciais/planejamento-[slug-cliente].pdf`
- PDF local: `clientes/[slug-cliente]/planejamento/planejamento-[slug-cliente].pdf`
- HTML: `clientes/[slug-cliente]/planejamento/index.html`

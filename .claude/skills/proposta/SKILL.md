---
name: proposta
description: Gera proposta comercial da Moinho Digital em formato carrossel, publicavel no Netlify como subdominio e exportavel como PDF
---

## Contexto

Ler antes de comecar:
- _contexto/preferencias.md -- tom de voz
- marca/design-guide.md -- identidade visual

## Quando usar

Disparar quando o usuario mencionar: gerar proposta, montar proposta para [cliente], nova proposta, /proposta.

## Passo a passo

### 1. Dados do prospect

Pedir o nome do cliente (obrigatorio).

Verificar se existe arquivo de transcricao em dados/ com o nome do cliente (.txt, .md).
- Com transcricao: ler e extrair objetivo, dores e contexto do negocio.
- Sem transcricao: perguntar qual o objetivo principal e quais dores foram identificadas no briefing.

### 2. Selecionar servicos

Ler `_contexto/servicos.md` para consultar pacotes, valores e descricoes disponiveis.

Sugerir os servicos que fazem sentido com base no contexto. Confirmar com a Ina antes de continuar.

### 3. Gerar o HTML

Criar pasta comercial/propostas/[nome-cliente]/ se nao existir.

Ler .claude/skills/proposta/template.html. Substituir os placeholders e salvar em comercial/propostas/[nome-cliente]/index.html.

Placeholders a substituir:
- {{NOME_CLIENTE}} -- nome da empresa (aparece no title, h1 da capa e FOOTER_CTA)
- {{DATA}} -- mes e ano por extenso (ex: Junho 2025)
- {{OBJETIVO}} -- 2-3 frases sobre o que a Moinho vai resolver
- {{DORES}} -- itens li das dores identificadas no briefing
- {{PERDAS}} -- itens li das consequencias de nao resolver as dores
- {{PILARES}} -- blocos HTML dos pilares do projeto
- {{SERVICOS}} -- slides HTML completos, um por servico (ver padrao abaixo)
- {{INVESTIMENTO}} -- linhas tr da tabela de investimento (ver padrao abaixo)
- {{FOOTER_CTA}} -- frase de encerramento personalizada
- {{LOGO_SRC}} -- data URI do logo branco (injetar via Node.js)
- {{SIMBOLO_SRC}} -- data URI do simbolo branco (injetar via Node.js)

Secoes fixas no template (nao precisam de placeholder):
- Slide Como atuamos com stats (70+, R$3M+, 150+)
- Slide de cases (Pedro Janot, WS Cranes, Instituto Eurofarma) -- classe slide-tall
- Slide O que voce ganha (4 cards)
- Slide cronograma com Semana 0 (pre-inicio) + Semanas 1-5 + Mes a mes
- Slide modelo de atendimento (grafico circular SVG: Execucao, Analise, Ajuste, Reuniao)
- Slide depoimentos (Raquel, Ricardo, Thais, Julio) -- classe slide-tall
- Nota de rodape do investimento: * Contrato minimo de 6 meses de projeto.
- Slide garantia
- Botao WhatsApp no slide CTA
- Navegacao (setas + teclado + swipe), progress bar e JS do carrossel

Injetar logos via Node.js depois de escrever o HTML:

```js
const fs = require('fs');
const logoSrc = 'data:image/png;base64,' + fs.readFileSync('marca/md-1-branco.png').toString('base64');
const simboloSrc = 'data:image/png;base64,' + fs.readFileSync('marca/md-simbolo-branco.png').toString('base64');
let html = fs.readFileSync('comercial/propostas/[nome-cliente]/index.html', 'utf8');
html = html.replace('{{LOGO_SRC}}', logoSrc).replace('{{SIMBOLO_SRC}}', simboloSrc);
fs.writeFileSync('comercial/propostas/[nome-cliente]/index.html', html);
```

Padrao para DORES:
```html
<li>Dor identificada no briefing</li>
<li>Segunda dor identificada</li>
```

Padrao para PERDAS:
```html
<li>Consequencia de nao resolver a dor 1</li>
```

Padrao para PILARES (sempre incluir Relatorios no final):
```html
<div class="pilar-item">
  <span class="pilar-num">1</span>
  <div>
    <p class="pilar-nome">Nome do servico</p>
    <p class="pilar-foco">Foco: o que esse servico resolve para o cliente</p>
  </div>
</div>
```

Padrao para SERVICOS -- cada servico e um slide completo:
```html
<div class="slide bg-creme">
  <div class="container">
    <div class="servico-slide-header">
      <span class="servico-num">1</span>
      <h2>Nome do servico</h2>
    </div>
    <p class="servico-desc">Descricao curta do que a Moinho faz.</p>
    <div class="resp-grid">
      <div>
        <h4>Moinho Digital</h4>
        <ul>
          <li>Responsabilidade 1</li>
        </ul>
      </div>
      <div>
        <h4>[Nome do Cliente]</h4>
        <ul>
          <li>Responsabilidade 1</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

Sempre incluir Relatorios e acompanhamento como ultimo slide de servico.

Padrao para INVESTIMENTO -- uma linha por servico + total:
```html
<tr>
  <td>Nome do servico</td>
  <td>Mensal</td>
  <td class="valor">R$ X.XXX *</td>
</tr>
<tr class="total">
  <td><strong>Total</strong></td>
  <td></td>
  <td class="valor"><strong>R$ X.XXX/mes</strong></td>
</tr>
```

Usar * junto ao valor principal. A nota de rodape ja esta fixa no template.

FOOTER_CTA: frase curta personalizada. Ex: Estamos prontos para construir a presenca digital da [Cliente] e fazer a marca crescer desde o primeiro mes.

---

Descricoes dos servicos: ver `_contexto/servicos.md`.

---

### 4. Exportar PDF

Verificar Playwright: npx playwright --version
Se nao: npm install -D playwright && npx playwright install chromium

Exportar (A4 paisagem, uma pagina por slide):
node ".claude/skills/proposta/exportar-pdf.js" "comercial/propostas/[nome-cliente]/index.html" "comercial/propostas/[nome-cliente]/proposta-[nome-cliente].pdf"

### 5. Salvar no Google Drive

Usar rclone (o MCP base64 falha para PDFs grandes). Requer `gdrive-moinho` configurado — ver skill `/subir-drive`.

A pasta raiz comercial tem ID `1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE`. O flag `--drive-root-folder-id` ancora o rclone nessa raiz. As pastas de ano e mês são criadas automaticamente se não existirem.

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
$meses = @{1='janeiro';2='fevereiro';3='março';4='abril';5='maio';6='junho';7='julho';8='agosto';9='setembro';10='outubro';11='novembro';12='dezembro'}
$ano   = (Get-Date).Year
$mm    = (Get-Date).Month.ToString('00')
$mes   = $meses[(Get-Date).Month]
$destino = "Propostas $ano/$mm.$mes"
$pdf     = "comercial/propostas/[nome-cliente]/proposta-[nome-cliente].pdf"
rclone copy $pdf "gdrive-moinho:$destino" --drive-root-folder-id 1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE --progress 2>&1
```

Verificar o upload:
```powershell
rclone ls "gdrive-moinho:$destino" --drive-root-folder-id 1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE 2>&1
```

### 6. Publicar no Netlify

Cada proposta tem seu proprio site com subdominio [nome-cliente].moinhod.com.br.

Verificar CLI: netlify --version
Se nao: npm install -g netlify-cli && netlify login

```bash
netlify sites:create --name proposta-[nome-cliente]
netlify deploy --dir "comercial/propostas/[nome-cliente]" --prod --site [PROJECT_ID]
netlify api createDnsRecord --data '{"zone_id":"6a25631a9265495f668938da","body":{"type":"CNAME","hostname":"[nome-cliente]","value":"proposta-[nome-cliente].netlify.app","ttl":3600}}'
netlify api updateSite --data '{"site_id":"[PROJECT_ID]","body":{"custom_domain":"[nome-cliente].moinhod.com.br"}}'
netlify api provisionSiteTLSCertificate --data '{"site_id":"[PROJECT_ID]"}'
```

### 7. Retornar resultado

- Link definitivo: https://[nome-cliente].moinhod.com.br
- Link imediato: https://proposta-[nome-cliente].netlify.app
- PDF: comercial/propostas/[nome-cliente]/proposta-[nome-cliente].pdf
- HTML: comercial/propostas/[nome-cliente]/index.html
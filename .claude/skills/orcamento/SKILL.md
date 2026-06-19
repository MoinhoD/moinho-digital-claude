---
name: orcamento
description: Gera orçamento de prestação de serviço da Moinho Digital como Google Doc + PDF, salvo no Drive em Propostas ANO/MÊS
---

## Contexto

Ler antes de começar:
- `_contexto/servicos.md` — valores e descrições dos serviços disponíveis
- `marca/design-guide.md` — cores e identidade visual

## Quando usar

Disparar quando o usuário mencionar: gerar orçamento, fazer orçamento para [cliente], montar orçamento, /orcamento.

---

## Passo a passo

### 1. Coletar dados

Pedir ao usuário:
- **Nome do cliente** (obrigatório)
- **Serviço(s) a incluir** — sugerir com base no contexto disponível, confirmar antes de continuar
- **Tipo de investimento:** mensal, único ou misto (mensal + pontual)
- **Observações especiais** (descontos, condições de pagamento, duração mínima do contrato — opcional)

Verificar se existe briefing ou transcrição em `dados/` com o nome do cliente. Se existir, extrair contexto do escopo.

---

### 2. Montar o conteúdo

Ler `_contexto/servicos.md`. Para cada serviço selecionado, montar as seções com base nas descrições. Adaptar o escopo ao contexto do cliente quando disponível.

**INTRO:** Seguir o padrão dos modelos:
> "O seguinte orçamento* é referente ao escopo de [descrição do serviço] para [Nome do Cliente]. Entre as atividades estão:"

**SECOES:** Uma ou mais seções por área de entrega (configuração, planejamento, execução, relatórios). Usar bullets detalhados, no estilo dos modelos de referência no Drive.

**EXCLUSOES:** Listar itens que não estão incluídos no escopo (quando aplicável).

**INVESTIMENTO:** Listar cada serviço com valor. Se houver total ou desconto por combinação, incluir linha destacada.

---

### 3. Criar o arquivo HTML

Criar pasta `comercial/orcamentos/[nome-cliente]/` se não existir.

Ler `.claude/skills/orcamento/template.html`. Substituir os placeholders e salvar em:
`comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].html`

**Placeholders a substituir:**

| Placeholder | Conteúdo |
|---|---|
| `{{DATA}}` | Ex: `19 de junho de 2026` |
| `{{INTRO}}` | Frase de abertura do escopo |
| `{{SECOES}}` | Blocos HTML das seções (ver padrão abaixo) |
| `{{EXCLUSOES}}` | Bloco de exclusões (ver padrão abaixo), ou string vazia |
| `{{TITULO_INVESTIMENTO}}` | `Investimento mensal nos serviços:` ou `Investimento no serviço*:` ou `Investimento nos serviços:` |
| `{{LINHAS_INVESTIMENTO}}` | Linhas HTML da tabela (ver padrão abaixo) |
| `{{NOTA_ADICIONAL}}` | Parágrafo de destaque se houver desconto ou condição especial (ver padrão), senão string vazia |
| `{{LOGO_SRC}}` | Deixar o placeholder — será substituído pelo script Node.js |

**Padrão para SECOES:**
```html
<div class="section">
  <h2>Nome da seção</h2>
  <ul>
    <li>Atividade detalhada 1</li>
    <li>Atividade detalhada 2</li>
  </ul>
</div>
```

**Padrão para EXCLUSOES** (incluir apenas se houver itens):
```html
<div class="exclusoes">
  <h3>Não estão inclusos no orçamento (caso necessário, deverão ser orçados à parte):</h3>
  <ul>
    <li>Item excluído 1</li>
    <li>Item excluído 2</li>
  </ul>
</div>
```

**Padrão para LINHAS_INVESTIMENTO:**
```html
<tr>
  <td>Nome do serviço</td>
  <td class="valor">R$ X.XXX,00</td>
</tr>
```

Para total (quando há múltiplos serviços ou desconto):
```html
<tr class="total">
  <td><strong>Total mensal</strong></td>
  <td class="valor"><strong>R$ X.XXX,00</strong></td>
</tr>
```

**Padrão para NOTA_ADICIONAL** (só incluir se houver condição especial, ex: desconto):
```html
<p class="nota-adicional">Na contratação das duas ferramentas de forma simultânea, desconto de 20%, totalizando R$ 3.760,00.</p>
```

---

### 4. Injetar logos

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
node ".claude/skills/orcamento/gerar-doc.js" "comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].html"
```

---

### 5. Exportar PDF

Verificar Playwright: `npx playwright --version`
Se não instalado: `npm install -D playwright && npx playwright install chromium`

```powershell
node ".claude/skills/orcamento/exportar-pdf.js" "comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].html" "comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].pdf"
```

---

### 6. Salvar no Google Drive

Salvar na pasta `Propostas ANO/MM.Mês` dentro da raiz "Comercial" (Drive root ID: `1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE`).

**Nota:** `--drive-import-formats html` falha no rclone por conflito com o formato de exportação configurado no remote. Usar o MCP `create_file` para o Google Doc.

#### 6a. Localizar a pasta de destino no Drive

```
Buscar: parentId = '1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE' and title = 'Propostas [ANO]'
→ pegar o ID da pasta Propostas [ANO]

Buscar: parentId = '[ID_PROPOSTAS_ANO]' and title contains '[mês]'
→ pegar o ID da pasta MM.mês (criar se não existir com mimeType application/vnd.google-apps.folder)
```

#### 6b. Criar o Google Doc via MCP

Usar `create_file` com `contentMimeType: "text/html"` e `textContent` com o HTML limpo (sem base64 — só texto, headings e tabelas). O MCP converte automaticamente para Google Doc.

- `parentId`: ID da pasta `MM.mês`
- `title`: `orcamento-[nome-cliente]`

**Atenção:** o MCP sempre cria um documento novo — não atualiza o existente. Se o orçamento foi regenerado, apagar o arquivo anterior no Drive antes de criar o novo, ou avisar o usuário para apagar manualmente.

#### 6c. Subir o PDF via rclone

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
$meses = @{1='janeiro';2='fevereiro';3='março';4='abril';5='maio';6='junho';7='julho';8='agosto';9='setembro';10='outubro';11='novembro';12='dezembro'}
$ano     = (Get-Date).Year
$mm      = (Get-Date).Month.ToString('00')
$mes     = $meses[(Get-Date).Month]
$destino = "Propostas $ano/$mm.$mes"
$pdf     = "comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].pdf"

rclone copy $pdf "gdrive-moinho:$destino" --drive-root-folder-id 1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE --progress 2>&1
```

---

### 7. Retornar resultado

Informar:
- Caminho local do HTML: `comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].html`
- Caminho local do PDF: `comercial/orcamentos/[nome-cliente]/orcamento-[nome-cliente].pdf`
- Pasta no Drive: `Comercial / Propostas [ANO] / [MM].[mês]`
- Link da pasta no Drive (via `rclone link "gdrive-moinho:$destino" --drive-root-folder-id 1SyPB-ivHx0zImZnEZlReQ_uqr5d2AFGE`)

---

## Modelos de referência no Drive

Pasta: `https://drive.google.com/drive/folders/1RJrdwpFWRXJ4Xqp343XkisgCcEUPlHSg`

| Modelo | Tipo de serviço |
|---|---|
| Modelo de Orçamento - Moinho Digital | Redes sociais + Anúncios + Email (escopo completo) |
| Modelo de Orçamento Enxoval Redes | Enxoval de redes sociais |
| Modelo Orçamento Captação de vídeo | Captação e edição de vídeo |
| Modelo de orçamento Anúncios - Moinho Digital | Meta Ads + Google Ads |
| Modelo Orçamento Anúncios para Agências Parceiras | Anúncios com estrutura para agências |
| Modelo de Orçamento de sites - Moinho Digital | Site + Hospedagem |
| Modelo Orçamento de landing page - Moinho Digital | Landing page |
| Modelo Orçamento Consultoria Google Ads | Consultoria + acompanhamento bimestral |

Consultar os modelos para calibrar o nível de detalhe das seções e o tom das descrições.

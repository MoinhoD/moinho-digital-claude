---
name: contrato
description: Gera contrato de prestação de serviços da Moinho Digital como Google Doc, salvo no Drive em Clientes > [Nome do Cliente] > Proposta+Contrato. Disparar quando o usuário mencionar "gerar contrato", "novo contrato", "contrato para [cliente]" ou /contrato.
---

## Contexto

Ler antes de começar:
- `_contexto/empresa.md` — dados da Moinho Digital (contratada)

---

## Passo a passo

### 1. Coletar dados variáveis

Perguntar ao usuário os itens abaixo. Se já tiver informações disponíveis (briefing, proposta aprovada, histórico da conversa), extrair o que der sem fazer todas as perguntas.

Apresentar as perguntas agrupadas em uma única mensagem:

---

**Contratante**
- Nome completo da empresa
- CNPJ
- Endereço completo (rua, número, bairro, cidade, estado, CEP)
- Nome de quem vai assinar
- CPF de quem vai assinar

**Objeto**
- Descrição dos serviços contratados (texto livre — pode ser o escopo da proposta)

**Valores**
- Valor da parcela fixa mensal (ex: R$ 3.000,00)
- Dia do mês de vencimento (ex: 10)
- Data do primeiro vencimento (ex: 10/11/2024)
- Mês proporcional de início (ex: outubro de 2024)
- Tem remuneração variável? (sim/não)
  - Se sim: qual o gatilho (ex: "a partir de matrículas efetivadas") e valor da bonificação (ex: R$ 300 por matrícula)

**Outros III — serviços fora do contrato**
- Liste os serviços que NÃO fazem parte desse contrato (ex: produção de vídeo, Google Ads, landing pages)

**Data**
- Data de assinatura/vigência (ex: 09 de outubro de 2024)

---

### 2. Construir o bloco VALORES

Montar o texto completo com base nos dados coletados:

```
Parcelas fixas mensais de R$ [VALOR], vencendo a primeira em [DATA_PRIMEIRO_VENCIMENTO], proporcionalmente aos dias trabalhados em [MES_INICIO], a contar da assinatura do presente contrato. As demais cobranças ocorrem sucessivamente a cada dia [DIA_VENCIMENTO] dos meses subsequentes.
```

Se houver variável, adicionar parágrafo separado:

```
Acrescida ao valor fixo da prestação de serviço, está prevista remuneração variável [DESCRICAO_GATILHO]. A cada [UNIDADE_GATILHO] efetivada, haverá a bonificação de R$ [VALOR_VARIAVEL] a ser pago no mês seguinte à confirmação.
```

Sempre fechar com:

```
Os valores deverão ser pagos por meio de boleto fornecido pela contratada.
```

---

### 3. Construir o bloco OUTROS III

Montar a frase com base na lista de serviços não incluídos:

```
Não fazem parte do objeto deste contrato [LISTA DE SERVIÇOS]. Caso necessário, deverão ser orçados à parte e poderão ser adicionadas ao escopo de trabalho.
```

---

### 4. Gerar o HTML

Ler `.claude/skills/contrato/template.html`. Substituir os placeholders e salvar em:

`comercial/contratos/[nome-cliente]/contrato-[nome-cliente].html`

Criar a pasta se não existir.

**Placeholders:**

| Placeholder | Conteúdo |
|---|---|
| `{{CONTRATANTE_EMPRESA}}` | Nome da empresa contratante |
| `{{CONTRATANTE_CNPJ}}` | CNPJ formatado |
| `{{CONTRATANTE_ENDERECO}}` | Endereço completo |
| `{{CONTRATANTE_REPRESENTANTE}}` | Nome de quem assina |
| `{{CONTRATANTE_CPF}}` | CPF de quem assina |
| `{{OBJETO}}` | Descrição dos serviços contratados |
| `{{VALORES}}` | Texto de valores construído no passo 2 |
| `{{OUTROS_III}}` | Texto de outros III construído no passo 3 |
| `{{DATA}}` | Data de assinatura (ex: Porto Alegre, 09 de outubro de 2024) |
| `{{CONTRATANTE_EMPRESA_BOTTOM}}` | Nome da empresa contratante (rodapé) |

---

### 5. Salvar no Google Drive

Salvar em `Clientes > [Nome do Cliente] > Proposta+Contrato`.

#### 5a. Localizar a pasta do cliente

Usar o MCP `search_files` para encontrar a pasta do cliente no Drive:
```
query: name contains '[Nome do Cliente]' and mimeType = 'application/vnd.google-apps.folder'
```

Se encontrar mais de uma pasta, mostrar as opções e pedir confirmação. Se não encontrar, avisar e perguntar se quer criar.

#### 5b. Localizar ou criar subpasta de contrato

Dentro do ID da pasta do cliente, buscar qualquer pasta que contenha "contrato" ou "proposta" no nome:
```
query: title contains 'contrato' and '[ID_CLIENTE]' in parents and mimeType = 'application/vnd.google-apps.folder'
```

Se encontrar, usar o ID dessa pasta. Se não encontrar, criar via MCP `create_file`:
- `title`: `Contrato e proposta`
- `mimeType`: `application/vnd.google-apps.folder`
- `parentId`: ID da pasta do cliente

#### 5c. Criar o Google Doc via MCP

Usar `create_file` com:
- `title`: `contrato-[nome-cliente]`
- `contentMimeType`: `text/html`
- `textContent`: conteúdo HTML do contrato (texto limpo — sem base64)
- `parentId`: ID da subpasta de contrato

**Importante para a formatação:** no HTML enviado ao MCP, usar `<p style="text-align:center"><strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</strong></p>` para o título — nunca `<h1>`, pois o Google Docs converte `<h1>` para Heading 1 (fonte grande e colorida), o que não fica adequado para um contrato. Usar `<p>&nbsp;</p>` entre as seções para espaçamento.

**Atenção:** o MCP sempre cria um documento novo. Se já existir uma versão anterior com o mesmo nome, avisar o usuário para apagar manualmente no Drive antes de criar o novo.

---

### 6. Assinatura digital

Ao finalizar, informar:

> "O contrato foi salvo no Drive em Clientes / [Nome do Cliente] / Proposta+Contrato. Para coletar as assinaturas, recomendo usar o **ClickSign** ou **D4Sign** — ambos têm validade jurídica no Brasil e funcionam bem com Google Docs exportados em PDF."

---

### 7. Retornar resultado

Informar:
- Arquivo local: `comercial/contratos/[nome-cliente]/contrato-[nome-cliente].html`
- Local no Drive: `Clientes / [Nome do Cliente] / Proposta+Contrato`
- Próximo passo: exportar o Google Doc como PDF e enviar para assinatura digital

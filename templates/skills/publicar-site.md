---
name: publicar-site
description: >
  Publica um arquivo HTML no ar via Netlify e retorna um link compartilhável.
  Use quando o usuário disser "publica", "coloca no ar", "quero um link", "deploy",
  "publica esse HTML", "publicar-site" ou após criar uma proposta/landing page.
---

# /publicar-site — Deploy no Netlify

## O que faz

Envia um arquivo ou pasta HTML pro Netlify e retorna uma URL pública com HTTPS.
O link funciona em qualquer dispositivo e pode ser compartilhado direto com o cliente.

## Como usar

Chame `/publicar-site` seguido do caminho do arquivo ou pasta:
```
/publicar-site propostas/proposta-cliente-x.html
/publicar-site comercial/propostas/cliente-x/
```

Ou chame sem argumento — o Claude vai perguntar qual arquivo publicar.

---

## Pré-requisitos

Para usar essa skill você precisa:

1. **Netlify CLI instalado:**
   ```bash
   netlify --version
   ```
   Se não estiver instalado: `npm install -g netlify-cli`

2. **Login no Netlify:**
   ```bash
   netlify login
   ```
   Se o projeto já tiver `.netlify/state.json` com `siteId`, o deploy usa o site existente automaticamente.

Se o `.netlify/state.json` não existir, a CLI vai perguntar se quer criar um novo site ou vincular a um existente.

---

## Workflow

1. Verificar se o arquivo ou pasta existe e contém HTML válido
2. Verificar se Netlify CLI está instalado — se não, orientar instalação
3. Verificar se está logado no Netlify (`netlify status`)
4. Fazer deploy:
   ```bash
   netlify deploy --dir "[caminho]" --prod
   ```
   Se for um arquivo único (não pasta), mover para uma pasta temporária antes de fazer o deploy.
5. Retornar a URL pública

**Output:**
> "Publicado. Link: https://[site].netlify.app/[arquivo]"

---

## Dica

Pra ter um domínio próprio (ex: propostas.moinhod.com.br), conecte o domínio no painel do Netlify após o primeiro deploy. A skill continua funcionando igual.

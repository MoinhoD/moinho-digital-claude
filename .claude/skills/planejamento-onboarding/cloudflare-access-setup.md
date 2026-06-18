# Setup do Cloudflare Access — Planejamentos de Onboarding

Configuração única. Depois disso, basta adicionar o email do cliente para cada novo planejamento.

## O que é

Cloudflare Access adiciona uma tela de autenticação por email OTP antes de qualquer pessoa acessar `planejamento-*.moinhod.com.br`. O visitante digita o email, recebe um código de 6 dígitos e acessa. Sem senha para gerenciar.

Grátis para até 50 usuários no plano Zero Trust Free.

---

## Passo a passo — configuração inicial (fazer só uma vez)

### 1. Acessar o Cloudflare Zero Trust

Entrar em [one.dash.cloudflare.com](https://one.dash.cloudflare.com) com a conta Moinho Digital.

Se for a primeira vez, o Cloudflare vai pedir para criar uma organização Zero Trust. Nomear como "Moinho Digital" e escolher o plano gratuito.

### 2. Criar a aplicação de acesso

Menu lateral → **Access** → **Applications** → **Add an Application**

- Tipo: **Self-hosted**
- Application name: `Planejamentos de Onboarding`
- Session duration: `24 hours` (o cliente não precisa fazer login toda hora)
- Application domain: `planejamento-*.moinhod.com.br`
  - Zone: `moinhod.com.br`
  - Subdomain: `planejamento-*` (asterisco cobre todos os clientes)

Clicar em **Next**.

### 3. Criar a política de acesso

- Policy name: `Clientes com acesso`
- Action: **Allow**
- Configure rules:
  - Include → **Emails** → adicionar o primeiro email de cliente

Clicar em **Next** → **Add Application**.

### 4. Ajustar as configurações de login

Na aba **Login Methods** (ou **Authentication**):
- Garantir que **One-time PIN** (OTP por email) está habilitado
- Isso já vem ativo por padrão no Zero Trust Free

---

## Adicionar cliente novo

Para cada novo planejamento publicado:

1. Cloudflare Zero Trust → **Access** → **Applications** → clicar em `Planejamentos de Onboarding`
2. **Edit** → aba **Policies** → clicar na política `Clientes com acesso`
3. Em **Include → Emails**, adicionar o email do cliente
4. **Save**

O cliente já consegue acessar o link a partir desse momento.

---

## Mensagem padrão para enviar ao cliente

> "Oi [Nome]! O planejamento está disponível em: **planejamento-[cliente].moinhod.com.br**
>
> Para acessar, é só entrar no link, digitar o seu email ([email do cliente]) quando solicitado e confirmar com o código que vai chegar na sua caixa de entrada. O código expira em 10 minutos, mas depois que você entra a sessão dura 24 horas.
>
> Qualquer dúvida, é só chamar!"

---

## Revogar acesso

Para retirar o acesso de um cliente:

1. Access → Applications → `Planejamentos de Onboarding` → Edit → Policies
2. Remover o email da lista de **Emails** na política
3. Save

---

## Observações

- O domínio `moinhod.com.br` precisa estar com o proxy do Cloudflare ativo (nuvem laranja no DNS) para o Access funcionar. Se os subdomínios `planejamento-*.moinhod.com.br` criados via Netlify já usam CNAME apontando para Netlify, o Cloudflare precisa estar no modo proxy (não DNS-only).
- Se um subdomínio já foi criado com DNS-only (nuvem cinza), editar o registro DNS e ativar o proxy (nuvem laranja). O SSL continua funcionando.
- O plano gratuito do Zero Trust suporta até 50 usuários ativos simultâneos. Para uma agência, isso é mais do que suficiente.

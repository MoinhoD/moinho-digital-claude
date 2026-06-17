# Moinho Digital — Claude Code OS

## O que é esse workspace

Ambiente de trabalho da Moinho Digital, agência de marketing digital com foco em performance e conteúdo. Usado por Ina Cunha e o time para produzir entregas de clientes e organizar os processos internos da agência.

**Estrutura de pastas:**
- `clientes/` — uma pasta por cliente, seguindo o modelo em `_modelo-cliente/`
  - `_modelo-cliente/onboarding/` — materiais de onboarding e kickoff
  - `_modelo-cliente/planejamento/` — planejamentos estratégicos
  - `_modelo-cliente/conteudo/` — conteúdos produzidos (redes sociais, blog, email)
  - `_modelo-cliente/anuncios/` — materiais e relatórios de mídia paga
  - `_modelo-cliente/relatorios/` — relatórios mensais, bimestrais, trimestrais, semestrais e anuais
- `comercial/` — documentos comerciais da agência
  - `comercial/propostas/` — propostas para novos clientes
  - `comercial/contratos/` — contratos fechados
- `documentacao/` — processos internos da Moinho documentados (SOPs, fluxos, rotinas)
- `dados/` — arquivos para análise (CSV, XLSX, PDF, TXT)
- `marca/` — identidade visual e design guide
- `templates/skills/` — templates de skills prontos para personalizar com /mapear
- `templates/ferramentas/catalogo.md` — APIs e ferramentas disponíveis para usar em skills
- `tarefas.md` — anotações e pendências do workspace

## Sobre o negócio

A Moinho Digital é uma agência de marketing digital com foco em performance e conteúdo. Desenvolve estratégias e executa ações em canais digitais para tracionar negócios de clientes externos. Tagline: "Tração para negócios que importam." Time multidisciplinar com redatores, estrategistas, analistas, designers e jornalistas.

## O que mais fazemos aqui

- Materiais de onboarding e kickoff de clientes
- Planejamentos estratégicos de conteúdo e mídia
- Produção de conteúdo para redes sociais, blog e email
- Gestão de anúncios no Google, LinkedIn e Meta
- Relatórios de performance (mensais, bimestrais, trimestrais, semestrais e anuais)
- Propostas comerciais e contratos
- Organização de processos internos e gestão do time

## Clientes e contexto

Atende clientes externos. Ina lidera a operação e o comercial. O foco atual é otimizar processos, enxugar o time e ampliar a carteira com clientes de ticket mais alto.

## Tom de voz

Seguir o tom de voz da marca: argumentador, explicativo, convidativo, coerente, lógico, tranquilo, informal e despretensioso. Voz ativa. Frases curtas e diretas. Sem travessão, sem títulos em caixa alta, sem jargões.

## Ferramentas conectadas

ClickUp, Google Drive, WhatsApp, Reportei, Google Ads, Meta Ads, Business Suite, LinkedIn, Instagram, Mlabs, Conta Azul.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (se existirem e estiverem configurados):

1. `_contexto/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_contexto/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_contexto/estrategia.md` — foco atual, prioridades, o que pode esperar

Usar essas informações como base para qualquer resposta ou decisão. Ao sugerir prioridades, formatos ou abordagens, considerar o foco atual descrito em `estrategia.md`.

Para qualquer tarefa visual (carrossel, proposta, slide, landing page), consultar `marca/design-guide.md` como referência de estilo.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe uma skill relevante em `.claude/skills/` ou `.claude/commands/`.
Se encontrar, seguir as instruções da skill.
Se não encontrar, executar a tarefa normalmente.

Ao concluir uma tarefa que não tinha skill mas parece repetível (o usuário provavelmente vai pedir de novo no futuro), perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar para tarefas pontuais ou perguntas simples. Só quando o padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo, melhorar uma resposta ou dar uma instrução que parece permanente (frases como "na verdade é assim", "não faça mais isso", "prefiro assim", "sempre que...", "evita...", "da próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o negócio** (quem são os clientes, como funciona a empresa, serviços, mercado) → adicionar em `_contexto/empresa.md`
- **Sobre preferências e estilo** (tom de voz, formato de resposta, o que evitar, como estruturar textos) → adicionar em `_contexto/preferencias.md`
- **Sobre prioridades e foco atual** (projetos em andamento, metas do momento, prazos importantes, o que é prioridade agora) → adicionar em `_contexto/estrategia.md`
- **Regra de comportamento nessa pasta** (onde salvar arquivos, como nomear, fluxos específicos) → adicionar no próprio `CLAUDE.md`

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro. Confirmar o que foi salvo mostrando a linha adicionada.

Não perguntar se a correção for óbvia de contexto imediato (ex: "na verdade o arquivo se chama X"). Só perguntar quando a informação tiver valor duradouro.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante no projeto (novo cliente, nova skill, mudança de foco, novo processo, ferramenta instalada, estrutura de pastas alterada), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize os arquivos de memória?"

Se sim, identificar o que precisa atualizar:

- **Novo cliente, serviço, ferramenta, equipe** → `_contexto/empresa.md`
- **Mudança de prioridade ou foco** → `_contexto/estrategia.md`
- **Correção de tom ou estilo** → `_contexto/preferencias.md`
- **Nova pasta, regra de organização, skill criada** → `CLAUDE.md`
- **Mudança visual (cores, fontes, logo)** → `marca/design-guide.md`

Mostrar o que vai mudar antes de salvar. Não reformatar o arquivo inteiro, só adicionar ou editar a linha relevante.

**Quando não perguntar:**
- Tarefas pontuais que não mudam o contexto (ex: escrever um email, criar um post avulso)
- Perguntas simples ou conversas sem ação
- Mudanças que já foram salvas pelo bloco "Aprender com correções"

**Dica:** se não sabe se algo mudou, rode `/atualizar` para uma varredura completa.

---

## Criação de skills

Quando o usuário pedir para criar uma nova skill:

1. Verificar se existe um template relevante em `templates/skills/`. Se existir, usar como base e adaptar ao contexto do usuário
2. Perguntar: "Essa skill é específica pra esse projeto ou vai ser útil em qualquer projeto?"
   - Específica desse negócio → salvar em `.claude/skills/nome-da-skill/SKILL.md` (local)
   - Útil em qualquer projeto → salvar em `~/.claude/skills/nome-da-skill/SKILL.md` (global)
3. Ler `_contexto/empresa.md` e `_contexto/preferencias.md` para calibrar o conteúdo da skill ao contexto do negócio
4. Se a skill precisar de arquivos de apoio (templates, referências, exemplos), criar dentro da pasta da skill
5. Seguir o fluxo da skill-creator nativa do Claude Code

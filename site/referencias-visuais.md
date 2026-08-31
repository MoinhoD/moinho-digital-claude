# Referências visuais e direção de design — novo site Moinho

Arquivo vivo. Cada referência que o Vini manda entra aqui com a leitura do que serve e do
que não serve, para a decisão de layout não se perder entre uma conversa e outra.

Atualizado em 03/08/2026. Documentos irmãos na mesma pasta:
`wireframe.html` (estrutura e texto para aprovação) e o briefing em PDF.

---

## Direção de design, definida pelo Vini em 03/08/2026

Esta seção manda sobre todas as outras. Onde ela conflitar com a base da marca abaixo, ela vence,
com o conflito registrado.

### O problema

A identidade visual atual e o posicionamento nas redes refletem um lado mais criativo. O contexto
de hoje é outro: a Moinho está dentro de um grupo, com foco em RevOps, estratégia digital, dados,
análise e resultado. **O site precisa refletir o momento atual, não o que a marca sugere no papel.**

O roxo, na leitura do Vini, é cor batida para agência de marketing e não sustenta sozinha o
posicionamento novo.

### O desafio

Trazer símbolos, ícones e lembranças do lado criativo, mas com visual sério, profissional, moderno,
com ar hi-tech sem exagero e sem firula, sóbrio, com padrão elegante de design.

### Distribuição de cor, a decisão mais importante

> Sobriedade tem cor: preto ou branco. O roxo e o vermelho entram no destaque, na exceção.

- **Base: branco.** É o fundo do site.
- **Roxo:** no máximo um ou dois blocos de fundo na página inteira.
- **Vermelho:** provavelmente só o bloco de CTA.
- Nada de aplicar roxo e vermelho em qualquer lugar. Cada uso precisa ser justificado.

### Tipografia

É onde a sobriedade se quebra. Se a estrutura é sóbria, a fonte traz cor e vida. O caminho é
**headline com palavras em destaque**, em cor, dentro de um título que no restante é neutro.
Fonte moderna, mas não sóbria demais.

### Animação

O nível do `ubrainsite.webflow.io` é o aceitável. Não pesa e tira a cara de site chapado feito por
iniciante. Ver o sistema de movimento mais abaixo.

### Quando isso entra

**Design e animação são a cereja do bolo e entram só na hora de apresentar o site pronto.** Antes
disso, o trabalho é estrutura, copy e wireframe. O wireframe segue em cinza.

---

## Mapa de distribuição de cor

Proposta de onde cada cor entra, seção a seção, respeitando o teto de um ou dois blocos roxos.

| # | Seção | Fundo | Onde a cor aparece |
|---|-------|-------|--------------------|
| 1 | Abertura | branco | palavras em destaque no headline, botão principal |
| 2 | Prova em números | branco | os números, em cor; fundo continua branco |
| 3 | Diferenciais | branco | palavra em destaque no título |
| 4 | **Ecossistema Atlantar** | **roxo** | bloco cheio, texto em branco |
| 5 | Serviços | branco | numeração e palavra em destaque |
| 6 | Cases | branco | tratamento da foto, ver observação |
| 7 | Marcas atendidas | branco | nada, logos em cinza |
| 8 | Depoimentos | branco | aspas ou detalhe em cor |
| 9 | **Diagnóstico** | **roxo ou vermelho** | bloco de CTA, o mais forte da página |
| 10 | Dúvidas | branco | nada |
| 11 | Contato | branco | botão de envio |
| 12 | Rodapé | preto ou roxo escuro | fecha a página |

**Dois blocos cheios de cor apenas: o Atlantar e o diagnóstico.** Um sustenta autoridade, o outro
converte. O resto da página respira em branco, que é o que dá a sobriedade pedida.

**Observação sobre os cases.** A decisão anterior era camada roxa sobre a foto nos três cards.
Com a direção nova, isso passa a ser roxo em três blocos de uma vez, o que fura o teto. A proposta
revisada: **fotos em preto e branco puro, número em branco sobre elas, e a camada de cor entrando
só no hover**. Fica mais sóbrio, mais elegante, e mantém a diretriz de misturar P&B com colorido.
Precisa da sua confirmação, porque muda uma decisão já fechada.

---

## Base da marca, o que já está definido

Vem do briefing e das diretrizes da agência. **Parte disso está em conflito com a direção acima**,
ver as notas.

| Item | Valor |
|------|-------|
| Roxo, cor principal | `#5A368C` |
| Vermelho | **`#D23E4F`**, resolvido. O manual escreve `#D2334F`, mas informa o RGB `210 62 79`, que em hex é `#D23E4F`. O hex do manual tem um dígito trocado. |
| Salmão / rosé | `#F0867D` |
| Creme, fundo de página | `#EFEEDF`, no lugar do branco. **Conflita com a direção nova, que pede branco** |
| Degradê | vermelho para rosé |
| Títulos | Noto Serif |
| Corpo e botões | Lexend |
| Estilo | jovial, colagem, half-tone, contornos de destaque, P&B com colorido |
| Evitar | pose corporativa, caixa alta em títulos, distorção do logotipo |

O arquivo `marca/design-guide.md` citado no briefing não existe no drive. Tudo acima veio do
próprio briefing e de `propostas-moinho/diretrizes.md`.

O símbolo da marca são quatro pás em torno de um centro, duas em contorno, uma sólida e uma em
degradê. Na prática é um rotor, e é daí que sai o sistema visual proposto.

---

## 01 · Up Digital (helloupdigital.com)

Agência de marketing AI-first, Miami. Fundo preto com verde-lima neon como cor única.
Abre com sequência presa ao scroll: uma esfera de luz cresce por três telas cheias até
explodir. Depois alterna preto, off-white e uma faixa lime chapada. Títulos em caixa alta
pesada com a segunda linha em serifada itálica.

### Aprovado pelo Vini, já aplicado no wireframe

**Card de case com número herói sobre a foto.** A métrica ocupa mais espaço que o nome do
cliente e fica sobre a imagem, não abaixo. Foto em preto e branco, camada de cor por cima em
`mix-blend-mode: multiply`, número em branco. Resolve o item 4 do briefing e a diretriz de
misturar P&B com colorido de uma vez só. Camada roxa nos cases, degradê vermelho e rosé
guardado para um destaque pontual.

**Título com a segunda linha vazada em contorno.** Primeira linha sólida, segunda só com
`-webkit-text-stroke`. Cai na diretriz de "contornos de destaque" da marca. Aplicado em três
seções apenas, cases, depoimentos e diagnóstico, para não virar padrão e perder o efeito.

### Descartado

Abertura presa ao scroll, fundo preto, caixa alta em títulos e os dois elementos flutuantes
competindo entre si.

---

## 02 · Atlantar (atlantar.com.br)

O grupo do qual a Moinho faz parte. É a referência mais importante das três, porque o site da
Moinho precisa conversar com ele sem virar cópia.

### Como funciona

Fundo azul-marinho quase preto. O símbolo do Atlantar, que já é um portal em perspectiva,
cresce conforme o scroll até virar o próprio layout: as duas pernas do símbolo viram o gradiente
de fundo, azul de um lado e coral do outro, e o vão escuro do meio vira a coluna onde o conteúdo
vive. O logo não ilustra a página, ele é a página.

Tipografia sans neo-grotesca, títulos em peso regular e não bold, o que dá um ar sóbrio e caro.
Nav minimalista. Texturas de pontos ao fundo, half-tone de verdade.

### O que vale trazer

**A ideia de o símbolo virar estrutura.** O símbolo da Moinho é composto por quatro pás em torno
de um centro, ou seja, é literalmente um rotor. Dá para usar essa forma como o átomo do layout:
recorte das fotos, forma dos cards, marcador de seção. É o caminho para o site da Moinho ter
parentesco com o do Atlantar sem copiar o gradiente azul e coral deles.

**Textura de pontos ao fundo.** Eles usam para dar profundidade sem poluir. A Moinho pede
half-tone no briefing, então isso já estava previsto e ganha uma referência concreta de dosagem.

**Contador numérico que roda ao entrar na tela.** Eles usam em "anos de atuação", que é
exatamente o número que a Moinho precisa destacar.

**Reveal de texto por opacidade preso ao scroll.** O parágrafo começa cinza e as palavras vão
ficando brancas conforme a pessoa rola. É o efeito mais elaborado do site e eles usam uma vez só.

### O que não trazer

A paleta azul e coral, que é do grupo e não da Moinho. E a abertura longa do símbolo crescendo,
que consome três telas antes do conteúdo, mesmo problema do Up Digital.

---

## 03 · Ubrain (ubrainsite.webflow.io)

Referência trazida pelo Vini especificamente pelo tipo de animação.

### Como funciona

Quase monocromático, fundo grafite. A tipografia é a estrela: sans grotesca pesada em corpo
gigante, com itálico. As palavras entram por baixo de uma máscara, linha a linha, conforme a
pessoa rola. Imagens que deslizam e se encaixam em grade. Linhas de contorno soltas como
elemento decorativo. Botões em pílula com um ponto antes do texto.

### O que vale trazer

**O reveal por máscara.** A linha de texto sobe por trás de uma borda invisível, em vez de
simplesmente aparecer com fade. É a diferença entre parecer elaborado e parecer template, e
custa poucas linhas de CSS.

**Imagens que assumem posição em vez de já nascerem paradas.** Movimento curto, uma vez só.

### O que não trazer

O monocromático e o corpo tipográfico gigante ocupando a tela inteira, que não cabe num site
institucional que precisa entregar informação rápido.

---

## Sistema de movimento proposto

O Vini pediu movimento nas transições, com ar elaborado e moderno, mas sem excesso de animação.
A proposta é ter poucos recursos bem executados em vez de muitos efeitos espalhados. Cinco
recursos, e nada além disso.

**1 · Reveal por máscara nos títulos de seção.** Vindo do Ubrain. A linha sobe por trás de uma
máscara ao entrar na tela, uma vez só, cerca de 500ms. Nos títulos que têm segunda linha vazada,
a linha vazada entra logo depois da sólida, com um pequeno atraso. O contorno aparecendo depois
do preenchimento é o momento mais bonito que dá para conseguir de graça aqui.

**2 · Contador nos números de credibilidade.** Vindo do Atlantar. Os quatro números da faixa,
10 anos, 70+, R$ 3 mi+ e 150+, contam do zero ao valor quando a faixa entra na tela. Uma vez só.
É barato de fazer e reforça justamente o que o briefing manda destacar.

**3 · Reveal de texto preso ao scroll, em um único parágrafo.** Vindo do Atlantar. As palavras
passam de cinza para roxo conforme a pessoa rola. Usar exclusivamente no parágrafo do ecossistema
Atlantar, que é o argumento mais denso da página e o que mais ganha com leitura pausada. Se
aparecer em mais de um lugar, vira tique.

**4 · Micro-interação nos cards de case.** No hover, o card sobe alguns pixels e a camada de cor
sobre a foto clareia, revelando mais do preto e branco por baixo. Conecta com a decisão já tomada
dos cases e dá a sensação de material vivo sem animação de entrada.

**5 · O rotor.** O símbolo da Moinho tem quatro pás em torno de um centro. No hero ele aparece em
escala grande girando muito devagar, algo como uma volta a cada 50 segundos, quase imperceptível.
É o equivalente ao símbolo do Atlantar virando página, mas contido: movimento ambiente, não
espetáculo, e ninguém precisa esperar ele terminar para ler a página.

### Regras que valem para tudo

- Nenhum efeito trava ou sequestra o scroll. A pessoa rola e o conteúdo está lá.
- Cada elemento anima uma vez. Nada fica repetindo em loop, com a única exceção do rotor.
- Durações curtas, entre 300 e 600ms, com easing suave.
- `prefers-reduced-motion` desliga tudo. Quem configurou o sistema para reduzir movimento recebe
  a página estática e completa, sem nada quebrado.
- Nada de animação atrasando a leitura da primeira dobra. O briefing exige clareza em poucos
  segundos, e isso vem antes de qualquer efeito.

---

## Decisões fechadas até aqui

1. **Calculadora de diagnóstico fica fora do site.** Por ora, botão apontando para
   `diagnosticomoinho.lovable.app`, abrindo em nova aba. A seção 9 continua existindo como bloco
   de destaque, com os três passos do que a pessoa encontra do outro lado, porque o briefing exige
   destaque próprio. O Vini pretende instalar a ferramenta num subdomínio depois.
2. **Card de case com número herói sobre foto tratada.** Referência Up Digital. Um número por case,
   as demais métricas viram apoio no rodapé do card.
3. **Título de seção com a segunda linha vazada em contorno.** Referência Up Digital, em três
   seções apenas.
4. **Sistema de movimento com cinco recursos**, descrito acima. Movimento nas transições, sem
   scroll-jacking e sem abertura animada longa.
5. **Números herói escolhidos por case:** Pedro Janot fica com 90 leads por mês, WS Cranes com
   R$ 6 mi em vendas, Instituto Eurofarma com 2,5 mi de pessoas alcançadas.

---

## Pendências, o que trava ou muda o trabalho

1. **Branco puro ou o off-white `#EFEEDF` da marca.** A direção nova pede branco, a diretriz da
   agência define off-white no lugar do branco. Os dois entregam sobriedade. Minha sugestão é usar
   o off-white como o "branco" do site: cumpre a sobriedade pedida, é mais elegante que branco puro
   em tela grande e mantém a única diretriz de fundo que a marca tem escrita.
2. **Cases: camada roxa nos três cards ou preto e branco com cor no hover.** A direção nova de
   distribuição de cor derruba a decisão anterior. Ver a observação no mapa de cor.
3. **As fontes.** O briefing fixa Noto Serif nos títulos e Lexend no corpo. A direção nova pede algo
   moderno e não sóbrio demais, com a tipografia carregando a vida da página. Noto Serif é uma
   serifada neutra, de leitura, e não entrega o ar hi-tech pedido. Decidir se mantemos a dupla do
   briefing ou se proponho outra, e nesse caso o desvio precisa ser combinado com a Moinho.
4. ~~9 ou 10 anos~~ **Resolvido: são 10 anos.** Confirmado pelo Vini em 03/08/2026, apesar de o item 6
   do briefing dizer "9 anos". Aplicado em todo o wireframe.
2. **Qual vermelho**, `#D23E4F` ou `#D2334F`.
3. **Telefone.** O briefing pede "meu telefone" no item 10. Usado o `(51) 99979-0598` do site atual.
   Falta também definir qual número recebe o WhatsApp flutuante.
4. **Destino do formulário de contato.** Hoje não existe. Sem isso o formulário não envia para lugar
   nenhum.
5. **Destino do formulário de contato.** E-mail, planilha ou CRM. Hoje não existe.
6. **Depoimento da Sayonara**, que está em vídeo no Instagram: entra transcrito, incorporado ou
   fica de fora. E se pode usar foto de rosto nos depoimentos.

### Encaminhado pelo Vini, não depende da Moinho

Cases do 1SEM26 com Pega&Cola, Lactare e WS; fotos da abertura e dos cards; logos da BD&Co e da SPO;
guia de marca; depoimento da Sayonara. Nomear as três empresas do ecossistema está autorizado pelo
próprio briefing, que pede esse bloco explicitamente.

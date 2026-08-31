# Site Moinho Digital

HTML, CSS e JavaScript puro. Sem build, sem dependência. Abre com duplo clique no
`site/index.html` ou serve a pasta com qualquer servidor estático.

> **Este arquivo mora fora da pasta `site/` de propósito.** O deploy da Netlify é
> arrasta-e-solta da pasta inteira: qualquer arquivo dentro dela vira URL pública. Como aqui
> tem anotação interna (autorização de imagem pendente, licença de foto, e-mail de contato,
> caminhos de relatório de cliente), ele fica um nível acima e não sobe junto.

```
site/
  index.html                    página inteira
  politica-de-privacidade.html  documento legal, linkado no rodapé
  css/style.css                 tokens no topo, seções numeradas de 1 a 19
  js/main.js                    nav, reveal, contador, gravata, carrossel e formulário
  assets/img/                   logo e símbolo da Moinho
```

---

## Onde mexer no design

Tudo que define a cara do site está em `css/style.css`, no bloco `:root` das primeiras
40 linhas. Trocar um valor ali muda a página inteira.

| Token | Uso hoje |
|-------|----------|
| `--roxo` `#5A368C` | cor principal, bloco do Atlantar, grifos, números |
| `--vermelho` `#D23E4F` | botões, eyebrows, gradiente do CTA (ver nota abaixo) |
| `--rose` `#F0867D` | acento, bullets, gradiente |
| `--creme` `#EFEEDF` | fundo das seções alternadas e do grifado |
| `--tinta` `#17121C` | texto |
| degradê do rodapé | roxo profundo para vermelho, com brilho rosé, em `.rodape` |
| `--display` | Archivo, títulos |
| `--corpo` | Lexend, texto |

**Distribuição de cor.** A base é branca. Só dois blocos têm cor cheia: o ecossistema
Atlantar (roxo) e o diagnóstico (roxo profundo com gradiente vermelho). O creme entra como
respiro nas seções alternadas, sem contar como bloco de cor. Manter esse teto é o que
sustenta a sobriedade.

**Destaque do título.** A classe `.grifo` colore a palavra de roxo, sem bloco de fundo.
Sobre fundo escuro (hero, Atlantar, CTA) ela vira rosé automaticamente, senão o roxo não lê.
Usar em uma expressão curta por título, nunca na linha inteira.

**Hero.** Fundo em camadas dentro de `.hero__bg`: degradê da marca, brilho quente no canto,
o símbolo da Moinho girando e a textura half-tone.

O símbolo é o oficial, em `assets/img/simbolo.svg`, extraído por vetor do arquivo
`id-visual/Arquivo base (1).ai` (que é um PDF por dentro, página 5). Ele gira via CSS e leva
`filter:brightness(2.1)` para o roxo existir sobre o fundo escuro. Se trocar o fundo para claro,
remova esse filtro. Para usar foto no lugar do degradê, descomente o `<img class="hero__foto">`.

**Nota sobre o vermelho.** O manual de marca traz o hex `#D2334F` e o RGB `210 62 79` lado a
lado, mas eles não são a mesma cor: `210 62 79` em hexadecimal é `#D23E4F`. O hex escrito no
manual tem um dígito trocado. O site usa `#D23E4F`, que corresponde ao RGB e ao que o briefing
do projeto informou. Vale a Moinho corrigir o manual.

**Fontes.** Archivo e Lexend vêm do Google Fonts, carregadas no `<head>`. Para trocar,
mude o `<link>` e as duas variáveis `--display` e `--corpo`.

---

## Animações

Sete comportamentos, todos em `js/main.js`, todos desligados por
`prefers-reduced-motion`.

1. **Entrada dos blocos.** Elementos com `.rv` sobem e aparecem ao entrar na tela.
   Escalonar com `style="--d:120ms"` no HTML. Anima uma vez só.
2. **Reveal por máscara.** `.rv-mask` com um `<span>` dentro: a linha sobe por trás de uma
   borda invisível. Usado nos títulos.
3. **Contador.** Os quatro números da faixa contam do zero em 2 s, com freio no fim.
   Controlado por `data-count`, `data-prefix` e `data-suffix` no HTML. Dispara com a faixa
   90% visível e acima dos 70% inferiores da janela (`threshold: 0.9` + `rootMargin`
   `-30%`): em tela alta ela nascia visível e o movimento acontecia antes de qualquer
   scroll. Se um dia parecer que os números "não contam", é esse par de valores que segura.
4. **Gradiente dos botões.** O `.btn` tem um gradiente vermelho e rosé que varre devagar,
   e acelera no hover. Ajustar em `@keyframes varre`.
5. **Fecho do manifesto.** O mesmo `@keyframes varre`, em 18 s, no bloco em degradê que
   fecha a seção. É a única animação contínua fora dos botões.
6. **Gravata borboleta.** Cada etapa abre um painel com o que entra nela, no hover, no foco
   e no toque. Ver a seção "Gravata borboleta" abaixo.
7. **Carrossel de depoimentos.** Gira sozinho a cada 6,5 s, com setas, pontinhos por página
   e navegação por teclado. Para no hover, no foco e no toque, e volta depois. As setas dão
   a volta em vez de desabilitar nos extremos.

Nada trava o scroll e nada segura a primeira dobra.

---

## Gravata borboleta

Deixou de ser um SVG de 940 px de largura (que no celular exigia arrastar para o lado). Hoje
é HTML e CSS: um grid de doze colunas com as etapas recortadas por `clip-path`.

- **Desktop:** funil na horizontal, seis etapas, o nó "Cliente" sobreposto no meio.
- **Até 760 px:** o mesmo grid vira uma coluna e os trapézios giram 90°, afunilando de cima
  para baixo. Nada de rolagem lateral.
- **Ordem no HTML** = ordem do celular. No desktop cada peça é posicionada por
  `grid-column` / `grid-row`, então o DOM pode seguir a leitura vertical.
- **Contraste:** as cores clareiam nas pontas e escurecem em direção ao cliente. Por isso o
  texto das pontas é escuro e o do meio é branco — toda etapa passa de 4,5:1. Se mexer nos
  gradientes de `.bt__et--1` a `--6`, conferir de novo qual metade precisa de texto branco.
- **Os textos dos painéis são rascunho.** Estão em `index.html`, dentro de `.bt__detalhes`,
  um bloco por etapa. É o conteúdo que a Moinho ainda vai escrever.

Os `--t1` / `--t2` de cada etapa são a altura (em %) onde o trapézio começa e termina.
**Precisam da unidade `%`** — sem ela o `polygon()` inteiro é inválido e a etapa vira um
retângulo.

---

## Formulário

Entrega em `contato@moinhod.com.br` via **FormSubmit**, que não exige backend.

**Falta ativar.** O teste de 25/08/2026 disparou o e-mail de ativação do FormSubmit para
`contato@moinhod.com.br` — enquanto ninguém clicar no botão **ACTIVATE FORM** daquele
e-mail, nenhum envio é entregue. É uma vez só, por caixa de entrada.

**Dois endpoints, de propósito:**

- O `action` do `<form>` é `https://formsubmit.co/52cdcfd2dc25e18b5311a23d1bf38fe6` — o
  token que o próprio FormSubmit gerou para `contato@moinhod.com.br`. Ele existe justamente
  para o e-mail não ficar exposto no código-fonte a robô de spam. Serve de fallback: sem
  JavaScript, o navegador posta direto e cai na página de obrigado do FormSubmit.
- O `js/main.js` troca esse endereço por `formsubmit.co/ajax/<token>` na hora do envio. O
  endpoint `/ajax/` devolve JSON e manda os cabeçalhos de CORS; o endpoint normal não manda,
  então um `fetch` para ele quebra em CORS **mesmo quando o e-mail foi entregue** — e a
  página mostraria erro num envio que deu certo.

Para trocar de caixa de entrada, é preciso um token novo: aponte o `action` para o e-mail
cru, envie uma vez, e o FormSubmit devolve o token do novo endereço. Netlify Forms e Make
webhook também funcionam, mas aí o `destino` no `main.js` precisa sair.

O envio é assíncrono, com mensagem de sucesso e de erro na própria página. Se falhar, o
site mostra o e-mail e sugere o WhatsApp, em vez de perder o contato.

---

## O que ainda falta

- [ ] **Foto da abertura**, se quiserem uma. Hoje o hero é degradê com o símbolo girando, sem
      imagem. O `<img class="hero__foto">` está comentado no HTML e entra sob o degradê.
- [x] ~~Foto do case WS Cranes~~ **aplicada**: `assets/img/case-ws-cranes.jpg`, o Ricardo
      Schwanke. Veio de um frame aos 7 s do bruto `C0073.MP4` enviado pelo Vini (a captura
      anterior, tirada da capa do vídeo do Instagram, foi descartada). O bruto está gravado
      na vertical com o sensor deitado, então o frame precisa girar 90° no sentido horário.
      O galpão deixa a imagem cinzenta e esverdeada, então o tratamento corrige o branco pelos
      pixels mais claros e sobe a saturação em 16%, só isso. Uma primeira versão levou CLAHE,
      curva de contraste e sharpen: ficou com cara de filtro e foi refeita. O enquadramento é
      aberto, plano médio, para casar com o card do Pedro Janot.
- [x] ~~Fotos dos cases~~ **os três cards têm foto**: `case-pedro-janot.jpg`,
      `case-ws-cranes.jpg` e `case-instituto-eurofarma.jpg`, em `assets/img/`. Para trocar
      qualquer uma, basta substituir o arquivo.

**Tratamento das fotos de case.** Elas entram naturais, coloridas, sem filtro e sem camada de
cor sobre a imagem inteira — testamos preto e branco com camada roxa (pesado demais sobre
retrato) e com camada vermelha (idem). O que segura a leitura do número branco é um degradê
preto suave só no rodapé da foto, em `.case__art::after`, onde o número encosta. Ele resolve o
caso difícil, que é a fachada clara do Eurofarma. Com o degradê no lugar, o `text-shadow` de
`.case__num` e `.case__lab` ficou bem discreto; se um dia o degradê sair, a sombra precisa
voltar a ser forte.
- [ ] **Autorização de imagem do Ricardo.** A foto veio de post público da WS Cranes, mas usar
      o rosto de uma pessoa identificável no site da Moinho pede o ok dela.
- [x] ~~Métricas de apoio do Instituto Eurofarma~~ **aplicadas**: 34 mil interações no Instagram
      e 52 mil no LinkedIn. O alcance de 2,5 mi é o número grande sobre a foto, então não se
      repete embaixo.
- [x] ~~Cases de Pega&Cola e Lactare~~ **aplicados**, somando cinco cards. Com cinco, a
      seção deixou de ser grid de três colunas e virou flex com a última linha centralizada.
      Números tirados dos relatórios de 1º semestre de 2026 de cada cliente
      (`moinho/pega-e-cola/relatórios/relatorio-1sem-2026-textos.md` e
      `moinho/lactare/lactare/relatorios/2026-1sem-lactare.md`):
      Pega e Cola — conversão de 1,62% para 16,41% no semestre (daí o "10×"), 168 vendas,
      R$ 8,48 por lead; Lactare — 1.031.407 visualizações, seguidores de 5.036 para 7.365
      (+46%), 17.908 interações.
      **Fotos:** a do Lactare é a van adesivada, enviada pelo Vini. A da Pega e Cola saiu do
      hero do site do próprio cliente (`moinho/pega-e-cola/site/assets/Foto hero.png`), que
      é banco de imagem com a marca deles aplicada no uniforme e no transfer — o enquadramento
      pega os dois logos e deixa de fora a marca d'água do canto. Vale confirmar se a licença
      daquela foto cobre o uso no site da Moinho, que é outro contexto.
- [ ] **Case da WS Cranes do 1º semestre de 2026.** O card existe, mas com números antigos.
- [x] ~~Logos das marcas atendidas~~ **11 logos extraídos do site antigo** e aplicados em
      `assets/img/logos/`, com fundo transparente. Ficaram em texto os 4 que não existiam
      no site antigo: Haxea, Pearson Animal e Tríade School. O da Lactare foi enviado depois
      e já está aplicado, somando 12.
- [ ] **Logo do WS Cranes está desatualizado.** É o que estava no site antigo. Substituir o
      arquivo `assets/img/logos/ws-cranes.png` quando tiver a versão nova.
- [ ] **Conferir o nome "Ipanema Life Sciences".** A lista antiga dizia "Ipa Farma", mas o logo
      no site é da Ipanema Life Sciences.
- [ ] **Logos de BD&Co e SPO** no bloco do ecossistema.
- [x] ~~Quarto diferencial~~ **escrito e aplicado**: "Processo simples e parceria próxima".
      Com quatro cards, a grade da seção virou 2x2 (`.g2x2`).
- [x] ~~Prévia da ferramenta de diagnóstico~~ **aplicada**: `assets/img/diagnostico.jpg`, print
      da etapa 1 de 6. A moldura de janela (cantos, barra e os três pontos) vem do CSS em `.mock`,
      não está embutida na imagem, então dá para ajustar sem reexportar o print. Se a ferramenta
      mudar de cara, basta trocar o JPEG.
- [x] ~~Telefone, e-mail e endereços na seção de contato~~ **movidos para o rodapé**. A seção
      de contato ficou só com o formulário. No rodapé sobraram quatro colunas — marca, Navegar,
      Ecossistema e Onde estamos — e "Onde estamos" traz só o nome das quatro cidades, sem
      endereço. O e-mail saiu de vez: quem quiser escrever usa o formulário. O WhatsApp virou
      o quarto ícone das redes.
- [x] ~~Página de política de privacidade~~ **criada**: `politica-de-privacidade.html`,
      linkada no rodapé das duas páginas. O site antigo não tinha nenhuma, então o texto é
      novo, escrito em cima do que o site de fato coleta (formulário, WhatsApp, Google Fonts).
      CNPJ e endereço da sede preenchidos em 25/08/2026, não há mais marcador pendente
      na página.
- [ ] **Logos de Haxea, Pearson, Tríade e Data Centrics em vetor.** Os quatro foram
      recuperados do que havia à mão: Haxea e Pearson vieram de arquivo com fundo branco
      (fundo removido), Tríade veio do avatar em verde (as letras creme viraram verde sobre
      transparente) e Data Centrics saiu do `.ai` oficial em 400 dpi. Ficam bons nos 54 px
      da grade, mas o da Tríade tem só 120 px de altura — se a Milena tiver os originais,
      vale trocar.

## Ponto cego do formulário

Hoje o único registro de um envio é o e-mail que chega em `contato@moinhod.com.br`. O
FormSubmit não tem conta, painel nem histórico — ele recebe e encaminha. Isso significa que
**uma falha silenciosa não aparece**: se o form for desativado, se o e-mail cair no spam ou
se o serviço sair do ar, ninguém fica sabendo que houve um preenchimento.

O JavaScript já lê a resposta JSON do endpoint `/ajax/` e mostra erro na tela quando o envio
falha de verdade, então o visitante não sai achando que enviou. O buraco é o caso em que o
FormSubmit aceita e não entrega.

Enquanto não houver um segundo destino (webhook do Make gravando numa planilha, por
exemplo), vale um envio de teste de tempos em tempos para confirmar que o caminho continua
de pé.

---

## Para publicar

É estático: sobe a pasta inteira. Na Hostinger, via FTP na raiz. Na Netlify, arrastar a
pasta. O único cuidado é manter a estrutura de `css`, `js` e `assets` junto do `index.html`.

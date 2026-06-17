// node gerar-pptx.js <caminho-saida.pptx>
// Gera apresentação PPTX da proposta Venmka com conteúdo completo

const PptxGenJS = require('pptxgenjs');
const path = require('path');

const output = process.argv[2] || 'proposta.pptx';

const ROXO    = '5A368C';
const ROXO_DK = '3d2260';
const VERM    = 'D23E4F';
const SALMAO  = 'F0867D';
const CREME   = 'EFEEDF';
const DARK    = '1a1020';
const BRANCO  = 'FFFFFF';
const CINZA   = '666666';
const TEXTO   = '1C1C1C';

// Logo paths (white versions)
const logoPath = path.resolve(__dirname, '../../../marca/md-1-branco.png');
const simboloPath = path.resolve(__dirname, '../../../marca/md-simbolo-branco.png');

const pres = new PptxGenJS();
pres.layout = 'LAYOUT_WIDE'; // 13.33" x 7.5"

// Helper: add full-background rect (used for gradient simulation)
function bgGradient(slide, color1, color2) {
  slide.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: '100%', h: '100%',
    fill: { type: 'gradient', gradientType: 'linear', angle: 135,
      stops: [{ position: 0, color: color1 }, { position: 100, color: color2 }] }
  });
}

function bgSolid(slide, color) {
  slide.background = { fill: color };
}

function labelTag(slide, text, opts = {}) {
  slide.addText(text.toUpperCase(), {
    x: opts.x || 0.6, y: opts.y || 0.55, w: opts.w || 12,
    fontSize: 9, bold: true, color: SALMAO, charSpacing: 3,
    fontFace: 'Arial'
  });
}

function slideTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.6, y: opts.y || 0.85, w: opts.w || 12,
    fontSize: 28, bold: true, color: opts.color || TEXTO,
    fontFace: 'Arial', breakLine: false
  });
}

function bodyText(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.6, y: opts.y || 1.8, w: opts.w || 12, h: opts.h || 1,
    fontSize: opts.fontSize || 13, color: opts.color || TEXTO,
    fontFace: 'Arial', valign: 'top', wrap: true,
    lineSpacingMultiple: 1.4
  });
}

// ─── SLIDE 1: COVER ───────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgGradient(s, ROXO, VERM);

  try { s.addImage({ path: logoPath, x: 0.6, y: 0.5, h: 0.55, w: 2.6 }); } catch(e){}

  s.addText('Proposta Digital', {
    x: 0.6, y: 1.7, w: 12,
    fontSize: 11, bold: true, color: SALMAO, charSpacing: 3,
    fontFace: 'Arial'
  });

  s.addText('Venmka', {
    x: 0.6, y: 2.3, w: 12,
    fontSize: 72, bold: true, color: BRANCO,
    fontFace: 'Arial', lineSpacingMultiple: 0.9
  });

  s.addText('Junho 2025', {
    x: 0.6, y: 5.4, w: 12,
    fontSize: 13, color: 'AAAAAA', fontFace: 'Arial'
  });
}

// ─── SLIDE 2: COMO ATUAMOS ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, BRANCO);

  labelTag(s, 'Como atuamos');
  slideTitle(s, 'Marketing que traciona negócios');

  s.addText('Existimos para potencializar sua marca no digital para que você tenha resultados reais no seu negócio. Com 9 anos de atuação, somos um time multidisciplinar com foco em performance e conteúdo — redatores, estrategistas, analistas, designers e especialistas em tráfego.', {
    x: 0.6, y: 1.7, w: 12, h: 1.1,
    fontSize: 13, color: TEXTO, fontFace: 'Arial', valign: 'top',
    lineSpacingMultiple: 1.4
  });

  // Stats bar
  const stats = [
    { num: '70+', label: 'marcas atendidas' },
    { num: 'R$3M+', label: 'em anúncios gerenciados' },
    { num: '150+', label: 'perfis gerenciados' },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 4.1;
    s.addText(st.num, { x, y: 3.6, w: 3.5, fontSize: 44, bold: true, color: ROXO, fontFace: 'Arial' });
    s.addText(st.label, { x, y: 4.8, w: 3.5, fontSize: 12, color: CINZA, fontFace: 'Arial' });
    if (i < 2) {
      s.addShape(pres.ShapeType.line, { x: x + 3.7, y: 3.6, w: 0, h: 1.5, line: { color: 'E0E0E0', width: 1 } });
    }
  });
}

// ─── SLIDE 3: O QUE VOCÊ GANHA ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  slideTitle(s, 'O que você ganha ao contratar\na Moinho Digital', { y: 0.4 });

  const ganhos = [
    { t: 'Estratégia personalizada e baseada em dados', d: 'Nada de fórmulas prontas. Cada negócio tem um contexto diferente — e a estratégia é criada a partir do que você precisa de verdade.' },
    { t: 'Time multidisciplinar dedicado', d: 'Redatores, estrategistas, analistas, designers e especialistas em tráfego trabalhando juntos pelo mesmo objetivo.' },
    { t: 'Conteúdos e anúncios focados em resultado', d: 'Desenvolvemos conteúdos envolventes e campanhas alinhadas à necessidade real da sua empresa — não só métricas de vaidade.' },
    { t: 'Processo simples e parceria próxima', d: 'Um processo objetivo junto ao seu time para que a tomada de decisão sobre o digital seja sempre clara e sem complicações.' },
  ];

  ganhos.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.6 : 7.0;
    const y = 1.95 + row * 2.3;
    const w = 5.8;

    s.addShape(pres.ShapeType.rect, { x, y, w, h: 2.0, fill: { color: BRANCO }, line: { color: ROXO, width: 2 }, rectRadius: 0.08 });
    s.addText(g.t, { x: x + 0.2, y: y + 0.15, w: w - 0.4, h: 0.5, fontSize: 12, bold: true, color: ROXO, fontFace: 'Arial', valign: 'top', wrap: true });
    s.addText(g.d, { x: x + 0.2, y: y + 0.75, w: w - 0.4, h: 1.1, fontSize: 11, color: '555555', fontFace: 'Arial', valign: 'top', lineSpacingMultiple: 1.3, wrap: true });
  });
}

// ─── SLIDE 4: OBJETIVO ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgGradient(s, ROXO, ROXO_DK);

  slideTitle(s, 'Objetivo da proposta', { color: BRANCO });

  s.addText('Construir a presença digital da Venmka desde o início, posicionando a marca nos canais certos e criando conteúdos que atraiam potenciais clientes.', {
    x: 0.6, y: 1.9, w: 12, h: 2,
    fontSize: 22, color: 'E8E8E8', fontFace: 'Arial',
    valign: 'top', lineSpacingMultiple: 1.5, wrap: true
  });
}

// ─── SLIDE 5: O QUE VAMOS RESOLVER ───────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  slideTitle(s, 'O que vamos resolver');

  const dores = [
    'Empresa recém-lançada sem presença digital estabelecida — nenhum canal ativo, sem audiência e sem conteúdo que apresente a marca ao mercado.',
    'Necessidade de ganhar mercado rapidamente, com o lançamento acontecendo agora, em junho de 2025.',
    'Falta de conteúdo estratégico para posicionar a marca e atrair potenciais clientes no digital.',
  ];

  dores.forEach((d, i) => {
    const y = 1.8 + i * 1.55;
    s.addShape(pres.ShapeType.rect, { x: 0.6, y, w: 12, h: 1.3, fill: { color: BRANCO }, line: { color: VERM, width: 2 }, rectRadius: 0.06 });
    s.addText(d, { x: 0.95, y: y + 0.15, w: 11.4, h: 1.1, fontSize: 12.5, color: TEXTO, fontFace: 'Arial', valign: 'top', lineSpacingMultiple: 1.3, wrap: true });
  });
}

// ─── SLIDE 6: O QUE VOCÊ PERDE ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, DARK);

  slideTitle(s, 'O que você perde ao não\nsolucionar essas dores', { color: BRANCO, y: 0.35 });

  const perdas = [
    'Perde espaço para concorrentes que já estão ativos no digital enquanto a Venmka ainda está sendo apresentada ao mercado.',
    'Perde oportunidades de venda por não ter conteúdo que gere confiança nos primeiros meses — um período crítico para qualquer negócio novo.',
    'Perde potenciais clientes que pesquisam a marca online e não encontram nada que os convença.',
    'Perde tempo e dinheiro tentando construir presença digital sem uma estratégia clara.',
  ];

  perdas.forEach((d, i) => {
    const y = 1.9 + i * 1.35;
    s.addShape(pres.ShapeType.rect, { x: 0.6, y, w: 12, h: 1.1, fill: { color: 'FFFFFF', transparency: 90 }, line: { color: SALMAO, width: 2 }, rectRadius: 0.06 });
    s.addText(d, { x: 0.95, y: y + 0.12, w: 11.4, h: 0.92, fontSize: 12, color: 'DDDDDD', fontFace: 'Arial', valign: 'top', lineSpacingMultiple: 1.3, wrap: true });
  });
}

// ─── SLIDE 7: PILARES ─────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, BRANCO);

  slideTitle(s, 'Pilares do projeto');

  const pilares = [
    { n: '1', nome: 'Redes sociais', foco: 'Construir presença digital, posicionar a marca e atrair potenciais clientes desde o lançamento.' },
    { n: '2', nome: 'Relatórios e acompanhamento', foco: 'Monitorar resultados, identificar o que funciona e ajustar a estratégia continuamente.' },
  ];

  pilares.forEach((p, i) => {
    const y = 1.85 + i * 2.2;
    s.addShape(pres.ShapeType.rect, { x: 0.6, y, w: 12, h: 1.9, fill: { color: BRANCO }, line: { color: 'E4E4E4', width: 1 }, rectRadius: 0.1 });
    s.addText(p.n, { x: 0.8, y: y + 0.3, w: 0.8, h: 1.0, fontSize: 32, bold: true, color: VERM, fontFace: 'Arial' });
    s.addText(p.nome, { x: 1.7, y: y + 0.25, w: 10.5, h: 0.5, fontSize: 16, bold: true, color: TEXTO, fontFace: 'Arial' });
    s.addText('Foco: ' + p.foco, { x: 1.7, y: y + 0.85, w: 10.5, h: 0.8, fontSize: 12, color: CINZA, fontFace: 'Arial', lineSpacingMultiple: 1.3, wrap: true });
  });
}

// ─── SLIDE 8: SERVIÇO — REDES SOCIAIS ─────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  s.addShape(pres.ShapeType.rect, { x: 0.6, y: 0.4, w: 12.2, h: 0.4, fill: { color: ROXO } });
  s.addText('1  Redes sociais', { x: 0.6, y: 0.45, w: 12, h: 0.36, fontSize: 14, bold: true, color: BRANCO, fontFace: 'Arial' });

  s.addText('Planejamento estratégico de conteúdo com funil de marketing. Criação de textos e layouts. Publicação, SAC e gerenciamento da conta — 8 conteúdos por mês.', {
    x: 0.6, y: 1.05, w: 12, h: 0.9, fontSize: 12.5, color: TEXTO, fontFace: 'Arial', lineSpacingMultiple: 1.35, wrap: true
  });

  // Left column - Moinho
  s.addText('MOINHO DIGITAL', { x: 0.6, y: 2.1, w: 5.8, fontSize: 9, bold: true, color: ROXO, charSpacing: 2, fontFace: 'Arial' });
  const mdItems = ['Planejamento estratégico das redes', 'Produção de textos com técnicas de copy', 'Criação de layouts na identidade da marca', 'Agendamento e publicação dos conteúdos', 'SAC e gerenciamento das redes'];
  mdItems.forEach((item, i) => {
    s.addText('— ' + item, { x: 0.6, y: 2.5 + i * 0.55, w: 5.8, fontSize: 11.5, color: '444444', fontFace: 'Arial' });
  });

  // Right column - Cliente
  s.addText('VENMKA', { x: 7.0, y: 2.1, w: 5.8, fontSize: 9, bold: true, color: ROXO, charSpacing: 2, fontFace: 'Arial' });
  const cliItems = ['Aprovação dos conteúdos', 'Envio de fotos e vídeos do time', 'Disponibilidade para compartilhar visão estratégica do negócio'];
  cliItems.forEach((item, i) => {
    s.addText('— ' + item, { x: 7.0, y: 2.5 + i * 0.55, w: 5.8, fontSize: 11.5, color: '444444', fontFace: 'Arial' });
  });
}

// ─── SLIDE 9: SERVIÇO — RELATÓRIOS ────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  s.addShape(pres.ShapeType.rect, { x: 0.6, y: 0.4, w: 12.2, h: 0.4, fill: { color: ROXO } });
  s.addText('2  Relatórios e acompanhamento', { x: 0.6, y: 0.45, w: 12, h: 0.36, fontSize: 14, bold: true, color: BRANCO, fontFace: 'Arial' });

  s.addText('Análise periódica dos resultados das ações digitais com relatório mensal completo. Apresentamos o que funcionou, o que ajustamos e as próximas direções estratégicas.', {
    x: 0.6, y: 1.05, w: 12, h: 0.9, fontSize: 12.5, color: TEXTO, fontFace: 'Arial', lineSpacingMultiple: 1.35, wrap: true
  });

  s.addText('MOINHO DIGITAL', { x: 0.6, y: 2.1, w: 5.8, fontSize: 9, bold: true, color: ROXO, charSpacing: 2, fontFace: 'Arial' });
  const mdItems = ['Monitoramento contínuo dos indicadores', 'Relatório mensal de performance', 'Reunião de alinhamento e próximos passos', 'Ajustes estratégicos com base nos dados'];
  mdItems.forEach((item, i) => {
    s.addText('— ' + item, { x: 0.6, y: 2.5 + i * 0.55, w: 5.8, fontSize: 11.5, color: '444444', fontFace: 'Arial' });
  });

  s.addText('VENMKA', { x: 7.0, y: 2.1, w: 5.8, fontSize: 9, bold: true, color: ROXO, charSpacing: 2, fontFace: 'Arial' });
  const cliItems = ['Participação nas reuniões mensais', 'Feedback sobre qualidade dos contatos gerados'];
  cliItems.forEach((item, i) => {
    s.addText('— ' + item, { x: 7.0, y: 2.5 + i * 0.55, w: 5.8, fontSize: 11.5, color: '444444', fontFace: 'Arial' });
  });
}

// ─── SLIDE 10: MODELO DE ATENDIMENTO ──────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, BRANCO);

  slideTitle(s, 'Nosso modelo de atendimento');

  s.addText('É um processo contínuo de execução e melhoria. A estratégia evolui junto com o negócio e sempre alinhada aos seus objetivos.', {
    x: 0.6, y: 1.7, w: 12, h: 0.8, fontSize: 13, color: TEXTO, fontFace: 'Arial', lineSpacingMultiple: 1.35, wrap: true
  });

  const steps = ['Execução', 'Análise', 'Ajuste', 'Reunião'];
  steps.forEach((step, i) => {
    const x = 0.6 + i * 3.0;
    s.addShape(pres.ShapeType.rect, { x, y: 2.85, w: 2.5, h: 0.7, fill: { color: ROXO }, rectRadius: 0.1 });
    s.addText(step, { x: x + 0.05, y: 2.88, w: 2.45, h: 0.65, fontSize: 13, bold: true, color: BRANCO, fontFace: 'Arial', align: 'center' });
    if (i < 3) {
      s.addText('→', { x: x + 2.5, y: 2.87, w: 0.5, h: 0.68, fontSize: 18, color: ROXO, fontFace: 'Arial', align: 'center' });
    } else {
      s.addText('↺', { x: x + 2.5, y: 2.87, w: 0.5, h: 0.68, fontSize: 18, color: ROXO, fontFace: 'Arial', align: 'center' });
    }
  });

  s.addText('ciclo contínuo — mês a mês', { x: 0.6, y: 3.8, w: 12, fontSize: 11, color: SALMAO, charSpacing: 1, fontFace: 'Arial' });
  s.addText('Por projeto, alocamos de 3 a 6 profissionais — cada um entregando o que faz de melhor, sempre com visão do todo.', {
    x: 0.6, y: 4.5, w: 12, h: 0.7, fontSize: 13, color: TEXTO, fontFace: 'Arial', lineSpacingMultiple: 1.35, wrap: true
  });
}

// ─── SLIDE 11: CRONOGRAMA ─────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  slideTitle(s, 'Cronograma');

  const items = [
    { periodo: 'Semanas 1–3', label: 'Kickoff, setup das ferramentas, alinhamentos iniciais, análise de cenário e definição da estratégia' },
    { periodo: 'Semanas 3–4', label: 'Desenvolvimento dos materiais e ativação da estratégia' },
    { periodo: 'Semana 5',    label: 'Acompanhamento dos primeiros resultados' },
    { periodo: 'Mês a mês',  label: 'Manutenção, otimizações e relatórios periódicos' },
  ];

  s.addShape(pres.ShapeType.line, { x: 0.95, y: 1.85, w: 0, h: 4.8, line: { color: ROXO, width: 2 } });

  items.forEach((item, i) => {
    const y = 1.85 + i * 1.2;
    s.addShape(pres.ShapeType.ellipse, { x: 0.82, y: y + 0.08, w: 0.26, h: 0.26, fill: { color: VERM }, line: { color: VERM } });
    s.addText(item.periodo.toUpperCase(), { x: 1.2, y: y, w: 11, h: 0.32, fontSize: 9, bold: true, color: VERM, charSpacing: 1.5, fontFace: 'Arial' });
    s.addText(item.label, { x: 1.2, y: y + 0.35, w: 11.5, h: 0.65, fontSize: 12.5, color: TEXTO, fontFace: 'Arial', lineSpacingMultiple: 1.3, wrap: true });
  });
}

// ─── SLIDE 12: DEPOIMENTOS ────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, BRANCO);

  labelTag(s, 'Quem já trabalhou com a gente');
  slideTitle(s, 'O que nossos clientes dizem', { y: 0.82 });

  const deps = [
    { q: 'Em 15 anos de mercado, nunca vi uma qualificação tão boa e um resultado tão assertivo. Vendemos duas unidades do lançamento já nos primeiros dois meses de trabalho. Um fato inédito na Dallasanta.', a: 'Raquel Pereira', c: 'Dallasanta' },
    { q: 'Já no primeiro mês de parceria com a Moinho Digital deu pra perceber que a pegada do pessoal é diferente. Sempre próximos à empresa, criando conteúdos com nossa participação e aprovação.', a: 'Ricardo Schwanke', c: 'Sócio — WS Cranes' },
    { q: 'O processo com a Moinho Digital tem sido muito gratificante. Eles não apenas entregaram resultados tangíveis, mas também demonstraram profissionalismo e dedicação que é raro encontrar.', a: 'Thaís Motta', c: 'Supervisora de Vendas — WS Cranes' },
    { q: 'Desde que começamos temos recebido elogios sobre como as redes sociais de nossa organização melhoraram. Nossa parceria tem funcionado muito bem e a cada semana buscamos melhorias juntos.', a: 'Júlio Lima', c: 'Diretor — Instituto Eurofarma' },
  ];

  deps.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.5 : 7.0;
    const y = 1.85 + row * 2.7;
    const w = 5.9;

    s.addShape(pres.ShapeType.rect, { x, y, w, h: 2.4, fill: { color: BRANCO }, line: { color: 'E8E0F4', width: 1 }, rectRadius: 0.1 });
    s.addText('"', { x: x + 0.15, y: y + 0.05, w: 0.7, h: 0.6, fontSize: 32, color: SALMAO, fontFace: 'Arial', valign: 'top' });
    s.addText(d.q, { x: x + 0.2, y: y + 0.55, w: w - 0.4, h: 1.35, fontSize: 10.5, color: '444444', fontFace: 'Arial', italic: true, lineSpacingMultiple: 1.35, valign: 'top', wrap: true });
    s.addText(d.a, { x: x + 0.2, y: y + 1.96, w: w - 0.4, h: 0.28, fontSize: 11, bold: true, color: ROXO, fontFace: 'Arial' });
    s.addText(d.c, { x: x + 0.2, y: y + 2.18, w: w - 0.4, h: 0.22, fontSize: 10, color: CINZA, fontFace: 'Arial' });
  });
}

// ─── SLIDE 13: INVESTIMENTO ───────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgSolid(s, CREME);

  slideTitle(s, 'Investimento');

  // Table header
  const cols = [7.5, 2.5, 2.2];
  const headers = ['Serviço', 'Modalidade', 'Valor'];
  let xOff = 0.6;
  headers.forEach((h, i) => {
    s.addText(h.toUpperCase(), { x: xOff, y: 1.8, w: cols[i], h: 0.4, fontSize: 9, bold: true, color: CINZA, charSpacing: 1.5, fontFace: 'Arial', valign: 'middle', align: i === 2 ? 'right' : 'left' });
    xOff += cols[i];
  });
  s.addShape(pres.ShapeType.line, { x: 0.6, y: 2.2, w: 12.2, h: 0, line: { color: 'CCCCCC', width: 1 } });

  const rows = [
    ['Redes sociais (8 posts/mês)', 'Mensal', 'R$ 2.950'],
  ];
  rows.forEach((row, ri) => {
    let xr = 0.6;
    row.forEach((cell, ci) => {
      s.addText(cell, { x: xr, y: 2.35 + ri * 0.65, w: cols[ci], h: 0.55, fontSize: 13, color: ci === 2 ? ROXO : TEXTO, fontFace: 'Arial', valign: 'middle', align: ci === 2 ? 'right' : 'left', bold: ci === 2 });
      xr += cols[ci];
    });
  });

  s.addShape(pres.ShapeType.line, { x: 0.6, y: 3.15, w: 12.2, h: 0, line: { color: 'CCCCCC', width: 2 } });

  // Total row
  s.addText('Total', { x: 0.6, y: 3.25, w: 7.5, fontSize: 15, bold: true, color: ROXO, fontFace: 'Arial', valign: 'middle' });
  s.addText('R$ 2.950/mês', { x: 10.6, y: 3.25, w: 2.2, fontSize: 18, bold: true, color: ROXO, fontFace: 'Arial', valign: 'middle', align: 'right' });
}

// ─── SLIDE 14: GARANTIA ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgGradient(s, VERM, 'b83040');

  slideTitle(s, 'Garantia', { color: BRANCO });

  s.addText('Entregamos ações digitais baseadas em dados, com agilidade e atendimento próximo ao cliente. Se você identificar que isso não está acontecendo, é possível cancelar o contrato sem multa rescisória.', {
    x: 0.6, y: 1.9, w: 12, h: 2.2,
    fontSize: 22, color: 'F0F0F0', fontFace: 'Arial', valign: 'top', lineSpacingMultiple: 1.5, wrap: true
  });
}

// ─── SLIDE 15: CTA / CONTATO ──────────────────────────────────────────────────
{
  const s = pres.addSlide();
  bgGradient(s, ROXO_DK, '2a1845');

  try { s.addImage({ path: simboloPath, x: 0.6, y: 0.45, h: 0.8, w: 0.8 }); } catch(e){}

  s.addText('Vamos começar?', {
    x: 0.6, y: 1.6, w: 12,
    fontSize: 48, bold: true, color: BRANCO, fontFace: 'Arial', lineSpacingMultiple: 0.95
  });

  s.addText('Estamos prontos para construir a presença digital da Venmka\ne fazer a marca crescer desde o primeiro mês.', {
    x: 0.6, y: 3.3, w: 9, h: 1.0,
    fontSize: 15, color: 'BBBBBB', fontFace: 'Arial', lineSpacingMultiple: 1.4, wrap: true
  });

  const contacts = [
    'contato@moinhod.com.br',
    '(51) 9 9979-0598',
    '@marketingmoinho',
  ];
  contacts.forEach((c, i) => {
    s.addText(c, { x: 0.6, y: 4.6 + i * 0.52, w: 8, fontSize: 14, color: SALMAO, fontFace: 'Arial' });
  });

  s.addText('Tração para negócios que importam.', {
    x: 0.6, y: 6.7, w: 12, fontSize: 11, color: '444444', fontFace: 'Arial', italic: true
  });
}

// ─── SALVAR ───────────────────────────────────────────────────────────────────
pres.writeFile({ fileName: output })
  .then(() => console.log('PPTX salvo em: ' + output))
  .catch(err => { console.error('Erro:', err.message); process.exit(1); });

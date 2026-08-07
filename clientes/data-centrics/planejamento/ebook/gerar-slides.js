const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

const C = {
  roxo:     '5A368C', vermelho: 'D23E4F', salmao:  'F0867D',
  creme:    'EFEEDF', branco:   'FFFFFF', texto:   '1C1C1C',
  suave:    '666666', dark:     '2a1845', roxoClaro:'7B52A8'
};
const TF = 'Trebuchet MS';
const BF = 'Calibri';

// ── Helpers ────────────────────────────────────────────────────────────────

function bgColor(slide, color) {
  slide.background = { color };
}

function lbl(slide, text, y = 0.35) {
  slide.addText(text, { x:0.6, y, w:12, h:0.28, fontSize:8.5, bold:true, color:C.salmao, charSpacing:2.5, fontFace:BF });
}

function ttl(slide, text, opts = {}) {
  const { x=0.6, y=0.72, color=C.texto, size=26, w=12 } = opts;
  slide.addText(text, { x, y, w, h:0.95, fontSize:size, bold:true, color, fontFace:TF, lineSpacingMultiple:1.1 });
}

function txt(slide, text, opts = {}) {
  const { x=0.6, y=1.85, w=12, h=4.8, color=C.texto, size=13 } = opts;
  slide.addText(text, { x, y, w, h, fontSize:size, color, fontFace:BF, valign:'top', wrap:true, lineSpacingMultiple:1.45 });
}

function card(slide, x, y, w, h, content, opts = {}) {
  const { fill=C.branco, lColor='e4e4e4', accentColor=null } = opts;
  if (accentColor) {
    slide.addShape(pptx.ShapeType.rect, { x, y, w:0.06, h, fill:{ color:accentColor }, line:{ color:accentColor } });
    x += 0.09; w -= 0.09;
  }
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill:{ color:fill },
    line:{ color:lColor, width:0.75 },
    shadow:{ type:'outer', blur:4, offset:2, angle:45, color:'000000', opacity:0.07 }
  });
  slide.addText(content, { x:x+0.18, y:y+0.14, w:w-0.36, h:h-0.28, fontSize:11, color:C.texto, fontFace:BF, valign:'top', wrap:true, lineSpacingMultiple:1.4 });
}

function cardHeader(slide, x, y, w, h, title, body, opts = {}) {
  const { fill=C.branco, accent=C.roxo } = opts;
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill:{ color:fill },
    line:{ color:'e4e4e4', width:0.75 },
    shadow:{ type:'outer', blur:4, offset:2, angle:45, color:'000000', opacity:0.07 }
  });
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h:0.055, fill:{ color:accent }, line:{ color:accent } });
  slide.addText(title, { x:x+0.18, y:y+0.12, w:w-0.36, h:0.32, fontSize:8.5, bold:true, color:accent, fontFace:BF, charSpacing:1.5 });
  slide.addText(body, { x:x+0.18, y:y+0.46, w:w-0.36, h:h-0.6, fontSize:11, color:C.texto, fontFace:BF, valign:'top', wrap:true, lineSpacingMultiple:1.4 });
}

function badge(slide, x, y, num, color = C.roxo) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w:0.3, h:0.3, fill:{ color }, line:{ color } });
  slide.addText(String(num), { x, y:y+0.02, w:0.3, h:0.28, fontSize:10, bold:true, color:C.branco, fontFace:BF, align:'center' });
}

// ── SLIDE 1: CAPA ──────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.roxo);
  s.addText('ESTRATÉGIA INICIAL', { x:0.7, y:1.4, w:12, h:0.35, fontSize:9, bold:true, color:C.salmao, charSpacing:3, fontFace:BF });
  s.addText('Data Centrics', { x:0.7, y:1.85, w:12, h:2.4, fontSize:64, bold:true, color:C.branco, fontFace:TF });
  s.addText('Junho 2026', { x:0.7, y:4.7, w:8, h:0.4, fontSize:14, color:'99a0c0', fontFace:BF });
}

// ── SLIDE 2: OBJETIVO ──────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.roxo);
  lbl(s, 'OBJETIVO DO PROJETO');
  ttl(s, 'O que vamos construir juntos', { color:C.branco, size:28 });
  txt(s, 'A partir de uma estratégia de tráfego pago no Google Ads, posicionar a Data Centrics como referência em serviços de contingência — Disaster Recovery e Backup — para empresas mid-market e corporate do Sul e Sudeste do Brasil. O foco é capturar leads que já identificaram um problema e estão buscando solução, criando um pipeline qualificado antes de avançar para a venda direta de infraestrutura.', { color:'e8e0f5', size:16, y:1.85 });
}

// ── SLIDE 3: PILARES ───────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'PILARES DO PROJETO');
  ttl(s, 'Como vamos chegar lá');
  const pilares = [
    { num:1, nome:'Google Ads — Tráfego pago', foco:'Captação de leads qualificados via Rede de Pesquisa com campanhas de contingência e disaster recovery' },
    { num:2, nome:'Relatórios e acompanhamento', foco:'Monitorar resultados, identificar o que funciona e ajustar a estratégia continuamente com base em dados' }
  ];
  pilares.forEach((p, i) => {
    const y = 2.0 + i * 1.7;
    card(s, 0.6, y, 12.1, 1.5, '', { fill:C.branco });
    badge(s, 0.75, y + 0.6, p.num, C.vermelho);
    s.addText(p.nome,  { x:1.2, y:y+0.35, w:10.8, h:0.38, fontSize:15, bold:true, color:C.texto, fontFace:TF });
    s.addText(p.foco,  { x:1.2, y:y+0.8,  w:10.8, h:0.45, fontSize:11.5, color:C.suave, fontFace:BF });
  });
}

// ── SLIDE 4: ESTRATÉGIA GOOGLE ADS ─────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Estratégia de anúncios');
  const cols = [
    { title:'OBJETIVO DA CAMPANHA',
      body:'Geração de leads via Rede de Pesquisa (topo e meio de funil). O ebook gratuito de Backup & Disaster Recovery é a isca: o usuário troca o contato pelo material e entra na base para nutrição. Verba de R$ 2.000/mês.' },
    { title:'ESTRUTURA SUGERIDA',
      body:'Grupo 1: Disaster Recovery / DRaaS\nGrupo 2: Contingência / Continuidade\nGrupo 3: Ransomware / Risco\n\n(Backup e novos grupos entram em fases seguintes conforme resultado e verba)' },
    { title:'SEGMENTAÇÃO E SETUP',
      body:'• Apenas Rede de Pesquisa (intenção ativa)\n• Geo: Porto Alegre, Região Metropolitana e Vale dos Sinos / Caxias\n• Correspondência frase e exata no início\n• Expansão para o Sudeste na fase 2' }
  ];
  const cw = 4.0, gap = 0.07;
  cols.forEach((c, i) => {
    cardHeader(s, 0.6 + i * (cw + gap), 1.85, cw, 4.9, c.title, c.body);
  });
}

// ── SLIDE 5: FUNIL ─────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'O funil que vamos construir');
  s.addText('A campanha do ebook não é o fim — é a boca do funil. Capturamos cedo quem tem a dor, qualificamos na nutrição e entregamos leads mais maduros para o comercial.', { x:0.6, y:1.82, w:12, h:0.55, fontSize:12, color:C.suave, fontFace:BF, wrap:true });
  const funil = [
    { num:1, title:'Atração — Anúncio na Pesquisa', body:'Captura quem busca disaster recovery, contingência, ransomware e backup em nuvem.', w:12.1, color:C.vermelho },
    { num:2, title:'Isca — Landing do ebook',       body:'Troca o material de alto valor (AWS + dados de mercado) pelo contato. Baixa fricção.',          w:10.8, color:C.roxo },
    { num:3, title:'Base / Nutrição — RD Station',  body:'Sequência automatizada reforça autoridade DCX + AWS e leva ao diagnóstico.',                     w:9.5,  color:C.roxo },
    { num:4, title:'Comercial — Pipedrive',         body:'Lead que esquenta vira oportunidade. Comercial atende. Ciclo médio ~25 dias.',                    w:8.2,  color:C.roxo },
    { num:5, title:'Remarketing (fase 2)',          body:'Quem baixou e não avançou é reimpactado com casos e oferta de diagnóstico.',                      w:6.9,  color:C.suave }
  ];
  funil.forEach((f, i) => {
    const y = 2.55 + i * 0.95;
    slide_funil(s, 0.6, y, f.w, 0.82, f.num, f.title, f.body, f.color);
  });
  function slide_funil(sl, x, y, w, h, num, title, body, numColor) {
    sl.addShape(pptx.ShapeType.rect, { x, y, w, h, fill:{ color:C.branco }, line:{ color:'e8e8e8', width:0.75 }, shadow:{ type:'outer', blur:3, offset:1, angle:45, color:'000000', opacity:0.06 } });
    badge(sl, x+0.15, y+0.27, num, numColor);
    sl.addText(title, { x:x+0.58, y:y+0.06, w:w-0.75, h:0.32, fontSize:12, bold:true, color:C.texto, fontFace:BF });
    sl.addText(body,  { x:x+0.58, y:y+0.42, w:w-0.75, h:0.34, fontSize:10, color:C.suave, fontFace:BF, wrap:true });
  }
}

// ── SLIDE 6: CONCORRÊNCIA ──────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Concorrência no Google');
  const comps = [
    { nome:'Claranet Brasil', obs:'Forte presença em pesquisa com DR e backup corporativo. Comunicação técnica, foco em RTO/RPO customizados e compliance. Posicionamento consultivo, voltado para enterprise. Tom formal, pouco diferenciado no aspecto humano.' },
    { nome:'Tivit',           obs:'Grande player de TI com DRaaS integrado ao portfólio de managed services. Marca mais conhecida no enterprise. Concorrência mais direta para o segmento corporate acima de R$ 50M.' },
    { nome:'Brasil Cloud',    obs:'18 anos de mercado, data center em Uberlândia. Failover automatizado, bom custo-benefício. Menor sobreposição com o ICP da Data Centrics, mas pode disputar mid-market.' },
    { nome:'Google Cloud / AWS', obs:'Aparecem fortemente em buscas de DR e backup. São parceiros e concorrentes — a diferenciação da DCX Cloud (nuvem própria, atendimento humano em PT-BR) precisa estar clara para não se perder no comparativo.' }
  ];
  const cw = 5.96, ch = 2.2, gap = 0.13;
  comps.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * (cw + gap), y = 1.82 + row * (ch + gap);
    card(s, x, y, cw, ch, '', { accentColor:C.roxo });
    s.addText(c.nome, { x:x+0.32, y:y+0.15, w:cw-0.5, h:0.38, fontSize:13, bold:true, color:C.roxo, fontFace:TF });
    s.addText(c.obs,  { x:x+0.32, y:y+0.58, w:cw-0.5, h:1.5,  fontSize:10.5, color:C.texto, fontFace:BF, valign:'top', wrap:true, lineSpacingMultiple:1.35 });
  });
  s.addText('Oportunidade: nenhum concorrente comunica bem o aspecto humano. Atendimento 24/7 + 600 certificações + equipe em PT-BR é um diferencial real para explorar nas copies.', { x:0.6, y:6.65, w:12.1, h:0.5, fontSize:10.5, color:C.suave, fontFace:BF, italic:true });
}

// ── SLIDE 7: GRUPOS DE ANÚNCIOS ────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Grupos de anúncios sugeridos');
  const grupos = [
    { num:1, nome:'Disaster Recovery / DRaaS  ·  prioridade máxima',
      kws:['disaster recovery', 'disaster recovery as a service', 'DRaaS', 'serviço de disaster recovery', 'recuperação de desastres em nuvem', 'plano de recuperação de desastres ti'] },
    { num:2, nome:'Contingência / Continuidade  ·  prevenção',
      kws:['ambiente de contingência ti', 'plano de contingência de ti', 'plano de continuidade de negócios', 'continuidade de negócios ti', 'contingência de servidores', 'failover e failback'] },
    { num:3, nome:'Ransomware / Risco  ·  dor',
      kws:['recuperação de dados após ransomware', 'proteção contra ransomware empresas', 'como evitar downtime', 'proteção de dados empresariais', 'como manter sistema no ar'] }
  ];
  grupos.forEach((g, i) => {
    const y = 1.85 + i * 1.72;
    card(s, 0.6, y, 12.1, 1.55, '', { fill:C.branco });
    badge(s, 0.75, y + 0.62, g.num, C.roxo);
    s.addText(g.nome, { x:1.2, y:y+0.36, w:11, h:0.38, fontSize:13, bold:true, color:C.texto, fontFace:TF });
    const kwText = g.kws.map(k => ({ text: k + '   ', options: { fontSize:10.5, color:'444444', fontFace:BF } }));
    s.addText(kwText, { x:1.2, y:y+0.82, w:10.8, h:0.55, wrap:true });
  });
  s.addText('Correspondência: frase e exata no início, para controlar o custo com verba enxuta. Negativas iniciais: vaga, emprego, curso, certificação, tutorial, licitação, prefeitura + nomes de concorrentes.', { x:0.6, y:7.05, w:12.1, h:0.4, fontSize:10, color:C.suave, fontFace:BF, italic:true });
}

// ── SLIDE 8: TEXTOS DOS ANÚNCIOS ───────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Textos sugeridos dos anúncios');
  const grupos = [
    { nome:'Grupo 1: Disaster Recovery / DRaaS',
      titulos:['Disaster Recovery na Nuvem', 'Plano de Recuperação de TI', 'DRaaS com Tecnologia AWS', 'Ebook Grátis de DR e Backup', 'Evite Paradas na Operação', 'RTO e RPO Baixos com AWS'],
      descs:['Baixe o ebook gratuito sobre Disaster Recovery e proteja sua empresa contra paradas.', 'Recupere seus sistemas em minutos após qualquer falha. Tecnologia AWS com SLA garantido.'] },
    { nome:'Grupo 2: Contingência / Continuidade',
      titulos:['Plano de Contingência de TI', 'Continuidade de Negócios', 'Sua Operação Sempre no Ar', 'Failover e Failback na AWS', 'Ebook Grátis de Contingência', 'Evite Downtime na Empresa'],
      descs:['Garanta que sua empresa continue operando mesmo após falhas. Baixe o ebook grátis.', 'Monte um plano de continuidade com a robustez da AWS. Sem segundo data center físico.'] },
    { nome:'Grupo 3: Ransomware / Risco',
      titulos:['Proteção Contra Ransomware', 'Seus Dados Estão Seguros?', 'Sua Empresa Está em Risco?', 'Blindagem de Dados na AWS', 'Ebook Grátis de Proteção', 'Evite Perder Seus Dados'],
      descs:['Ransomware, falha de hardware ou erro humano: proteja seus dados antes que seja tarde.', 'Baixe o ebook e descubra como proteger sua empresa contra ataques e perdas de dados.'] }
  ];
  const cw = 3.95, gap = 0.08;
  grupos.forEach((g, i) => {
    const x = 0.6 + i * (cw + gap);
    s.addShape(pptx.ShapeType.rect, { x, y:1.82, w:cw, h:5.45, fill:{ color:C.branco }, line:{ color:'e4e4e4', width:0.75 }, shadow:{ type:'outer', blur:4, offset:2, angle:45, color:'000000', opacity:0.07 } });
    s.addShape(pptx.ShapeType.rect, { x, y:1.82, w:cw, h:0.36, fill:{ color:C.roxo }, line:{ color:C.roxo } });
    s.addText(g.nome, { x:x+0.15, y:1.85, w:cw-0.3, h:0.32, fontSize:9.5, bold:true, color:C.branco, fontFace:BF });
    s.addText('TÍTULOS', { x:x+0.15, y:2.27, w:cw-0.3, h:0.25, fontSize:7.5, bold:true, color:C.suave, charSpacing:1.5, fontFace:BF });
    g.titulos.forEach((t, j) => {
      s.addText('— ' + t, { x:x+0.15, y:2.57 + j*0.45, w:cw-0.3, h:0.4, fontSize:10.5, color:C.texto, fontFace:BF });
    });
    s.addText('DESCRIÇÕES', { x:x+0.15, y:5.35, w:cw-0.3, h:0.25, fontSize:7.5, bold:true, color:C.suave, charSpacing:1.5, fontFace:BF });
    g.descs.forEach((d, j) => {
      s.addText('— ' + d, { x:x+0.15, y:5.65 + j*0.78, w:cw-0.3, h:0.72, fontSize:10, color:C.texto, fontFace:BF, wrap:true, lineSpacingMultiple:1.3 });
    });
  });
}

// ── SLIDE 9: SERP PREVIEW ──────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Como o anúncio aparece no Google');
  const serps = [
    { grupo:'Grupo 1 — Disaster Recovery',
      url:'Anúncio  ·  datacentrics.cloud/ebook',
      title:'Disaster Recovery na Nuvem | Ebook Grátis de DR e Backup | DataCentrics + AWS',
      desc:'Baixe o ebook gratuito sobre Disaster Recovery e proteja sua empresa contra paradas. Recupere seus sistemas em minutos após qualquer falha. Tecnologia AWS com SLA garantido.' },
    { grupo:'Grupo 3 — Ransomware / Risco',
      url:'Anúncio  ·  datacentrics.cloud/ebook',
      title:'Proteção Contra Ransomware | Seus Dados Estão Seguros? | Ebook Gratuito',
      desc:'Ransomware, falha de hardware ou erro humano: proteja seus dados antes que seja tarde. Baixe o ebook e descubra como proteger sua empresa contra ataques e perdas de dados.' }
  ];
  serps.forEach((serp, i) => {
    const y = 1.85 + i * 2.6;
    s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:10, h:2.35, fill:{ color:C.branco }, line:{ color:'e4e4e4', width:0.75 }, shadow:{ type:'outer', blur:5, offset:2, angle:45, color:'000000', opacity:0.08 } });
    s.addText(serp.grupo, { x:0.8, y:y+0.13, w:9.6, h:0.24, fontSize:8, bold:true, color:C.suave, charSpacing:1.5, fontFace:BF });
    s.addText(serp.url,   { x:0.8, y:y+0.42, w:9.6, h:0.26, fontSize:11, color:'202124', fontFace:BF });
    s.addText(serp.title, { x:0.8, y:y+0.72, w:9.6, h:0.54, fontSize:16, color:'1a0dab', fontFace:'Arial', bold:false });
    s.addText(serp.desc,  { x:0.8, y:y+1.3,  w:9.6, h:0.85, fontSize:11, color:'4d5156', fontFace:BF, wrap:true, lineSpacingMultiple:1.35 });
  });
  s.addText('Pré-visualização ilustrativa. O Google combina automaticamente os títulos e descrições aprovados; o formato final varia conforme o dispositivo e o termo buscado.', { x:0.6, y:7.1, w:12, h:0.35, fontSize:9.5, color:C.suave, fontFace:BF, italic:true });
}

// ── SLIDE 10: AJUSTES NA LP ────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'LANDING PAGE');
  ttl(s, 'Ajustes na landing page do ebook');
  const items = [
    { titulo:'Botão de evento gera fricção',
      obs:'O botão de evento não traz nenhuma informação — sem data, local ou contexto. Tira o foco da oferta principal (o ebook).',
      sug:'Ocultar o botão por enquanto. Quando houver um evento real com data e detalhes, reativar.' },
    { titulo:'Formulário trava na confirmação',
      obs:'Depois de preencher, o formulário fica congelado alguns segundos até exibir o aviso de confirmação — passa sensação de erro.',
      sug:'Revisar o formulário para que a confirmação seja imediata (tempo de resposta e feedback de envio).' },
    { titulo:'Redireciona direto para o Drive',
      obs:'Após o preenchimento, o usuário é redirecionado direto para o link do ebook no Google Drive.',
      sug:'Criar uma página de obrigado com botão de download. Melhora o rastreamento (conversão na página de obrigado) e a experiência do usuário.' }
  ];
  items.forEach((item, i) => {
    const y = 1.82 + i * 1.78;
    s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:0.06, h:1.62, fill:{ color:C.vermelho }, line:{ color:C.vermelho } });
    s.addShape(pptx.ShapeType.rect, { x:0.7, y, w:12, h:1.62, fill:{ color:C.branco }, line:{ color:'e4e4e4', width:0.75 }, shadow:{ type:'outer', blur:4, offset:2, angle:45, color:'000000', opacity:0.07 } });
    s.addText(item.titulo, { x:0.9, y:y+0.15, w:11.5, h:0.36, fontSize:14, bold:true, color:C.vermelho, fontFace:TF });
    s.addText('Obs: ' + item.obs, { x:0.9, y:y+0.55, w:11.5, h:0.44, fontSize:11, color:C.suave, fontFace:BF, wrap:true });
    s.addText('→ ' + item.sug,    { x:0.9, y:y+1.02, w:11.5, h:0.48, fontSize:11, color:C.roxo,  fontFace:BF, wrap:true, bold:false });
  });
}

// ── SLIDE 11: RASTREAMENTO, OTIMIZAÇÃO E METAS ─────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'GOOGLE ADS');
  ttl(s, 'Rastreamento, otimização e metas');
  const cols = [
    { title:'RASTREAMENTO',
      body:'• Conversão: envio do formulário do ebook + clique no WhatsApp\n• Stack: GTM + GA4 → Google Ads → RD Station → Pipedrive\n• Sem o disparo de conversão testado, a campanha não vai ao ar' },
    { title:'LANCES E OTIMIZAÇÃO',
      body:'• Fase 1: Maximizar cliques com teto de CPC (frase/exata)\n• Fase 2: Maximizar conversões e CPA-alvo após ~15–30 conversões\n• Revisão dos termos de pesquisa 2x/semana alimentando as negativas' },
    { title:'EXPECTATIVAS (R$ 2.000/MÊS)',
      body:'• CPC R$ 6–12 → ~170–330 cliques/mês\n• Conversão da LP 10–20% → ~20–55 leads/mês\n• Custo por lead alvo: R$ 40–90' }
  ];
  const cw = 4.0, gap = 0.06;
  cols.forEach((c, i) => {
    cardHeader(s, 0.6 + i*(cw+gap), 1.85, cw, 4.3, c.title, c.body);
  });
  s.addText('Insight: lead de ebook é topo/meio — a venda amadurece na nutrição + comercial (~25 dias). A meta de curto prazo é volume e custo por lead saudável, com qualidade (setor e porte certos). Próximos meses: novos grupos (Backup em nuvem, termos por setor) entram conforme resultado e verba.', { x:0.6, y:6.4, w:12.1, h:0.85, fontSize:10.5, color:C.suave, fontFace:BF, italic:true, wrap:true, lineSpacingMultiple:1.35 });
}

// ── SLIDE 12: ALINHAMENTOS ─────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'ALINHAMENTOS');
  ttl(s, 'Dúvidas e perguntas para o time');
  const sections = [
    { tema:'Estratégia e copy', questions:[
      'Há algum produto ou serviço que não deve ser mencionado nos anúncios? (ex: AWS, para não gerar expectativa de preço incompatível com a DCX Cloud)',
      'Qual o CTA preferido nos formulários da landing page? (ex: fale com especialista / solicite diagnóstico / baixe o ebook)',
      'Existe algum case de cliente que pode ser usado como prova social nas copies ou na landing page?'
    ]},
    { tema:'Landing page', questions:[
      'Qual é o link da landing page atual para analisarmos a estrutura e decidir entre ajustar ou criar uma nova?',
      'O ebook de contingência já está pronto ou ainda será desenvolvido? Em qual etapa ele deve aparecer no fluxo?'
    ]},
    { tema:'Integração e rastreamento', questions:[
      'O PipeDrive já está configurado com os estágios do funil definidos, ou vamos estruturar isso junto?',
      'Quem do time da Data Centrics vai responder os leads via WhatsApp? Vai usar rodízio (Digissac) ou número fixo?'
    ]}
  ];
  let y = 1.85;
  sections.forEach(sec => {
    s.addText(sec.tema.toUpperCase(), { x:0.6, y, w:12, h:0.3, fontSize:8.5, bold:true, color:C.roxo, charSpacing:2, fontFace:BF });
    y += 0.35;
    sec.questions.forEach(q => {
      s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:12.1, h:0.52, fill:{ color:C.branco }, line:{ color:C.salmao, width:1.5, dashType:'solid', beginArrowType:'none' } });
      s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:0.055, h:0.52, fill:{ color:C.salmao }, line:{ color:C.salmao } });
      s.addText(q, { x:0.75, y:y+0.08, w:11.8, h:0.4, fontSize:11, color:'444444', fontFace:BF, wrap:true });
      y += 0.62;
    });
    y += 0.18;
  });
}

// ── SLIDE 13: DEMANDAS ─────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'PENDÊNCIAS');
  ttl(s, 'Demandas em aberto');
  const demandas = [
    { text:'Envio dos arquivos institucionais e comerciais da Data Centrics (apresentações, manual de marca, materiais)', resp:'Responsável: Ana Clara Sanhudo' },
    { text:'Lista de contatos para o grupo de WhatsApp + datas de aniversário', resp:'Responsável: Ana Clara Sanhudo' },
    { text:'Contratação do RD Station — Moinho Digital contrata e adiciona a Data Centrics como admin', resp:'Responsável: Ina Cunha | Moinho Digital' },
    { text:'Criação do grupo no WhatsApp com todos os envolvidos no projeto', resp:'Responsável: Ina Cunha | Moinho Digital' },
    { text:'Análise de ferramentas de centralização de atendimento via WhatsApp (sugestão: Digissac)', resp:'Responsável: Vinícius Silva | Moinho Digital' }
  ];
  demandas.forEach((d, i) => {
    const y = 1.82 + i * 1.07;
    s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:0.06, h:0.92, fill:{ color:C.vermelho }, line:{ color:C.vermelho } });
    s.addShape(pptx.ShapeType.rect, { x:0.7, y, w:12, h:0.92, fill:{ color:C.branco }, line:{ color:'e4e4e4', width:0.75 }, shadow:{ type:'outer', blur:3, offset:1, angle:45, color:'000000', opacity:0.06 } });
    s.addText(d.text, { x:0.9, y:y+0.07, w:11.5, h:0.46, fontSize:12, color:C.texto, fontFace:BF, wrap:true });
    s.addText(d.resp, { x:0.9, y:y+0.58, w:11.5, h:0.26, fontSize:9.5, color:C.suave, fontFace:BF, italic:true });
  });
}

// ── SLIDE 14: APROVAÇÕES ───────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.creme);
  lbl(s, 'PRÓXIMOS PASSOS');
  ttl(s, 'Conteúdos para aprovação');
  const items = [
    'Grupos de anúncios e palavras-chave por grupo',
    'Textos dos anúncios (copies) para aprovação da Data Centrics',
    'Análise e sugestão de estrutura da landing page (até 19/06)',
    'Configuração das integrações: GA4, GTM, RD Station e Pipedrive',
    'Retornos do slide de alinhamentos'
  ];
  items.forEach((item, i) => {
    const y = 2.0 + i * 1.0;
    s.addShape(pptx.ShapeType.rect, { x:0.6, y, w:12.1, h:0.82, fill:{ color:C.branco }, line:{ color:'e4e4e4', width:0.75 }, shadow:{ type:'outer', blur:3, offset:1, angle:45, color:'000000', opacity:0.06 } });
    s.addText('→', { x:0.75, y:y+0.22, w:0.35, h:0.38, fontSize:14, bold:true, color:C.roxo, fontFace:BF });
    s.addText(item, { x:1.15, y:y+0.22, w:11.2, h:0.38, fontSize:13, color:C.texto, fontFace:BF });
  });
}

// ── SLIDE 15: CRONOGRAMA ───────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  lbl(s, 'CRONOGRAMA');
  ttl(s, 'Primeiras semanas');
  const items = [
    { periodo:'02/06 — Hoje',                      label:'Reunião de apresentação do planejamento e alinhamento inicial', zero:true },
    { periodo:'Até 10/06',                          label:'Aprovação dos grupos de anúncios, copies e envio dos acessos e materiais pela Data Centrics' },
    { periodo:'Até 19/06',                          label:'Nova reunião para apresentar análise e sugestão de estrutura da landing page + alinhamento de campanha' },
    { periodo:'Semanas 3–4 (junho)',                label:'Configuração das contas e ferramentas (Google Ads, GA4, GTM, RD Station, Pipedrive) e setup das integrações' },
    { periodo:'Final de junho / início de julho',  label:'Ativação das campanhas e monitoramento dos primeiros resultados' },
    { periodo:'Agosto',                             label:'Primeiro relatório com dados consolidados e reunião de alinhamento estratégico' }
  ];
  s.addShape(pptx.ShapeType.rect, { x:1.22, y:1.82, w:0.055, h:5.4, fill:{ color:C.roxo }, line:{ color:C.roxo } });
  items.forEach((item, i) => {
    const y = 1.82 + i * 0.92;
    const dotColor = item.zero ? C.salmao : C.vermelho;
    s.addShape(pptx.ShapeType.ellipse, { x:1.08, y:y+0.28, w:0.28, h:0.28, fill:{ color:dotColor }, line:{ color:dotColor } });
    s.addText(item.periodo.toUpperCase(), { x:1.6, y:y+0.06, w:11, h:0.26, fontSize:8.5, bold:true, color: item.zero ? C.salmao : C.vermelho, charSpacing:1.5, fontFace:BF });
    s.addText(item.label, { x:1.6, y:y+0.36, w:11, h:0.42, fontSize:12.5, color:C.texto, fontFace:BF, wrap:true });
  });
}

// ── SLIDE 16: CTA ──────────────────────────────────────────────────────────
{
  const s = pptx.addSlide();
  bgColor(s, C.dark);
  s.addText('Vamos colocar essa\nestratégia em movimento?', { x:0.7, y:1.0, w:10, h:2.2, fontSize:38, bold:true, color:C.branco, fontFace:TF, lineSpacingMultiple:1.15 });
  const cols = [
    { title:'FALE COM A GENTE', lines:['contato@moinhod.com.br', '(51) 99646-8205', 'moinhod.com.br'] },
    { title:'REDES SOCIAIS',    lines:['@moinhod (Instagram)', 'LinkedIn: Moinho Digital'] },
    { title:'',                 lines:['Conteúdos que envolvem, estratégias que expandem.', 'Tração para negócios que importam.'] }
  ];
  const cw = 3.8, gap = 0.4;
  cols.forEach((c, i) => {
    const x = 0.7 + i * (cw + gap);
    if (c.title) s.addText(c.title, { x, y:3.5, w:cw, h:0.32, fontSize:8.5, bold:true, color:C.salmao, charSpacing:2, fontFace:BF });
    c.lines.forEach((l, j) => {
      const isTagline = i === 2 && j === 1;
      s.addText(l, { x, y:3.92 + j*0.52, w:cw, h:0.46, fontSize: isTagline ? 11 : 12.5, color: isTagline ? '6a6a8a' : 'aab0cc', fontFace: isTagline ? 'Georgia' : BF, italic: isTagline, wrap:true });
    });
  });
}

// ── GERAR ARQUIVO ──────────────────────────────────────────────────────────
pptx.writeFile({ fileName: 'clientes/data-centrics/planejamento/planejamento-data-centrics.pptx' })
  .then(() => console.log('PPTX gerado: clientes/data-centrics/planejamento/planejamento-data-centrics.pptx'))
  .catch(err => console.error('Erro:', err));

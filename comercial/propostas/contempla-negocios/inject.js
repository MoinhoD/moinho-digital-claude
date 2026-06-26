const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const base = path.join(__dirname, '..', '..', '..');
const htmlPath = path.join(__dirname, 'index.html');

async function run() {
  // Logos
  const logoSrc = 'data:image/png;base64,' + fs.readFileSync(path.join(base, 'marca', 'md-1-branco.png')).toString('base64');
  const simboloSrc = 'data:image/png;base64,' + fs.readFileSync(path.join(base, 'marca', 'md-simbolo-branco.png')).toString('base64');

  // Screenshot pegaecola.com.br
  console.log('Capturando screenshot de pegaecola.com.br...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  try {
    await page.goto('https://www.pegaecola.com.br', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2500);
  } catch (e) {
    console.log('Aviso: timeout no carregamento, usando o que carregou:', e.message);
  }
  const screenshotBuffer = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 820 } });
  await browser.close();
  const screenshotSrc = 'data:image/png;base64,' + screenshotBuffer.toString('base64');
  console.log('Screenshot capturado.');

  // Substituir placeholders
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html
    .replace('{{LOGO_SRC}}', logoSrc)
    .replace('{{SIMBOLO_SRC}}', simboloSrc)
    .replace('{{SCREENSHOT_PEGAECOLA}}', screenshotSrc);
  fs.writeFileSync(htmlPath, html);
  console.log('index.html atualizado com logos e screenshot.');
}

run().catch(err => { console.error(err); process.exit(1); });

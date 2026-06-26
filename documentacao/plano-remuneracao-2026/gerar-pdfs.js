const { chromium } = require('playwright-core');
const path = require('path');

const files = [
  { input: 'redator.html',         output: 'redator.pdf' },
  { input: 'atendimento.html',     output: 'atendimento.pdf' },
  { input: 'trafego.html',         output: 'trafego.pdf' },
  { input: 'designer-diego.html',  output: 'designer-diego.pdf' },
  { input: 'designer-milena.html', output: 'designer-milena.pdf' },
];

const dir = __dirname;

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });

  for (const f of files) {
    const page = await browser.newPage();
    const url = 'file:///' + path.join(dir, f.input).replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.pdf({
      path: path.join(dir, f.output),
      format: 'A4',
      landscape: true,
      printBackground: true,
    });
    await page.close();
    console.log('✓ ' + f.output);
  }

  await browser.close();
  console.log('\nTodos os PDFs gerados.');
})();

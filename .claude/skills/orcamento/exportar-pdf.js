const { chromium } = require('playwright');
const path = require('path');

const [,, input, output] = process.argv;

if (!input || !output) {
  console.error('Uso: node exportar-pdf.js <input.html> <output.pdf>');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const absolutePath = path.resolve(input);
  await page.goto(`file://${absolutePath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  await page.pdf({
    path: output,
    format: 'A4',
    landscape: false,
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log(`PDF salvo em: ${output}`);
})().catch(err => {
  console.error('Erro ao exportar PDF:', err.message);
  process.exit(1);
});

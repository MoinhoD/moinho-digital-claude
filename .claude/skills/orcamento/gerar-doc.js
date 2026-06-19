const fs = require('fs');
const path = require('path');

const [,, htmlPath] = process.argv;

if (!htmlPath) {
  console.error('Uso: node gerar-doc.js <caminho/arquivo.html>');
  process.exit(1);
}

const logoPath = path.resolve('marca/md-1-branco.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo não encontrado em:', logoPath);
  process.exit(1);
}

const logoSrc = 'data:image/png;base64,' + fs.readFileSync(logoPath).toString('base64');

const absHtml = path.resolve(htmlPath);
let html = fs.readFileSync(absHtml, 'utf8');
html = html.replace(/{{LOGO_SRC}}/g, logoSrc);
fs.writeFileSync(absHtml, html, 'utf8');

console.log('Logos injetados em:', absHtml);

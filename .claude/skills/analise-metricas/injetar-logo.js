const fs = require('fs');
const path = require('path');

const [, , htmlPath] = process.argv;

if (!htmlPath) {
  console.error('Uso: node injetar-logo.js <caminho/arquivo.html>');
  process.exit(1);
}

const logoPath = path.resolve('marca/md-1-branco.png');
let logoSrc;

if (fs.existsSync(logoPath)) {
  logoSrc = 'data:image/png;base64,' + fs.readFileSync(logoPath).toString('base64');
} else {
  // Fallback: lettering em SVG enquanto o PNG do logo não estiver em marca/
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="40" viewBox="0 0 260 40">
    <text x="0" y="28" font-family="Noto Serif, Georgia, serif" font-size="26" fill="#EFEEDF">moinho digital</text>
  </svg>`;
  logoSrc = 'data:image/svg+xml;base64,' + Buffer.from(svg, 'utf8').toString('base64');
  console.warn('Aviso: marca/md-1-branco.png nao encontrado. Aplicado lettering em texto.');
  console.warn('Para usar o logo oficial, baixe o PNG do Drive (01 Logotipos/PNG/) para marca/.');
}

const absHtml = path.resolve(htmlPath);
let html = fs.readFileSync(absHtml, 'utf8');
html = html.replace(/{{LOGO_SRC}}/g, logoSrc);
fs.writeFileSync(absHtml, html, 'utf8');

console.log('Logo injetado em:', absHtml);

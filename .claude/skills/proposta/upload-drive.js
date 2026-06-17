#!/usr/bin/env node
// Uso: node upload-drive.js <caminho-do-pdf> <id-da-pasta>
//
// Primeira vez: precisa de credenciais em ~/.claude/gdrive-creds.json
// Rodadas seguintes: totalmente automático com token salvo

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const os = require('os');

const TOKEN_PATH = path.join(os.homedir(), '.claude', 'gdrive-token.json');
const CREDS_PATH = path.join(os.homedir(), '.claude', 'gdrive-creds.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

function openBrowser(url) {
  const cmd = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
    ? `open "${url}"`
    : `xdg-open "${url}"`;
  exec(cmd);
}

async function getAuth() {
  if (!fs.existsSync(CREDS_PATH)) {
    console.error('\n--- SETUP NECESSÁRIO (só na primeira vez) ---\n');
    console.error('1. Acesse: https://console.cloud.google.com');
    console.error('2. Crie ou selecione um projeto');
    console.error('3. APIs & Services > Enable APIs > Google Drive API > Enable');
    console.error('4. APIs & Services > Credentials > Create Credentials > OAuth client ID');
    console.error('5. Tipo: Desktop app. Nome: Moinho Drive Upload');
    console.error('6. Clique em Download JSON e salve em:');
    console.error('   ' + CREDS_PATH);
    console.error('\nDepois rode o script novamente.\n');
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
  const { client_id, client_secret } = creds.installed || creds.web;

  const oauth2 = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3847/callback');

  if (fs.existsSync(TOKEN_PATH)) {
    const saved = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oauth2.setCredentials(saved);
    // Refresh automático se token venceu
    if (saved.expiry_date && saved.expiry_date < Date.now()) {
      const { credentials } = await oauth2.refreshAccessToken();
      oauth2.setCredentials(credentials);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(credentials, null, 2));
    }
    return oauth2;
  }

  // Primeira vez: fluxo Authorization Code com localhost
  const authUrl = oauth2.generateAuthUrl({ access_type: 'offline', scope: SCOPES, prompt: 'consent' });

  console.log('\nAbrindo navegador para autorizar o Google Drive...');
  openBrowser(authUrl);
  console.log('(Se o navegador não abrir, acesse manualmente:)');
  console.log(authUrl);

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const qs = new URL(req.url, 'http://localhost:3847').searchParams;
      const code = qs.get('code');
      const error = qs.get('error');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      if (code) {
        res.end('<html><body style="font-family:sans-serif;padding:40px"><h2>✓ Autorizado!</h2><p>Pode fechar essa aba.</p></body></html>');
        server.close(() => resolve(code));
      } else {
        res.end('<html><body style="font-family:sans-serif;padding:40px"><h2>Erro</h2><p>' + error + '</p></body></html>');
        server.close(() => reject(new Error('Auth negado: ' + error)));
      }
    });
    server.listen(3847, 'localhost', () => console.log('Aguardando autorização...'));
    server.on('error', reject);
  });

  const { tokens } = await oauth2.getToken(code);
  oauth2.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
  console.log('Token salvo em', TOKEN_PATH, '— próximas rodadas são automáticas.\n');
  return oauth2;
}

async function upload(filePath, folderId) {
  const auth = await getAuth();
  const drive = google.drive({ version: 'v3', auth });
  const filename = path.basename(filePath);

  console.log(`Enviando "${filename}" para o Drive...`);

  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType: 'application/pdf',
      body: fs.createReadStream(filePath),
    },
    fields: 'id,name,webViewLink',
  });

  console.log(`\nUpload concluído!`);
  console.log(`Arquivo: ${res.data.name}`);
  console.log(`Link:    ${res.data.webViewLink}`);
  return res.data;
}

const [, , filePath, folderId] = process.argv;
if (!filePath || !folderId) {
  console.error('Uso: node ".claude/skills/proposta/upload-drive.js" <caminho-pdf> <id-pasta>');
  process.exit(1);
}
upload(filePath, folderId).catch(e => { console.error('Erro:', e.message); process.exit(1); });

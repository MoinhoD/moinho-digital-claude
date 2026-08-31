# -*- coding: utf-8 -*-
"""
Gera o card de Open Graph do site da Moinho: site/assets/img/og-moinho.jpg

E a imagem que aparece quando alguem cola o link do site no WhatsApp, LinkedIn
ou Slack. 1200x630, que e a proporcao que esses aplicativos esperam.

Este script mora FORA da pasta site/ de proposito: tudo que esta dentro dela
vira URL publica no deploy.

Rodar:  python gerar-og.py
Precisa de Pillow e de internet na primeira vez, para baixar Archivo e Lexend
do Google Fonts (as fontes ficam em cache numa pasta temporaria).
"""
import os, re, tempfile, urllib.request
from PIL import Image, ImageDraw, ImageFont

AQUI   = os.path.dirname(os.path.abspath(__file__))
SITE   = os.path.join(AQUI, "site")
SAIDA  = os.path.join(SITE, "assets", "img", "og-moinho.jpg")
CACHE  = os.path.join(tempfile.gettempdir(), "moinho-fontes")

# --- Identidade visual Moinho ---
ROXO     = (90, 54, 140)     # #5A368C
CREME    = (239, 238, 223)   # #EFEEDF
VERMELHO = (210, 51, 79)     # #D2334F
ROSE     = (240, 134, 125)   # #F0867D
TINTA    = (23, 18, 28)      # #17121C

L, A = 1200, 630
MARGEM = 76

# As URLs dos arquivos .ttf mudam a cada versao da fonte no Google Fonts, entao
# o script pergunta ao proprio Google quais sao as atuais. O User-Agent antigo e
# proposital: com ele o Google devolve TTF, que o Pillow le, em vez de WOFF2.
CSS_FONTES = ("https://fonts.googleapis.com/css2"
              "?family=Archivo:wght@800&family=Lexend:wght@400;500")

_urls = None

def _resolver():
    global _urls
    if _urls is None:
        req = urllib.request.Request(CSS_FONTES, headers={"User-Agent": "Mozilla/5.0 (Windows NT 6.1)"})
        with urllib.request.urlopen(req) as r:
            css = r.read().decode("utf-8")
        blocos = re.findall(
            r"font-family: '([^']+)';.*?font-weight: (\d+);.*?url\((https://[^)]+\.ttf)\)",
            css, re.S)
        _urls = {"%s-%s" % (fam.lower(), peso): url for fam, peso, url in blocos}
        if not _urls:
            raise RuntimeError("Google Fonts nao devolveu TTF. Confira a conexao.")
    return _urls

def fonte(nome, tamanho):
    os.makedirs(CACHE, exist_ok=True)
    caminho = os.path.join(CACHE, nome + ".ttf")
    if not os.path.exists(caminho):
        url = _resolver()[nome]
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as r, open(caminho, "wb") as f:
            f.write(r.read())
    return ImageFont.truetype(caminho, tamanho)

def largura(d, txt, f):
    return d.textbbox((0, 0), txt, font=f)[2]

card = Image.new("RGB", (L, A), CREME)

# Simbolo da marca como marca d'agua na direita, so no roxo e bem apagado.
# Usa a silhueta do simbolo e pinta de roxo chapado: as partes vermelhas do
# arquivo original virariam manchas cor de pessego no creme.
simbolo = Image.open(os.path.join(SITE, "assets", "img", "simbolo-moinho.png")).convert("RGBA")
simbolo = simbolo.resize((660, 660), Image.LANCZOS)
silhueta = Image.new("RGBA", simbolo.size, ROXO + (0,))
silhueta.putalpha(simbolo.getchannel("A").point(lambda v: int(v * 0.14)))
card.paste(silhueta, (L - 330, (A - 660) // 2), silhueta)

d = ImageDraw.Draw(card)

# Logo
logo = Image.open(os.path.join(SITE, "assets", "img", "logo-moinho.png")).convert("RGBA")
lw = 268
logo = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
card.paste(logo, (MARGEM, MARGEM), logo)

# Titulo. "receita" sai em roxo, como o .grifo do site.
f_tit = fonte("archivo-800", 78)
y = 232
for linha in [[("Cadência que vira", TINTA)],
              [("receita", ROXO), (".", TINTA)]]:
    x = MARGEM
    for txt, cor in linha:
        d.text((x, y), txt, font=f_tit, fill=cor)
        x += largura(d, txt, f_tit)
    y += 92

# Subtitulo
f_sub = fonte("lexend-400", 30)
y += 24
for linha in ["Marketing, Vendas e Sucesso do Cliente",
              "em uma operação só."]:
    d.text((MARGEM, y), linha, font=f_sub, fill=(70, 62, 80))
    y += 44

# Regua com o degrade vermelho-rose e o endereco do site
ry, rw, rh = A - MARGEM - 30, 88, 6
for i in range(rw):
    t = i / (rw - 1)
    cor = tuple(round(VERMELHO[c] + (ROSE[c] - VERMELHO[c]) * t) for c in range(3))
    d.rectangle([MARGEM + i, ry, MARGEM + i + 1, ry + rh], fill=cor)

f_url = fonte("lexend-500", 26)
d.text((MARGEM + rw + 22, ry - 10), "moinhod.com.br", font=f_url, fill=ROXO)

card.save(SAIDA, "JPEG", quality=90, optimize=True, progressive=True)
print("gerado:", SAIDA, os.path.getsize(SAIDA) // 1024, "KB", card.size)

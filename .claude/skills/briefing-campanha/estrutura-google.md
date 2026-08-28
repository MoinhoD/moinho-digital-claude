# Estrutura — Briefing Google Ads

Modelo de referência: `E:\moinho\pega-e-cola\google-ads-campanha.md`.
Seguir esta ordem de seções. Calibrar todo o conteúdo ao cliente (produto, público, tom de voz do `contexto.md`).

## 1. Cabeçalho
- Cliente, preparado em (data), para quem (gestor de tráfego).

## 2. Configurações da campanha (tabela)
Nome | Tipo (Rede de Pesquisa / PMax / etc.) | Orçamento diário | Estratégia de lance (ex.: Maximizar Cliques inicial → Maximizar Conversões após ~30 conversões) | Rotação de anúncios | Localização | Idioma | Redes.

## 3. Padrão de UTM
Tabela com utm_source, utm_medium, utm_campaign, utm_content (varia por grupo), utm_term ({keyword} ValueTrack).
Explicar onde colar (campo **"Sufixo de URL final"** do grupo de anúncios). Se o cliente já tem um padrão (CRM/RD Station), manter exatamente.

## 4. Grupos de anúncio (um bloco por grupo)
Para cada grupo:
- **Palavras-chave** — tabela com correspondência (Exata `[ ]`, Frase `" "`, Ampla) e a palavra-chave.
- **URL final** — com UTM completa.
- **Sufixo de URL final** — string de UTM (sem a URL).
- **Anúncio RSA**:
  - Caminhos de exibição (2)
  - **Headlines** — tabela `# | Headline | Chars`. Mínimo 10–12, **máx. 30 caracteres cada**. Contar e mostrar os caracteres. Incluir sempre o nome da marca e um título de CTA ("Peça Orçamento Grátis").
  - **Descriptions** — tabela `# | Description | Chars`. Mínimo 3, **máx. 90 caracteres cada**.

## 5. Palavras-chave negativas (campanha)
Bloco de código com a lista (ex.: grátis, de graça, como fazer, tutorial, curso, download, DIY...). Ajustar ao produto.

## 6. Extensões recomendadas
- Sitelinks (título + URL)
- Callouts (destaques curtos)
- Snippet estruturado (tipos de produtos/serviços)

## 7. Rastreamento — lembrete técnico
Explicar o que cada utm_content identifica no relatório e como o utm_term={keyword} liga a venda à palavra-chave (cruzamento UTM × CRM).

---

**Limites do Google Ads a respeitar sempre:** título ≤ 30 caracteres, descrição ≤ 90, caminho de exibição ≤ 15 cada. Se algo passar, encurtar antes de entregar.

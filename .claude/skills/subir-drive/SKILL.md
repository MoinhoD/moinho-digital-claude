# Skill: /subir-drive

Faz upload de arquivos locais para o Google Drive usando rclone.

## Pré-requisitos

- rclone instalado (`winget install Rclone.Rclone`)
- Remote configurado como `gdrive-moinho` para a conta da Moinho Digital
- Para reconfigurar: `rclone config reconnect gdrive-moinho:`

## Uso

```
/subir-drive [caminho-local] → [destino-no-drive]
```

**Exemplos:**
- `/subir-drive` — infere origem e pergunta destino
- `/subir-drive clientes/Venmka/conteudo/exports` — pergunta o destino

---

## O que fazer quando invocado

### 1. Identificar a origem

- Se passado como argumento, usar esse caminho (relativo ao workspace)
- Se não passado, procurar `exports/` ou `saidas/` no contexto ativo
- Se não encontrar, perguntar ao usuário

### 2. Encontrar a pasta de destino no Drive

Usar o MCP do Google Drive para buscar a pasta correta pelo nome do cliente:

```
search_files(query: "name contains '[nome do cliente]' and mimeType = 'application/vnd.google-apps.folder'")
```

Mostrar os resultados ao usuário e confirmar qual pasta é a correta antes de continuar. Nunca presumir — o Drive pode ter múltiplas pastas com nomes parecidos.

Depois de confirmar, usar o ID da pasta como `--drive-root-folder-id` em todos os comandos rclone.

### 3. Verificar se o destino já tem arquivos

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
$check = rclone ls "gdrive-moinho:" --drive-root-folder-id [ID-DA-PASTA] 2>&1
$temArquivos = ($check | Where-Object { $_ -notmatch "^Error" -and $_.Trim() -ne "" }).Count -gt 0
```

- **Vazio ou não existe** → upload direto
- **Já tem arquivos** → criar subpasta com timestamp: `yyyy-MM-dd_HH-mm`

```powershell
if ($temArquivos) {
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
    Write-Output "Já existe conteúdo. Enviando para subpasta $timestamp."
}
```

### 4. Simular antes de subir (dry-run)

```powershell
rclone copy "[origem-absoluta]" "gdrive-moinho:" --drive-root-folder-id [ID-DA-PASTA] --dry-run --stats-one-line 2>&1
```

Mostrar o que seria enviado. Confirmar antes de prosseguir.

### 5. Fazer o upload

```powershell
rclone copy "[origem-absoluta]" "gdrive-moinho:" --drive-root-folder-id [ID-DA-PASTA] --progress --stats-one-line 2>&1
```

### 6. Verificar o resultado

```powershell
rclone ls "gdrive-moinho:" --drive-root-folder-id [ID-DA-PASTA] 2>&1
```

### 7. Gerar link do Drive

```powershell
rclone link "gdrive-moinho:" --drive-root-folder-id [ID-DA-PASTA] 2>&1
```

Mostrar o link ao usuário para acesso direto.

### 8. Reportar ao usuário

- Quantos arquivos foram enviados
- Tamanho total
- Link direto do Drive

---

## Diagnóstico de erros

| Erro | Solução |
|------|---------|
| `rclone: command not found` | Reiniciar o terminal ou rodar: `$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine')` |
| `Failed to create drive root dir` | Autenticação expirou — rodar `rclone config reconnect gdrive-moinho:` |
| `directory not found` | O caminho local está errado — verificar com `Get-ChildItem "[caminho]"` |
| Arquivo corrompido no destino | Rodar `rclone check` para encontrar diferenças |

## Lições aprendidas

- MCP `create_file` funciona mas tem limitação prática: base64 de ~87KB não cabe no contexto para ser passado como parâmetro. Use rclone para arquivos maiores que ~15KB.
- PNG base64 = tamanho × 1.33. Um arquivo de 65KB vira ~87K chars de base64.
- O remote `gdrive-moinho` está autenticado na conta da Moinho Digital. Config em `C:\Users\inaia\AppData\Roaming\rclone\rclone.conf`.
- O Google Drive Desktop instalado no PC pode usar uma conta diferente — não confiar para uploads da agência.

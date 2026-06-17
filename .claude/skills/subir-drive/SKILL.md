# Skill: /subir-drive

Faz upload de arquivos locais para o Google Drive usando rclone.

## Pré-requisitos

- rclone instalado (`winget install Rclone.Rclone`)
- Remote configurado como `gdrive-moinho` para `inaiara@moinhod.com.br`
- Para reconfigurar: `rclone config reconnect gdrive-moinho:`

## Uso

```
/subir-drive [caminho-local] → [destino-no-drive]
```

**Exemplos:**
- `/subir-drive` — infere origem e pergunta destino
- `/subir-drive clientes/Venmka/conteudo/exports` — pergunta o destino
- `/subir-drive clientes/Venmka/conteudo/exports → Clientes/Venmka/Instagram/Stories`

---

## O que fazer quando invocado

### 1. Identificar a origem

- Se passado como argumento, usar esse caminho (relativo ao workspace)
- Se não passado, procurar `exports/` ou `saidas/` no contexto ativo
- Se não encontrar, perguntar ao usuário

### 2. Identificar o destino no Drive

- Se passado no argumento (após `→`), usar esse caminho como base
- Se não passado, tentar inferir do contexto:
  - Extrair cliente de `clientes/[NOME]/`
  - Sugerir `Clientes/[NOME]/[tipo-conteudo]`
- Se não conseguir inferir, perguntar

### 3. Verificar se o destino já tem arquivos

Antes de definir o caminho final, checar o que há no destino:

```powershell
$env:PATH = [System.Environment]::GetEnvironmentVariable('PATH','Machine') + ';' + [System.Environment]::GetEnvironmentVariable('PATH','User')
$check = rclone ls "gdrive-moinho:[destino-base]" 2>&1
$temArquivos = ($check | Where-Object { $_ -notmatch "^Error" -and $_.Trim() -ne "" }).Count -gt 0
```

- **Destino vazio ou não existe** → upload direto em `[destino-base]`
- **Destino já tem arquivos** → criar subpasta com timestamp: `[destino-base]/yyyy-MM-dd_HH-mm`

```powershell
if ($temArquivos) {
    $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
    $destinoFinal = "[destino-base]/$timestamp"
    Write-Output "Já existe conteúdo em [destino-base]. Enviando para subpasta $timestamp."
} else {
    $destinoFinal = "[destino-base]"
}
```

Mostrar ao usuário o caminho final antes de confirmar.

### 4. Simular antes de subir (dry-run)

```powershell
rclone copy "[origem-absoluta]" "gdrive-moinho:$destinoFinal" --dry-run --stats-one-line 2>&1
```

Mostrar ao usuário o que seria enviado. Confirmar antes de prosseguir.

### 5. Fazer o upload

```powershell
rclone copy "[origem-absoluta]" "gdrive-moinho:$destinoFinal" --progress --stats-one-line 2>&1
```

### 6. Verificar o resultado

```powershell
rclone ls "gdrive-moinho:$destinoFinal" 2>&1
```

### 7. Reportar ao usuário

Informar:
- Quantos arquivos foram enviados
- Tamanho total
- Caminho completo no Drive onde estão (e se foi para subpasta por conflito)

---

## Notas técnicas

- Upload direto se o destino estiver vazio; subpasta com timestamp se já houver arquivos
- `rclone copy` nunca apaga arquivos do destino
- Mantém a estrutura de subpastas da origem
- Para verificar integridade: `rclone check "[origem]" "gdrive-moinho:$destinoFinal"`

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
- O remote `gdrive-moinho` está autenticado em `inaiara@moinhod.com.br` (conta da Moinho Digital). Config em `C:\Users\inaia\AppData\Roaming\rclone\rclone.conf`.
- O Google Drive Desktop instalado no PC usa uma conta diferente — não confiar para uploads da agência.

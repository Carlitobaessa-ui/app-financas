# Proxy da API da Anthropic (Cloudflare Workers)

Resolve a exposição da chave de API: a partir daqui, a chave real da
Anthropic (`sk-ant-...`) fica guardada só neste Worker (como *secret*, nunca
em texto no repositório). O navegador passa a mandar apenas um "segredo do
app" de baixo risco, que você escolhe e pode trocar quando quiser.

## Passo a passo (uma vez só)

1. **Crie uma conta gratuita na Cloudflare**, se ainda não tiver: https://dash.cloudflare.com/sign-up
   (o plano free de Workers cobre 100.000 requisições/dia — muito acima do uso de uma pessoa).

2. **Organize os arquivos.** Dentro da pasta do projeto, crie:
   ```
   worker/
     src/
       index.js       ← conteúdo de worker-src-index.js (arquivo ao lado deste README)
     wrangler.toml    ← conteúdo de worker-wrangler.toml (arquivo ao lado deste README)
   ```

3. **Gere o segredo do app** (não é a chave da Anthropic — é um valor novo, só seu):
   ```bash
   openssl rand -hex 32
   ```
   Guarde o resultado; vai usar duas vezes (no Worker e no app).

4. **Instale o Wrangler e faça login** (abre o navegador para autorizar):
   ```bash
   cd worker
   npx wrangler login
   ```

5. **Configure os dois secrets do Worker** (cada comando pede o valor colado no terminal, sem ecoar na tela):
   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY
   # cole aqui a chave real sk-ant-... (gere uma NOVA em console.anthropic.com → API Keys
   # e revogue a antiga, já que ela ficou exposta em texto puro até agora)

   npx wrangler secret put APP_SHARED_SECRET
   # cole aqui o valor gerado no passo 3
   ```

6. **Publique o Worker:**
   ```bash
   npx wrangler deploy
   ```
   O comando termina mostrando a URL pública, algo como:
   ```
   https://app-financas-proxy.SEU-USUARIO.workers.dev
   ```

7. **No app-financas:** menu → Configurações → Chave de API. Cole:
   - **URL do proxy** → a URL do passo 6
   - **Segredo do app** → o valor do passo 3 (o mesmo que foi para `APP_SHARED_SECRET`)

   Salve. A partir daqui a chave real nunca mais passa pelo navegador — o campo
   "Chave de API" antigo (em Avançado) pode ficar vazio.

8. **Revogue a chave antiga** em `console.anthropic.com` → API Keys, se ainda não
   tiver feito no passo 5 — ela ficou em texto puro no navegador até agora.

## Se o segredo do app vazar

Sem problema: gere outro (`openssl rand -hex 32`), rode `npx wrangler secret put
APP_SHARED_SECRET` de novo com o novo valor, e atualize o campo "Segredo do
app" nas Configurações do app. Não precisa tocar na chave real da Anthropic.

## Rotina de atualização

Só é preciso rodar `npx wrangler deploy` de novo se o código em `src/index.js`
mudar. Trocar os secrets não exige reimplantar.

## Limite de uso (rate limit) — já configurado

O `wrangler.toml` já define um teto de **30 chamadas por minuto** via
[Workers Rate Limiting binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
(não é o painel de "Rate Limiting Rules" — aquele exige um domínio próprio
com zona na Cloudflare, e este Worker roda num subdomínio `workers.dev`).
Mesmo que o segredo do app vaze, quem o usar fica limitado a esse teto —
protege o orçamento da API mesmo no pior caso.

Pra ativar (ou depois de qualquer mudança em `src/index.js` ou `wrangler.toml`),
é só publicar de novo:
```bash
cd worker
npx wrangler deploy
```
Trocar o limite: edite `limit` (chamadas) e `period` (10 ou 60 segundos, só
esses dois valores são aceitos) em `wrangler.toml`, depois `wrangler deploy`.

Requisições acima do limite recebem `429` do Worker e não chegam à Anthropic.

# Custo de implementação (via Claude) e de sustentação — funcionalidades propostas

Complemento ao documento `analise-mercado-funcionalidades-2026.md`. Aqui, dois custos diferentes que não devem ser confundidos:

- **Custo de implementação**: o trabalho de construir a funcionalidade com a Claude (Cowork/Claude Code) — hoje já coberto pela sua assinatura Claude, sem cobrança extra por feature. O que varia é o tempo/complexidade, não um valor em R$.
- **Custo de sustentação**: o que passa a rodar recorrentemente em produção depois de pronto — APIs de terceiros, hospedagem, processamento por IA. Esse sim é custo real, mês a mês.

Importante: como o app-financas é de **uso pessoal (um único usuário)**, não um produto comercial vendido a terceiros, vários provedores têm um tier gratuito ou muito mais barato que o preço "comercial" — isso muda bastante a conta e está sinalizado abaixo.

## Tabela por funcionalidade

| Funcionalidade | Implementação (Claude) | Sustentação mensal | Observação |
|---|---|---|---|
| Open Finance (conexão automática de contas/cartões) | Complexa — várias sessões (OAuth, webhooks, mapeamento de dados) | **R$ 0** via "Meu Pluggy" (tier gratuito p/ uso pessoal, sem expiração) · **R$ 2.500+/mês** se for uso comercial · alternativa "Banco MCP" a partir de R$ 19,90/mês por conta conectada | Maior custo variável de todo o roadmap — mas só se tornar produto comercial. Para uso próprio, tende a ficar de graça. |
| Declaração de Bens p/ IRPF | Simples/média — extensão direta do cálculo de IR já implementado | R$ 0 | Cálculo interno, sem API externa. |
| Rastreador de assinaturas/recorrências | Simples — detecção de padrões nos lançamentos já existentes | R$ 0 | Sem API externa. |
| Comparação de performance vs. benchmarks (CDI/IBOV/S&P500) | Simples/média | R$ 0 a baixo | CDI/IBOV via brapi (já usado no app) ou fontes públicas do BC; sem custo adicional relevante. |
| Score de saúde financeira no Dashboard | Simples | R$ 0 | Cálculo interno com dados que o app já tem. |
| Simulador de aposentadoria/independência financeira | Média | R$ 0 | Cálculo interno (projeção composta). |
| Modo compartilhado (família/casal) | Média/complexa — multiusuário, permissões, sincronização | R$ 0 a baixo | Usa a mesma infra Neon já existente; eventualmente mais storage/compute (ver abaixo). |
| 2FA/TOTP para login por e-mail/senha | Simples | R$ 0 | Biblioteca padrão (ex. otplib), roda no cliente/Neon Auth. |
| Categorização automática de lançamentos por IA | Média | **< US$ 1/mês** estimado | Se usar Claude Haiku 4.5 (US$1 input / US$5 output por milhão de tokens) para categorizar; volume pessoal (centenas de lançamentos/mês) fica bem abaixo de 1 milhão de tokens. |
| Rastreamento de criptomoedas | Simples | R$ 0 | API pública (ex. CoinGecko free tier) cobre bem o uso pessoal. |
| Rastreamento de milhas/pontos de cartão | Simples/média | R$ 0 | Sem API oficial confiável e gratuita — cadastro manual, mesmo padrão dos ativos "satélite" hoje. |
| Monitor de cobertura FGC | Simples | R$ 0 | Cálculo interno (soma por instituição vs. limite de R$250k). |
| PIX Automático | Depende do provedor escolhido | Geralmente embutido no plano de Pagamentos do provedor de Open Finance (ex. Pluggy Payments a partir de R$500/mês) | Só relevante se optar por Open Finance comercial; ainda em rollout nos bancos em 2026. |

## Infraestrutura já usada — o que pode subir de custo

O app já roda sobre GitHub Pages (grátis), Neon (Postgres + Auth) e, pelo histórico do repositório, também Cloudflare Workers:

- **Neon**: tier gratuito cobre 0,5 GB de storage e 100 horas de computação/mês — mais que suficiente para uso pessoal, mesmo com IR, vendas e histórico. Só passaria a custar (Launch, a partir de US$0,106/CU-hora + US$0,35/GB de storage) se o volume de dados ou usuários crescesse bastante (ex. modo família com vários perfis).
- **Cloudflare Workers**: tier gratuito cobre 100 mil requisições/dia — dificilmente estourado por um app pessoal. Plano pago começa em US$5/mês só se ultrapassar isso.
- **GitHub Pages**: continua gratuito para hospedar o `index.html`.

## Resumo prático

Para o cenário atual (uso pessoal, um usuário), a sustentação de **praticamente todo o roadmap fica em R$ 0/mês**, com uma única exceção relevante: **Open Finance comercial**, que só entra na conta se algum dia o app deixar de ser uso próprio e passar a atender terceiros — nesse caso o piso de mercado é ~R$2.500/mês (Pluggy) ou a alternativa mais barata por conexão (~R$19,90/conta/mês).

A implementação em si (meu tempo trabalhando no código) não tem custo variável por funcionalidade — está coberta pela sua assinatura Claude atual; o que varia é a complexidade/tempo de cada item, já refletido na priorização do documento anterior.

## Fontes

- [Claude AI Pricing 2026 — screenapp.io](https://screenapp.io/blog/claude-ai-pricing)
- [Anthropic API Pricing 2026 — finout.io](https://www.finout.io/blog/anthropic-api-pricing)
- [Planos e Preços — Pluggy](https://www.pluggy.ai/precos)
- [Meu Pluggy — sua API de Open Finance grátis](https://www.pluggy.ai/meu-pluggy)
- [Discussão sobre custo do Open Finance para apps pequenos — TabNews](https://www.tabnews.com.br/GuilhermeVieira/estou-desenvolvendo-um-app-de-financas-pessoais-e-nao-consigo-pagar-o-open-finance-pluggy-r2-5k-mes-belvo-r6k-mes-tecnospeed-r1-5k-de-entrada-r540)
- [Alternativa de Open Finance por conexão — TabNews](https://www.tabnews.com.br/GuilhermeVieira/resolvi-o-problema-do-open-finance-caro-que-postei-aqui-achei-uma-alternativa-e-ja-esta-em-producao)
- [Neon Pricing 2026 — Neon Docs](https://neon.com/docs/introduction/plans)
- [Cloudflare Workers Pricing — Cloudflare Docs](https://developers.cloudflare.com/workers/platform/pricing/)

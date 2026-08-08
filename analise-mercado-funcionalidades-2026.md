# app-financas vs. mercado — funcionalidades para otimizar (atualizado agosto/2026)

Segunda varredura completa, do zero, comparando o **app-financas** (v144) com os principais apps de finanças pessoais do Brasil (Organizze, Mobills, GuiaBolso) e do mundo (Monarch Money, Copilot Money, YNAB, Rocket Money, Cleo, Bright Money), mais o estado atual de Open Finance/Pix Automático no Brasil. Esta versão substitui a análise anterior — os 6 itens que já foram implementados desde então (2FA/bloqueio, alerta de reajuste de assinatura, resumo semanal, categorização por IA, orçamento por envelopes, assistente proativo) saem da lista de gaps e entram na lista de "o que o app já faz bem".

## O que o app já faz melhor ou igual ao mercado hoje

- **Nicho agro**: mercado de grãos com hedge CBOT, aluguel de ações, mercado de imóveis rurais — nenhum concorrente genérico cobre isso.
- **3 níveis de assistente de IA** (Básico/Estrategista/CFO) com contexto financeiro completo, mais **assistente proativo** com sugestões diárias e **resumo semanal automático** — no mesmo patamar do "AI Assistant + weekly recap" que o Monarch lançou em 2026 como principal novidade do ano.
- **Categorização assistida por IA** (opt-in, complementando as regras locais) — mesma direção do Copilot Money (referência do mercado em categorização por IA), mas o app-financas funciona em qualquer navegador/PWA, enquanto o Copilot é exclusivo iOS/macOS (sem Android, sem web).
- **Orçamento por envelopes/zero-based** — paridade com o modelo YNAB (que cobra US$ 109-180/ano só por isso).
- **Rastreador de assinaturas com detecção de reajuste de preço** — na mesma linha do Rocket Money, que é hoje o app mais conhecido do mundo especificamente por isso.
- **Bloqueio por código local (2FA/TOTP)** — cobre o gap de segurança que existia pra login por e-mail/senha.
- **Milhas/pontos de programas brasileiros (Livelo, Smiles)**: os grandes trackers globais (AwardWallet, CardPointers) não cobrem programas brasileiros — o app-financas já é mais completo que eles nesse recorte.
- **Criptomoedas, monitor de cobertura FGC, comparação vs. benchmarks (CDI/IBOV/S&P500), simulador de aposentadoria, declaração de bens pro IRPF, apuração de ganho de capital** — tudo isso já implementado e sem equivalente combinado em nenhum app de varejo brasileiro.
- **Segurança**: criptografia local, Face ID/passkey, bloqueio por código — acima da média dos apps brasileiros gratuitos.

## Gaps confirmados nesta nova varredura

### 1. Open Finance — ainda o maior gap, e ficou mais forte o caso pra fechar

O Open Finance Brasil completou 5 anos em fevereiro/2026: **154 milhões de consentimentos ativos e 100 milhões de clientes conectados**. O Open Investment (Fase 4) já responde por 17% de todas as chamadas do ecossistema (1,81 bilhão de chamadas em dez/2024, contra 1% um ano antes) — ou seja, puxar posição de corretora automaticamente via Open Finance deixou de ser nicho e virou fluxo mainstream. Continua sendo o maior atrito do app-financas hoje: tudo é lançamento manual, foto ou OCR.

### 2. Pix Automático — oportunidade nova que não existia na varredura anterior

Em abril/2026, **~85% dos bancos** (todos os grandes + Nubank, Inter, C6) já suportam Pix Automático, com **73% de adesão** dos clientes que recebem o pedido de autorização recorrente pelo app do banco. Isso muda o jogo pro rastreador de assinaturas: hoje o app-financas *infere* recorrência olhando o histórico de lançamentos; com Pix Automático, dá pra em tese *confirmar* a cobrança recorrente direto na origem (via Open Finance) em vez de heurística — precisão bem maior, incluindo saber o valor exato do próximo débito antes dele acontecer.

### 3. Modo compartilhado (família/casal) — segue sendo o recurso mais pedido pra quem usa a dois

Confirmado de novo: Monarch Money é hoje a referência do mercado pra casais, com dashboards compartilhados, contas conjuntas e individuais na mesma tela, metas conjuntas e divisão de despesas proporcional à renda — tudo isso sob uma única assinatura. Segue fora do escopo por sua própria decisão anterior, mas registro que o gap não diminuiu.

### 4. Novidade de 2026: IA agêntica com execução autônoma (não só sugestão)

Este é um gap que **não existia** na varredura anterior porque a tendência é recente: Cleo lançou "Autopilot" em fevereiro/2026 (ajusta economia, bloqueia comerciantes e executa planos financeiros sem intervenção do usuário) e a Bright Money tem o "MoneyScience" (otimiza pagamento de dívida entre contas automaticamente). Isso vai um passo além do assistente proativo do app-financas (v143), que hoje só *sugere* — nunca *executa* nada sozinho. Não é recomendação de implementar isso agora (mexer com dinheiro real de forma autônoma é um risco alto que exigiria muita cautela), mas é uma tendência de mercado que vale registrar.

### 5. Otimizador de IR / tax-loss harvesting

Apps brasileiros especializados em IR (Grana Capital, myProfit) já vão além do cálculo de ganho de capital que o app-financas tem hoje: sugerem otimização de IR (ex: vender uma posição no prejuízo pra compensar ganho tributável no ano), calculam DARF retroativo e consolidam cripto + ativos no exterior automaticamente. É uma extensão natural do que já foi implementado (cálculo de IR + declaração de bens), não um recurso novo do zero.

## Roadmap sugerido, por prioridade

**Alta prioridade:**
1. Open Finance (Pluggy/Belvo/Quanto) para importação automática de extratos, faturas e posição de investimentos
2. Pix Automático como fonte de verdade pra assinaturas/recorrências (complementa a detecção heurística já implementada)

**Média prioridade:**
3. Otimizador de IR (sugestão de venda pra compensar prejuízo/ganho tributável) — extensão do cálculo de ganho de capital já existente
4. Modo compartilhado (família/casal) — por decisão sua, segue fora do escopo por enquanto

**Baixa prioridade / observar tendência, não implementar ainda:**
5. IA agêntica com execução autônoma (tipo Cleo Autopilot) — tendência de 2026, mas alto risco pra mexer com dinheiro real sem supervisão; melhor observar como o mercado resolve segurança/confiança antes de considerar

## Fontes

- [15 melhores apps de controle financeiro para 2026 — iDinheiro](https://www.idinheiro.com.br/financaspessoais/app-controle-financeiro-pessoal-gratis/)
- [10 apps de controle financeiro 2026 — TechTudo](https://www.techtudo.com.br/listas/2026/01/10-apps-de-controle-financeiro-para-cuidar-melhor-do-dinheiro-em-2026-edapps.ghtml)
- [Mobills x Organizze x FinVibe x Minhas Economias — FinVibe](https://www.finvibe.app/blog/mobills-x-organizze-x-finvibe-x-minhas-economias-qual-o-melhor-app-de-financas)
- [Melhores Apps Controle Financeiro 2026: Mobills vs Organizze — Gazeta Brasília](https://gazetabrasilia.com.br/melhores-aplicativos-de-controle-financeiro-2026/)
- [The Best Budget Apps for 2026 — NerdWallet](https://www.nerdwallet.com/finance/learn/best-budget-apps)
- [Best AI Budgeting Apps in 2026 — BestMoney](https://www.bestmoney.com/financial-advisor/learn-more/best-ai-budgeting-apps)
- [Rocket Money vs Monarch Money (+YNAB, Simplifi & Copilot) — Wall Street Survivor](https://www.wallstreetsurvivor.com/rocket-money-vs-monarch/)
- [Monarch Money Review 2026 — Finny Blog](https://getfinny.app/blog/monarch-money-review-2026)
- [Monarch vs Copilot Money 2026 — X1 Wealth](https://x1wealth.com/compare/copilot-vs-monarch)
- [Best Budgeting Apps for Couples in 2026 — BestMoney](https://www.bestmoney.com/financial-advisor/learn-more/budgeting-apps-for-couples)
- [Open Finance 2026: as 4 novidades — Pluggy](https://www.pluggy.ai/blog/open-finance-2026-novidades)
- [Open Finance entra na 4ª fase com 27 milhões de clientes — Febraban](https://portal.febraban.org.br/noticia/3995/pt-br)
- [Open Investment: o que é e como evoluiu — Smartbrain](https://smartbrain.com.br/open-investment/)
- [Pix Automático: Análise de Dados do 1º Tri 2026 — PagBrasil](https://www.pagbrasil.com/pt-br/blog/noticias/pix-automatico-2026/)
- [Pix Automático 2026: o que mudou e como usar agora — Creditavel](https://creditavel.com/pix-automatico-2026-como-funciona/)
- [Imposto de Renda 2026: 8 aplicativos — B3/Bora Investir](https://borainvestir.b3.com.br/noticias/imposto-de-renda/imposto-de-renda-2026-8-aplicativos-que-podem-salvar-sua-declaracao-na-reta-final/)
- [Imposto de Renda 2026: 4 apps para te ajudar — Fast Company Brasil](https://fastcompanybrasil.com/money/imposto-de-renda-2026-5-apps-para-te-ajudar-na-organizacao/)
- [Best Apps for Tracking Your Credit Card Rewards in 2026 — CNBC Select](https://www.cnbc.com/select/best-apps-for-tracking-your-credit-card-rewards/)
- [10 Best Crypto Portfolio Tracker Apps in 2026 — VentureBurn](https://ventureburn.com/best-crypto-portfolio-tracker/)
- [Agentic Finance AI Agents Guide 2026 — Netclues](https://www.netclues.com/blog/agentic-finance-ai-wealth-management-agents)
- [Smart Money: AI Agents Transform Personal & Corporate Finance 2026 — Rentelligence](https://rentelligence.ai/blog/autonomous-financial-agents-guide/)

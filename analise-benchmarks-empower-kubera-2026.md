# app-financas vs. Empower e Kubera (agosto/2026)

Empower (ex-Personal Capital, EUA, gratuito) e Kubera (EUA, US$249/ano) são referência mundial em **rastreamento de patrimônio líquido e portfólio consolidado** — categoria diferente da maioria dos apps já comparados antes (que são mais focados em orçamento/gastos do dia a dia). Faz sentido usá-los como benchmark porque o app-financas já é, no fundo, um patrimônio-consolidador com investimentos, bens, dívidas e cenários — exatamente o território deles.

## O que o app-financas já iguala ou supera

- **Alocação de Ativos** (`page-alocacao`, "Atual × Faixa-alvo"): já faz o que o Investment Checkup do Empower faz — compara alocação atual por classe contra um alvo definido e sinaliza desvio — só que com faixa (min-max) em vez de um único percentual ideal, o que é mais flexível.
- **Financiamentos/empréstimos vinculados a bens** (saldo devedor, parcelas, taxa, sistema): já cobre o que o rastreador de dívidas do Kubera faz, com a vantagem de já estar amarrado ao bem específico (ex: financiamento → imóvel), não solto.
- **3 assistentes de IA com contexto financeiro completo + assistente proativo**: equivalente (e mais integrado nativamente) ao "Kubera GPT" — que no Kubera é um add-on separado ligado via API, enquanto no app-financas já é nativo.
- **Cenários de patrimônio** (otimista/base/estresse + testes de estresse macro): cobre parcialmente o "Fast Forward" do Kubera, mas de forma mais rígida (ver gap #2 abaixo).

## Gaps identificados

### 1. Simulação de aposentadoria é um caminho único, não uma probabilidade (Monte Carlo)

O simulador atual (`_simularAposentadoria`) projeta patrimônio futuro com **uma única taxa de retorno fixa** informada pelo usuário — um cenário determinístico. O Retirement Planner do Empower roda **simulação de Monte Carlo**: milhares de trajetórias com retornos anuais variando de forma aleatória (dentro de uma distribuição plausível), e reporta a **probabilidade** de a meta ser atingida ("87% de chance de sustentar a renda desejada"), não um número único que passa segurança falsa. É provavelmente o gap de maior valor desta comparação — muda a natureza da resposta de "vai dar R$X" para "há Y% de chance de dar certo", que é honestamente mais correto.

### 2. Cenários são fixos, não um motor de eventos customizáveis

Hoje "Cenários" tem 3 trajetórias pré-definidas (otimista/base/estresse) e testes de estresse com variáveis hardcoded (Selic a 15%, IPCA a 12%, inadimplência de bens). O "Fast Forward" do Kubera deixa o usuário **adicionar eventos futuros à linha do tempo** — uma herança esperada, uma despesa grande (faculdade dos filhos), quitação antecipada de um financiamento, venda de um bem — e ver o impacto disso na trajetória de patrimônio. Seria uma extensão natural da tela de Cenários já existente.

### 3. Valorização de bens/imóveis é 100% manual

O valor atual de um bem (`vlAt`) só muda se o usuário editar na mão. A página de Imóveis já busca Selic/IPCA/IGP-M ao vivo do Banco Central pra outros cálculos — dava pra usar a mesma infraestrutura pra **sugerir reajuste automático do valor de bens/imóveis** com base num índice público (IGP-M, IVG-R do BCB, ou variação regional), sem exigir integração paga como o Zillow que o Kubera usa nos EUA.

### 4. Não existe nenhum "resumo de emergência patrimonial"

O diferencial mais citado do Kubera é o "Vault" — um jeito de deixar herdeiros/beneficiários com acesso a uma visão read-only do patrimônio em caso de falecimento/incapacidade. Implementar isso por completo (multiusuário, acesso condicionado) é infraestrutura pesada e já foi descartado antes (modo compartilhado). Mas uma versão bem mais simples e de baixo esforço é possível: um **PDF/export sob demanda** com resumo consolidado (contas, investimentos, bens, seguros, financiamentos, contatos-chave) pra guardar num lugar seguro pra família — sem infraestrutura de compartilhamento contínuo, só reaproveitando dados que já existem no app. Faz sentido pro seu perfil (holding familiar e sucessão patrimonial já aparecem como tema recorrente no assistente CFO).

### 5. Fee Analyzer — não recomendo copiar

O Fee Analyzer do Empower rastreia taxas de administração/consultoria (AUM fees) típicas de contas de aposentadoria americanas (401k/IRA). A maioria dos ativos rastreados no app-financas (ações BR, FIIs, Tesouro) não tem esse tipo de taxa contínua e visível do mesmo jeito — o fit com o mercado brasileiro é questionável. Baixa prioridade.

### 6. Multi-moeda completo (EUR, GBP etc.) — baixa prioridade

O Kubera trata multi-moeda como recurso central. O app-financas já cobre BRL+USD, que é a exposição cambial real do seu perfil hoje; expandir pra moedas adicionais só valeria a pena se surgir exposição em outras moedas.

## Roadmap sugerido, por prioridade

**Alta prioridade:**
1. Simulação de aposentadoria por Monte Carlo (probabilidade de sucesso, não só 1 número)
2. Resumo de emergência patrimonial exportável (PDF) — baixo esforço, alto valor

**Média prioridade:**
3. Motor de cenários com eventos customizáveis na linha do tempo
4. Sugestão de reajuste de valor de bens via índice público (IGP-M/IVG-R)

**Baixa prioridade / não recomendo:**
5. Fee Analyzer (fit questionável com o mercado BR)
6. Multi-moeda além de BRL/USD

## Fontes

- [Empower Review 2026: Best Free Net Worth Tracker? — ChooseFI](https://choosefi.com/review/empower-review-the-ultimate-net-worth-tracker)
- [Empower Review 2026 — FinanceBuzz](https://financebuzz.com/personal-capital-review)
- [Portfolio Analyzer - Investment Checkup — Empower](https://www.empower.com/investment-checkup)
- [Retirement Fee Analyzer Calculations Overview — Empower Support](https://support-personalwealth.empower.com/hc/en-us/articles/201169600-Retirement-Fee-Analyzer-Calculations-Overview)
- [Kubera Review 2026: Net Worth Tracking Across Stocks, Crypto, Real Estate, And Alternatives — CryptoAdventure](https://cryptoadventure.com/kubera-review-2026-net-worth-tracking-across-stocks-crypto-real-estate-and-alternatives/)
- [Kubera Review 2026 — WalletHacks](https://wallethacks.com/kubera-review/)
- [The Multi Currency Portfolio Tracker: Kubera — Kubera Blog](https://www.kubera.com/blog/multi-currency-portfolio-tracker)
- [Kubera vs. Empower — FinanceBuzz](https://financebuzz.com/kubera-vs-personal-capital)
- [Kubera vs. Empower: Which is the Best Budget and Money App? — WallStreetZen](https://www.wallstreetzen.com/blog/kubera-vs-empower-personal-dashboard-app/)

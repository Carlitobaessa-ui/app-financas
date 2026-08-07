# app-financas vs. mercado — funcionalidades para otimizar (2026)

Análise comparativa entre o que o **app-financas** já oferece hoje (mapeado pelo menu do app: Visão Geral, Investimentos, Bancário, Controle, Inteligência, Relatórios, Configurações/Backup) e as funcionalidades de destaque dos principais apps de finanças pessoais do Brasil (Organizze, Mobills, Minhas Economias) e do mundo (Monarch Money, Copilot Money, YNAB, Rocket Money), considerando também as tendências de mercado para 2026 (Open Finance Fase 4, PIX Automático, IA agêntica).

## O que o app já faz melhor que a maioria dos concorrentes

Vale registrar antes de listar gaps, porque são diferenciais reais que nenhum app genérico do mercado replica:

- **Nicho agro**: mercado de grãos com hedge CBOT, aluguel de ações, mercado de imóveis — nenhum concorrente de varejo (Organizze, Mobills, Monarch) cobre isso.
- **3 níveis de assistente de IA** (Básico/Estrategista/CFO) com contexto financeiro completo — mais granular que o chat único da maioria dos apps globais.
- **Segurança**: criptografia local, Face ID/passkey, backup central — nível acima da média dos apps brasileiros gratuitos.
- **Lançamento por voz, foto e OCR de recibo** — recurso que só apps pagos globais (Copilot, Rocket Money) oferecem, e olhe lá.
- **Apuração de IR de ganho de capital** (implementada agora) — a maioria dos apps de mercado, BR ou globais, não calcula isso automaticamente.

## Gaps em relação ao mercado, por categoria

### 1. Bancário / Open Finance — maior gap

Hoje o app depende de importação manual, foto e OCR. Organizze, Mobills e a nova geração de apps BR (ex. Jota) já conectam contas via Open Finance. Isso é o gap de maior impacto:

- **Conexão via Open Finance** (Pluggy, Belvo ou Quanto como provedor de agregação) para importar automaticamente extratos, saldos e faturas de cartão — elimina digitação manual, que é hoje o maior atrito do app.
- **PIX Automático** (novidade regulatória de 2026 no Brasil): reconhecer e categorizar cobranças recorrentes (assinaturas, mensalidades) automaticamente assim que a funcionalidade estiver disponível nos bancos.
- **Open Finance Fase 4**: passa a cobrir também dados de investimentos, seguros e previdência — permitiria puxar automaticamente posição de corretoras, eliminando a digitação manual de ativos na Carteira.

### 2. Controle & Orçamento

- **Rastreador de assinaturas/recorrências** com detecção automática de cobranças repetidas e alerta de reajuste (padrão Rocket Money) — hoje o Extrato/Orçamento não isola isso.
- **Score de saúde financeira**: indicador único no Dashboard combinando patrimônio líquido, endividamento, liquidez e taxa de poupança — comum em Monarch e nos apps BR mais recentes, dá uma "nota" rápida de onde o usuário está.
- **Orçamento por envelopes/zero-based** (estilo YNAB) como modo avançado, complementar ao orçamento por categoria já existente.

### 3. Investimentos — área mais forte, mas com espaço claro

- **Comparação de performance vs. benchmarks** (CDI, IBOVESPA, IPCA+, S&P500): hoje mostra rentabilidade individual do ativo, mas não a carteira consolidada contra um benchmark — é o gráfico mais pedido em qualquer app de investimentos sério.
- **Simulador de aposentadoria / independência financeira**: projeção de patrimônio futuro dado aporte mensal, rentabilidade esperada e meta de consumo — recurso padrão em Mobills Pro e Monarch.
- **Rastreamento de criptomoedas** dedicado (hoje cripto só cabe em "Satélite" sem cotação própria).
- **Rastreamento de milhas/pontos de cartão** (Livelo, Smiles, Latam Pass) como classe de ativo com valor de resgate — muito valorizado no Brasil e ausente em quase todo app internacional.
- **Monitor de cobertura do FGC**: alertar quando o total em CDB/LCI/LCA numa mesma instituição financeira ultrapassa R$250.000 (limite de garantia).

### 4. Inteligência / IA

- **Categorização automática de lançamentos por IA**: Copilot Money é referência de mercado nisso; combinado com o assistente que o app já tem, seria natural estender a IA para categorizar e não só analisar.
- **Alertas proativos em tempo real** (push) de gasto atípico, fatura de cartão subindo, saldo baixo — hoje "Sinais & Riscos" existe mas parece analítico/sob demanda, não push automático.

### 5. Segurança & Automação

- App já está à frente da média (criptografia local, biometria, backup). Único gap: **2FA/TOTP** para quem usa login por e-mail/senha (hoje só Google/GitHub OAuth têm segundo fator via provedor).

### 6. Relatórios & Planejamento de longo prazo

- **Declaração de Bens para IRPF**: extensão natural do cálculo de IR que acabamos de implementar — gerar automaticamente a posição de bens (ações, FIIs, imóveis, contas) formatada para copiar na declaração anual, não só o ganho de capital mensal.
- **Modo compartilhado (família/casal)**: Organizze e Monarch destacam isso como recurso forte para uso a dois; hoje o app parece ser de usuário único.

## Roadmap sugerido, por prioridade

**Alta prioridade** (maior ROI dado o que já existe):
1. Open Finance (Pluggy/Belvo) para importação automática de contas e cartões
2. Declaração de Bens para IRPF (evolução direta da apuração de IR já implementada)
3. Rastreador de assinaturas/recorrências
4. Comparação de performance da carteira vs. benchmarks (CDI/IBOV/S&P500)

**Média prioridade**:
5. Score de saúde financeira no Dashboard
6. Simulador de aposentadoria/independência financeira
7. Modo compartilhado (família/casal)
8. 2FA/TOTP para login por e-mail/senha

**Baixa prioridade / diferenciação futura**:
9. Rastreamento dedicado de criptomoedas
10. Rastreamento de milhas/pontos de cartão de crédito
11. Monitor de cobertura FGC
12. Suporte a PIX Automático (depende de disponibilidade de API bancária, ainda emergente em 2026)

## Fontes

- [10 Melhores Apps de Finanças em 2026 — Encaixei](https://www.encaixei.com.br/blog/melhores-apps-financas)
- [Top 10 aplicativos para controle financeiro — Serasa](https://www.serasa.com.br/score/blog/opcoes-de-aplicativo-para-controle-financeiro/)
- [Mobills x Organizze x FinVibe x Minhas Economias — FinVibe](https://www.finvibe.app/blog/mobills-x-organizze-x-finvibe-x-minhas-economias-qual-o-melhor-app-de-financas)
- [The Best Budget Apps for 2026 — NerdWallet](https://www.nerdwallet.com/finance/learn/best-budget-apps)
- [YNAB vs Monarch Money: 2026 Comparison — Envelope Budgeting](https://envelopebudgeting.com/articles/monarch-vs-ynab)
- [Best AI Personal Finance Tools in 2026 — Techno-Pulse](https://www.techno-pulse.com/2026/04/best-ai-personal-finance-tools-in-2026.html)
- [Monarch vs Copilot Money (2026) — X1 Wealth](https://x1wealth.com/compare/copilot-vs-monarch)
- [Rocket Money Review 2026 — Wall Street Survivor](https://www.wallstreetsurvivor.com/rocket-money-review/)
- [What Is Rocket Money? — Ramsey Solutions](https://www.ramseysolutions.com/budgeting/what-is-rocket-money)
- [Open Finance 2026: as 4 novidades — Pluggy](https://www.pluggy.ai/blog/open-finance-2026-novidades)
- [Bancos aquecem a modernização para 2026 com Pix Automático, Open Finance e IA — Inforchannel](https://inforchannel.com.br/2025/12/29/bancos-aquecem-a-modernizacao-e-se-preparam-para-um-2026-com-pix-automatico-open-finance-e-ia/)

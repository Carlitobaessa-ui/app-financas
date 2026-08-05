// Proxy da API da Anthropic — roda na Cloudflare Workers.
//
// Por que isso existe: o app-financas hoje manda a chave real da Anthropic
// direto do navegador para api.anthropic.com. Qualquer pessoa com acesso ao
// arquivo/computador/localStorage consegue ler essa chave. Este proxy resolve
// isso: a chave real (ANTHROPIC_API_KEY) fica guardada só aqui, como secret
// do Worker — nunca é enviada ao navegador. O navegador manda, em vez disso,
// um "segredo do app" (APP_SHARED_SECRET) — um valor de baixo risco, que você
// mesmo escolhe e pode trocar quando quiser sem precisar gerar uma chave nova
// na Anthropic.
//
// Segurança: quem não souber o APP_SHARED_SECRET recebe 401 e a requisição
// nunca chega até a Anthropic. Isso protege contra alguém achar a URL do
// Worker (que é pública, sem problema) e usá-la para gastar seu orçamento de
// API. CORS está liberado (Access-Control-Allow-Origin: *) de propósito — o
// controle de acesso real é o segredo, não a origem (CORS não bloqueia
// ferramentas como curl/Postman, só chamadas feitas por JS de outro site).

export default {
  async fetch(request, env) {
    const CORS_HEADERS = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-app-secret',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const secret = request.headers.get('x-app-secret');
    if (!secret || !env.APP_SHARED_SECRET || secret !== env.APP_SHARED_SECRET) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    // Teto de segurança: no máximo N chamadas/minuto (configurado em
    // wrangler.toml), mesmo com o segredo correto — limita o estrago se o
    // segredo algum dia vazar. env.RATE_LIMITER só existe se o binding
    // estiver configurado; se não existir (ex: dev local sem o binding),
    // simplesmente não aplica limite.
    if (env.RATE_LIMITER) {
      const { success } = await env.RATE_LIMITER.limit({ key: secret });
      if (!success) {
        return new Response(JSON.stringify({ error: 'rate_limited' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
        });
      }
    }

    if (!env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'proxy_misconfigured', detail: 'ANTHROPIC_API_KEY não foi definida no Worker' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    let bodyText;
    try {
      bodyText = await request.text();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'bad_request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
      });
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: bodyText,
    });

    const respBody = await upstream.arrayBuffer();
    return new Response(respBody, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        ...CORS_HEADERS,
      },
    });
  },
};

// Service Worker do app Finanças — cache do "app shell" para uso offline.
//
// O manifest e os ícones já vêm embutidos como data: URI dentro do próprio
// index.html (não são arquivos separados), então o único recurso que
// precisa de cache é o HTML em si.
//
// Estratégia para o documento principal: NETWORK-FIRST
//   (tenta buscar a versão mais nova; se offline, cai para a última cópia salva).
//   Isso garante que, sempre que houver internet, o usuário recebe a versão
//   mais recente publicada — sem precisar limpar cache manualmente.
//
// Para forçar todo mundo a baixar uma atualização, basta mudar CACHE_VERSION
// (feito a cada nova versão publicada do app).

const CACHE_VERSION = 'financas-v3';
const APP_SHELL = [
  './',
  './index.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch(() => {}) // não bloqueia a instalação se algum recurso falhar
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // não intercepta POST/PUT (ex: chamadas de API)

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // não mexe em recursos de outra origem (ex: CDNs)

  const isDocumento = req.mode === 'navigate' || req.destination === 'document';

  if (isDocumento) {
    // NETWORK-FIRST: tenta rede, cai para cache se offline.
    // IMPORTANTE: usamos { cache: 'no-store' } para ignorar completamente o
    // cache HTTP do navegador (isso é diferente do cache do Service Worker).
    // Sem isso, o Safari em especial pode devolver uma cópia HTTP antiga do
    // index.html sem sequer consultar a rede de verdade, fazendo o app
    // parecer "travado" numa versão anterior mesmo com internet disponível.
    event.respondWith(
      fetch(req.url, { cache: 'no-store' })
        .then((resp) => {
          const copia = resp.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copia));
          return resp;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // CACHE-FIRST para qualquer outro recurso da mesma origem (ex: se algum dia
  // o app passar a referenciar arquivos externos ao HTML, como imagens soltas)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((resp) => {
        const copia = resp.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(req, copia));
        return resp;
      });
    })
  );
});

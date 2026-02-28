const CACHE_NAME = 'herdvibe-pwa-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 설치 시 기본 파일 캐시
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// 이전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// 네트워크 우선, 실패 시 캐시 (대시보드는 항상 최신 데이터가 중요)
self.addEventListener('fetch', event => {
  // 외부 도메인(herdvibe.com, API 등)은 캐시하지 않음
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.waitUntil(
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    )
  );
});

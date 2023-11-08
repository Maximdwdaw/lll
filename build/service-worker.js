const CACHE_NAME = 'Every';

const STATIC_RESOURCES = [
    '/'
  ];
  self.addEventListener('push', (event) => {
    const data = event.data.json();

    const options = {
        body: data.message,
        icon: '/icons/icon-72x72.png',
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_RESOURCES);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  if (event.request.method === 'POST' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  if (event.request.method === 'GET') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            return response;
          });
          
          return fetchPromise;
        });
      })
    )
  }
})

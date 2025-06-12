
const CACHE_NAME = 'eco-skin-v2';
const STATIC_CACHE = 'eco-skin-static-v2';
const DYNAMIC_CACHE = 'eco-skin-dynamic-v2';

const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico',
  '/og-image.png',
  '/manifest.json'
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network first for API calls, Cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // API calls - Network first
  if (request.url.includes('/api/') || request.url.includes('generativelanguage.googleapis.com')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
  
  // Static assets - Cache first
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseToCache));
            
            return response;
          });
      })
  );
});

// Background sync for offline message queue
self.addEventListener('sync', (event) => {
  if (event.tag === 'chat-messages') {
    event.waitUntil(syncOfflineMessages());
  }
});

async function syncOfflineMessages() {
  // Implementation for syncing offline messages when back online
  console.log('Syncing offline messages...');
}

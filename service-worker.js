// Service Worker for Dublin Sports Mentor PWA
const CACHE_NAME = 'dublin-sports-mentor-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/find-player.html',
  '/login.html',
  '/styles.css',
  '/mobile.css',
  '/find-player.css',
  '/auth.css',
  '/script.js',
  '/find-player.js',
  '/auth.js',
  '/pwa.js',
  '/firebase-config.js',
  '/auth-check.js',
  '/email-config.js',
  '/booking.js',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/splash.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error during service worker install:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests like Google and Facebook auth
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('firestore') ||
      event.request.url.includes('firebase')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request because it's a one-time use stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a one-time use stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // You can return a custom offline page here
      })
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const title = 'Dublin Sports Mentor';
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

/*
 * Really simple service worker, just caches all the webpages.
 */

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      return cache.addAll([
        '/ServiceWorkersPoC/',
        '/ServiceWorkersPoC/index.html',
        '/ServiceWorkersPoC/app.js',
        '/ServiceWorkersPoC/attacker-controlled.html',
        '/ServiceWorkersPoC/private.html',
      ]);
    }),
  );
});

// Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function (response) {
          let responseClone = response.clone();
          caches.open('v1').then(function (cache) {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      }
    }),
  );
});

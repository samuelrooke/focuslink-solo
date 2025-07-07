// A unique name for the cache version. Change this to force an update.
const CACHE_NAME = "pomodoro-cache-v2";

// A list of all the files and assets the app needs to function offline.
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'styles.css',
  'script.js',
  'manifest.json',
  'sounds/ding.mp3',
  'sounds/bell.mp3',
  'sounds/chime.mp3',
  'images/favicon-focus.png',
  'images/favicon-break.png',
  'images/favicon-paused.png',
  'images/icons/icon-72x72.png',
  'images/icons/icon-96x96.png',
  'images/icons/icon-128x128.png',
  'images/icons/icon-144x144.png',
  'images/icons/icon-192x192.png',
  'images/icons/icon-384x384.png',
  'images/icons/icon-512x512.png'
];

// The 'install' event is fired when the service worker is first installed.
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // waitUntil() ensures the service worker doesn't install until the code inside has successfully completed.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  // Forces the waiting service worker to become the active service worker.
  self.skipWaiting();
});

// The 'activate' event is fired when the service worker becomes active.
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // This removes old caches that are no longer needed.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );

  // This claims control over all open clients (pages) so they will be controlled by this service worker.
  self.clients.claim();
});

// The 'fetch' event is fired for every network request made by the page.
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // This strategy is "Cache First". It checks the cache for a response before trying the network.
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      // If a response is found in the cache, return it. Otherwise, fetch from the network.
      return response || fetch(evt.request);
    })
  );
});
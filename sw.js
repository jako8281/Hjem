const CACHE_NAME = 'rengoering-v1';
const ASSETS = [
  '/Hjem/',
  '/Hjem/index.html',
  '/Hjem/styles.css',
  '/Hjem/app.js',
  '/Hjem/manifest.webmanifest',
  '/Hjem/icons/icon-192.png',
  '/Hjem/icons/icon-512.png'
];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{ if(k!==CACHE_NAME) return caches.delete(k); })))
  );
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then(resp=> resp || fetch(e.request))
  );
});

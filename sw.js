const version = "11.12.21-1";
const CACHE_NAME = "calculatorCache";
const urlsToCache = [
    "./",
    "./img/favicon.png",
    "./img/number32.png",
    "./img/number64.png",
    "./img/number128.png",
    "./img/number256.png",
    "./img/number512.png",
    "./js/main.js",
    "./js/mountApp.js",
    "./css/style.css",
    "./css/normalize.css",
    "./js/vue.global.prod.js",
];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE_NAME).then(
        cache => cache.addAll(urlsToCache).then(
            () => self.skipWaiting()
        ).catch(
            err => console.log(err)
        )
    ))
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(
            cacheNames => {
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if (cacheWhitelist.indexOf(cacheName) === -1) return caches.delete(cacheName);
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if (res) return res
                return fetch(e.request)
            }
        )
    )
    location.reload;
});

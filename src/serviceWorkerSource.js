/* eslint-disable */

const elementsToSave = [
    '/',
    '/index.html',
    '/robots.txt',
    '/logo192.png',
    '/logo512.png',
    '/favicon.ico',
    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
    'https://fonts.gstatic.com/s/poppins/v19/pxiEyp8kv8JHgFVrJJfecg.woff2',
];

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('install', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
    if (self.skipWaiting) self.skipWaiting();
    event.waitUntil(
        caches.open('portfolio')
        .then(
            cache => fetch('/asset-manifest.json')
            .then(res => res.json())
            .then(json => cache.addAll([...json.entrypoints, ...elementsToSave]))
        )
    );
});

self.addEventListener('fetch', event => {
    event.waitUntil(
        caches.open('portfilio')
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(cacheResponse => {
            if (cacheResponse) {
                console.log(`Intercepting ${event.request.method} method to ${event.request.url}, found in cache.`);
                return cacheResponse;
            }
            return fetch(event.request).then(fetchResponse => {
                console.log(`Intercepting ${event.request.method} mehtod to ${event.request.url}, found online.`);
                return fetchResponse;
            });
        })
    );
});

let cacheWhiteList = ['portfolio'];
caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => cacheWhiteList.indexOf(cacheName) === -1 ? caches.delete(cacheName) : null)));
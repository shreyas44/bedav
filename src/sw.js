const cacheName = "static"

const fonts = [
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@100;400;700&display=swap",
]

const { assets } = global.serviceWorkerOption
let allAssets = assets.map((item) => `/bundles${item}`)
allAssets = [...allAssets, '/']

const bundleCacheName = assets[0].split('.')[1]

self.addEventListener('install', event => {
  event.waitUntil(Promise.all([
    caches.open(bundleCacheName).then(cache => {
      cache.addAll(allAssets)
    }).catch(error => {
      console.log(error)
    }),
    caches.open(cacheName).then(cache => {
      cache.addAll(fonts)
    })
  ]))
})

self.addEventListener('activate', event => {
  // console.log("Activated", event)
})

self.addEventListener('fetch', event => {
  const {request} = event

  //event.respondWith(
    //caches.match(request).then(response => {
      //return response || fetch(request)
    //})
  //)
})

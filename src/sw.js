const cacheName = "static"
const fonts = [
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@100;400;700&display=swap",
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(fonts.concat(['/']))
    })
  )
})

self.addEventListener('activate', event => {
  // console.log("Activated", event)
})

self.addEventListener('fetch', event => {
  //const {request} = event
  //console.log(event)
  //if (request.url.endsWith(".js") && request.url.startsWith(self.registration.scope)) {
    //caches.open(cacheName).then(cache => {
      //cache.add(request.url)
    //})  
  //}

  //event.respondWith(
    //caches.match(request).then(response => {
      //return response || fetch(request)
    //})
  //)
})

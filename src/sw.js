self.addEventListener('install', event => {
  console.log(event)
})

self.addEventListener('activate', event => {
  console.log("Activated", event)
})

self.addEventListener('fetch', event => {
  console.log(event)
})

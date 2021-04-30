const staticCacheName = "static";
const dynamicCacheName = "dynamic";

const static = [
  "https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@100;400;700&display=swap",
  "https://kit.fontawesome.com/bb3ad5143d.js",
  "https://www.googletagmanager.com/gtag/js?id=UA-176069742-1",
];

const { assets } = global.serviceWorkerOption;
let allAssets = assets.map((item) => `/bundles${item}`);
let bundleCacheName;

for (asset of assets) {
  if (asset.includes("main")) {
    bundleCacheName = asset.split(".")[1];
    break;
  }

  bundleCacheName = "js";
}

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length >= size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

const query = `
  query {
    country {
      locations(first: 1000) {
        edges {
          node {
            name
            state {
              id
            }
          }
        }
      }
    }
  }
`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches
        .open(bundleCacheName)
        .then((cache) => {
          cache.addAll(allAssets);
        })
        .catch((error) => {
          console.log(error);
        }),

      caches.open(staticCacheName).then((cache) => {
        cache.addAll(static);
      }),

      fetch("/graphql/", {
        method: "POST",
        body: JSON.stringify({ query: query }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          return response.data.country.locations.edges;
        })
        .then((edges) => {
          const locations = edges.map((edge) => edge.node);
          const urls = locations.map(
            (locality) =>
              `/${locality.name.toLowerCase()}-${locality.state.id.toLowerCase()}/`
          );

          return caches.open(bundleCacheName).then((cache) => {
            cache.addAll(urls);
          });
        }),

      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== bundleCacheName && key !== staticCacheName)
            .map((key) => caches.delete(key))
        );
      }),
    ])
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== staticCacheName && key !== bundleCacheName)
            .map((key) => caches.delete(key))
        );
      }),

      caches.open(bundleCacheName).then((cache) => {
        cache.add("/");
      }),

      caches.keys().then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== bundleCacheName && key !== staticCacheName)
            .map((key) => caches.delete(key))
        );
      }),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const path = request.url.split("//")[1].split("/").slice(1).join("/");

  if (
    request.method == "GET" &&
    request.url.startsWith("http") &&
    !/maps.(googleapis|gstatic).com/.test(request.url)
  ) {
    if (path.startsWith("hospital")) {
      event.respondWith(
        caches.match("/").then((response) => {
          return response || fetch(request);
        })
      );
    }

    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request)
            .then((fetchResponse) => {
              if (/fonts.(googleapis|gstatic).com/.test(request.url)) {
                return caches.open(staticCacheName).then((cache) => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
                });
              } else if (!path.startsWith("bundle")) {
                limitCacheSize(dynamicCacheName, 20);
                return caches.open(dynamicCacheName).then((cache) => {
                  cache.put(request, fetchResponse.clone());
                  return fetchResponse;
                });
              }
            })
            .catch((error) => {
              return caches.match("/").then((response) => {
                return response;
              });
            })
        );
      })
    );
  }

  //caches.match(request).then(response => {
  //return response || fetch(request).then(response => {
  //if (request.url.startsWith("https://www.google-analytics.com/") || request.url.startsWith("https://maps.g")) {
  //return response
  //}

  //return caches.open(dynamicCacheName).then(cache => {
  //cache.put(request, response.clone())
  //limitCacheSize(dynamicCacheName, 20)
  //return response
  //})
  //})
  //})
});

const CACHE = "tuto-manga-v1.4.0";
const THUMBS = CACHE + "-thumbs";
const SHELL = ["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "favicon.ico", "favicon-32.png",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-192.png", "icons/icon-maskable-512.png", "icons/logo-96.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== THUMBS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === "navigate") {
      event.respondWith(
        fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put("index.html", copy));
          return res;
        }).catch(() => caches.match("index.html"))
      );
      return;
    }
    event.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }
  // Thumbnails: cache as they are viewed so recently opened cards can appear offline.
  // Videos themselves are not cached and still need internet.
  if (url.hostname === "img.youtube.com") {
    event.respondWith(
      caches.open(THUMBS).then(cache => cache.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res.ok) cache.put(req, res.clone());
          return res;
        });
      }))
    );
  }
});

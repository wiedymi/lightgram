/* global self, location */
/* eslint no-restricted-globals: ["error"] */

const DYNAMIC_CACHE = 'dynamic-cache'

self.addEventListener('fetch', event => {
  const req = event.request
  const url = new URL(req.url)

  if (url.protocol === 'chrome-extension:') {
    return
  }

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req))
  } else {
    event.respondWith(networkFirst(req))
  }
})

const cacheFirst = async req => {
  const cachedResponse = await caches.match(req)

  return cachedResponse || fetch(req)
}

const networkFirst = async req => {
  const cache = await caches.open(DYNAMIC_CACHE)

  try {
    const res = await fetch(req)
    const url = new URL(req.url)

    if (url.protocol.indexOf('http') === -1) {
      return
    }

    cache.put(req, res.clone())

    return res
  } catch (error) {
    const result = await cache.match(req)

    return result
  }
}

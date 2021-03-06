/*global importScripts*/
/*eslint no-undef: "error"*/

if ("function" === typeof importScripts) {
  const externalImagesPrefix=[
    "https://res.cloudinary.com",
    "https://images.unsplash.com"
  ];

  const networkOnlyRoutesPrefix=[
    "https://top-image.herokuapp.com/socket.io"
  ];

  const networkFirstRoutesPrefix=[
    "https://top-image.herokuapp.com/api"
  ];
    
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
  
    /* Debug config*/
    workbox.setConfig({ debug: true });
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
      
    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* Default CRA service worker msg support*/
    self.addEventListener("message", (event) => {
      if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
      }
    });
    /* custom cache rules*/
    workbox.routing.registerNavigationRoute("/index.html", {
      /*eslint no-useless-escape: "error"*/
      blacklist: [/^\/_/, /\/[^/]+\.[^/]+$/],
    });
  
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg|svg)$/,
      workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      })
    );
    
    externalImagesPrefix.forEach(prefix=>{
      workbox.routing.registerRoute(
        new RegExp(`${prefix}/.+`),
        workbox.strategies.cacheFirst({
          cacheName: "images",
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        })
      );
    });

    networkOnlyRoutesPrefix.forEach(prefix=>{
      workbox.routing.registerRoute(
        new RegExp(`${prefix}/.+`),
        workbox.strategies.networkOnly()
      );    
    });

    networkFirstRoutesPrefix.forEach(prefix=>{
      workbox.routing.registerRoute(
        new RegExp(`${prefix}/.+`),
        workbox.strategies.networkFirst({
            networkTimeoutSeconds: 3,
            cacheName: 'contests',
            plugins: [
              new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              }),
            ],
        })
      );    
    });

  
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
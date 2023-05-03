const CACHE = "v1";
const URLS =["/src/app.js", "/src/client.js", "/", "/src/styles.css", 
"/src/componentHtml.js", "/src/componentAuthentication.js", "/src/componentMenu.js", "/src/componentNotes.js", 
"/src/componentSpese.js", "/src/globalVar.js", "/src/myclass.js",
"/src/xmlHttpRequest/httpRequest-fun.js", "/src/mymacros/macro-functions.js",
"/PWA.webmanifest","https://unpkg.com/vue@3/dist/vue.esm-browser.js",
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
"https://jspm.dev/uuid",
"https://jspm.dev/npm:uuid@9.0.0",
"/src/icons/icon-192x192.png",
"/src/icons/icon-512x512.png"];

self.addEventListener('install', event=>{
    console.log('installing..');
    event.waitUntil(
        caches.open(CACHE).then(cache=>{
            cache.addAll(URLS);
        })
    );
});
self.addEventListener('activate',event=>{
    console.log("activating");
});
self.addEventListener('fetch', event=>{
    event.respondWith(checkCache(event)
        .catch(e=>{
            self.clients.matchAll()
                .then(clients => {
                    clients.forEach(client => client.postMessage("offline"));
                });
            console.error(e);
        })
    )
});       


self.addEventListener('message',evt=>{
    console.log(evt.data);
});

const checkCache = (event) => 
    caches.match(event.request.url)
        .then(value=>
            {
                if(!(value===undefined))
                    return value;
                else {
                    //return fetch(event.request);
                    return fetch(event.request);
                }
        });
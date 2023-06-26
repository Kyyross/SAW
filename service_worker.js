const CACHE = "v1";
const URLS =["/src/app.js", "/src/client.js", "/", "/src/mycss.css", 
"/src/componentHtml.js", "/src/componentAuthentication.js", "/src/componentMenu.js", "/src/componentNotes.js", 
"/src/componentSpese.js", "/src/subComponent/componentTransition.js", "/src/subComponent/componentCategory.js", 
"/src/subComponent/componentTools.js", "/src/globalVar.js", "/src/myclass.js", "/src/xmlHttpRequest/httpRequest-fun.js", 
"/src/mymacros/macro-functions.js", "/PWA.webmanifest","https://unpkg.com/vue@3/dist/vue.esm-browser.js",
"https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
"src/Firebase/firebase_auth.js", "/src/Firebase/firebase_config.js", "/src/Firebase/firebase_db.js",
"https://jspm.dev/uuid", "https://jspm.dev/npm:uuid@9.0.0", "/src/icons/icon-192x192.png", "/src/icons/favicon.ico", "/src/img/piu.png",
"/src/icons/icon-512x512.png","https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png",
"/src/icons/1.svg","/src/icons/2.svg","/src/icons/3.svg","/src/icons/4.svg",
"/src/icons/5.svg","/src/icons/6.svg","/src/icons/7.svg","/src/icons/8.svg","/src/icons/9.svg","/src/icons/10.svg",
"/src/icons/11.svg","/src/icons/12.svg","/src/icons/13.svg","/src/icons/14.svg","/src/icons/15.svg","/src/icons/16.svg",
"/src/icons/17.svg","/src/icons/18.svg","/src/icons/19.svg","/src/icons/20.svg","/src/img/home.png","/src/img/delete.png"];

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
                    return fetch(event.request);
                }
        });
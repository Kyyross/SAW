import { createApp } from './app.js';

createApp(0).mount('#app0');
createApp(1).mount('#app1');
createApp(2).mount('#app2');
createApp(3).mount('#app3');

if("serviceWorker" in navigator){
    navigator.serviceWorker
        .register("/service_worker.js")
        .then(serviceWorker=>{
            console.log("service worker registered: ", serviceWorker);
        })
        .catch(error=>{console.error("error registering the service worker: ", error)
    });

    navigator.serviceWorker.addEventListener('message',evt=>{
        console.log("SW to Client: " + evt.data);
    });

    if(navigator.serviceWorker.controller!=null)
        navigator.serviceWorker.controller.postMessage("Hi");
}
else{
    alert("The browser does not support the ServiceWorker");
    console.log("The browser does not support the SW");
}

if(!("Notification" in window)){
    alert("The Browser does not support the notification")
    }
    else if(Notification.permission==="granted"){
        new Notification(
        "Hello",
        {
            lang: "en",
            body: "Welcome back",
            icon: "/src/icons/icon-192x192.png",
            vibrate: [200,100,200]
        }
    );
    }else if(Notification.permission!=="denied"){
    await Notification.requestPermission();
    if(Notification.permission==="granted"){
        new Notification("Le notifiche sono attivate");   
    }
}
addEventListener("online", (event) => {new Notification("mode online")});
addEventListener("offline", (event) => {new Notification("mode offline")});



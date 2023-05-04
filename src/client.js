import { createApp } from './app.js';

createApp(0).mount('#app0');
createApp(1).mount('#app1');
createApp(2).mount('#app2');
createApp(3).mount('#app3');

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
  });

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
    var notification = new Notification(
        "Hello",
        {
            lang: "en",
            body: "Hi",
            icon: "/src/icons/icon-192x192.png",
            vibrate: [200,100,200]
        }
    );
}else if(Notification.permission!=="denied"){
    await Notification.requestPermission();
    if(Notification.permission==="granted"){
        var notification = new Notification("Try Notification");   
    }
}

//DEBUGGINGif(window.isSecureContext)console.log("siamo al sicuro");
//else console.log("non al sicuro");
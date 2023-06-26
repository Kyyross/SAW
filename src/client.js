import { createApp } from './app.js';
import { LoadSave } from './xmlHttpRequest/httpRequest-fun.js';
import {userName, displayButtonSign} from './globalVar.js'

createApp(0).mount('#app0');
createApp(1).mount('#app1');
createApp(2).mount('#app2');
createApp(3).mount('#app3');

/*window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#navbar-side');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            //event.preventDefault();
            //document.body.classList.toggle('sb-sidenav-toggled');
            //localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
  });*/

if("serviceWorker" in navigator){
    navigator.serviceWorker
        .register("/service_worker.js")
        .then(serviceWorker=>{
            console.log("service worker registered: ", serviceWorker);
        })
        .catch(error=>{console.error("error registering the service worker: ", error)
    });

    navigator.serviceWorker.addEventListener('message',evt=>{
        if(evt.data==="offline")var notification= new Notification("ora sei offline");
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

/*
if(window.localStorage.length!=0){
    let utente=window.localStorage.getItem("username");
    console.log(utente);
    let obj=JSON.parse(window.localStorage.getItem(utente));
    console.log(obj);
    LoadSave(obj);
    [userName.value,userName.logged,userName.display,displayButtonSign.displaySignIn,displayButtonSign.displaySignUp]=[utente,true,"block","none","block"];
}
else{
    console.log("inizio sessione");
}
*/
//DEBUGGINGif(window.isSecureContext)console.log("siamo al sicuro");
//else console.log("non al sicuro");


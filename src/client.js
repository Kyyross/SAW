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
    alert("the browser doesn't support the ServiceWorker");
    console.log("the browser doesnt' support the SW");
}

if(window.isSecureContext)console.log("siamo al sicuro");
else console.log("non al sicuro");
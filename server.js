import express from 'express';
import url from 'url';
//import DOMPurify from 'dompurify';
//import mymacro from './src/macro-functions.js';
import { renderToString } from 'vue/server-renderer';
import {createApp} from './src/app.js';
import { setup } from '@css-render/vue3-ssr';
import {html_, _html, html1, html2 } from './src/componentHtml.js';

const server = express();

server.get('/', (req, res) => {
  const app0=createApp(0);
  const app1=createApp(1);
  const app2=createApp(2);

  /*
  renderToString(app0).then((contentApp0) =>{
    renderToString(app1).then((contentApp1) =>{
      renderToString(app2).then((contentApp2) =>{
        renderToString(app1).then((contentApp3) =>{
          res.send(html_+`${contentApp0}`+html1+`${contentApp1}`+html2+`${contentApp2}`+html1+`${contentApp3}`+_html)})
        });
    });
  });*/
  var promise0=new Promise((resolve,reject)=>{A(app0).then((contentApp)=>resolve(contentApp));});
  var promise1=new Promise((resolve,reject)=>{A(app1).then((contentApp)=>resolve(contentApp));});
  var promise2=new Promise((resolve,reject)=>{A(app2).then((contentApp)=>resolve(contentApp));});

  Promise.all([promise0,promise1,promise2]).then((values)=>{
    res.send(html_+`${values[0]}`+html1+`${values[1]}`+html2+`${values[2]}`+_html);
  })

});

async function A(app){
  return await renderToString(app);
}

server.use(express.static('.'));

server.listen(3000, () => {
    console.log('ready http://localhost:3000 ');
});

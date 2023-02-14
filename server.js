import express from 'express';
import {createApp} from './src/app.js';
import {html_, _html, html1, html2 } from './src/componentHtml.js';
import { RenderApp} from './src/mymacros/macroserver.js';
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
  var promise0=new Promise((resolve,reject)=>{RenderApp(app0).then((contentApp)=>resolve(contentApp),()=>reject());});
  var promise1=new Promise((resolve,reject)=>{RenderApp(app1).then((contentApp)=>resolve(contentApp),()=>reject());});
  var promise2=new Promise((resolve,reject)=>{RenderApp(app2).then((contentApp)=>resolve(contentApp),()=>reject());});
  try{
    Promise.all([promise0,promise1,promise2]).then((values)=>{
    res.send(html_+`${values[0]}`+html1+`${values[1]}`+html2+`${values[2]}`+_html);
    },()=>{throw new Error("error on the server, it couldn't renderize the page");})
  }
  catch(err){debug.err(err.message)};
});

server.use(express.static('.'));
server.listen(3000, () => {
    console.log('ready http://localhost:3000');
});

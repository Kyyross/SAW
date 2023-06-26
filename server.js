import express from 'express';
import {createApp} from './src/app.js';
import {html_, _html, html1, html2, html3 } from './src/componentHtml.js';
import { RenderApp, corsOption } from './src/mymacros/macroserver.js';
import cors from 'cors';
import favicon from 'serve-favicon';

const server = express();

server.use(cors(corsOption));
server.use(favicon("./src/icons/favicon.ico"));

server.get('/',(req, res) => {
  const app0=createApp(0);
  const app1=createApp(1);
  const app2=createApp(2);
  const app3=createApp(3);
  
  var promise0=new Promise((resolve,reject)=>{RenderApp(app0).then((contentApp)=>resolve(contentApp),()=>reject());});
  var promise1=new Promise((resolve,reject)=>{RenderApp(app1).then((contentApp)=>resolve(contentApp),()=>reject());});
  var promise2=new Promise((resolve,reject)=>{RenderApp(app2).then((contentApp)=>resolve(contentApp),()=>reject());});
  var promise3=new Promise((resolve,reject)=>{RenderApp(app3).then((contentApp)=>resolve(contentApp),()=>reject());});

  try{
    Promise.all([promise0,promise1,promise2,promise3]).then((values)=>{
    res.send(html_+`${values[0]}`+html1+`${values[1]}`+html2+`${values[2]}`+html3+`${values[3]}`+_html);
    },()=>{throw new Error("error on the server, it couldn't renderize the page");})
  }
  catch(err){console.error(err.message)};
});

server.use(express.static('.'));
server.listen(3000, () => {
    console.log('ready http://localhost:3000');
});

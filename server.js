import express from 'express';
import {createApp} from './src/app.js';
import {html_, _html, html1, html2 } from './src/componentHtml.js';
import { RenderApp, RegisterAccount, corsOption } from './src/mymacros/macroserver.js';
import cors from 'cors';

const server = express();

server.get('/', cors(corsOption),(req, res) => {
  const app0=createApp(0);
  const app1=createApp(1);
  const app2=createApp(2);
  
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

server.get('/user:id', (req, res) =>{
  res.send("provaprova");
});

//server.use(express.json());
server.post('/SignUp', (req, res)=>{
  let token=req.headers["authorization"];
  console.log("da server:"+token);
  let response=RegisterAccount(token);
  res.send(response);
});

server.use(express.static('.'));
server.listen(3000, () => {
    console.log('ready http://localhost:3000');
});

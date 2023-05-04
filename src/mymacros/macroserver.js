import { renderToString } from 'vue/server-renderer';
import fs from 'fs';
//import { setup } from '@css-render/vue3-ssr';
//import url from 'url';
//import DOMPurify from 'dompurify';
const INDIRIZZOACCOUNTS="data/accounts.json";
const INDIRIZZOSALVATAGGI="data/saves/";

const corsOption= {
  origin: '*',
  credentials:true,           
  optionSuccessStatus:204,
  maxAge: 7200,
  preflightContinue:false
}

async function RenderApp(app){
    return await renderToString(app);
  }

function RegisterAccount(token){
  try{
    let credenziali=token.split(":");
    let newUser={};
    newUser["username"]=credenziali[0];
    newUser["password"]=credenziali[1];
    let allUsers=LoadFile(INDIRIZZOACCOUNTS);
    if(allUsers[newUser.username]) throw new Error("Username is taken");
    allUsers[newUser["username"]]=newUser["password"];
    fs.writeFileSync(INDIRIZZOACCOUNTS, JSON.stringify(allUsers));
  }
  catch(e){console.error(e.message); return MakeObjHttp(400,{message:e.message});}//{message: e.message, status: 400};}
  return MakeObjHttp(201, {message: "Registration is done successfully"});//{message: "Registration is done successfully", status: 201};
}

function LogIn(token){
  let dataClient={};
  try{
    let credenziali=token.split(":");
    let newUser={};
    newUser["username"]=credenziali[0];
    newUser["password"]=credenziali[1];
    let allUsers=LoadFile(INDIRIZZOACCOUNTS);
    if(!(allUsers[newUser.username]&&allUsers[newUser.username]==newUser.password)) throw new Error("Wrong credentials");
    dataClient=LoadFile(INDIRIZZOSALVATAGGI+newUser["username"]+".json");
  }
  catch(e){console.error(e.message); return MakeObjHttp(400,{message: e.message}, {});}//{message:e.message, permission: false, data:{}, status: 400};}
  return MakeObjHttp(200, {message:"Successfully logged"}, dataClient);//{message:"Successfully logged", permission: true , data:dataClient, status: 200};
}

function LoadFile(indirizzo){
  if(fs.existsSync(indirizzo)){
    let file=fs.readFileSync(indirizzo);
    return JSON.parse(file);
  }
  return {};
}

function StoreFile(obj){
  try{
    fs.writeFileSync(INDIRIZZOSALVATAGGI+obj.username+".json",JSON.stringify(obj.dati));
  }
  catch(e){console.error(e.message); return "Error, server couldn't store the files";}
  return "The save is been stored successfully";
}

const MakeObjHttp=(status, metadati, data, links)=>{
  return {"links": links, "metadati": metadati, "data": data, "status": status}
}

export {RenderApp, RegisterAccount, LogIn, StoreFile, corsOption}
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
    if(allUsers[newUser.username]) throw new Error("Utente già esistente");
    allUsers[newUser["username"]]=newUser["password"];
    fs.writeFileSync(INDIRIZZOACCOUNTS, JSON.stringify(allUsers));
  }
  catch(e){console.error("Errore nel formato delle credenziali: "+e.message); return e.message;}
  return "Registrazione effettuata con successo";
}

function LogIn(token){
  let dataClient={};
  try{
    let credenziali=token.split(":");
    let newUser={};
    newUser["username"]=credenziali[0];
    newUser["password"]=credenziali[1];
    let allUsers=LoadFile(INDIRIZZOACCOUNTS);
    if(!(allUsers[newUser.username]&&allUsers[newUser.username]==newUser.password)) throw new Error("Credenziali Errate");
    dataClient=LoadFile(INDIRIZZOSALVATAGGI+newUser["username"]+".json");
  }
  catch(e){console.error(e.message); return {message:e.message, permission: false, dati:{}};}
  return {message:"Log In effettuato con successo", permission: true ,dati:dataClient};
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

export {RenderApp, RegisterAccount, LogIn, StoreFile, corsOption}
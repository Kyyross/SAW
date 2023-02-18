import { renderToString } from 'vue/server-renderer';
import fs from 'fs';
//import { setup } from '@css-render/vue3-ssr';
//import url from 'url';
//import DOMPurify from 'dompurify';
const INDIRIZZOACCOUNTS="data/accounts.json";

const corsOption= {origin: '*'}

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
  try{
    let credenziali=token.split(":");
    let newUser={};
    newUser["username"]=credenziali[0];
    newUser["password"]=credenziali[1];
    let allUsers=LoadFile(INDIRIZZOACCOUNTS);
    if(!(allUsers[newUser.username]&&allUsers[newUser.username]==newUser.password)) throw new Error("Credenziali Errate");
  }
  catch(e){console.error(e.message); return e.message;}
  return "Log In effettuato con successo";
}

function LoadFile(indirizzo){
  if(fs.existsSync(indirizzo)){
    let file=fs.readFileSync(indirizzo);
    return JSON.parse(file);
  }
  return {};
}

export {RenderApp, RegisterAccount, LogIn, corsOption}
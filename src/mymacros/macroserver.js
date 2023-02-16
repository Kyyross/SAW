import { renderToString } from 'vue/server-renderer';
import fs from 'fs';
//import { setup } from '@css-render/vue3-ssr';
//import url from 'url';
//import DOMPurify from 'dompurify';

async function RenderApp(app){
    return await renderToString(app);
  }

function RegisterAccount(token){
  try{
  let credenziali=token.split(":");
  let obj={};
  obj[credenziali[0]]=credenziali[1];
  console.log(obj);
  
  }
  catch(e){console.error("errore nel formato delle credenziali: "+e.message);}
}

export {RenderApp, RegisterAccount}
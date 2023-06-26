import {displayAppNotes, displayAppAuth, displayAppSpese, userName, warningSign, titlePage, Clear, displayButtonSign} from './globalVar.js';
import { componentMenu_Html } from './componentHtml.js';
import { watch } from 'vue';
import { userStore } from './Firebase/firebase_auth.js';
import { works } from './Firebase/firebase_db.js';

export default {
    data() {
      const Open0=()=>{Close(); titlePage.value="Welcome"; titlePage.homeB="block";}
      const Open1=()=>{Close(); if(CheckLogIn()){titlePage.value="Notes"; displayAppNotes.display="block";}};
      const Open2=(bool,bool1=true)=>{
        Close();
        if(bool1) warningSign.value=""; 
        titlePage.value="Authentication"; 
        displayAppAuth.display="flex";
        if(bool){
          displayButtonSign.cmdSignIn="block";
          displayButtonSign.cmdSignUp="none";
        }
        else{
          displayButtonSign.cmdSignIn="none";
          displayButtonSign.cmdSignUp="block";
        }
      };
      const Open3=()=>{Close(); if(CheckLogIn()){titlePage.value="Expense Management"; displayAppSpese.display="flex";}};
      const CheckLogIn=()=> {
        let check= (userName.value!=""?true:false);
        if(!check){
          warningSign.value="Per accedere alle tue applicazioni è necessario autenticarsi";
          Open2(true,false);
        }
        return check;
      }
      const Close=()=>{
        [displayAppNotes.display, displayAppAuth.display, displayAppSpese.display, 
        displayAppSpese.containerSpese, displayAppSpese.containerTransitions, displayAppSpese.containerTools, titlePage.homeB]
        =["none","none","none","none","none","none","none"];
      }
      const SignOut = () => {
        userStore.logout().then((res)=>{
          Close();
          Open0();
          console.log("Il tuo account è stato disconnesso correttamente");
          Clear();
        }).catch((rej)=>console.error(rej));
      }
      const SaveWork= ()=>{
        if(!userName||userName.value==""){
          console.log("Impossible to save the work: No authentication");
          return;
        }
        works.addWorkall();
      } 
      watch(()=>userName.value, (newValue)=>{ 
        if(newValue===""){
          displayButtonSign.SignOut="none";
          displayButtonSign.SignIn="flex";
        }
        else
        {
          displayButtonSign.SignIn="none";
          displayButtonSign.SignOut="block";
        }
       });  
      return {Open0, Open1, Open2, Open3, userName, titlePage, SaveWork, SignOut, displayButtonSign}
    },
    template: componentMenu_Html
  }
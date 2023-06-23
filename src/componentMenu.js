import {displayAppNotes, displayAppAuth, displayAppSpese, userName, warningSign, titlePage, Clear, displayButtonSign} from './globalVar.js';
import { componentMenu_Html } from './componentHtml.js';
import { MakeRequest } from './xmlHttpRequest/httpRequest-fun.js';
import { watch } from 'vue';

export default {
    data() {
      const Open0=()=>{Close(); titlePage.value="Welcome"; titlePage.homeB="block";}
      const Open1=()=>{Close(); if(CheckLogIn()){titlePage.value="Notes"; displayAppNotes.display="block";}};
      const Open2=(bool)=>{
        Close(); 
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
          Open2(true);
        }
        return check;
      }
      const Close=()=>{
        displayAppNotes.display="none", displayAppAuth.display="none", displayAppSpese.display="none", titlePage.homeB="none";
      }
      const SignOut= ()=>{
        Close();
        Open0();
        console.log("Il tuo account è stato disconnesso correttamente");
        window.localStorage.clear();
        Clear();
      }
      const SaveWork= ()=>{
        if(!userName||userName.value==""){
          console.log("It can't be possible save the work because there isn't a Authentication");
          return;
        }
        MakeRequest("SaveWork");
      } 
      watch(()=>userName.value, (newValue)=>{ 
        console.log("GUARDOOO "+newValue);
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
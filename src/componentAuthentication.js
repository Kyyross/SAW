import { reactive, watch } from 'vue';
import { displayAppAuth, warningSign, userName, Clear} from './globalVar.js';
import {MakeRequest} from './xmlHttpRequest/httpRequest-fun.js';
import { componentAuthentication_Html } from './componentHtml.js';

export default {
    data() {
      const displaySign = reactive({displaySignUp:"none", displaySignIn:"none"});
      const displayButtonSign = reactive({SignIn:"block", SignOut:"none"});
      const itemData = reactive({Username:"", Password:""});
      const GumpSign= (newAccount, check)=> {
        warningSign.value="";
        itemData.Username="";
        itemData.Password="";
        if(newAccount=='y')displaySign.displaySignUp  = check=='y'?"block":"none";
        else displaySign.displaySignIn  = check=='y'?"block":"none";
      }
      const SignUp= ()=>{
        if(itemData.Username==""||itemData.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;} 
        console.log("Mandata la richiesta di registrazione");
        warningSign.value="Mandata la richiesta di registrazione";
        MakeRequest("SignUp",{username:itemData.Username,password:itemData.Password});
      }
      const SignIn= ()=>{
        if(itemData.Username==""||itemData.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;} 
        console.log("Attendere l'Autenticazione");
        warningSign.value="Attendere l'Autenticazione";
        MakeRequest("SignIn",{username:itemData.Username,password:itemData.Password});
      }
      const SignOut= ()=>{
        warningSign.value="Il tuo account è stato disconnesso correttamente";
        Clear();
      }
      const SaveWork= ()=>{
        if(!userName||userName.value==""){
          console.log("It can't be possible save the work because there isn't a Authentication");
          return;
        }
        MakeRequest("SaveWork")
      }   //soluzione temporanea
      watch(userName, (newValue)=>{ 
          if(newValue===""){
            displayButtonSign.SignOut="none";
            displayButtonSign.SignIn="block";
          }
          else
          {
            displayButtonSign.SignIn="none";
            displayButtonSign.SignOut="block";
          }
         });  
      return {displaySign, displayButtonSign, displayAppAuth, itemData, GumpSign, SignUp, SignIn, userName, warningSign, SaveWork, SignOut}
    },
    template: componentAuthentication_Html
  }
    
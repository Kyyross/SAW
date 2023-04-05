import { reactive } from 'vue';
import { displayAppAuth, count, warningSign, userName} from './globalVar.js';
import {MakeRequest} from './xmlHttpRequest/httpRequest-fun.js';
import { componentAuthentication_Html } from './componentHtml.js';

export default {
    data() {
      const displaySign = reactive({displaySignUp:"none", displaySignIn:"none"});
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
      const SaveWork= ()=>{
        if(!userName||userName.value==""){
          console.log("It can't be possible save the work because there isn't a Authentication");
          return;
        }
        MakeRequest("SaveWork")} //soluzione temporanea
      return {displaySign, displayAppAuth, count, itemData, GumpSign, SignUp, SignIn, userName, warningSign, SaveWork}
    },
    template: componentAuthentication_Html
  }
    
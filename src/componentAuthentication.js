import { reactive } from 'vue';
import {displayButtonSign, displayAppAuth, warningSign, userName, itemData_Auth} from './globalVar.js';
import {MakeRequest} from './xmlHttpRequest/httpRequest-fun.js';
import { componentAuthentication_Html } from './componentHtml.js';

export default {
    data() {
      const displaySign = reactive({displaySignUp:"none", displaySignIn:"none"});
      const SignUp= ()=>{
        if(itemData_Auth.Username==""||itemData_Auth.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;}
        if(itemData_Auth.Password!=itemData_Auth.cPassword){warningSign.value="Le password non coincidono"; return;} 
        console.log("Mandata la richiesta di registrazione");
        warningSign.value="Mandata la richiesta di registrazione";
        MakeRequest("SignUp",{username:itemData_Auth.Username,password:itemData_Auth.Password});
      }
      const SignIn= ()=>{
        if(itemData_Auth.Username==""||itemData_Auth.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;} 
        console.log("Attendere l'Autenticazione");
        warningSign.value="Attendere l'Autenticazione";
        MakeRequest("SignIn",{username:itemData_Auth.Username,password:itemData_Auth.Password});
      }
      return {displaySign, displayButtonSign, displayAppAuth, itemData_Auth, SignUp, SignIn, userName, warningSign}
    },
    template: componentAuthentication_Html
  }
    
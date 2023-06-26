import { reactive } from 'vue';
import {displayButtonSign, displayAppAuth, warningSign, userName, itemData_Auth} from './globalVar.js';
import {componentAuthentication_Html} from './componentHtml.js';
import {userStore} from './Firebase/firebase_auth.js';
import { works } from './Firebase/firebase_db.js';

export default {
    data() {
      const displaySign = reactive({displaySignUp:"none", displaySignIn:"none"});
      
      const SignUp = () => {
        if(itemData_Auth.Username==""||itemData_Auth.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;}
        if(itemData_Auth.Password!=itemData_Auth.cPassword){warningSign.value="Le password non coincidono"; return;}
        warningSign.value="Attendere la registrazione";
        userStore.emailSignUp(itemData_Auth.Username, itemData_Auth.Password)
        .then((res)=>{
          [warningSign.value,itemData_Auth.Username,itemData_Auth.Password,itemData_Auth.cPassword]=[res,"","",""];
        }).
        catch((rej)=>{
          warningSign.value=rej.code;
          console.error(rej);
        });
      }
      const SignIn = () => {
        if(itemData_Auth.Username==""||itemData_Auth.Password==""){warningSign.value="Tutti i campi devono essere compilati"; return;} 
        warningSign.value="Attendere l'autenticazione";
        userStore.emailLogin(itemData_Auth.Username,itemData_Auth.Password)
        .then((res)=>{
          [warningSign.value,userName.value,userName.id,userName.logged,userName.display]=["Welcome back: "+userStore.credentials.id,userStore.credentials.id,userStore.credentials.id ,true,"block"];
          works.SetId().then(()=>works.loadWork());
        }).catch((rej)=>{
          console.error(rej); warningSign.value=rej.code;
        });
      }

      const SignInGoogle= ()=>{
        warningSign.value="Attendere l'autenticazione";
        userStore.googleLogin().then((res)=>{
          if(userStore.credentials.username==="")return;
          [warningSign.value,userName.value,userName.id,userName.logged,userName.display]=["Welcome back: "+userStore.credentials.username,userStore.credentials.username,userStore.credentials.id ,true,"block"];
          console.log("carico lavori");
          works.SetId().then(()=>works.loadWork());
        }).catch((rej)=>{console.error(rej); warningSign.value=rej.code});
      }
      return {displaySign, displayButtonSign, displayAppAuth, itemData_Auth, SignUp, SignIn, SignInGoogle, userName, warningSign}
    },
    template: componentAuthentication_Html
  }
    
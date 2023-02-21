import { reactive } from 'vue';
import { displayAppAuth, count, warningSign, userName} from './globalVar.js';
import {MakeRequest} from './ajax/ajax-fun.js';

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
      const SaveWork= ()=>{;} //soluzione temporanea
      return {displaySign, displayAppAuth, count, itemData, GumpSign, SignUp, SignIn, userName, warningSign, SaveWork}
    },
    template: `
    <div :style="{ display: displayAppAuth.display }"> 
      <p> {{userName}} </p>
      <button @click="GumpSign('y','y')">SignUp</button>
      <button @click="GumpSign('n','y')">SignIn</button>
      <button @click="SaveWork">SaveWork</button>
      <!-- The Modal SignUp-->
      <div :style="{ display: displaySign.displaySignUp }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close" @click="GumpSign('y','n')">&times;</span>
            <label>Username</label>
            <input v-model="itemData.Username"><br><br>
            <label>Password</label> 
            <input v-model="itemData.Password"><br><br>
            <div @click="SignUp">Sign Up</div>
            <p class="warning"> {{ warningSign }} </p>
        </div>
      </div>
      <!-- The Modal SignIn-->
      <div :style="{ display: displaySign.displaySignIn }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
          <span class="close" @click="GumpSign('n','n')">&times;</span>
            <label>Username</label>
            <input v-model="itemData.Username"><br><br>
            <label>Password</label> 
            <input v-model="itemData.Password"><br><br>
            <div @click="SignIn">Sign In</div>
            <p class="warning"> {{ warningSign }} </p>
        </div>
      </div>
    </div>
    `
  }
    
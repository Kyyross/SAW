import { reactive, ref } from 'vue';
import { state1, count} from './globalVar.js';
import {MakeRequest} from './ajax/ajax-fun.js';

export default {
    data() {
      const state = reactive({display:"none"});
      const itemData = reactive({Username:"", Password:""});
      const warning= ref("");
      const GumpSignIn = ()=> {}
      const GumpSignUp= (check)=> {
        warning.value="";
        itemData.Username="";
        itemData.Password="";
        state.display  = check=='y'?"block":"none";
      }
      const SignUp= ()=>{
        if(itemData.Username==""||itemData.Password==""){warning.value="Tutti i campi devono essere compilati"; return;} 
        console.log("mandata la richiesta di registrazione");
        MakeRequest("Auth",{username:itemData.Username,password:itemData.Password});
        GumpSignUp('n');
      }
      return {state, state1, count, itemData, GumpSignUp, GumpSignIn, SignUp, warning}
    },
    template: `
    <div :style="{ display: state1.display }" class="button" @click="count.val++">4: {{count.val}}</div>
    <button @click="GumpSignUp('y')">Open Authentication</button>
    <!-- The Modal -->
    <div :style="{ display: state.display }" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="GumpSignUp('n')">&times;</span>
          <label>Username</label>
          <input v-model="itemData.Username"><br><br>
          <label>Password</label> 
          <input v-model="itemData.Password"><br><br>
          <div @click="SignUp">Sign Up</div>
          <p class="warning"> {{ warning }} </p>
      </div>
    </div>
    `
  }

 /* <form>
          <label for="Username">Username</label>
          <input type="text" id="Username" name="Username"><br><br>
          <label for="Password">Password</label> 
          <input type="text" id="Password" name="Password"><br><br>
          <input type="submit" value="Sign Up">
          </form>
  */
    
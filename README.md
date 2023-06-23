# SAW
v.0.3.8

to Do:
minor:
-MODALS V
-authentication repeat password1 -> password==password1 V
-take new images and background V
-place a color for the text for categories and transition?
-color warning -> green and red in globalvar
-clear warning correctly ?
-optimize Ui Button SignIn and SignUp V
-filtri parolacce in username (10 sec)
-button show/hide characters in password V
-sostituire prompt con modal per rem categ and rem trans (10 sec)
major:
-fix SaveWork (!!!)
-(optional)implement firebase(database), so fix operations restful. (!!!!!)
-optmize lighthouse (in corso)

Done:

-to implement notification when app is opened. (DONE)
-update operations restful in according with api.txt (DONE)
-to implement log in forced when try to access the apps. (DONE)
-to implement Sign-out. (DONE)
-to implement caching (DONE)
-implement file config to progressive app. (DONE)
-...check the conditions for Restful app. (DONE)
-put style in date (DONE)
-add delete note (DONE)
-make a view for the state. (DONE)

not to Do:
-foreach operation front-end make a http request. (notDONE! YEAH)

plane:

modal color picker:
  tabella di quadratini colorati, cliccandone uno mi restituisce il codice del colore

modal icon picker:
  tabella di quadratini con img l'icona, cliccandone uno mi restituisce l'immagine associata. -> ?


Changed:

<!-- <button @click="SaveWork">SaveWork</button>
    <div :style="{ display: displayButtonSign.SignIn }">
    <p class="warning"> {{ warningSign }} </p> -->

const GumpSign= (newAccount, check)=> {
        warningSign.value="";
        itemData.Username="";
        itemData.Password="";
        if(newAccount=='y')displaySign.displaySignUp  = check=='y'?"block":"none";
        else displaySign.displaySignIn  = check=='y'?"block":"none";
}

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
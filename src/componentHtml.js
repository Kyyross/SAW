// HTML FOR SERVER
const html_=
`<!DOCTYPE html><html><head><title>Vue SSR Example</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"}}</script><script type="module" src="/src/client.js"></script><script type="module">
import styles from './src/mycss.css' assert { type: "css" };
document.adoptedStyleSheets = [styles];
</script></head><body><div id="app0">`;
const html1=`</div><div id="app1">`;
const html2=`</div><div id="app2">`;
const _html=`</div></body></html>`;

//HTML FOR componentHtml
const componentNotes_Html=`
<div :style="{ display: state0.display }">
  <!-- The Modal -->
  <div :style="{ display: state.display }" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close"  @click="Close">&times;</span>
      <p>Some itemData in the Modal..</p>
      <input v-model="itemData.title" placeholder="Note title">
      <input v-model="itemData.tag" placeholder="Note tag">
      <div @click="Debugg">debugg</div>
      <div @click="Confirm">add note</div>
      <p class="warning">{{ warning }}</p>
    </div>
  </div>
  <div class="areaNote">
    <button @click="Open">Open Modal</button>
    <button @click="Debugg">debugg</button>
    <div class="listaNote">
      <li v-for="item in arrayOrdered">
        <div @click="Show(item.title)"> {{ item.title }} - {{ item.lastaccess }}</div>
      </li>
    </div>
  </div>
  <div class="contenutoNote">
    <textarea v-model="itemData.title" :disabled="isDisabled" placeholder="Title"></textarea>
    <br>
    <textarea v-model="itemData.text" :disabled="isDisabled" placeholder="Text"></textarea>
  </div>
</div>
`;

const componentAuthentication_Html=`
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
`;

export {html_ , _html, html1, html2, componentNotes_Html, componentAuthentication_Html}



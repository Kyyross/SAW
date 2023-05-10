// HTML FOR SERVER
const html_=
`<!DOCTYPE html><html lang="en"><head><title>Vue SSR Example</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js", "uuid": "https://jspm.dev/uuid"}}</script><script type="module" src="/src/client.js"></script>
<link rel="stylesheet" a href="./src/mycss.css">
<link rel="manifest" type="application/manifest+json" a href="PWA.webmanifest">
<link rel="icon" type="image/x-icon" href="/src/icons/favicon.ico" />
<meta name="description" content="Use this free PWA to manage your expenses">
</head><body>
<div class="container-page">
<!-- Sidebar-->
<div class="navbar-side">
    <div class="sidebar-heading">Start</div>
    <div class="list-group">
        <a href="#!">Dashboard</a>
        <a href="#!">Shortcuts</a>
        <a href="#!">Overview</a>
        <a href="#!">Events</a>
        <a href="#!">Profile</a>
        <a href="#!">Status</a>
    </div>
</div>
<div class="container-main"><div id="app0">`;
const html1=`</div><div id="app1">`;
const html2=`</div><div id="app2">`;
const html3=`</div><div id="app3">`;
const _html=`</div></div></div></body></html>`;

//HTML FOR componentHtml
const componentNotes_Html=`
<div :style="{ display: displayAppNotes.display }">
  <!-- The Modal -->
  <div :style="{ display: state.display }" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close"  @click="Close">&times;</span>
      <p>Add your Note!</p>
      <input v-model="itemData.title" placeholder="Note title">
      <input v-model="itemData.tag" placeholder="Note tag">
      <div @click="Debugg">debug x develouper</div>
      <div @click="Confirm"><button>add note</button></div>
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

const componentMenu_Html=`
<!-- Top navigation-->
<div class="navbar">
  <div class="navbar-item" :style="{ display: displayUsername.display }"><p>{{userName}}</p></div>
  <div style="display: fixed" class="navbar-item" role="button" @click="Open1"><p>Login</p></div>
  <div class="dropdown"> 
      <div class="navbar-item"><p>Your Apps</p></div>
      <div class="dropdown-content">
        <ul class="list-group">
          <li><div style="display: fixed" class="navitem-btn" role="button" @click="Open0">Notes</div></li>
          <li><div style="display: fixed" class="navitem-btn" role="button" @click="Open2">Expense Management</div></li>
        </ul>
      </div>
  </div>
</div>
<!-- Page content-->
    <h1 class="mt-4">Let's Go</h1>
`

const componentAuthentication_Html=`
<div :style="{ display: displayAppAuth.display }"> 
  <p> {{userName}} </p>
  <p class="warning"> {{ warningSign }} </p>
  <div :style="{ display: displayButtonSign.SignIn }">
  <button @click="GumpSign('y','y')">Sign Up</button>
  <button @click="GumpSign('n','y')">Sign In</button>
  </div>
  <div :style="{ display: displayButtonSign.SignOut }">
  <button @click="SignOut">Sign Out</button>
  </div>
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

export {html_ , _html, html1, html2, html3, componentMenu_Html,componentNotes_Html, componentAuthentication_Html}



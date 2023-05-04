// HTML FOR SERVER
const html_=
`<!DOCTYPE html><html><head><title>Vue SSR Example</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js", "uuid": "https://jspm.dev/uuid"}}</script><script type="module" src="/src/client.js"></script>
<!-- <script type="module">
import styles from './src/styles.css' assert { type: "css" };
document.adoptedStyleSheets = [styles];
</script> -->
<link rel="stylesheet" a href="./src/styles.css">
<link rel="manifest" type="application/manifest+json" a href="PWA.webmanifest">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script></head><body>
<div class="d-flex" id="wrapper">
<!-- Sidebar-->
<div class="border-end bg-white" id="sidebar-wrapper">
    <div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
    <div class="list-group list-group-flush">
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Shortcuts</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Overview</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
    </div>
</div>
<div id="page-content-wrapper"><div id="app0">`;
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
<nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container-fluid">
        <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
                <li class="nav-item active"><a class="nav-link">{{userName}}</a></li>
                <li class="nav-item"><a class="nav-link"><div style="display: fixed" class="button" @click="Open1" role="button">Login</div></a></li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Your Apps</a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item"><div style="display: fixed" class="button" role="button" @click="Open0">Notes</div></a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item"><div style="display: fixed" class="button" role="button" @click="Open2">Expense Management</div></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!-- Page content-->
<div class="container-fluid">
    <h1 class="mt-4">Let's Go</h1>
</div>
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



// HTML FOR SERVER (SSR)
const html_=
`<!DOCTYPE html><html lang="en"><head><title>MySawProject</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta>
<script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js", "uuid": "https://jspm.dev/uuid"}}</script>
<script type="module" src="/src/client.js"></script>
<link rel="stylesheet" a href="./src/mycss.css">
<link rel="manifest" type="application/manifest+json" a href="PWA.webmanifest">
<link rel="icon" type="image/x-icon" href="/src/icons/favicon.ico" />
<meta name="description" content="Use this free PWA to manage your expenses">
</head><body>
<div class="container-page">
<div class="container-main"><div id="app0">`;
const html1=`</div><div id="app1">`;
const html2=`</div><div id="app2">`;
const html3=`</div><div id="app3">`;
const _html=`</div></div></div></body></html>`;

//HTML FOR TEMPLATE: app components
const componentNotes_Html=`
<div :style="{ display: displayAppNotes.display }">
  <!-- The Modal -->
  <div :style="{ display: state.display }" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close"  @click="Close">&times;</span>
      <p>Add your Note!</p>
      <input v-model="itemData_Nota.value.title" maxlength="40" placeholder="Note title">
      <input v-model="itemData_Nota.value.tag" maxlength="10" placeholder="Note tag">
      <div @click="Debugg">debug x develouper</div>
      <div @click="Confirm"><button>add note</button></div>
      <p class="warning">{{ warning }}</p>
    </div>
  </div>
  <div class="areaNote">
    <div class="grid-listanote">
      <button @click="Open"><img src="/src/img/piu.png"></button>
      <button @click="Debugg">debugg</button>
      <div class="listaNote">
        <li v-for="item in arrayOrdered">
          <div @click="Show(item.title)"> {{ item.title }} - {{ item.lastaccess }}</div>
        </li>
      </div>
    </div>
  </div>
  <div class="contenutoNote">
    <textarea class="titleNoteCon" v-model="itemData_Nota.value.title" maxlength="40" :disabled="isDisabled" placeholder="Title"></textarea>
    <br>
    <textarea class="textNoteCon" v-model="itemData_Nota.value.text" :disabled="isDisabled" placeholder="Text"></textarea>
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

const subComponentCategory_Html=`
<div :style="{ display: modalCategState.display }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseAddCategGump">&times;</span>
            <input v-model="itemData.value.nCateg" placeholder="Nome Categoria">
            <input v-model="itemData.value.nIcon" placeholder="work in progress">
            <div @click="AddCateg">Confirm Categories</div>
            <p class="warning">{{ warning }}</p>
        </div>
  </div>
<div class="Container-Spese" :style="{ display: displayAppSpese.containerSpese }">
  <div class="area-cmd">
    <button @click="OpenAddCategGump">Add Categories</button>
    <button @click="debug">DebugPrinf</button>
  </div>
  <div class="area-categorie">
    <li v-for="item in categories.value">
    <div class="dropdown-categ-actions"> 
      <div class="categ-actions-item"><p>{{item.nCateg}}</p><p>{{ item.codIcona }}</p></div>
      <div class="dropdown-categ-actions-content">
        <ul class="list-group-categ-action">
          <li><div class="categ-action-item" role="button" @click="OpenAddTransitionGump(item.nCateg,item.codIcona)">Add Transition</div></li>
          <li><div class="categ-action-item" role="button" @click="ModCateg(item.nCateg)">Mod Category</div></li>
          <li><div class="categ-action-item" role="button" @click="RemCateg(item.nCateg)">Rem Category</div></li>
          <li><div class="categ-action-item" role="button" @click="MergeCateg(item.nCateg)">Merge Category</div></li>
        </ul>  
      </div>
    </div>
    </li>
  </div>
</div>`;

const subComponentTransition_Html=`
<div :style="{ display: modalTransitionState.display }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseAddTransitionGump">&times;</span>
            <p>{{itemData.value.nCateg}} {{itemData.value.nIcon}}</p>
            <input v-model="itemData.value.valueTransition" placeholder="Valore">
            <input v-model="itemData.value.noteTransition" placeholder="Nota">
            <label class="label-date">Data</label>
            <input type="date" v-model="itemData.value.dateTransition" class="input-date">
            <div @click="AddTransition">Confirm Transition</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalTransitionState.mod }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseModTransitionGump">&times;</span>
            <p>{{itemData.value.nCateg}} {{itemData.value.nIcon}}</p>
            <input v-model="itemData.value.valueTransition" placeholder="Valore">
            <input v-model="itemData.value.noteTransition" placeholder="Nota">
            <label class="label-date">Data</label>
            <input type="date" v-model="itemData.value.dateTransition" class="input-date">
            <div @click="ModTransition">Confirm Transition</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div class="Container-Transitions" :style="{ display: displayAppSpese.containerTransitions }">
  <div class="List-Transitions">
  <li v-for="item in arrayTransitions">
    <div class="dropdown-categ-actions"> 
      <div class="categ-actions-item"><p>{{item[1]}}</p><p>{{item[2]}}</p><p>{{item[3]}}</p></div>
      <div class="dropdown-categ-actions-content">
        <ul class="list-group-categ-action">
          <li><div class="categ-action-item" role="button" @click="RemTransition(item[0])">Delete Transition</div></li>
          <li><div class="categ-action-item" role="button" @click="OpenModTransitionGump(item[0])">Mod Transition</div></li>
        </ul>  
      </div>
    </div>  
  </li>
  </div>
</div>`;

const subComponentTools_Html=`
  <div class="Container-Tools" :style="{ display: displayAppSpese.containerTools }">
    <div role="button" @click="ConfirmDate">debuggatools</div>
    <br>
    <div class="list-graph-date">
      <!--<div class="list-graph-week">
        <span v-for="day in objView.week.categ">
          <li v-for="(categ,ncateg) in day.categ">
            <div>{{ncateg}} - {{categ.sum}} </div>
          </li>
        </span>
      </div>-->
      <div class="list-graph-Month">
        <span v-for="day in objView.month.days">
          <li v-for="(categ,ncateg) in day.categ">
            <div>{{ncateg}} - {{categ.sum}} </div>
          </li>
        </span>
      </div>
      <div class="list-graph-Year">
        <span v-for="months in objView.year.months">
          <li v-for="(categ,ncateg) in months.categ">
            <div>{{ncateg}} - {{categ.sum}} </div>
          </li>
        </span>
      </div>  
    </div>
    <div class="list-graph-sum">
      <li class="item-graph" v-for="item in objView.h_bar">
        <div class="graph-ncateg">{{item["nCateg"]}}</div>
        <div class="graph-sum" :style='{background: item["color"], width: objGraphView.percent(item["sum"],objGraphView.sum)}'></div>
        <div>{{item["sum"]}}</div>
      </li>
    </div>
  </div>
`;

const componentSpese_Html=`
<div class="componentSpese" :style="{ display: displayAppSpese.display }"> 
<!-- Sidebar-->
<div id="navbar-side" class="navbar-side">
  <div class="sidebar-heading">Menù</div>
  <div class="list-group">
      <li><div role="button" @click="OpenCategory">Categories</div></li>
      <li><div role="button" @click="OpenTransitions">Transitions</div></li>
      <li><div role="button" @click="OpenAnalyticsTools">Analytics Tools</div></li>
  </div>
</div>`+subComponentCategory_Html+subComponentTransition_Html+subComponentTools_Html+`</div>`


export {html_ , _html, html1, html2, html3, componentMenu_Html,componentNotes_Html, componentAuthentication_Html, componentSpese_Html}



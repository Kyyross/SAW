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
      <div role="button" @click="Confirm"><button>add note</button></div>
      <p class="warning">{{ warning }}</p>
    </div>
  </div>
  <div class="areaNote">
    <div class="grid-listanote">
      <button @click="Open"><img src="/src/img/piu.png"></button>
      <button @click="deleteNotes">delete notes</button>
      <button @click="Debugg">debugg</button>
      <div class="listaNote">
        <li v-for="item in arrayOrdered">
          <div @click="Show(item.title)"> {{ item.title }} - {{ item.lastaccess }}</div>
          <input type="checkbox" v-model="item.checked" v-bind:id="'listanote'+item.title" @click="selectNote(item.title,!item.checked)">
            <label v-bind:for="'listanote'+item.title"></label>
          <!-- <div @click="selectNotes(item.title)">select</div>
          <div @click="deselectNotes(item.title)">deselect</div> -->
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
  <div class="navbar-item" :style="{ display: userName.display }"><p>{{userName.value}}</p></div>
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
  <p> {{userName.value}} </p>
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
            <div role="button" @click="AddTransition">Confirm Transition</div>
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
            <div role="button" @click="ModTransition">Confirm Transition</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div class="Container-Transitions" :style="{ display: displayAppSpese.containerTransitions }">
  <div class="List-Transitions">
  <li v-for="item in arrayTransitions">
    <div class="dropdown-categ-actions"> 
      <div class="categ-actions-item"><p>{{GetCateg(item[0]).nCateg}}</p><p>{{item[1]}}</p><p>{{item[2]}}</p><p>{{item[3]}}</p></div>
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
    <div :style="{ display: itemData_Tools.toolsGump }" class="modal">
    <!-- Modal content -->
      <div class="modal-content">
        <span class="close"  @click="CloseToolsGump">&times;</span>
        <label>Choose a type of date:</label>
          <select class="type-date-gump" v-model="itemData_Tools.type">
            <option value="alltime" selected>Alltime</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        <input type="date" v-model="itemData_Tools.value" class="input-date" :style="{ display: itemData_Tools.dBool }" />
        <input type="month" v-model="itemData_Tools.value" class="input-date" :style="{ display: itemData_Tools.mBool }" />
        <input type="number" v-model="itemData_Tools.value" class="input-date" :style="{ display: itemData_Tools.yBool }" />  
        <div role="button" @click="ConfirmDate">Confirm</div>
        <p class="warning">{{ warning }}</p>
      </div>
    </div>
    <div role="button" @click="OpenToolsGump">Study graphs</div>
    <br>
    <div class="list-graph-date" :style="{ display: itemData_Tools.tabBool }">
      <div class="list-graph-tab" :style="{ display: itemData_Tools.dBool }">
        <div class="graph-column" v-for="day in objView.week.arr">
          <div class="graph-label">{{objGraphView.tras(day.index)}}</div>
          <div class="graph-column-value">
            <div class="graph-column-bar" v-for="(categ,ncateg) in day.value.categ" :style='{background: categ.metadati["color"], height: objGraphView.percent(categ["sum"],objView.week.max)}'></div>
          </div>
        </div>
      </div> <!-- Month -->
      <div class="list-graph-tab" :style="{ display: itemData_Tools.mBool }">
        <div class="graph-column" v-for="(day,index) in objView.month.days">
          <div class="graph-label">{{index}}</div>
          <div class="graph-column-value">
            <div class="graph-column-bar" v-for="(categ,ncateg) in day.categ" :style='{background: categ.metadati["color"], height: objGraphView.percent(categ["sum"],objView.month.sum)}'></div>
          </div>
        </div>
      </div> <!-- Year -->
      <div class="list-graph-tab" :style="{ display: itemData_Tools.yBool }">
        <div class="graph-column" v-for="(months,index) in objView.year.months">
          <div class="graph-label">{{index}}</div>
          <div class="graph-column-value">
            <div class="graph-column-bar" v-for="(categ,ncateg) in months.categ" :style='{background: categ.metadati["color"], height: objGraphView.percent(categ["sum"], objView.year.max)}'></div>
          </div>
        </div>
      </div> <!-- AllTime -->
      <div class="list-graph-tab" :style="{ display: itemData_Tools.aBool }">
        <div class="graph-column" v-for="(years,index) in objView.all.years">
          <div class="graph-label">{{index}}</div>
          <div class="graph-column-value">
            <div class="graph-column-bar" v-for="(categ,ncateg) in years.categ" :style='{background: categ.metadati["color"], height: objGraphView.percent(categ["sum"],objView.all.max)}'></div>
          </div>
        </div>
      </div>
    </div> <!-- Horizontal Graph -->
    <div class="list-graph-sum" :style="{ display: itemData_Tools.sumBool }">
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



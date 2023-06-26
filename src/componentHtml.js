// HTML FOR SERVER (SSR)
const html_=
`<!DOCTYPE html><html lang="en"><head><title>MySawProject</title><meta name="viewport" content="width=device-width, initial-scale=1" name="theme-color"></meta>
<script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js", "firebase/auth": "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js", "firebase/app":"https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js", "firebase/firestore":"https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js" ,"uuid": "https://jspm.dev/uuid"}}</script>
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
const _html=`</div></div></div><div class="footer"><p>Developed by Edoardo Barigliano</p><div>Icon made by UIcons from <a href="www.flaticon.com"> www.flaticon.com</a></div></div></body></html>`;

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
      <div  @click="Confirm"><button>add note</button></div>
      <p class="warning">{{ warning }}</p>
    </div>
  </div>
  <div class="areaNote">
    <div class="grid-listanote">
      <button @click="Open"><img src="/src/img/piu.png" alt="add"></button>
      <button @click="deleteNotes"><img src="/src/img/delete.png" alt="del"></button>
      <!-- <button @click="Debugg">debugg</button> -->
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
    <div class="contenutoNote">
      <textarea class="titleNoteCon" v-model="itemData_Nota.value.title" maxlength="40" :disabled="isDisabled" placeholder="Title" @blur="updateNote"></textarea>
      <br>
      <textarea class="textNoteCon" v-model="itemData_Nota.value.text" :disabled="isDisabled" placeholder="Text" @blur="updateNote"></textarea>
    </div>
  </div>
</div>
`;

const componentMenu_Html=`
<!-- Top navigation-->
<div class="navbar">  
  <div class="nav-homeEitems">  
    <div class="nav-home">
      <div class="navbar-item" @click="Open0"> <img src="/src/img/home.png" alt="Home"/> </div>
    </div>
    <div class="nav-items">
      <div class="dropdown">
        <div class="navbar-item" :style="{ display: userName.display }"><p class="nav-bar-userName">{{userName.value}}</p></div>
        <div class="dropdown-content">
          <ul :style="{ display: displayButtonSign.SignOut }" class="list-group">
            <li><div style="display: fixed" class="navitem-btn"  @click="SaveWork">SaveWork</div></li>
            <li><div style="display: fixed" class="navitem-btn"  @click="SignOut">Log Out</div></li>
          </ul>
        </div>
      </div>  
      <div class="dropdown"> 
        <div style="display: fixed" class="navbar-item"><p>Login</p></div>
        <div class="dropdown-content">
          <ul class="list-group" :style="{ display: displayButtonSign.SignIn }">
            <li><div style="display: fixed" class="navitem-btn"  @click="Open2(false)">Sign Up</div></li>
            <li><div style="display: fixed" class="navitem-btn"  @click="Open2(true)">Sign In</div></li>
          </ul>
        </div>
      </div>
      <div class="dropdown"> 
        <div class="navbar-item"><p>Your Apps</p></div>
        <div class="dropdown-content">
          <ul class="list-group">
            <li><div style="display: fixed" class="navitem-btn"  @click="Open1">Notes</div></li>
            <li><div style="display: fixed" class="navitem-btn"  @click="Open3">Expense Management</div></li>
          </ul>
        </div>
      </div>
    </div>
  </div>    
</div>
<!-- Page content-->
    <h1 class="titlepage">{{titlePage.value}}</h1>
    <div class="Home-Page" :style="{ display: titlePage.homeB }">
      <h2>Hello everybody,</h2>
      <p>thank you for visiting us. This is a experimental Pwa (progressive web app), you can register and try it freely. 
      If you think this app is interesting, i would be very glad in the case you will leave a review. 
      Thanks again, best regards.</p>
    </div>
`

const componentAuthentication_Html=`
<div class="container-auth" :style="{ display: displayAppAuth.display }"> 
      <div class="area-auth" :style="{ display: displayButtonSign.SignIn }">  
        <label class="label-username">Username</label>
        <input class="input-username" maxlength="320" v-model="itemData_Auth.Username"><br><br>
        <label class="label-password">Password</label> 
        <input class="input-password" type="password" maxlength="15" v-model="itemData_Auth.Password"><br><br>
        <label class="label-password" :style="{ display: displayButtonSign.cmdSignUp }">Confirm password</label> 
        <input class="input-password" type="password" maxlength="15" v-model="itemData_Auth.cPassword" :style="{ display: displayButtonSign.cmdSignUp }"><br><br>
        <div class="btn-sign" :style="{ display: displayButtonSign.cmdSignUp }" @click="SignUp">Sign up</div>
        <div class="btn-sign" :style="{ display: displayButtonSign.cmdSignIn }" @click="SignIn">Sign in</div>
        <div class="btn-sign" :style="{ display: displayButtonSign.cmdSignIn }" @click="SignInGoogle">Sign in with Google</div>
      </div>
      <div class="auth-log" v-show="warningSign !== ''"> <p class="warning"> {{ warningSign }} </p> </div>
  <!-- <button @click="GumpSign('y','y')">Sign Up</button>
        <button @click="GumpSign('n','y')">Sign In</button> -->
</div>
`;

const subComponentCategory_Html=`
<div :style="{ display: modalCategState.add }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseCategGump(0)">&times;</span>
            <input class="input-nCateg" maxlength="30" v-model="itemData.value.nCateg" placeholder="Nome Categoria">
            <div class="div-icon"  @click="OpenCategGump('iconPicker')">Icona:</div>
            <img class="img-icon" v-if="itemData.value.nIcon!=''" :src="LoadImg(itemData.value.nIcon)" alt=""/> 
            <div class="div-color"  @click="OpenCategGump('genericColorPicker')">Colore:</div>
            <div class="color-pick" v-if="itemData.value.color!=''" :style="{ background: itemData.value.color }" />
            <div class="btn-modal" @click="AddCateg">Confirm Categories</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalCategState.mod }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseCategGump(0)">&times;</span>
            <h2>{{itemData.value.nCateg}}</h2>
            <input class="input-nCateg" maxlength="30" v-model="itemData.value.rename" placeholder="Rename Category">
            <div class="div-icon"  @click="OpenCategGump('iconPicker')">Icona:</div>
            <img class="img-icon" v-if="itemData.value.nIcon!=''" :src="LoadImg(itemData.value.nIcon)" alt=""/> 
            <div class="div-color"  @click="OpenCategGump('genericColorPicker')">Colore:</div>
            <div class="color-pick" v-if="itemData.value.color!=''" :style="{ background: itemData.value.color }" />
            <div class="btn-modal" @click="ModCateg">Confirm Categories</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalCategState.del }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseCategGump(0)">&times;</span>
            <div class="modal-heading">
              <h2 class="modal-nCateg">{{itemData.value.nCateg}}</h2> 
              <div class="modal-icon" :style="{ background: itemData.value.color }"><img class="img-icon" :src="LoadImg(itemData.value.nIcon)" alt=""/></div>
            </div>
            <p>sicuro di volerla rimuovere? così eliminerai anche le transazioni di questa categoria registrate finora"</p>
            <div class="btn-modal" @click="RemCateg(itemData.value.nCateg)">Confirm</div>
        </div>
</div>
<div :style="{ display: modalCategState.merge }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseCategGump(0)">&times;</span>
            <div class="modal-heading">
              <h2 class="modal-nCateg">{{itemData.value.nCateg}}</h2> 
              <div class="modal-icon" :style="{ background: itemData.value.color }"><img class="img-icon" :src="LoadImg(itemData.value.nIcon)" alt=""/></div>
            </div>
            <p>Inserire la categoria con cui fare il merge</p>
            <input class="input-nCateg" maxlength="30" v-model="itemData.value.rename" placeholder="Nome Categoria">
            <div class="btn-modal" @click="MergeCateg()">Confirm Categories</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalCategState.iconPicker }" class="modalPicker">
        <!-- Modal content -->
        <div class="modal-content-picker">
            <span class="close"  @click="CloseCategGump(1)">&times;</span>
            <div class="item-pick-grid">
              <div v-for="(item,index) in images">
                <div  class="item-pick" @click="PickIcon(index)"><img class="img-icon" :src="LoadImg(index)" alt=""/></div>
              </div>
            </div>
        </div>
</div>
<div :style="{ display: modalCategState.genericColorPicker }" class="modalPicker">
        <!-- Modal content -->
        <div class="modal-content-picker">
            <span class="close"  @click="CloseCategGump(1)">&times;</span>
            <div class="item-pick-grid">
              <div v-for="(item,index) in matColors">
                <div  class="color-pick" @click="OpenCategGump('colorPicker',item)"><div class="color-pick" :style="{ background: index.toString() }" /></div>
              </div>
            </div>
        </div>
</div>
<div :style="{ display: modalCategState.colorPicker }" class="modalPicker-2">
        <!-- Modal content -->
        <div class="modal-content-picker">
            <span class="close"  @click="CloseCategGump(2)">&times;</span>
            <div class="item-pick-grid">
              <div v-for="(item,index) in colors.value">
                <div  class="color-pick" @click="PickColor(index)"><div class="color-pick" :style="{ background: item }" /></div>
              </div>
            </div>
        </div>
</div>
<div class="Container-Spese" :style="{ display: displayAppSpese.containerSpese }">
  <!-- <div class="area-cmd">
    <button @click="OpenCategGump('add')"><img src="/src/img/piu.png" alt="add"></button>
    <button @click="debug">DebugPrinf</button>
  </div> -->
  <div class="area-categorie">
    <li v-for="item in categories.value">
    <div class="dropdown-categ-actions"> 
      <div class="categ-actions-item" :style="{ background: item.color }"><h2>{{item.nCateg}}</h2><img class="img-icon" :src="LoadImg(item.codIcona)" alt="" /></div>
      <div class="dropdown-categ-actions-content">
        <ul class="list-group-categ-action">
          <li><div class="categ-action-item"  @click="OpenAddTransitionGump(item.nCateg,item.codIcona,item.color)">Add Transition</div></li>
          <li><div class="categ-action-item"  @click="OpenCategGump('mod',item.nCateg,item.codIcona,item.color)">Mod Category</div></li>
          <li><div class="categ-action-item"  @click="OpenCategGump('del',item.nCateg,item.codIcona,item.color)">Del Category</div></li>
          <li><div class="categ-action-item"  @click="OpenCategGump('merge',item.nCateg,item.codIcona,item.color)">Merge Category</div></li>
        </ul>  
      </div>
    </div>
    </li>
    <li class="li-add-categ"><button @click="OpenCategGump('add')"><img src="/src/img/piu.png" alt="" ></button></li>
  </div>
</div>`;

const subComponentTransition_Html=`
<div :style="{ display: modalTransitionState.add }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseTransitionGump">&times;</span>
            <div class="modal-heading">
              <h2 class="modal-nCateg">{{itemData.value.nCateg}}</h2> 
              <div class="modal-icon" :style="{ background: itemData.value.color }"><img class="img-icon" :src="LoadImg(itemData.value.nIcon)" alt="" /></div>
            </div>
            <input class="input-valuetrans" v-model="itemData.value.valueTransition" placeholder="Valore">
            <input class="input-notatrans" v-model="itemData.value.noteTransition" placeholder="Nota">
            <label class="label-date">Data</label>
            <input type="date" v-model="itemData.value.dateTransition" class="input-date">
            <div class="btn-modal"  @click="AddTransition">Confirm Transition</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalTransitionState.mod }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseTransitionGump">&times;</span>
            <div class="modal-heading">
              <h2 class="modal-nCateg">{{itemData.value.nCateg}}</h2> 
              <div class="modal-icon" :style="{ background: itemData.value.color }"><img class="img-icon" :src="LoadImg(itemData.value.nIcon)" alt="" /></div>
            </div>
            <input class="input-nCateg" maxlength="30" v-model="itemData.value.rename" placeholder="move in category">
            <input v-model="itemData.value.valueTransition" placeholder="Valore">
            <input v-model="itemData.value.noteTransition" placeholder="Nota">
            <label class="label-date">Data</label>
            <input type="date" v-model="itemData.value.dateTransition" class="input-date">
            <div class="btn-modal"  @click="ModTransition">Confirm Transition</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div :style="{ display: modalTransitionState.del }" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close"  @click="CloseTransitionGump">&times;</span>
            <div class="modal-heading">
              <h2 class="modal-nCateg">{{itemData.value.nCateg}}</h2> 
              <div class="modal-icon" :style="{ background: itemData.value.color }"><img class="img-icon" :src="LoadImg(itemData.value.nIcon)" alt="" /></div>
            </div>
            <p>{{itemData.value.noteTransition}}</p>
            <p>{{itemData.value.valueTransition}}</p>
            <p>{{itemData.value.dateTransition}}</p>
            <p>Sei sicuro di voler eliminare questo movimento?</p>
            <div class="btn-modal"  @click="RemTransition(itemData.value.codTransition)">Confirm</div>
            <p class="warning">{{ warning }}</p>
        </div>
</div>
<div class="Container-Transitions" :style="{ display: displayAppSpese.containerTransitions }">
  <div class="list-transitions">
   <li v-for="item in arrayTransitions">
    <div class="dropdown-transition-actions">
      <div class="transition-actions-item" :style="{ background: GetCateg(item[0]).color }" ><div class="t-div-ncateg"> <div class="t-div-date"> {{item[3]}} </div> {{GetCateg(item[0]).nCateg}} </div><div class="t-div-desc">{{item[1]}}</div><div class="t-div-value">{{item[2]}}</div></div>
      <div class="dropdown-transition-actions-content">
        <ul class="list-group-categ-action">
          <li><div class="trans-action-item"  @click="OpenDelTransitionGump(item[0],item[1],item[2],item[3])">Delete Transition</div></li>
          <li><div class="trans-action-item"  @click="OpenModTransitionGump(item[0],item[1],item[2],item[3])">Mod Transition</div></li>
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
        <br>
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
        <br>
        <div class="btn-modal"  @click="ConfirmDate">Confirm</div>
        <p class="warning">{{ warning }}</p>
      </div>
    </div>
    <div class="container-btn-study">
      <div class="button-studygraphs"  @click="OpenToolsGump">Show Charts</div>
      <div class="tools-data-type" v-show="itemData_Tools.type!==''">{{itemData_Tools.type}} : {{itemData_Tools.value}}</div>
    </div>
    <br>  <!-- day/week -->
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
          <div class="graph-label">{{objGraphView.trasmonth(index)}}</div>
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
      <div class="tab-footer" :style="{ display: itemData_Tools.sumBool }"></div>
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
      <li><div  @click="OpenCategory">Categories</div></li>
      <li><div  @click="OpenTransitions">Transitions</div></li>
      <li><div  @click="OpenAnalyticsTools">Analytics Tools</div></li>
  </div>
</div>`+subComponentCategory_Html+subComponentTransition_Html+subComponentTools_Html+`</div>`


export {html_ , _html, html1, html2, html3, componentMenu_Html,componentNotes_Html, componentAuthentication_Html, componentSpese_Html}



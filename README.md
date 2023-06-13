# SAW
v.0.3.6

to Do:

-make a view for the state. (in corso)
-add delete note.
-(optional)implement firebase(database), so fix operations restful.
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

not to Do:
-foreach operation front-end make a http request. (notDONE! YEAH)

Sostituito:
    _questo_
<!-- <script type="module">
import styles from './src/styles.css' assert { type: "css" };
document.adoptedStyleSheets = [styles];
</script> -->
    _con_
<link rel="stylesheet" href="./src/styles.css">

sostituito:
    _questo_
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
<link rel="stylesheet" href="./src/styles.css">
    _con_
<link rel="stylesheet" href="./src/mycss.css">

    _questo_
/*const componentSpese_Html=`
<div class="componentSpese" :style="{ display: displayAppSpese.display }">
    <!-- The Modal -->
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
    <!-- Sidebar-->
    <div id="navbar-side" class="navbar-side">
      <div class="sidebar-heading">Menù</div>
      <div class="list-group">
          <li><div role="button" @click="OpenCategory">Categories</div></li>
          <li><div role="button" @click="OpenTransitions">Transitions</div></li>
          <li><div role="button" @click="OpenAnalyticsTools">Analytics Tools</div></li>
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
    </div>
</div>
`;*/


    _con_ subComponent_html

    (item["sum"]*100/objGraphView["sum"])
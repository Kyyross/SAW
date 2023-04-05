import { displayAppSpese, categories } from './globalVar.js';
import {Categoria} from './myclass.js';
import { reactive, ref } from 'vue';

export default{
    data(){
        const modalState = reactive({display:"none"});
        const warning = ref("");
        const itemData = reactive({nCateg:"", nIcon:""});
        var inModal=false;
        const OpenAddCategGump=()=>{ 
            inModal=true;
            ItemDataSetter("",""); 
            warning.value="";
            modalState.display="block";
          };
        const CloseAddCategGump=()=>{
            inModal=false; modalState.display="none";};
        function ItemDataSetter(categ,icona){
            itemData.nCateg=categ;
            itemData.nIcon=icona;
        }
        const AddCateg=()=>{
                var obje=new Categoria(itemData.nCateg,itemData.nIcon); 
                if(Check(obje)) return; 
                categories[obje.nCateg]=obje.nIcon;
                //temp=obje.nCateg; 
                CloseAddCategGump();
        }
        function Check(obje){
            if(obje.nCateg==""||obje.nIcon==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
            if(categories[obje.nCateg]){warning.value="esiste già una categoria con questo nome"; return true;}
            console.log(obje.nCateg);
            return false;
          }
        function debug(){
            console.log(categories);
        }
        return {itemData, modalState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, AddCateg, warning, debug}
    },
    template:`
    <div :style="{ display: displayAppSpese.display }">
        <!-- The Modal -->
        <div :style="{ display: modalState.display }" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close"  @click="CloseAddCategGump">&times;</span>
                <input v-model="itemData.nCateg" placeholder="Nome Categoria">
                <input v-model="itemData.nIcon" placeholder="work in progress">
                <div @click="AddCateg">Confirm Categories</div>
                <p class="warning">{{ warning }}</p>
            </div>
        </div>
        <button @click="OpenAddCategGump">Add Categories</button>
        <button @click="debug">Debug</button>
    </div>
    `
}
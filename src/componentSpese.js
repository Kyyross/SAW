import { displayAppSpese, categories } from './globalVar.js';
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
                var obje=new Obj(itemData.title,itemData.lastaccess); 
                if(Check(obje)) return; 
                items[obje.title]=obje;
                temp=obje.title; 
                Close();
        }
        function debug(){
            
        }
        return { modalState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, warning }
    },
    template:`
    <div :style="{ display: displayAppSpese.display }">
        <!-- The Modal -->
        <div :style="{ display: modalState.display }" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close"  @click="CloseAddCategGump">&times;</span>
                <input v-model="itemData.nCateg" placeholder="Nome Categoria">
                <input v-model="nIcon" placeholder="work in progress">
                <div @click="AddCateg">Confirm Categories</div>
                <p class="warning">{{ warning }}</p>
            </div>
        </div>
        <button @click="OpenAddCategGump">Add Categories</button>
    </div>
    `
}
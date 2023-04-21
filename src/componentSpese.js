import { displayAppSpese, categories, codContainer } from './globalVar.js';
import {Categoria} from './myclass.js';
import { reactive, ref } from 'vue';
import { v4 as uuid } from 'uuid';

export default{
    data(){
        const [modalCategState,modalTransitionState,warning]=[reactive({display:"none"}),reactive({display:"none"}),ref("")];
        const itemData = reactive({nCateg:"", nIcon:"", noteTransition:"", valueTransition:""});
        var inModal=false;
        //OPEN MODAL
        const OpenAddCategGump = () => { 
            [inModal,modalCategState.display,warning.value]=[true,"block",""];
            ItemDataSetter("","","","");
            };
        const OpenAddTransitionGump = () => { 
            [inModal,warning.value,modalTransitionState.display]=[true,"","block"];
            ItemDataSetter("","","","");
            };
        //CLOSE MODAL
        const CloseAddCategGump = () => [inModal,modalCategState.display]=[false,"none"];
        const CloseAddTransitionGump = () => [inModal,modalTransitionState.display]=[false,"none"];
        //Cleans the Html input of the Modal 
        const ItemDataSetter = (...arg) =>[itemData.nCateg, itemData.nIcon, itemData.noteTransition, itemData.valueTransition]=[...arg];
        
        const AddCateg=()=>{
                var obje=new Categoria(itemData.nCateg,itemData.nIcon); 
                if(Check(obje)) return; 
                categories[itemData.nCateg]={"codIcona":obje.nIcon,"Transitions":[]};
                CloseAddCategGump();
            }
            //DA FAR COMUNICARE STATE CON VIEW
        const RemCateg=()=>{
            let item=prompt("metti nome categoria da eliminare");
            try{
                if(categories[item]&&confirm("sicuro di volerla rimuovere? così eliminerai anche le transazioni di questa categoria registrate finora")){
                    for(let key of categories[item]["Transitions"]){
                        console.log(key[0]);
                        delete(codContainer[key[0]]);
                    }
                    delete(categories[item]);
                } 
            }catch(e){console.error("error on delete categoria"+e);}
        }
        const AddTransition=()=>{
            if(!categories[itemData.nCateg]) {warning.value="nome categoria non esistente";return;}
            if(parseFloat(itemData.valueTransition)<=0) {warning.value="Immettere un valore valido";return;}
            //check sul testo della nota, considerare di mettere controlli di sicurezza.
            try{
                //funzione che genera cod
                let codGenerated;
                do{
                    codGenerated=uuid();
                }while(codContainer[codGenerated])
                categories[itemData.nCateg]["Transitions"].push([codGenerated,itemData.noteTransition,itemData.valueTransition]); //implementare generatore cod e check su cod
                codContainer[codGenerated]=itemData.nCateg;
                CloseAddTransitionGump();
            }catch(e){console.log("error when try to add the transition"+e);}
        }
        function Check(obje){
            if(obje.nCateg==""||obje.nIcon==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
            if(categories[obje.nCateg]){warning.value="esiste già una categoria con questo nome"; return true;}
            console.log(obje.nCateg);
            return false;
          }
        function debug(){
            console.log(categories);
            console.log(codContainer);
        }
        return {itemData, modalCategState, modalTransitionState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, AddCateg, AddTransition, warning, debug, RemCateg, OpenAddTransitionGump, CloseAddTransitionGump}
    },
    template:`
    <div :style="{ display: displayAppSpese.display }">
        <!-- The Modal -->
        <div :style="{ display: modalCategState.display }" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close"  @click="CloseAddCategGump">&times;</span>
                <input v-model="itemData.nCateg" placeholder="Nome Categoria">
                <input v-model="itemData.nIcon" placeholder="work in progress">
                <div @click="AddCateg">Confirm Categories</div>
                <p class="warning">{{ warning }}</p>
            </div>
        </div>
        <div :style="{ display: modalTransitionState.display }" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close"  @click="CloseAddTransitionGump">&times;</span>
                <input v-model="itemData.nCateg" placeholder="Nome Categoria">
                <input v-model="itemData.valueTransition" placeholder="Valore">
                <input v-model="itemData.noteTransition" placeholder="Nota">
                <div @click="AddTransition">Confirm Transition</div>
                <p class="warning">{{ warning }}</p>
            </div>
        </div>
        <button @click="OpenAddCategGump">Add Categories</button>
        <button @click="OpenAddTransitionGump">Add Transition</button>
        <button @click="debug">DebugPrinf</button>
        <button @click="RemCateg">DebugRemove</button>
    </div>
    `
}
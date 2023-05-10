import { displayAppSpese, categories, codContainer } from './globalVar.js';
import { Categoria } from './myclass.js';
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
                categories.value[itemData.nCateg]={"codIcona":obje.nIcon,"Transitions":[]};
                CloseAddCategGump();
            }
            //DA FAR COMUNICARE STATE CON VIEW
        const ModCateg=()=>{
            let nameC=prompt("metti nome categoria da modificare");
            try{
                if(categories[nameC]){
                    let rename=prompt("come deve essere rinominata?");
                    for(let key of categories[nameC]["Transitions"]){
                        console.log(key[0]);
                        codContainer[key[0]]=rename;
                    }
                    categories.value[rename]=categories.value[nameC];
                    delete(categories.value[nameC]);
                } 
            }catch(e){console.error("error on delete categoria"+e);}
        }
        const RemCateg=()=>{
            let item=prompt("metti nome categoria da eliminare");
            try{
                if(categories.value[item]&&confirm("sicuro di volerla rimuovere? così eliminerai anche le transazioni di questa categoria registrate finora")){
                    for(let key of categories.value[item]["Transitions"]){
                        console.log(key[0]);
                        delete(codContainer[key[0]]);
                    }
                    delete(categories.value[item]);
                } 
            }catch(e){console.error("error on delete categoria"+e);}
        }
        const MergeCateg=()=>{
            try{
                let categ1=prompt("inserire la categoria slave da unire");
                let categ2=prompt("inserire la categoria master");
                for(let key of categories.value[categ1]["Transitions"]){
                    codContainer[key[0]]=categ2;
                    categories.value[categ2]["Transitions"].push(key);
                }
                delete(categories.value[categ1]);
            }catch(e){console.error(e);}
        }
        const AddTransition=()=>{
            if(!categories.value[itemData.nCateg]) {warning.value="nome categoria non esistente";return;}
            if(parseFloat(itemData.valueTransition)<=0) {warning.value="Immettere un valore valido";return;}
            //check sul testo della nota, considerare di mettere controlli di sicurezza.
            try{
                //funzione che genera cod
                let codGenerated;
                do{
                    codGenerated=uuid();
                }while(codContainer[codGenerated])
                categories.value[itemData.nCateg]["Transitions"].push([codGenerated,itemData.noteTransition,itemData.valueTransition]); //implementare generatore cod e check su cod
                codContainer[codGenerated]=itemData.nCateg;
                CloseAddTransitionGump();
            }catch(e){console.log("error when try to add the transition"+e);}
        }
        const RemTransition=()=>{
            try{
                let namecateg=prompt("immettere nome della categoria dove andare ad eliminare la transizione");
                let coditem=prompt("immettere codice transizione da eliminare");
                if(!codContainer[coditem]) throw new Error("Codice oggetto non presente nel container");
                delete(codContainer[coditem]);
                categories.value[namecateg]["Transitions"]=categories.value[namecateg]["Transitions"].filter((element)=>element[0]!=coditem);
            }catch(e){console.error("error when try to delete transition: "+e);}
        }
        const ModTransition=()=>{
            try{
                let namecateg=prompt("immettere nome della categoria dove andare a modificare la transizione");
                let coditem=prompt("immettere codice transizione da modificare");
                let value=prompt("nuovo valore della transizione");
                for(let item in categories.value[namecateg]["Transitions"]){
                    if(categories.value[namecateg]["Transitions"][item][0]==coditem){
                        console.log("entro?");
                        categories.value[namecateg]["Transitions"][item][2]=value; 
                        break;
                    }
                }
            }catch(e){console.error("error when try to modify the transition: "+coditem+" "+e);}
        }
        function Check(obje){
            if(obje.nCateg==""||obje.nIcon==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
            if(categories.value[obje.nCateg]){warning.value="esiste già una categoria con questo nome"; return true;}
            console.log(obje.nCateg);
            return false;
          }
        function debug(item){
            console.log(item);
            console.log(categories.value);
            console.log(codContainer);
        }
        return {categories,itemData, modalCategState, modalTransitionState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, AddCateg, ModCateg, MergeCateg, AddTransition, RemTransition,ModTransition, warning, debug, RemCateg, OpenAddTransitionGump, CloseAddTransitionGump}
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
        <div class="Container-Spese">
            <div class="area-categorie">
                <li v-for="item in categories.value">
                    <div @click="debug(item)"> {{ item.codIcona }}</div>
                </li>
            </div>
        </div>
        <button @click="OpenAddCategGump">Add Categories</button>
        <button @click="OpenAddTransitionGump">Add Transition</button>
        <button @click="debug">DebugPrinf</button>
        <button @click="RemCateg">DebugRemoveCateg</button>
        <button @click="ModCateg">DebugModCateg</button>
        <button @click="RemTransition">DebugRemTransition</button>
        <button @click="ModTransition">DebugModTransition</button>
        <button @click="MergeCateg">DebugMergeCateg</button>
    </div>
    `
}
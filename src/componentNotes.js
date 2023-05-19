import { reactive, watch, computed } from 'vue';
import {displayAppNotes, items, itemData_Nota, inModal, warning} from './globalVar.js';
import { Nota } from './myclass.js';
import { sortObject } from './mymacros/macro-functions.js';
import { componentNotes_Html } from './componentHtml.js';

export default {
    data(){
        //VARs
        const state = reactive({display:"none"});
        //REACTIVE FUNCTIONs
        const Open=()=>{ 
          inModal.bool=true;
          ItemDataSetter("","","",new Date().toLocaleString()) 
          warning.value=""; 
          state.display="block";
        };

        const Close=()=>{ inModal.bool=false; ItemDataSetter(); state.display="none";};

        const Confirm = ()=>{
            var obje=new Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess); 
            if(Check(obje)) return; 
            items.value[obje.title]=obje;
            inModal.temp=obje.title; 
            Close();
        };

        const Show = (title)=>{
          inModal.temp=title;
          itemData_Nota.disabled=false;
          ItemDataSetter(title,items.value[title]["tag"],items.value[title]["text"],items.value[title]["lastaccess"]);
        }

        function ItemDataSetter(title="", tag="", text="", lastaccess=-1){
          itemData_Nota.value.text=text;
          itemData_Nota.value.title=title;
          itemData_Nota.value.tag=tag;
          if(lastaccess!=-1)itemData_Nota.value.lastaccess=lastaccess;
        }

        const isDisabled=computed(()=>itemData_Nota.disabled)
        const arrayOrdered=computed(()=>sortObject(items,"lastaccess"))

        const Debugg=()=>{console.log(items);}

        function Check(obje){
          if(obje.title==""||obje.tag==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
          if(items.value[obje.title]){warning.value="esiste già una nota con questo titolo"; return true;}
          console.log(obje.title);
          return false;
        }
        //WATCHERs
        watch(()=>itemData_Nota.value.text,(dataNew)=>{ 
          if(inModal.bool)return;
          itemData_Nota.value.text=dataNew;
          itemData_Nota.value.lastaccess=new Date().toLocaleString();
          var obje=new Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess,dataNew);
          items.value[obje.title]=obje;
         });

        watch(()=>itemData_Nota.value.title,dataNew=>{
          if(inModal.bool||dataNew=="")return;
          itemData_Nota.value.title=dataNew;
          itemData_Nota.value.lastaccess=new Date().toLocaleString();
          var obje=new Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess,itemData_Nota.value.text);
          if(items.value[obje.title]) return;
          delete(items.value[inModal.temp]);
          items.value[obje.title]=obje;
          inModal.temp=obje.title;
        });

        return {items, state, displayAppNotes , Open, Close, Confirm, Debugg, itemData_Nota, warning, Show, arrayOrdered, isDisabled};
    },
    template: componentNotes_Html
}

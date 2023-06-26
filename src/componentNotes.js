import { reactive, watch, computed } from 'vue';
import {displayAppNotes, items, itemData_Nota, inModal, warning} from './globalVar.js';
import { Nota } from './myclass.js';
import { sortObject } from './mymacros/macro-functions.js';
import { componentNotes_Html } from './componentHtml.js';
import { works } from './Firebase/firebase_db.js';

export default {
    data(){
        //VARs
        const state = reactive({display:"none"});
        const listSelected={};
        //REACTIVE FUNCTIONs
        const Open=()=>{ 
          ItemDataSetter("","","",new Date().toLocaleString());
          [inModal.bool, warning.value, state.display]=[true,"","block"]; 
        };

        const Close=()=>{ inModal.bool=false; ItemDataSetter(); state.display="none";};
        
        const Confirm = ()=>{
            var obje=Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess);
            if(Check(obje)) return; 
            items.value[obje.title]=obje;
            addNote(obje)
            inModal.temp=obje.title;
            itemData_Nota.disabled=true; 
            Close();
        };

        const Show = (title)=>{
          inModal.temp=title;
          itemData_Nota.disabled=false;
          ItemDataSetter(title,items.value[title]["tag"],items.value[title]["text"],items.value[title]["lastaccess"]);
        }

        function ItemDataSetter(title="", tag="", text="", lastaccess=""){
          itemData_Nota.value.text=text;
          itemData_Nota.value.title=title;
          itemData_Nota.value.tag=tag;
          itemData_Nota.value.lastaccess=lastaccess;
        }

        function deleteNotes(){
          for(let item in listSelected){
            if(itemData_Nota.value.title==item){
              itemData_Nota.disabled=true;
              ItemDataSetter();
            }
            delete(items.value[item]);
            delete(listSelected[item]);
          }
          itemData_Nota.dirty=true;
          updateNote();
        }

        function selectNote(nameobj,bool){
          if(bool) select(nameobj);
          else deselect(nameobj);
        }
        function select(nameobj){
          if(!listSelected[nameobj]) listSelected[nameobj]=null; 
        }
        function deselect(nameobj){ 
          delete(listSelected[nameobj]); 
        }

        const isDisabled=computed(()=>itemData_Nota.disabled)
        const arrayOrdered=computed(()=>sortObject(items,"lastaccess"))

        function Check(obje){
          if(obje.title==""||obje.tag==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
          if(items.value[obje.title]){warning.value="esiste già una nota con questo titolo"; return true;}
          return false;
        }
        //WATCHERs
        watch(()=>itemData_Nota.value.text,(dataNew)=>{ 
          if(inModal.bool||itemData_Nota.disabled)return;
          itemData_Nota.value.text=dataNew;
          itemData_Nota.value.lastaccess=new Date().toLocaleString();
          var obje=Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess,dataNew);
          items.value[obje.title]=obje;
          itemData_Nota.dirty=true;
         });

        watch(()=>itemData_Nota.value.title,dataNew=>{
          if(inModal.bool||dataNew==""||itemData_Nota.disabled)return;
          itemData_Nota.value.title=dataNew;
          itemData_Nota.value.lastaccess=new Date().toLocaleString();
          var obje=Nota(itemData_Nota.value.title,itemData_Nota.value.lastaccess,itemData_Nota.value.text);
          if(items.value[obje.title]) return;
          delete(items.value[inModal.temp]);
          items.value[obje.title]=obje;
          inModal.temp=obje.title;
          itemData_Nota.dirty=true;
        });

        const addNote=(obj)=>{
          let ob={};
          ob[obj.title]=obj;
          works.addWork("notes",{"notes":ob})
        }
        const updateNote=()=>{
          if(itemData_Nota.dirty)works.updateWork({"notes":items.value});
          itemData_Nota.dirty=false;
        }
        return {items, state, displayAppNotes , Open, Close, Confirm, deleteNotes, selectNote, itemData_Nota, warning, Show, arrayOrdered, isDisabled, updateNote};
    },
    template: componentNotes_Html
}

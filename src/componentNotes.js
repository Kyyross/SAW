import { reactive, ref, watch, computed } from 'vue';
import {displayAppNotes, items} from './globalVar.js';
import { Obj } from './myclass.js';
import { sortObject } from './mymacros/macro-functions.js';
import { componentNotes_Html } from './componentHtml.js';

export default {
    data(){
        //VARs
        var temp="";
        var inModal=false;
        var semMove=0;
        const itemData = reactive({title:"", tag:"" , lastaccess:"", text:""});
        const state = reactive({display:"none"});
        const warning = ref("");
        const disabled=ref(true);

        //REACTIVE FUNCTIONs
        const Open=()=>{ 
          inModal=true;
          ItemDataSetter("","","",new Date()) 
          warning.value=""; 
          state.display="block";
        };

        const Close=()=>{ inModal=false; state.display="none";};

        const Confirm = ()=>{
            var obje=new Obj(itemData.title,itemData.lastaccess); 
            if(Check(obje)) return; 
            items.value[obje.title]=obje;
            temp=obje.title; 
            Close();
        };

        const Show = (title)=>{
          semMove=2;
          temp=title;
          disabled.value=false;
          console.log(disabled.value),
          ItemDataSetter(title,items.value[title]["tag"],items.value[title]["text"],items.value[title]["lastaccess"]);
        }

        function ItemDataSetter(title, tag, text, lastaccess=-1){
          itemData.text=text;
          itemData.title=title;
          itemData.tag=tag;
          if(lastaccess!=-1)itemData.lastaccess=lastaccess;
        }

        const isDisabled=computed(()=>{ return disabled.value})
        const arrayOrdered=computed(()=>{return sortObject(items,"lastaccess")})

        const Debugg=()=>{console.log(items);}

        function Check(obje){
          if(obje.title==""||obje.tag==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
          if(items.value[obje.title]){warning.value="esiste già una nota con questo titolo"; return true;}
          console.log(obje.title);
          return false;
        }
        //WATCHERs
        watch(()=>itemData.text,(dataNew)=>{ 
          console.log(semMove);
          if(inModal||semMove>0||(dataNew==""&&semMove==0)) {semMove=(semMove>0?(semMove-1):semMove); return;}
          console.log("entraText");
          itemData.text=dataNew;
          itemData.lastaccess=new Date();
          var obje=new Obj(itemData.title,itemData.lastaccess,dataNew);
          items.value[obje.title]=obje;
         });

        watch(()=>itemData.title,dataNew=>{
          console.log(semMove);
          if(inModal||semMove>0||(dataNew==""&&semMove==0)){semMove=(semMove>0?(semMove-1):semMove);return;}
          console.log("entraTitle");
          itemData.title=dataNew;
          itemData.lastaccess=new Date();
          var obje=new Obj(itemData.title,itemData.lastaccess,itemData.text);
          delete(items.value[temp]);
          items.value[obje.title]=obje;
          temp=obje.title;
        });

        return {items, state, displayAppNotes , Open, Close, Confirm, Debugg, itemData, warning, Show, arrayOrdered, isDisabled};
    },
    template: componentNotes_Html
}

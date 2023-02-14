import { reactive, ref, watch, computed } from 'vue'
import { Obj } from './myclass.js'
import {sortObject} from './macro-functions.js'
import { componentNotes_Html } from './componentHtml.js';

export default {
    data(){
        //VARs
        var temp="";
        var inModal=false;
        var semMove=0;
        const items = reactive({});
        const itemData = reactive({title:"", tag:"" , lastaccess:"", text:""});
        const state = reactive({display:"none"});
        const warning = ref("");

        //REACTIVE FUNCTIONs
        const Open=()=>{ 
          inModal=true;
          ItemDataSetter("","","",new Date()) 
          warning.value=""; 
          state.display="block";};

        const Close=()=>{ inModal=false; state.display="none";};

        const Confirm = ()=>{
            var obje=new Obj(itemData.title,itemData.lastaccess); 
            if(Check(obje)) return; 
            items[obje.title]=obje;
            temp=obje.title; 
            Close();
        };

        const Show = (title)=>{
          semMove=2;
          temp=title;
          ItemDataSetter(title,items[title]["tag"],items[title]["text"],items[title]["lastaccess"]);
        }

        function ItemDataSetter(title, tag, text, lastaccess=-1){
          itemData.text=text;
          itemData.title=title;
          itemData.tag=tag;
          if(lastaccess!=-1)itemData.lastaccess=lastaccess;
        }

        const arrayOrdered=computed(()=>{return sortObject(items,"lastaccess")})

        const Debugg=()=>{console.log(items);}

        function Check(obje){
          if(obje.title==""||obje.tag==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
          if(items[obje.title]){warning.value="esiste già una nota con questo titolo"; return true;}
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
          items[obje.title]=obje;
         });

        watch(()=>itemData.title,dataNew=>{
          console.log(semMove);
          if(inModal||semMove>0||(dataNew==""&&semMove==0)){semMove=(semMove>0?(semMove-1):semMove);return;}
          console.log("entraTitle");
          itemData.title=dataNew;
          itemData.lastaccess=new Date();
          var obje=new Obj(itemData.title,itemData.lastaccess,itemData.text);
          delete(items[temp]);
          items[obje.title]=obje;
          temp=obje.title;
        });

        return {items, state , Open, Close, Confirm, Debugg, itemData, warning, Show, arrayOrdered};
    },
    template: componentNotes_Html
}

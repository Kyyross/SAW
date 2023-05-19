import { reactive, ref } from 'vue';
const displayAppNotes = reactive({display:"none"});
const displayAppAuth = reactive({display:"none"});
const displayAppSpese = reactive({display:"none", containerSpese:"none", containerTransitions:"none", containerTools:"none"});
const displayUsername = reactive({display:"none"});
const warningSign= ref("");
const userName=ref("");
const items = reactive({"value":{}});
const categories = reactive({"value":{}});
const objGraphView= reactive({value:{},sum:0,'percent':(a,b)=>(a*100/b)+"%"});
export const date=reactive({"value":"","type":""});
const codContainer={};
const inModal= {bool:false,temp:""};
const [modalCategState,modalTransitionState,warning]=[reactive({display:"none", mod:"none"}),reactive({display:"none"}),ref("")];
const itemData = reactive({value:{nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", dateTransition:"", codTransition:""}});
const itemData_Nota = reactive({value:{title:"", tag:"" , lastaccess:"", text:""}, disabled:true});
const Clear=()=>{
    userName.value="";
    items["value"]={};
    categories["value"]={};
    codContainer={};
    itemData_Nota["value"]={title:"", tag:"" , lastaccess:"", text:""};
    itemData_Nota["disabled"]=true;
    objGraphView["value"]={};
    objGraphView["sum"]=0;
    inModal["temp"]="";
    itemData["value"]={nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", dateTransition:"", codTransition:""};
    warning.value="";
    date.value="";
    date.type="";
}
//Cleans the Html input of the Modal 
const ItemDataSetter = (...arg) => [itemData.value.nCateg, itemData.value.nIcon, itemData.value.noteTransition,
     itemData.value.valueTransition, itemData.value.codTransition, itemData.value.dateTransition]=[...arg];

export {displayAppNotes, displayAppAuth, displayAppSpese, displayUsername, warningSign, userName, items, categories,
    modalCategState, modalTransitionState, warning, itemData, itemData_Nota, codContainer, inModal, objGraphView, ItemDataSetter, Clear
};
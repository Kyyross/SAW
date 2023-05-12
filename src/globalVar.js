import { reactive, ref } from 'vue';

const displayAppNotes = reactive({display:"none"});
const displayAppAuth = reactive({display:"none"});
const displayAppSpese = reactive({display:"none", containerSpese:"none", containerTransitions:"none"});
const displayUsername = reactive({display:"none"});
const warningSign= ref("");
const userName=ref("");
const items = reactive({"value":{}});
const categories = reactive({"value":{}});
var codContainer={};
var inModal= {bool:false};
const [modalCategState,modalTransitionState,warning]=[reactive({display:"none", mod:"none"}),reactive({display:"none"}),ref("")];
const itemData = reactive({nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", codTransition:""});
const Clear=()=>{
    userName.value="";
    items["value"]={};
    categories["value"]={};
    codContainer={};
}
//Cleans the Html input of the Modal 
const ItemDataSetter = (...arg) => [itemData.nCateg, itemData.nIcon, itemData.noteTransition,
     itemData.valueTransition, itemData.codTransition]=[...arg];

export {displayAppNotes, displayAppAuth, displayAppSpese, displayUsername, warningSign, userName, items, categories,
    modalCategState, modalTransitionState, warning, itemData, codContainer, inModal, ItemDataSetter, Clear};
import { reactive, ref } from 'vue';
import {TranslateDaysWeek} from './mymacros/macro-functions.js'

export const displayAppNotes = reactive({display:"none"});
export const displayAppAuth = reactive({display:"none"});
export const displayAppSpese = reactive({display:"none", containerSpese:"none", containerTransitions:"none", containerTools:"none"});
export const displayButtonSign = reactive({SignIn:"block", SignOut:"none"});
export const warningSign= ref("");
export const userName=reactive({value:"", logged:false, temp:"",display:"none"});
export const items = reactive({"value":{}});
export const categories = reactive({"value":{}});
export const objGraphView= reactive({value:{},sum:0,'percent':(a,b)=>(a*100/b)+"%",'tras': TranslateDaysWeek});
export const date=reactive({"value":"","type":""});
export var codContainer={};
export const inModal= {bool:false,temp:""};
export const [modalCategState,modalTransitionState,warning]
    =[reactive({display:"none", mod:"none"}),reactive({display:"none"}),ref("")];
export const itemData = reactive({value:{nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", dateTransition:"", codTransition:""}});
export const itemData_Nota = reactive({value:{title:"", tag:"" , lastaccess:"", text:""}, disabled:true});
export const itemData_Tools = reactive({toolsGump:"none", yBool:"none", mBool:"none", dBool:"none", aBool:"none", tabBool:"none", sumBool:"none", type:"", value:""});
export const Clear=()=>{
    ClearUserName();
    ClearCategories();
    ClearItemData();
    ClearObjGraph();
    [warning.value, date.value, date.type]=["","",""];
}
const ClearUserName = () => {
    [userName["value"],userName.logged,userName.temp,userName.display]=["",false,"","none"];
}
const ClearCategories = () => {
    [categories["value"],items["value"],codContainer,itemData_Nota["disabled"]]=[{},{},{},true];

}
const ClearItemData = () => {
    itemData_Nota["value"]={title:"", tag:"" , lastaccess:"", text:""};
    itemData["value"]={nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", dateTransition:"", codTransition:""};

}
const ClearObjGraph = () => {
    [objGraphView["value"],objGraphView["sum"],inModal["temp"]]=[{},0,""];
}

export const ItemDataSetter = (...arg) => [itemData.value.nCateg, itemData.value.nIcon, itemData.value.noteTransition,
     itemData.value.valueTransition, itemData.value.codTransition, itemData.value.dateTransition]=[...arg];
export const GetCateg = (codTransition) =>  categories.value[codContainer[codTransition]];
    
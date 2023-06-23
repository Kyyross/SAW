import { reactive, ref } from 'vue';
import {TranslateDaysWeek} from './mymacros/macro-functions.js'

export const titlePage= reactive({value:"Welcome", homeB:"block"});
export const displayAppNotes = reactive({display:"none"});
export const displayAppAuth = reactive({display:"none"});
export const displayAppSpese = reactive({display:"none", containerSpese:"none", containerTransitions:"none", containerTools:"none"});
export const displayButtonSign = reactive({SignIn:"flex", SignOut:"none", cmdSignIn:"none", cmdSignUp:"none"});
export const warningSign= ref("");
export const userName=reactive({value:"", logged:false, temp:"",display:"none"});
export const items = reactive({"value":{}});
export const categories = reactive({"value":{}});
export const objGraphView= reactive({value:{},sum:0,'percent':(a,b)=>(a*100/b)+"%",'tras': TranslateDaysWeek});
export const date=reactive({"value":"","type":""});
export var codContainer={};
export const inModal= {bool:false,temp:""};
export const [modalCategState,modalTransitionState,warning]
    =[reactive({add:"none", mod:"none", merge:"none", genericColorPicker:"none",colorPicker:"none", iconPicker:"none"}),reactive({display:"none"}),ref("")];
export const itemData = reactive({value:{nCateg:"", nIcon:"", noteTransition:"", valueTransition:"", dateTransition:"", codTransition:"",rename:"", color:""}});
export const itemData_Auth = reactive({Username:"", Password:"", cPassword:""});
export const itemData_Nota = reactive({value:{title:"", tag:"" , lastaccess:"", text:""}, disabled:true});
export const itemData_Tools = reactive({toolsGump:"none", yBool:"none", mBool:"none", dBool:"none", aBool:"none", tabBool:"none", sumBool:"none", type:"", value:""});
export const Clear=()=>{
    ClearUserName();
    ClearCategories();
    ClearItemData();
    ClearItemDataTools();
    [warning.value, date.value, date.type,inModal["temp"]]=["","","",""];
}
const ClearUserName = () => {
    [itemData_Auth.Username,itemData_Auth.Password, itemData_Auth.cPassword]=["","",""];
    [userName["value"],userName.logged,userName.temp,userName.display]=["",false,"","none"];
}
const ClearCategories = () => {
    [categories["value"],items["value"],codContainer]=[{},{},{}];

}
const ClearItemData = () => {
    itemData_Nota["value"]={title:"", tag:"" , lastaccess:"", text:""};
    itemData_Nota["disabled"]=true;
    ItemDataSetter("","","","","","","","");
    
}
export const ClearItemDataTools = () => {
    //[objGraphView["value"],objGraphView["sum"],inModal["temp"]]=[{},0,""];
    [itemData_Tools.toolsGump,
    itemData_Tools.value, itemData_Tools.type,itemData_Tools.yBool,
    itemData_Tools.mBool,itemData_Tools.dBool, itemData_Tools.aBool,
    itemData_Tools.sumBool, itemData_Tools.tabBool]=["none","","","none","none","none","none","none","none"];
}

export const ItemDataSetter = (...arg) => [itemData.value.nCateg, itemData.value.nIcon, itemData.value.noteTransition,
     itemData.value.valueTransition, itemData.value.codTransition, itemData.value.dateTransition, itemData.value.rename, itemData.value.color]=[...arg];
export const GetCateg = (codTransition) =>  categories.value[codContainer[codTransition]];
    
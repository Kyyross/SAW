import { reactive, ref } from 'vue'

const displayAppNotes = reactive({display:"none"});
const displayAppAuth = reactive({display:"none"});
const displayAppSpese = reactive({display:"none"});
const displayUsername = reactive({display:"none"});
const warningSign= ref("");
const userName=ref("");
const items = reactive({"value":{}});
const categories = reactive({"value":{}});
var codContainer={};
const Clear=()=>{
    userName.value="";
    items["value"]={};
    categories["value"]={};
    codContainer={};
}

export {displayAppNotes, displayAppAuth, displayAppSpese, displayUsername, warningSign, userName, items, categories, codContainer, Clear};
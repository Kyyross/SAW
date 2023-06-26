import { items, categories, codContainer} from '../globalVar.js';

function LoadSave(obj){
    if(obj===undefined)return;
    try{
        for(let item in obj["notes"]){
            items.value[item]=obj["notes"][item];
    }}catch(e){console.error("error on loading the notes (function LoadSave): "+e);}
    try{
        for(let item in obj["categories"]){
            categories.value[item]=obj["categories"][item];
    }}catch(e){console.error("error on loading the categories (function LoadSave): "+e);}
    try{
        for(let item in obj["codContainer"]){
            codContainer[item]=obj["codContainer"][item];
    }}catch(e){console.error("error on loading the codContainer (function LoadSave): "+e);}
}

function MakeObjToSave(){
    var [objNotes, objCategories, objCodContainer]=[{},{},{}];
    for(let item in items.value){
        objNotes[item]=items.value[item];
    }
    for(let category in categories.value){
        objCategories[category]=categories.value[category];
    }
    for(let cod in codContainer){
        objCodContainer[cod]=codContainer[cod];
    }
    return {"notes":objNotes,"categories":objCategories,"codContainer":objCodContainer};
}

export {LoadSave, MakeObjToSave}
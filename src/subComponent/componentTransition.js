import { works } from '../Firebase/firebase_db.js';
import { categories, codContainer, warning, ItemDataSetter, modalTransitionState, inModal, itemData } from '../globalVar.js';
import { CheckDate, Sorting } from '../mymacros/macro-functions.js';
import { v4 as uuid } from 'uuid';

export const OpenAddTransitionGump = (nameCateg,nIcon,color) => { 
    [inModal.bool,warning.value,modalTransitionState.add]=[true,"","block"];
    console.log(nameCateg+""+nIcon+""+color);
    ItemDataSetter(nameCateg,nIcon,"","","","","",color);
};

export const OpenModTransitionGump = (codItem, nota, value, date) => {
    [inModal.bool,warning.value,modalTransitionState.mod]=[true,"","block"];
    let nameCateg=codContainer[codItem];
    let nIcon=categories.value[nameCateg]["codIcona"];
    let color=categories.value[nameCateg]["color"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,nota,value,codItem,date,nameCateg,color);
}

export const OpenDelTransitionGump = (codItem, nota, value, date) => {
    [inModal.bool,warning.value,modalTransitionState.del]=[true,"","block"];
    let nameCateg=codContainer[codItem];
    let nIcon=categories.value[nameCateg]["codIcona"];
    let color=categories.value[nameCateg]["color"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,nota,value,codItem,date,"",color);
}
export const CloseTransitionGump = () => [inModal.bool,modalTransitionState.add,modalTransitionState.mod,modalTransitionState.del]=[false,"none","none","none"];

export const AddTransition=()=>{
    if(!categories.value[itemData.value.nCateg]) {warning.value="nome categoria non esistente";return;}
    let message=CheckFormatTransition(itemData.value.valueTransition,itemData.value.dateTransition);
    if(message!=="ok") {warning.value=message; return;}
    try{
        let codGenerated;
        do{
            codGenerated=uuid();
        }while(codContainer[codGenerated])
        let obj={0:codGenerated, 1:itemData.value.noteTransition, 2:itemData.value.valueTransition, 3:itemData.value.dateTransition}
        categories.value[itemData.value.nCateg]["Transitions"].push(obj);
        codContainer[codGenerated]=itemData.value.nCateg;
        let objwork={"codContainer":codContainer,"categories":{}};
        objwork.categories[itemData.value.nCateg]=categories.value[itemData.value.nCateg];
        works.addWork("codcontainer",objwork);
        CloseTransitionGump();
    }catch(e){console.error("error when try to add the transition"+e);}
}
export const RemTransition=(coditem)=>{
    try{
        let namecateg=codContainer[coditem];
        if(!codContainer[coditem]) throw new Error("Codice oggetto non presente nel container");
        delete(codContainer[coditem]);
        categories.value[namecateg]["Transitions"]=categories.value[namecateg]["Transitions"].filter((element)=>element[0]!=coditem);
        works.updateWork({"codContainer":codContainer,"categories":categories.value});
        CloseTransitionGump();
    }catch(e){console.error("error when try to delete transition: "+e);}
}
export const ModTransition=()=>{
    try{
        let message=CheckFormatTransition(itemData.value.valueTransition,itemData.value.dateTransition);
        if(message!=="ok") {warning.value=message; return;}
        if(!categories.value[itemData.value.rename]){warning.value="La categoria non esiste"; return;}
        for(let item in categories.value[itemData.value.nCateg]["Transitions"]){
            if(categories.value[itemData.value.nCateg]["Transitions"][item][0]==itemData.value.codTransition){
                let obj={0:itemData.value.codTransition, 1:itemData.value.noteTransition, 2:itemData.value.valueTransition, 3:itemData.value.dateTransition};
                categories.value[itemData.value.nCateg]["Transitions"]=categories.value[itemData.value.nCateg]["Transitions"].filter((element)=>element[0]!=itemData.value.codTransition);
                codContainer[itemData.value.codTransition]=itemData.value.rename;
                categories.value[itemData.value.rename]["Transitions"].push(obj);
                works.updateWork({"categories":categories.value});
                CloseTransitionGump();
                break;
            }
        }
    }catch(e){console.error("error when try to modify the transition: "+itemData.value.codTransition+" "+e);}
}
export function GetTransitions(obj){
    if(Object.entries(obj.value).length==0){
        return [];
    }
    var arr=[];
    for(var category in obj.value){
        console.log(category);
        for(var item of obj.value[category]["Transitions"]){
            console.log(item);
            arr.push([item[0],item[1],item[2],item[3]]);
        }
    }
    //console.log(arr);
    return arr.sort((a,b)=>Sorting(a[3],b[3]));
}

function CheckFormatTransition(value,date){
    try{
        //check sul testo della nota, considerare di mettere controlli di sicurezza.
        if(value===""||isNaN(parseFloat(value))||parseFloat(value)<=0) return "Immettere dei valori validi";
        if(!CheckDate(date)) return "La data deve essere del formato: full_year-month-day";
    }
    catch(e){console.error(e.message); return "Errore interno"}
    return "ok";
}

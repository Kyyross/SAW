import { categories, codContainer, warning, ItemDataSetter, modalTransitionState, inModal, itemData } from '../globalVar.js';
import { CheckDate } from '../mymacros/macro-functions.js';
import { v4 as uuid } from 'uuid';

export const OpenAddTransitionGump = (nameCateg,nIcon) => { 
    [inModal.bool,warning.value,modalTransitionState.display]=[true,"","block"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,"","","","");
};
export const CloseAddTransitionGump = () => [inModal.bool,modalTransitionState.display]=[false,"none"];

export const OpenModTransitionGump = (codItem) => {
    [inModal.bool,warning.value,modalTransitionState.mod]=[true,"","block"];
    let nameCateg=codContainer[codItem];
    let nIcon=categories.value[nameCateg]["codIcona"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,"","",codItem,"");
}
export const CloseModTransitionGump = () => [inModal.bool,modalTransitionState.mod]=[false,"none"];

export const AddTransition=()=>{
    if(!categories.value[itemData.value.nCateg]) {warning.value="nome categoria non esistente";return;}
    let message=CheckFormatTransition(itemData.value.valueTransition,itemData.value.dateTransition);
    if(message!=="ok") {warning.value=message; return;}
    try{
        let codGenerated;
        do{
            codGenerated=uuid();
        }while(codContainer[codGenerated])
        categories.value[itemData.value.nCateg]["Transitions"].push([codGenerated,itemData.value.noteTransition,itemData.value.valueTransition,itemData.value.dateTransition]);
        codContainer[codGenerated]=itemData.value.nCateg;
        CloseAddTransitionGump();
    }catch(e){console.log("error when try to add the transition"+e);}
}
export const RemTransition=(coditem)=>{
    try{
        if(!confirm("sei sicuro di voler eliminare questo movimento?")) return;
        let namecateg=codContainer[coditem];
        if(!codContainer[coditem]) throw new Error("Codice oggetto non presente nel container");
        delete(codContainer[coditem]);
        categories.value[namecateg]["Transitions"]=categories.value[namecateg]["Transitions"].filter((element)=>element[0]!=coditem);
    }catch(e){console.error("error when try to delete transition: "+e);}
}
export const ModTransition=()=>{
    try{
        let message=CheckFormatTransition(itemData.value.valueTransition,itemData.value.dateTransition);
        if(message!=="ok") {warning.value=message; return;}
        for(let item in categories.value[itemData.value.nCateg]["Transitions"]){
            if(categories.value[itemData.value.nCateg]["Transitions"][item][0]==itemData.value.codTransition){
                console.log("entro?");
                categories.value[itemData.value.nCateg]["Transitions"][item][2]=itemData.value.valueTransition;
                categories.value[itemData.value.nCateg]["Transitions"][item][1]=itemData.value.noteTransition;
                categories.value[itemData.value.nCateg]["Transitions"][item][3]=itemData.value.dateTransition;
                CloseModTransitionGump();
                break;
            }
        }
        
    }catch(e){console.error("error when try to modify the transition: "+itemData.value.codTransition+" "+e);}
}
export function GetTransitions(obj){
    if(Object.entries(obj.value).length==0){
        return [];
    }
    var arrOrd=[];
    for(var category in obj.value){
        console.log(category);
        for(var item of obj.value[category]["Transitions"]){
            console.log(item);
            arrOrd.push([item[0],item[1],item[2],item[3]]); //item[4]
        }
    }
    console.log(arrOrd);
    return arrOrd;
}

function CheckFormatTransition(value,date){
    try{
        //check sul testo della nota, considerare di mettere controlli di sicurezza.
        if(value===""||isNaN(parseFloat(value))||parseFloat(value)<=0) return "Immettere dei valori validi";
        if(!CheckDate(date)) return "La data deve essere del formato: full_year-month-day";
    }
    catch(e){console.error(e.message);}
    return "ok";
}
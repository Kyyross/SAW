import { categories, codContainer, warning, ItemDataSetter, modalTransitionState, inModal, itemData } from '../globalVar.js';
import { v4 as uuid } from 'uuid';

export const OpenAddTransitionGump = (nameCateg,nIcon) => { 
    [inModal.bool,warning.value,modalTransitionState.display]=[true,"","block"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,"","");
};
export const CloseAddTransitionGump = () => [inModal.bool,modalTransitionState.display]=[false,"none"];

export const OpenModTransitionGump = (codItem) => {
    [inModal.bool,warning.value,modalTransitionState.mod]=[true,"","block"];
    let nameCateg=codContainer[codItem];
    let nIcon=categories.value[nameCateg]["codIcona"];
    console.log(nameCateg+nIcon);
    ItemDataSetter(nameCateg,nIcon,"","",codItem);
}
export const CloseModTransitionGump = () => [inModal.bool,modalTransitionState.mod]=[false,"none"];

export const AddTransition=()=>{
    if(!categories.value[itemData.nCateg]) {warning.value="nome categoria non esistente";return;}
    if(parseFloat(itemData.valueTransition)<=0) {warning.value="Immettere un valore valido";return;}
    //check sul testo della nota, considerare di mettere controlli di sicurezza.
    try{
        //funzione che genera cod
        let codGenerated;
        do{
            codGenerated=uuid();
        }while(codContainer[codGenerated])
        categories.value[itemData.nCateg]["Transitions"].push([codGenerated,itemData.noteTransition,itemData.valueTransition]); //implementare generatore cod e check su cod
        codContainer[codGenerated]=itemData.nCateg;
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
        if(itemData.noteTransition==""||itemData.valueTransition==""){ warning.value="Immettere dei valori validi";console.log("valori inadeguati");return;}
        for(let item in categories.value[itemData.nCateg]["Transitions"]){
            if(categories.value[itemData.nCateg]["Transitions"][item][0]==itemData.codTransition){
                console.log("entro?");
                categories.value[itemData.nCateg]["Transitions"][item][2]=itemData.valueTransition;
                categories.value[itemData.nCateg]["Transitions"][item][1]=itemData.noteTransition;
                CloseModTransitionGump();
                break;
            }
        }
        
    }catch(e){console.error("error when try to modify the transition: "+itemData.codTransition+" "+e);}
}
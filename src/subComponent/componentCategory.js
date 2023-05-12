//import {} from 'vue';
import { categories, codContainer, warning, ItemDataSetter, inModal, modalCategState, itemData } from '../globalVar.js';
import { Categoria } from '../myclass.js';

export const ModCateg=(nameC)=>{
    //let nameC=prompt("metti nome categoria da modificare");
    //console.log(nameC);
    try{
        console.log(nameC);
        if(categories.value[nameC]){
            console.log(nameC);
            let rename=prompt("come deve essere rinominata?");
            for(let key of categories.value[nameC]["Transitions"]){
                console.log(key[0]);
                codContainer[key[0]]=rename;
            }
            categories.value[rename]=categories.value[nameC];
            categories.value[rename]["nCateg"]=rename;
            delete(categories.value[nameC]);
        } 
    }catch(e){console.error("error on delete categoria"+e);}
}

export const AddCateg=()=>{
    var obje=new Categoria(itemData.nCateg,itemData.nIcon); 
    if(Check(obje)) return; 
    categories.value[itemData.nCateg]={"nCateg":itemData.nCateg,"codIcona":obje.nIcon,"Transitions":[]};
    CloseAddCategGump();
}

//DA FAR COMUNICARE STATE CON VIEW
export const RemCateg=(item)=>{
    //let item=prompt("metti nome categoria da eliminare");
    try{
        if(categories.value[item]&&confirm("sicuro di volerla rimuovere? così eliminerai anche le transazioni di questa categoria registrate finora")){
            for(let key of categories.value[item]["Transitions"]){
                console.log(key[0]);
                delete(codContainer[key[0]]);
            }
            delete(categories.value[item]);
        } 
    }catch(e){console.error("error on delete categoria"+e);}
}

export const MergeCateg=(categ1)=>{
    try{
        //let categ1=prompt("inserire la categoria slave da unire");
        let categ2=prompt("inserire la categoria a cui deve essere unita");
        if(categ2===null)return;
        for(let key of categories.value[categ1]["Transitions"]){
            codContainer[key[0]]=categ2;
            categories.value[categ2]["Transitions"].push(key);
        }
        delete(categories.value[categ1]);
    }catch(e){console.error(e);}
}

//OPEN MODAL
export const OpenAddCategGump = () => {
    [inModal.bool,modalCategState.display,warning.value]=[true,"block",""];
    ItemDataSetter("","","","");
};
//CLOSE MODAL
export const CloseAddCategGump = () => [inModal.bool,modalCategState.display]=[false,"none"];

function Check(obje){
    if(obje.nCateg==""||obje.nIcon==""){ warning.value="Tutti i campi devono essere compilati"; return true;}
    if(categories.value[obje.nCateg]){warning.value="esiste già una categoria con questo nome"; return true;}
    console.log(obje.nCateg);
    return false;
  }


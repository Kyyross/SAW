import {Obj} from '../myclass.js'

//prende un oggetto lo ordina (decrescente) e restituisce lo restituisce in forma di array
function sortObject(obj,key){
    console.log(obj.value);
    if(Object.entries(obj.value).length==0){
        console.log("vuoto"); 
        return [];
    }
    var arr=[];
    for(var item in obj.value){
        arr.push([obj.value[item],obj.value[item][key]]);
    }
    arr.sort((a,b)=>Sorting(a,b));
    var arrOrd=[];
    for(var item in arr){
        let itemObj=ConvertDateComtoHum(arr[item][0]);
        arrOrd.push(itemObj);
    }
    return arrOrd;
}

//function per ordinare gli elementi in ordine decrescente.
function Sorting(a,b,){return a[1]>b[1]?-1:0;}

//prende l'oggetto contenente i dati della singola nota e restituisce un nuovo oggetto contente la data tradotta per l'utente
function ConvertDateComtoHum(item){return new Obj(item.title,GetHumanDate(item.lastaccess),item.text);}

//converte la data grezza in una data comprensibile all'utente.
function GetHumanDate(Date){
    let date=Date;
    let hours=Check00(date.getHours());
    let minutes=Check00(date.getMinutes());
    let months=Check00(date.getMonth()+1);
    let days=Check00(date.getDate());
    return days+"-"+months+"-"+date.getFullYear()+", "+hours+":"+minutes;
}
//Completa i singoli numeri mettendogli 0 davanti. Per esempio 1 -> 01
function Check00(cifre){
    if(cifre/10<1) cifre='0'+cifre.toString();
    return cifre;
}

//usato per filtrare array delle transizioni
function filterParams(array,params){
    return (array[0]);
}
export {sortObject, GetHumanDate, filterParams}
import {Obj} from '../myclass.js'

function sortObject(obj,key){
    var arr=[];
    for(var item in obj){
        arr.push([obj[item],obj[item][key]]);
    }
    arr.sort((a,b)=>Sorting(a,b));
    var arrOrd=[];
    for(var item in arr){
        let itemObj=ConvertDateComtoHum(arr[item][0]);
        arrOrd.push(itemObj);
    }
    return arrOrd;
}

function Sorting(a,b,){return a[1]>b[1]?-1:0;}

function ConvertDateComtoHum(item){return new Obj(item.title,GetHumanDate(item.lastaccess),item.text);}

function GetHumanDate(Date){
    let date=Date;
    let hours=Check00(date.getHours());
    let minutes=Check00(date.getMinutes());
    let months=Check00(date.getMonth()+1);
    let days=Check00(date.getDate());
    return days+"-"+months+"-"+date.getFullYear()+", "+hours+":"+minutes;
}

function Check00(cifre){
    if(cifre/10<1) cifre='0'+cifre.toString();
    return cifre;
}

export {sortObject, GetHumanDate}
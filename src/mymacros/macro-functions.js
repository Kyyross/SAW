//prende un oggetto lo ordina (decrescente) e lo restituisce in forma di array
function sortObject(obj,key){
    if(Object.entries(obj.value).length==0){
        return [];
    }
    var arr=[];
    for(var item in obj.value){
        arr.push([obj.value[item],obj.value[item][key]]);
    }
    return arr.sort((a,b)=>Sorting(a,b)).map((a)=>a[0]);
}
//function per ordinare gli elementi in ordine decrescente.
function Sorting(a,b,){return a[1]>b[1]?-1:0;}

function GetTransitions(obj){
    if(Object.entries(obj.value).length==0){
        return [];
    }
    var arrOrd=[];
    for(var category in obj.value){
        console.log(category);
        for(var item of obj.value[category]["Transitions"]){
            console.log(item);
            arrOrd.push([item[0],item[1],item[2],item[3]]);
        }
    }
    console.log(arrOrd);
    return arrOrd;
}

function CheckDate(value){
    try{
        console.log(value);
        if((new Date(value).toString())==='Invalid Date')throw new Error("Format is wrong, it must be: fullyear-month-day");
    }
    catch(e){console.error(e.message); return false;}
    return true;
}

export {sortObject, GetTransitions, CheckDate}


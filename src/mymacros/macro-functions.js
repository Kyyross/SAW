//prende un oggetto lo ordina (decrescente) e lo restituisce in forma di array
export function sortObject(obj,key){
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

export function CheckDate(value){
    try{
        console.log(value);
        if((new Date(value).toString())==='Invalid Date')throw new Error("Format is wrong, it must be: fullyear-month-day");
    }
    catch(e){console.error(e.message); return false;}
    return true;
}

export function getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

export function checkNested(obj, level,  ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true
    return checkNested(obj[level], ...rest)
  }

//export {sortObject, GetTransitions, CheckDate, getDarkColor}


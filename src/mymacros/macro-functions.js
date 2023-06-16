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
function Sorting(a,b){return a[1]>b[1]?-1:0;}

export function CheckDate(value){
    try{
        console.log(value);
        if((new Date(value).toString())==='Invalid Date')throw new Error("Format is wrong, it must be: fullyear-month-day");
    }
    catch(e){console.error(e.message); return false;}
    return true;
}
function FormatDate(date){
    let [d,m,y]=date.split("/");
    if(m.length==1)m="0"+m;
    if(d.length==1)d="0"+d;
    while(y.length<4){
        y="0"+y;
    }
    return y+"-"+m+"-"+d;
}
//function che prende una data e restituisce un array contenente i giorni della settimana, da lunedi a domenica
export function GetWeek(value){
        let date=new Date(value);
        try{
            if(!CheckDate(date.getDate())) throw new Error();
            let day=date.getDay()!=0?date.getDay()-1:6;
            var arrWeek=[];
            date=new Date(date.setDate(date.getDate()-day));
            arrWeek.push(FormatDate(date.toLocaleDateString()));
            for(let i=1;i<7;i++){
                date=new Date(date.setDate(date.getDate()+1));
                arrWeek.push(FormatDate(date.toLocaleDateString()));
            }
            console.log(arrWeek);
            return arrWeek;
    }
    catch(e){
        console.error(e.message); return [];
    } 
}
export function getDarkColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}
export function TranslateDaysWeek(num){
    switch(num){
        case 0 : return "Mon";
        case 1 : return "Tue";
        case 2 : return "Wed";
        case 3 : return "Thu";
        case 4 : return "Fri";
        case 5 : return "Sat";
        case 6 : return "Sun";
    }
}

export function checkNested(obj, level,  ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true
    return checkNested(obj[level], ...rest)
  }
//export {sortObject, GetTransitions, CheckDate, getDarkColor}


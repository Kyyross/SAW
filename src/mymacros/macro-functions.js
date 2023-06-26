//prende un oggetto lo ordina (decrescente) e lo restituisce in forma di array
export function sortObject(obj,key){
    if(Object.entries(obj.value).length==0){
        return [];
    }
    var arr=[];
    for(var item in obj.value){
        arr.push([obj.value[item],obj.value[item][key]]);
    }
    return arr.sort((a,b)=>Sorting(a[1],b[1])).map((a)=>a[0]);
}
//function per ordinare gli elementi in ordine decrescente.
export function Sorting(a,b){return a>b?-1:0;}

export function CheckDate(value){
    try{
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
            return arrWeek;
    }
    catch(e){
        console.error(e.message); return [];
    } 
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

export function TranslateMonths(num){
    console.log(num);
    console.log(typeof num);
    switch(num){
        case '1' : return "Jan";
        case '2' : return "Feb";
        case '3' : return "Mar";
        case '4' : return "Apr";
        case '5' : return "May";
        case '6' : return "Jun";
        case '7' : return "July";
        case '8' : return "Aug";
        case '9' : return "Sep";
        case '10' : return "Oct";
        case '11' : return "Nov";
        case '12' : return "Dec";
    }
}

export function checkNested(obj, level,  ...rest) {
    if (obj === undefined) return false
    if (rest.length == 0 && obj.hasOwnProperty(level)) return true
    return checkNested(obj[level], ...rest)
  }


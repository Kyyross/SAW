import {categories, codContainer, objGraphView } from "./globalVar.js";
import { checkNested, CheckDate, GetWeek} from "./mymacros/macro-functions.js";

class Nota{
    constructor(title,lastaccess,text=""){
        this.title=title;
        this.lastaccess=lastaccess;
        this.text=text;
    }
}

class Categoria{
    constructor(nCateg,nIcon){
        this.nCateg=nCateg;
        this.nIcon=nIcon;
    }
}

class ObjHttp{
    constructor(){
        links={};
        metadati={};
        data={};
    }
}

//icona categ , namecateg, Somma giornaliera, mensile, annuale, media giornaliera, mensile, annuale,
export class graphView{
    constructor(categorie){
        this.categorie=categorie;
        this.map=this.GetMapCategorie(categorie);
        this.arrGraph=[];
        this.containerColors={};
        this.allTime={};
        this.month={};
        this.week={};
        this.year={};
    }
    /*return {  sumAll:0
                    categ:{ "svago":{ sum 100 , metadati } }, 
                    years: { "1992": {   sumYear:0   
                                         categ:{},
                                         mesi{ "febbraio": {sumMonth:0
                                                            categ:{ "svago":{ sum 100 , metadati } }, 
                                                            giorni: { "1" : { transitions: [["trans1"]],
                                                                              sumDay:0,
                                                                              ncateg:{"svago": { sum 100, fun }}  
                                                                            }}}} */
    GetMapCategorie(categorie){
        if(categorie===undefined) return {};
        var allTime={"max":0 , "sum":0, "categ":{}, "years":{}};
        console.log(categorie);
        for(var categoria in categorie){
            for(let transition of categorie[categoria]["Transitions"]){
                let date=transition[3];
                date=date.split("-");
                if(checkNested(allTime,"years",date[0],"months",date[1],"days",date[2])){
                    allTime.years[date[0]]["months"][date[1]]["days"][date[2]]["transitions"].push(transition);
                    setCateg([allTime.years[date[0]]["months"][date[1]]["days"][date[2]],allTime.years[date[0]]["months"][date[1]],allTime.years[date[0]],allTime],transition);
                }
                else
                    if(checkNested(allTime,"years",date[0],"months",date[1])){
                        let day={};
                        day[date[2]]=InitializeYear(transition,date,allTime,"day");
                        Object.assign(allTime.years[date[0]]["months"][date[1]]["days"],day);
                        setCateg([allTime.years[date[0]]["months"][date[1]],allTime.years[date[0]],allTime],transition);
                    }
                    else  
                        if(allTime.years[date[0]]){
                            let month={};
                            month[date[1]]=InitializeYear(transition,date,allTime,"month");
                            Object.assign(allTime.years[date[0]]["months"],month);
                            setCateg([allTime.years[date[0]],allTime],transition);
                        }
                        else{
                            allTime.years[date[0]]=InitializeYear(transition,date,allTime);
                            setCateg([allTime],transition);
                        }
            }
        }
        console.log(allTime);
        this.CalculateMax(allTime);
        console.log(allTime);
        return {allTime};
    }
    GetGraph(date){
        if(Object.entries(this.map).length==0){console.log("getgraph"+this.map); return {}; }
        console.log(this.map);
        var [year, month, day]=date!==undefined?date.split("-"):[undefined,undefined,undefined];
        try{
            console.log(year+month+day);
            if(day!==undefined) return this.map["allTime"]["years"][year]["months"][month]["days"][day];
            if(month!==undefined) return this.map["allTime"]["years"][year]["months"][month];
            if(year!==undefined) return this.map["allTime"]["years"][year];
            console.log(this.map["allTime"]);
            return this.map["allTime"];
        }
        catch(e){console.log(e); return {}}
    }
    CalculateMax(alltime){
        for(let year in alltime.years){
            let objyear=alltime.years[year];
            if(alltime.max<objyear.sum) alltime.max=objyear.sum;
            for(let month in objyear["months"]){
                let objmonth=objyear["months"][month];
                if(objyear.max<objmonth.sum) objyear.max=objmonth.sum;
                for(let day in objmonth["days"]){
                    let objday=objmonth["days"][day];
                    if(objmonth.max<objday.sum) objmonth.max=objday.sum;
                }
            }
        }
    }
    ShowDay(date){
        this.arrGraph=[];
        date=date.split('-');
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                let fulldate=transition[3];
                let arrDate=fulldate.split('-');
                if(arrDate[0]==date[0]&&arrDate[1]==date[1]&&arrDate[2]==date[2])this.arrGraph.push(transition);
            }
        }
    }
    CalculateWeek(date){
        console.log(date);
        if(!CheckDate(date)) return [];
        let week=GetWeek(date);
        let arr=[];
        let sum=0;
        let max=0;
        for(let i=0;i<7;i++){
            console.log(week[i]);
            let temp=this.GetGraph(week[i]);
            if(temp!==undefined&&Object.entries(temp).length>0){
                sum+=temp.sum;
                max=max>=temp.sum?max:temp.sum;
                arr.push({"index": i, "value": temp});
            }
        }
        console.log(arr);
        return { "arr": arr, "sum":sum, "max":max};
    }
    ShowWeek(weekDate){
        this.arrGraph=[];
        //weekDate=weekDate
    }
    ShowMonth(monthDate){
        this.arrGraph=[];
        monthDate=monthDate.split('-');
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                let fulldate=transition[3];
                let arrDate=fulldate.split('-');
                if(arrDate[0]==monthDate[0]&&arrDate[1]==monthDate[1])this.arrGraph.push(transition);
            }
        }
    }
    ShowYear(year){
        this.arrGraph=[];
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                let arrYear = transition[3].split("-");
                if(arrYear[0]==year)this.arrGraph.push(transition);
            }
        }
    }
    ShowAll(){
        this.arrgraph=[];
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                this.arrGraph.push(transition);
            }
        }
    }
    SumValueTransition(){
        [this.containerColors,objGraphView.value,objGraphView.sum]=[{},{},0];
        for(var item of this.arrGraph){
            let category=codContainer[item[0]];
            if(!objGraphView.value[category]){
                let [value, newcolor]=[parseFloat(item[2])];
                /*while(newcolor===undefined){
                    let trycolor=getDarkColor();
                    if(!this.containerColors[trycolor]){
                        [newcolor, this.containerColors[trycolor]]=[trycolor,trycolor];
                    }
                }*/
                newcolor=categories.value[category]["color"];
                objGraphView.value[category]={"nCateg":category,"transitions":[item],"sum":value, "color": newcolor};
                objGraphView.sum+=value;
            }
            else{
                objGraphView.value[category]["sum"]+=parseFloat(item[2]);
                objGraphView.sum+=parseFloat(item[2]);
                objGraphView.value[category]["transitions"].push(item);
            }
        }
        console.log(objGraphView);
        return objGraphView.value;
    }
    ShowGraphics(type, value){
        switch(type){
            case "month":{
                this.month=this.GetGraph(value);
                this.ShowMonth(value); 
            }break;
            case "week":{
                this.week=this.CalculateWeek(value);
                this.ShowWeek(value);
            }break;
            case "day":{
                this.week=this.GetGraph(value);
                this.ShowDay(value); 
            }break;
            case "year":{
                this.year=this.GetGraph(value);
                this.ShowYear(value);
            }
            break;
            case "all":{
                this.allTime=this.GetGraph();
                this.ShowAll();
            }
            break;
            default:break;
        }
    }
}

function GetCateg(transition,init=true){
    let nCateg=codContainer[transition[0]];
    let obj={"max":parseFloat(transition[2]),"sum":parseFloat(transition[2]),"metadati": categories.value[nCateg]}
    let obj1={};
    obj1[nCateg]=obj;
    return (init?obj1:obj);
}
function InitializeYear(transition,date,allTime,what){
    let objDay={"transitions":[transition], "categ": GetCateg(transition) ,"sum":parseFloat(transition[2]), "max":parseFloat(transition[2])};
    if(what==="day")return objDay;
    let day={};
    day[date[2]]=objDay;
    let objMonth={"max": parseFloat(transition[2]),"sum":parseFloat(transition[2]), "categ": GetCateg(transition), "days": day};
    if(what==="month")return objMonth;
    let month={};
    month[date[1]]=objMonth;
    let objYear={"max":parseFloat(transition[2]),"sum":parseFloat(transition[2]), "categ": GetCateg(transition) ,"months": month};
    return objYear;
}
function setCateg(arr,transition){
    let [nCateg,value]=[codContainer[transition[0]],parseFloat(transition[2])];
    for(let obj of arr){
        let categ=obj.categ;
        console.log(categ);
        console.log(obj.sum + "value: "+value);
        obj.sum+=value;
        if(categ[nCateg]){
            categ[nCateg]["sum"]+=value;
        }else
        {
            categ[nCateg]=GetCateg(transition,false);
        }
    }
}

export {Nota, Categoria}

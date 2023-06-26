import {categories, codContainer, objGraphView } from "./globalVar.js";
import { checkNested, CheckDate, GetWeek} from "./mymacros/macro-functions.js";

/*class Nota{
    constructor(title,lastaccess,text=""){
        this.title=title;
        this.lastaccess=lastaccess;
        this.text=text;
        this.checked=false;
    }
}*/
const Nota=(title,lastaccess,text="")=>{
    return {"title":title,"lastaccess":lastaccess, "text":text};
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
        console.log("getmap: "+categorie);
        var allTime={"max":0 , "sum":0, "categ":{}, "years":{}};
        if(categorie===undefined) return {allTime};
        console.log(categorie);
        for(var categoria in categorie){
            for(let transition of categorie[categoria]["Transitions"]){
                let date=transition[3];
                date=date.split("-");
                for(let x in date) date[x]=parseInt(date[x]);
                //[date[0],date[1],date[2]]=[parseInt(date[0]),parseInt(date[1]),parseInt(date[2])];
                //console.log(year+" "+month+""+day);
                if(checkNested(allTime,"years",date[0],"months",date[1],"days",date[2])){
                    allTime.years[date[0]]["months"][date[1]]["days"][date[2]]["transitions"].push(transition);
                    this.SetCateg([allTime.years[date[0]]["months"][date[1]]["days"][date[2]],allTime.years[date[0]]["months"][date[1]],allTime.years[date[0]],allTime],transition);
                }
                else
                    if(checkNested(allTime,"years",date[0],"months",date[1])){
                        let day={};
                        day[date[2]]=this.InitializeYear(transition,date,allTime,"day");
                        Object.assign(allTime.years[date[0]]["months"][date[1]]["days"],day);
                        this.SetCateg([allTime.years[date[0]]["months"][date[1]],allTime.years[date[0]],allTime],transition);
                    }
                    else  
                        if(allTime.years[date[0]]){
                            let month={};
                            month[date[1]]=this.InitializeYear(transition,date,allTime,"month");
                            Object.assign(allTime.years[date[0]]["months"],month);
                            this.SetCateg([allTime.years[date[0]],allTime],transition);
                        }
                        else{
                            allTime.years[date[0]]=this.InitializeYear(transition,date,allTime);
                            this.SetCateg([allTime],transition);
                        }
            }
        }
        console.log(allTime);
        this.CalculateMax(allTime);
        console.log(allTime);
        return {allTime};
    }
    GetCateg(transition,init=true){
        let nCateg=codContainer[transition[0]];
        let obj={"max":parseFloat(transition[2]),"sum":parseFloat(transition[2]),"metadati": categories.value[nCateg]}
        let obj1={};
        obj1[nCateg]=obj;
        return (init?obj1:obj);
    }
    SetCateg(arr,transition){
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
                categ[nCateg]=this.GetCateg(transition,false);
            }
        }
    }
    InitializeYear(transition,date,allTime,what){
        let objDay={"transitions":[transition], "categ": this.GetCateg(transition) ,"sum":parseFloat(transition[2]), "max":parseFloat(transition[2])};
        if(what==="day")return objDay;
        let day={};
        day[date[2]]=objDay;
        let objMonth={"max": parseFloat(transition[2]),"sum":parseFloat(transition[2]), "categ": this.GetCateg(transition), "days": day};
        if(what==="month")return objMonth;
        let month={};
        month[date[1]]=objMonth;
        let objYear={"max":parseFloat(transition[2]),"sum":parseFloat(transition[2]), "categ": this.GetCateg(transition) ,"months": month};
        return objYear;
    }
    GetGraph(date){
        if(date===undefined) return this.map["allTime"];
        if(Object.entries(this.map).length==0){console.log("getgraph"+this.map); return {}; }
        console.log(this.map);
        var [year, month, day]=date.split("-");
        year = (year!==undefined?parseInt(year):undefined);
        month = (month!==undefined?parseInt(month):undefined);
        day = (day!==undefined?parseInt(day):undefined);
        try{
            //console.log(year+" "+month+""+day);
            let yearsmap=this.map["allTime"]["years"];
            if(day!==undefined) return (yearsmap[year]["months"][month]["days"][day]===undefined?{}:yearsmap[year]["months"][month]["days"][day]);
            if(month!==undefined) return (yearsmap[year]["months"][month]===undefined?{}:yearsmap[year]["months"][month]);
            if(year!==undefined) return yearsmap[year]===undefined?{}:yearsmap[year];
            return {};
        }
        catch(e){console.error(e); return {}}
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
    ShowWeek(date){
        this.arrGraph=[];
        let weekdate=GetWeek(date);
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                let fulldate=transition[3];
                for(let day of weekdate){
                    console.log("fulldate"+fulldate+" "+day);
                    if(day==fulldate){
                        this.arrGraph.push(transition);
                        break;
                    }
                }  
            }
        }
        console.log(this.arrGraph);
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
        this.arrGraph=[];
        console.log(this.categorie);
        for(var category in this.categorie){
            for(var transition of this.categorie[category]["Transitions"]){
                this.arrGraph.push(transition);
            }
        }
        console.log(this.arrGraph);
    }
    SumValueTransition(){
        [this.containerColors,objGraphView.value,objGraphView.sum]=[{},{},0];
        console.log("arrgraph");
        console.log(this.arrGraph);
        if(this.arrGraph.length==0)return {};
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
                this.week=this.CalculateWeek(value);
                this.ShowDay(value); 
            }break;
            case "year":{
                this.year=this.GetGraph(value);
                this.ShowYear(value);
            }
            break;
            case "alltime":{
                this.allTime=this.GetGraph();
                this.ShowAll();
            }
            break;
            default:break;
        }
    }
}

export {Nota, Categoria}

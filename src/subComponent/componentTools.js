import { categories, date, inModal, itemData_Tools, warning, ClearItemDataTools } from "../globalVar.js";
import { computed , watch } from 'vue';
import { graphView } from '../myclass.js';
import {CheckDate} from '../mymacros/macro-functions.js';

var viewgraph=new graphView();

export const ConfirmDate = () => {
    //let type=prompt("t, a, m, g, w");
    //let value=prompt("inserisci la data");
    //controlli sulla data
    switch(itemData_Tools.type){
      case "day": CheckDate(itemData_Tools.value);
      break;
      case "week":CheckDate(itemData_Tools.value);
      break;
      case "month":CheckDate(itemData_Tools.value);
      break;
      case "year":CheckDate(itemData_Tools.value);
      break;
      case "alltime": itemData_Tools.value="";
      break;
      default:{warning.value="scegliere il tipo di data"; return;}
    }
    console.log(itemData_Tools.type+" "+ itemData_Tools.value);
    [date.type,date.value, itemData_Tools.tabBool ,itemData_Tools.sumBool]
      =[itemData_Tools.type,itemData_Tools.value.toString(),"block","block"];
    CloseToolsGump();
}
export const OpenToolsGump = () => {
  warning.value="";
  ClearItemDataTools();
  itemData_Tools.toolsGump="block";
}
export const CloseToolsGump = () => {
  [inModal.bool,warning.value,itemData_Tools.toolsGump,
    itemData_Tools.value, itemData_Tools.type]=[false,"","none","",""];
}
watch(()=>itemData_Tools.type,(type) => {
  switch(type){
      case "day": [itemData_Tools.yBool,itemData_Tools.mBool,itemData_Tools.dBool,
        itemData_Tools.aBool, itemData_Tools.type]=["none","none","flex","none","day"];
      break;
      case "week": [itemData_Tools.yBool,itemData_Tools.mBool,itemData_Tools.dBool,
        itemData_Tools.aBool, itemData_Tools.type]=["none","none","flex","none","week"];
      break;
      case "month": [itemData_Tools.yBool,itemData_Tools.mBool,itemData_Tools.dBool,
        itemData_Tools.aBool, itemData_Tools.type]=["none","flex","none","none","month"];
      break;
      case "year": [itemData_Tools.yBool,itemData_Tools.mBool,itemData_Tools.dBool,
        itemData_Tools.aBool, itemData_Tools.type]=["flex","none","none","none","year"];
      break;
      case "alltime": [itemData_Tools.yBool,itemData_Tools.mBool,itemData_Tools.dBool,
        itemData_Tools.aBool, itemData_Tools.type]=["none","none","none","flex","alltime"];
      break;
      default: warning.value="Errore nel tipo della data";
  }
})
/*watch(categories,(newvalue)=>{
  console.log("WATCHED categ");
  viewgraph=new graphView(newvalue.value);
})*/

const CalculateGraphs = () => {
  /*console.log("computed");
  console.log(categories.value);*/
  viewgraph=new graphView(categories.value)
  if(Object.entries(categories.value).length==0)return {"h_bar":{}, "week":{}, "month":{}, "year":{}, "all":{}};
  viewgraph.ShowGraphics(date.type,date.value);
  return {"h_bar": viewgraph.SumValueTransition(), 
    "week":viewgraph.week, "month":viewgraph.month, 
    "year":viewgraph.year,
    "all":viewgraph.allTime
  };
}
export const objView = computed(()=>CalculateGraphs());





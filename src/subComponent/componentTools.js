import { categories, date } from "../globalVar.js";
import { computed , watch } from 'vue';
import { graphView } from '../myclass.js'

var viewgraph=new graphView();

export const ConfirmDate=()=>{
    let type=prompt("t, a, m, g, w");
    let value=prompt("inserisci la data");
    //controlli sulla data
    [date.type,date.value]=[type,value];
}

export function DebugTools(){
    //viewgraph.ShowGraphics("year","1993");
    //console.log(arrGraph);
    //ShowGraphics("day","1993-12-16");
    //console.log(arrGraph);
    //ShowGraphics("month","1993-12");
    //console.log(arrGraph);
    //viewgraph.SumValueTransition();
    //let graph=new graphView(categories.value);
}

watch(categories,(newvalue)=>{
  viewgraph=new graphView(newvalue.value);
})

const CalculateGraphs = () => {
  console.log("entro?");
  viewgraph.ShowGraphics(date.type,date.value);
  return {"h_bar": viewgraph.SumValueTransition(), 
    "week":viewgraph.week, "month":viewgraph.month, 
    "year":viewgraph.year,
    "all":viewgraph.allTime
  };
}

export const objView = computed(()=>CalculateGraphs());

/* mostra per ogni anno ogni mese ogni giorno le categorie spese
<div class="list-graph-sum">
      <span v-for="year in objView.transitions.years">
        <span v-for="month in year.months">
          <li v-for="day in month.days">
            
          </li>
        </span>
      </span>
    </div>
*/




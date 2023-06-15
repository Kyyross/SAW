import { displayAppSpese, categories, codContainer, itemData, 
    warning, modalCategState, modalTransitionState, objGraphView, GetCateg } from './globalVar.js';

import { CloseAddCategGump, OpenAddCategGump, AddCateg, ModCateg, 
    MergeCateg, RemCateg } from './subComponent/componentCategory.js';

import { AddTransition, RemTransition, ModTransition, 
    OpenAddTransitionGump, CloseAddTransitionGump, 
    OpenModTransitionGump, CloseModTransitionGump, GetTransitions} from './subComponent/componentTransition.js';

import { ConfirmDate, objView } from './subComponent/componentTools.js';

import { componentSpese_Html } from './componentHtml.js';
import { computed } from 'vue';

export default{
    data(){
        const OpenCategory=()=>{Close(); displayAppSpese.containerSpese="flex";};
        const OpenTransitions=()=>{Close(); displayAppSpese.containerTransitions="flex";};
        const OpenAnalyticsTools=()=>{Close(); displayAppSpese.containerTools="block";};
        const Close=()=>{
            displayAppSpese.containerSpese="none", displayAppSpese.containerTransitions="none", displayAppSpese.containerTools="none"
        }
        function debug(item){
            console.log(item);
            console.log(categories.value);
            console.log(codContainer);
        }
        const arrayTransitions=computed(()=>GetTransitions(categories))
        return {categories,itemData, modalCategState, modalTransitionState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, 
            AddCateg, ModCateg, MergeCateg, AddTransition, RemTransition,ModTransition, warning, debug, RemCateg, OpenAddTransitionGump, 
            CloseAddTransitionGump, OpenModTransitionGump, CloseModTransitionGump,OpenCategory, OpenAnalyticsTools, OpenTransitions, 
            arrayTransitions, objGraphView, objView, ConfirmDate, GetCateg
        }
    },
    template:componentSpese_Html
}

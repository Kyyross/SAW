import { displayAppSpese, categories, codContainer, itemData, 
    warning, modalCategState, modalTransitionState } from './globalVar.js';
import {GetTransitions} from './mymacros/macro-functions.js'

import { CloseAddCategGump, OpenAddCategGump, AddCateg, ModCateg, 
    MergeCateg, RemCateg } from './subComponent/componentCategory.js';

import { AddTransition, RemTransition, ModTransition, 
    OpenAddTransitionGump, CloseAddTransitionGump, 
    OpenModTransitionGump, CloseModTransitionGump} from './subComponent/componentTransition.js';

import { componentSpese_Html } from './componentHtml.js';
import { computed } from 'vue';

export default{
    data(){
        const OpenCategory=()=>{Close(); displayAppSpese.containerSpese="flex";};
        const OpenTransitions=()=>{Close(); displayAppSpese.containerTransitions="flex";};
        const OpenAnalyticsTools=()=>{Close();};
        const Close=()=>{
            displayAppSpese.containerSpese="none", displayAppSpese.containerTransitions="none"//, displayAppSpese.display="none"
        }
        function debug(item){
            console.log(item);
            console.log(categories.value);
            console.log(codContainer);
        }
        const arrayTransitions=computed(()=>{return GetTransitions(categories)})
        return {categories,itemData, modalCategState, modalTransitionState, displayAppSpese, CloseAddCategGump, OpenAddCategGump, 
            AddCateg, ModCateg, MergeCateg, AddTransition, RemTransition,ModTransition, warning, debug, RemCateg, OpenAddTransitionGump, 
            CloseAddTransitionGump, OpenModTransitionGump, CloseModTransitionGump,OpenCategory, OpenAnalyticsTools, OpenTransitions, 
            arrayTransitions}
    },
    template:componentSpese_Html
}

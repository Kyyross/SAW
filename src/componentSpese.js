import { displayAppSpese, categories, codContainer, itemData, itemData_Tools,
    warning, modalCategState, modalTransitionState, objGraphView, GetCateg, titlePage } from './globalVar.js';

import { CloseCategGump, OpenCategGump, AddCateg, ModCateg, 
    MergeCateg, RemCateg, LoadImg, images, colors, matColors, PickIcon, PickColor} from './subComponent/componentCategory.js';

import { AddTransition, RemTransition, ModTransition, 
    OpenAddTransitionGump, OpenModTransitionGump, OpenDelTransitionGump, 
    CloseTransitionGump,GetTransitions} from './subComponent/componentTransition.js';

import { ConfirmDate, objView, OpenToolsGump, CloseToolsGump} from './subComponent/componentTools.js';

import { componentSpese_Html } from './componentHtml.js';
import { computed } from 'vue';

export default{
    data(){
        const OpenCategory=()=>{Close(); titlePage.value="Categories"; displayAppSpese.containerSpese="flex";};
        const OpenTransitions=()=>{Close(); titlePage.value="Transitions"; displayAppSpese.containerTransitions="flex";};
        const OpenAnalyticsTools=()=>{Close(); titlePage.value="Analytics Tool"; displayAppSpese.containerTools="block";};
        const Close=()=>{
            [displayAppSpese.containerSpese, displayAppSpese.containerTransitions, displayAppSpese.containerTools]=["none","none","none"];
        }
        function debug(item){
            console.log(item);
            console.log(categories.value);
            console.log(codContainer);
        }
        const arrayTransitions=computed(()=>GetTransitions(categories))
        return {PickIcon, PickColor, images, colors, matColors, categories, itemData, modalCategState, modalTransitionState, displayAppSpese, CloseCategGump, OpenCategGump, 
            AddCateg, ModCateg, MergeCateg, AddTransition, RemTransition,ModTransition, warning, debug, RemCateg, OpenAddTransitionGump, 
            CloseTransitionGump, OpenModTransitionGump, OpenDelTransitionGump, OpenCategory, OpenAnalyticsTools, OpenTransitions, 
            arrayTransitions, objGraphView, objView, ConfirmDate, GetCateg, OpenToolsGump, CloseToolsGump, itemData_Tools, LoadImg
        }
    },
    template:componentSpese_Html
}

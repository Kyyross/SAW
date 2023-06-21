import {displayAppNotes, displayAppAuth, displayAppSpese, userName, warningSign, titlePage} from './globalVar.js';
import { componentMenu_Html } from './componentHtml.js';
export default {
    data() {
      const Open0=()=>{Close(); if(CheckLogIn()){titlePage.value="Notes"; displayAppNotes.display="block";}};
      const Open1=()=>{Close(); titlePage.value="Authentication"; displayAppAuth.display="block";};
      const Open2=()=>{Close(); if(CheckLogIn()){titlePage.value="Expense Management"; displayAppSpese.display="flex";}};
      const CheckLogIn=()=> {
        let check= (userName.value!=""?true:false);
        if(!check){
          warningSign.value="Per accedere alle tue applicazioni è necessario autenticarsi";
          Open1();
        }
        return check;
      }
      const Close=()=>{
        displayAppNotes.display="none", displayAppAuth.display="none", displayAppSpese.display="none"
      }
      return {Open0, Open1, Open2, userName, titlePage}
    },
    template: componentMenu_Html
  }
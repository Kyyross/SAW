import {displayAppNotes, displayAppAuth, displayAppSpese, displayUsername, userName, warningSign} from './globalVar.js';
import { componentMenu_Html } from './componentHtml.js';
export default {
    data() {
      const Open0=()=>{Close(); if(CheckLogIn())displayAppNotes.display="block";};
      const Open1=()=>{Close(); displayAppAuth.display="block";};
      const Open2=()=>{Close(); if(CheckLogIn())displayAppSpese.display="flex";};
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
      return {Open0, Open1, Open2, userName, displayUsername}
    },
    template: componentMenu_Html
  }
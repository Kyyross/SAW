import {displayAppNotes, displayAppAuth, displayAppSpese, userName} from './globalVar.js';
import { componentMenu_Html } from './componentHtml.js';
export default {
    data() {
      const open0=()=>{close(); displayAppNotes.display="block";};
      const open1=()=>{close(); displayAppAuth.display="block";};
      const open2=()=>{close(); displayAppSpese.display="block";};
      const close=()=>{
        displayAppNotes.display="none", displayAppAuth.display="none", displayAppSpese.display="none"}
      return {open0, open1, open2, userName}
    },
    template: componentMenu_Html
  }
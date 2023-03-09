import {state0, displayAppAuth, displayAppSpese} from './globalVar.js';
export default {
    data() {
      const open0=()=>{close(); state0.display="block";};
      const open1=()=>{close(); displayAppAuth.display="block";};
      const open2=()=>{close(); displayAppSpese.display="block";};
      const close=()=>{
        state0.display="none", displayAppAuth.display="none", displayAppSpese.display="none"}
      return {open0, open1, open2}
    },
    template: `
    <div style="display: fixed" class="button" @click="open0"> open app1</div>
    <div style="display: fixed" class="button" @click="open1"> open app2</div>
    <div style="display: fixed" class="button" @click="open2"> open app3</div>
    `
  }
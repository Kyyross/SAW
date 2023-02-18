import {state0,displayAppAuth} from './globalVar.js';
export default {
    data() {
      const open0=()=>{state0.display="block"; displayAppAuth.display="none"; console.log(state0.display+" e "+displayAppAuth.display)};
      const open1=()=>{displayAppAuth.display="block"; state0.display="none"; console.log(state0.display+" e "+displayAppAuth.display)};
      return {open0, open1}
    },
    template: `
    <div style="display: fixed" class="button" @click="open0"> open app1</div>
    <div style="display: fixed" class="button" @click="open1"> open app2</div>
    `
  }
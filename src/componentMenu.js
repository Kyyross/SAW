import {state0,state1} from './globalVar.js';
export default {
    data() {
      const open0=()=>{state0.display="block"; state1.display="none"; console.log(state0.display+" e "+state1.display)};
      const open1=()=>{state1.display="block"; state0.display="none"; console.log(state0.display+" e "+state1.display)};
      return {open0, open1}
    },
    template: `
    <div style="display: fixed" class="button" @click="open0"> open app1</div>
    <div style="display: fixed" class="button" @click="open1"> open app2</div>
    `
  }
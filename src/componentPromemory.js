import {reactive} from 'vue';
import {count, state1} from './globalVar.js';

export default {
    data() {
      return {state1, count}
    },
    template: `
    <div style="display: fixed" class="button" @click="count.val++">3: {{count.val}}</div>
    <div :style="{ display: state1.display }" class="button" @click="count.val++">4: {{count.val}}</div>
    `
  }


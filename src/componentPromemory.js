import { state1, count} from './globalVar.js';

export default {
    data() {
      return {state1, count}
    },
    template: `<div :style="{ display: state1.display }" class="button" @click="count.val++">4: {{count.val}}</div>`
  }
    
import {reactive,ref} from 'vue';

export default {
    data() {
      const count = ref({val:1})
      const state = reactive({display:"none"});
      const open=()=>{state.display="block";};
      const close1=()=>{state.display="none";};
      return {state, count , open, close1}
    },
    template: `<div style="display: none" class="button" @click="count.val++">{{count.val}}</div>`
  }


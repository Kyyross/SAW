import { reactive, ref } from 'vue'

const count = ref({val:1})

const state0 = reactive({display:"block"});
const state1 = reactive({display:"block"});

export {count, state0, state1};
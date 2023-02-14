import { reactive, ref } from 'vue'

const count = ref({val:1})

const state0 = reactive({display:"none"});
const state1 = reactive({display:"none"});

export {count, state0, state1};
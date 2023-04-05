import { reactive, ref } from 'vue'

const count = ref({val:1})

const displayAppNotes = reactive({display:"none"});
const displayAppAuth = reactive({display:"none"});
const displayAppSpese = reactive({display:"none"});
const warningSign= ref("");
const userName=ref("");
const items = reactive({});
const categories = reactive({});

export {count, displayAppNotes, displayAppAuth, displayAppSpese, warningSign, userName, items, categories};
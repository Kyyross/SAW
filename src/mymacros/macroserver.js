import { renderToString } from 'vue/server-renderer';
//import { setup } from '@css-render/vue3-ssr';
//import url from 'url';
//import DOMPurify from 'dompurify';

export async function RenderApp(app){
    return await renderToString(app);
  }
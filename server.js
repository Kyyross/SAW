import express from 'express';
import url from 'url';
//import DOMPurify from 'dompurify';
//import mymacro from './src/macro-functions.js';
import { renderToString } from 'vue/server-renderer';
import {createApp} from './src/app.js';
import { setup } from '@css-render/vue3-ssr'
import {html_, _html, html1 } from './src/componentHtml.js';

const server = express();

server.get('/', (req, res) => {
  const app0=createApp(0);
  const app1=createApp(1);
  renderToString(app0).then((contentApp0) =>{
    renderToString(app1).then((contentApp1) =>
      {res.send(html_+`${contentApp0}`+html1+`${contentApp1}`+_html)})
  });
});

server.use(express.static('.'));

server.listen(3000, () => {
  console.log('ready')
});
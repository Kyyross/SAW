// HTML FOR SERVER
var html_=
`<!DOCTYPE html><html><head><title>Vue SSR Example</title><meta name="viewport" content="width=device-width, initial-scale=1"></meta><script type="importmap">{"imports": {"vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"}}</script><script type="module" src="/src/client.js"></script><script type="module">
import styles from './src/mycss.css' assert { type: "css" };
document.adoptedStyleSheets = [styles];
</script></head><body><div id="app0">`;
var html1=`</div><div id="app1">`;
var _html=`</div></body></html>`;

//HTML FOR componentHtml
var componentNotes_Html=`
<!-- The Modal -->
<div :style="{ display: state.display }" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
  <span class="close"  @click="Close">&times;</span>
  <p>Some itemData in the Modal..</p>
  <input v-model="itemData.title" placeholder="Note title">
  <input v-model="itemData.tag" placeholder="Note tag">
  <div @click="Debugg">debugg</div>
  <div @click="Confirm">add note</div>
  <p class="warning">{{ warning }}</p>
  </div>
</div>
<div class="areaNote">
  <button @click="Open">Open Modal</button>
  <button @click="Debugg">debugg</button>
  <div class="listaNote">
    <li v-for="item in arrayOrdered">
      <div @click="Show(item.title)"> {{ item.title }} - {{ item.lastaccess }}</div>
    </li>
  </div>
</div>
<div class="contenutoNote">
  <textarea v-model="itemData.title" placeholder="Title"></textarea>
  <br>
  <textarea v-model="itemData.text" placeholder="Text"></textarea>
</div>  
`

export {html_ , _html, html1, componentNotes_Html}



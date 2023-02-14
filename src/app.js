import { createSSRApp} from 'vue';
import componentCount from './component.js';
import componentNotes from './componentNotes.js'

export function createApp(a) {
    switch(a){
      case 0 :return createSSRApp(componentCount);
      case 1 :return createSSRApp(componentNotes);
    }
}

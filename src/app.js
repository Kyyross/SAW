import { createSSRApp} from 'vue';
import componentMenu from './componentMenu.js';
import componentCount from './componentPromemory.js';
import componentNotes from './componentNotes.js'

export function createApp(a) {
    switch(a){
      case 0 :return createSSRApp(componentMenu);
      case 2 :return createSSRApp(componentCount);
      case 1 :return createSSRApp(componentNotes);
    }
}

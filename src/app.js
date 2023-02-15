import { createSSRApp} from 'vue';
import componentMenu from './componentMenu.js';
import componentAuth from './componentAuthentication.js';
import componentNotes from './componentNotes.js'

export function createApp(a) {
    switch(a){
      case 0 :return createSSRApp(componentMenu);
      case 2 :return createSSRApp(componentAuth);
      case 1 :return createSSRApp(componentNotes);
    }
}

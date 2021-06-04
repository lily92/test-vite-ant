import {createApp} from 'vue';
import App from '/src/App.vue';
import store from './store';
import bootstrap from './bootstrap';
import {setGlobalOptions} from 'vue-request';
import './scss/main.scss';
import './scss/iconfront.scss';


setGlobalOptions({
  manual: false,
  // ...
});

createApp(App)
    .use(store)
    .use(bootstrap)
    .mount('#app');

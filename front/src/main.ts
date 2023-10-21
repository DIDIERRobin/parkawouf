import './styles.css';

import router from './router';

import { createApp } from 'vue';
import App from './app/App.vue';
import { createPinia } from "pinia";

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#root');

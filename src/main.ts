// main.js o main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router.ts';
import './style.scss';
import lang  from './locales/lang.js';
import { createI18n } from 'vue-i18n';
import VueKonva from 'vue-konva';
const i18n = createI18n({
    legacy: false,
    messages: lang,
    fallbackFormat: 'en',
    locale: navigator.language.startsWith('es') ? 'es' : 'en'
});

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(VueKonva);
app.mount('#app');

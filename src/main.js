import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import Axios from 'axios';
import VeeValidate from 'vee-validate';
import VCalendar from 'v-calendar';
import VueIziToast from 'vue-izitoast';
import 'izitoast/dist/css/iziToast.css';

import AppIcon from '@/components/AppIcon';
import AppBtn from '@/components/AppBtn';
import AppField from '@/components/AppField';

Vue.component('AppIcon', AppIcon);
Vue.component('AppBtn', AppBtn);
Vue.component('AppField', AppField);

Vue.use(VeeValidate, {
	classes: true,
	validity: true,
	useConstraintAttrs: false
});
Vue.use(VCalendar);
Vue.use(VueIziToast);

window.Axios = Axios;
window.Axios.defaults.baseURL = 'http://localhost:3000/';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

const svgIcons = require.context('!svg-sprite-loader!@/assets/img/icons/', false, /.*\.svg$/);
svgIcons.keys().forEach(svgIcons);
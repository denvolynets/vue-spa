import Vue from 'vue';
import Vuex from 'vuex';
import invoices from './modules/invoices.js';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: { invoices },
	state: {
		S_LOADING: true
	},
	mutations: {
		M_LOADING(state, payload) {
			state.S_LOADING = payload;
		}
	},
	actions: {}
});

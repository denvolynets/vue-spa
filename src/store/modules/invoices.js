import { formatDate } from '@/scripts/functions';
import { API_URL } from '@/scripts/constants';
export default {
	namespaced: true,
	state: {
		S_INVOICES_LIST: [],
		S_INVOICES_LIST_TITLES: [
			{
				title: 'Create',
				value: 'date_created'
			},
			{
				title: 'No',
				value: 'number'
			},
			{
				title: 'Supply',
				value: 'date_supply'
			},
			{
				title: 'Comment',
				value: 'comment'
			}
		],
		S_INVOICES_ITEM: {
			id: '',
			direction: '',
			number: '',
			date_created: '',
			date_due: '',
			date_supply: '',
			comment: ''
		},
		S_INVOICES_ROUTE_TITLE: {
			InvoicesList: 'Invoices',
			InvoicesItemAdd: 'Create Invoice',
			InvoicesItemEdit: 'Edit Invoice № {number}'
		}
	},
	mutations: {
		M_INVOICES_LIST(state, list) {
			if (!list) return;

			list
				.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
				.forEach((item) => {
					Object.keys(item).map((key) => {
						if (key.includes('date')) {
							let date = item[key];
							date = formatDate(date);
							item[key] = date;
						}
					});
				});

			state.S_INVOICES_LIST = list;
		},
		M_INVOICES_ITEM(state, item) {
			if (!item) return;
			state.S_INVOICES_ITEM = item;
		}
	},
	actions: {
		A_INVOICES_LIST({ commit }) {
			return Axios.get(`${API_URL.invoices}`).then(({ data }) => {
				if (!data) return;
				commit('M_INVOICES_LIST', data);
				commit('M_LOADING', false, { root: true });
			});
		},
		A_INVOICES_ADD_NEW({ dispatch, commit }, payload) {
			commit('M_LOADING', true, { root: true });
			return Axios.post(`${API_URL.invoices}`, payload).then(({ data }) => {
				if (!data) return;
				return dispatch('A_INVOICES_LIST').then(() => {
					this._vm.$toast.success(`The invoice № ${payload.number} has been successfully <b>added</b>!`, 'Success');
				});
			});
		},
		A_INVOICES_EDIT({ dispatch, commit }, payload) {
			commit('M_LOADING', true, { root: true });
			return Axios.patch(`${API_URL.invoices}/${payload.id}`, payload).then(({ data }) => {
				if (!data) return;
				return dispatch('A_INVOICES_LIST').then(() => {
					this._vm.$toast.success(`The invoice № ${payload.number} has been successfully <b>edited</b>!`, 'Success');
				});
			});
		},
		A_INVOICES_DELETE({ dispatch, commit }, payload) {
			commit('M_LOADING', true, { root: true });
			return Axios.delete(`${API_URL.invoices}/${payload.id}`).then(({ data }) => {
				if (!data) return;
				return dispatch('A_INVOICES_LIST').then(() => {
					this._vm.$toast.success(`The invoice № ${payload.number} has been successfully <b>deleted</b>!`, 'Success');
				});
			});
		}
	}
};

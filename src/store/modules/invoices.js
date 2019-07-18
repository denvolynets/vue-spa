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
				.sort((a, b) => new Date(b.date_created) - new Date(a.date_created)) // sort by date;
				.forEach((item) => {
					Object.keys(item).map((key) => {
						if (key.includes('date')) {
							let date = item[key];
							date = this._vm.$helpers.formatDate(date);
							item[key] = date; // set format date;
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
		A_INVOICES_MANAGE({ dispatch, commit }, payload) {
			const { typeManage, number, id } = payload;
			let httpURL = `${API_URL.invoices}/${id}`;
			let bodyData = payload;
			let httpMethod;
			let toastWord;
			
			switch (typeManage) {
				case 'add':
					httpMethod = 'post';
					toastWord = 'added';
					httpURL = API_URL.invoices;
					break;
				case 'edit':
					httpMethod = 'patch';
					toastWord = 'edited';
					break;
				case 'delete':
					httpMethod = 'delete';
					toastWord = 'deleted';
					break;
				default:
					break;
			}
			
			commit('M_LOADING', true, { root: true });
			return Axios[httpMethod](httpURL, bodyData).then(({ data }) => {
				if (!data) return;
				return dispatch('A_INVOICES_LIST').then(() => {
					this._vm.$helpers.invoicesToastMessage.apply(this._vm, [toastWord, number]);
				});
			});
		}
	}
};

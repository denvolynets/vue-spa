import Vue from 'vue';
import Router from 'vue-router';
import Invoices from './views/Invoices';
import InvoicesManage from '@Components/InvoicesManage';
import InvoicesList from '@Components/InvoicesList';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/invoices',
			component: Invoices,
			alias: '/',
			children: [
				{
					path: '/',
					name: 'InvoicesList',
					component: InvoicesList
				},
				{
					path: 'add',
					name: 'InvoicesItemAdd',
					component: InvoicesManage
				},
				{
					path: ':id/edit',
					name: 'InvoicesItemEdit',
					component: InvoicesManage
				}
			]
		}
	]
});

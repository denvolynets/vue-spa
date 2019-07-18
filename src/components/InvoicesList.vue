<template lang="pug">
	.invoices
		.invoices__list
			InvoicesActions
			.container
				h4.invoices__list-title Invoices
				table.invoices__list-table.table
					caption Invoices
					thead.table__thead
						tr.table__tr
							td.table__td(
								v-for="item, index in S_INVOICES_LIST_TITLES",
								:key="index",
								v-html="item.title"
							)
							td.table__td Actions
					tbody.table__tbody
						InvoicesListRow(
							v-for="item, index in S_INVOICES_LIST",
							:key="`${item.id}__index`"
							:invoicesItem="item",
							:invoicesItemTitles="S_INVOICES_LIST_TITLES"
						).table__tr
						.table__tr(v-if="S_INVOICES_LIST.length === 0")
							td.table__td Nothing found
</template>

<script>
import InvoicesListRow from '@Components/InvoicesListRow';
import InvoicesActions from '@Components/InvoicesActions';
import { mapState } from 'vuex';
import { MODULES } from '@/scripts/constants';

export default {
	name: 'InvoicesList',
	components: {
		InvoicesListRow,
		InvoicesActions
	},
	computed: {
		...mapState(MODULES.invoices, [
			'S_INVOICES_LIST',
			'S_INVOICES_LIST_TITLES'
		])
	}
};
</script>

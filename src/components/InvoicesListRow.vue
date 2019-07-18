<template lang="pug">
	tr.table__tr
		td.table__td(
			v-for="title, index in invoicesItemTitles",
			:title="`${title.title}`"
		)
			AppTextCrop(
				v-if="title.value != 'number'",
				:text="invoicesItem[title.value]",
				:crop="title.value === 'comment'"
			)
			routerLink(
				v-else,
				:to="{ name: 'InvoicesItemEdit', params: { id: invoicesItem.id }}",
				v-html="invoicesItem[title.value]"
			)
		td.table__td(title="Actions")
			.invoices__list-btns
				AppBtn(
					iconName="edit",
					tagName="router-link",
					:to="{ name: 'InvoicesItemEdit', params: { id: invoicesItem.id }}",
					title="Edit")
				AppBtn(
					iconName="delete",
					@click.native="invoicesDelete(invoicesItem)",
					title="Delete"
				)
</template>

<script>
import { mapActions } from 'vuex';
import AppTextCrop from '@Components/AppTextCrop';
import { MODULES } from '@/scripts/constants';
import { invoicesDelete } from '@/mixins';

export default {
	name: 'InvoicesListRow',
	mixins: [invoicesDelete],
	components: { AppTextCrop },
	props: {
		invoicesItem: {
			type: Object,
			default() {}
		},
		invoicesItemTitles: {
			type: [Array],
			default() {}
		}
	},
	methods: {
		...mapActions(MODULES.invoices, [
			'A_INVOICES_MANAGE'
		])
	}
};
</script>

<style lang="scss">
	.iziToast.toast_big.iziToast-layout2  {
		min-height: 150px;
		display: inline-flex;
		align-items: center;

		.iziToast-body  {
			.iziToast {
				&-title {
					font-size: 20px;
					margin-bottom: 10px;
				}

				&-message {
					font-size: 16px;
					margin-top: 5px;
					margin-bottom: 20px;
					strong {
						font-weight: 600;
					}
				}
			}
		}

		.iziToast {
			&-buttons-child {
				font-size: 16px;
				padding: 10px 15px;
				margin-top: 10px;
			}

			&-close {
				background-size: 15px;
			}
		}

	}
</style>

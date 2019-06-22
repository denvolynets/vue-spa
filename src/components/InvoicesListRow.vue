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

export default {
	name: 'InvoicesListRow',
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
			'A_INVOICES_DELETE'
		]),
		invoicesDelete(invoicesItem) {
			this.$toast.show(`You are sure that you want to delete the invoice <strong>№ ${invoicesItem.number}</strong>?`, 'User,', {
				theme: 'dark',
				position: 'center',
				timeout: 20000,
				overlay: true,
				class: 'toast_big',
				layout: 2,
				progressBarColor: 'rgb(0, 255, 184)',
				buttons: [
					[
						'<button>Yes</button>',
						(instance, toast) => {
							instance.hide(
								{
									transitionOut: 'fadeOutUp'
								},
								toast,
								'buttonName'
							);
							this.A_INVOICES_DELETE(invoicesItem);
						},
						true
					],
					[
						'<button>No</button>',
						(instance, toast) => {
							instance.hide(
								{
									transitionOut: 'fadeOutUp'
								},
								toast,
								'buttonName'
							);
						}
					]
				]
			});
		}
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

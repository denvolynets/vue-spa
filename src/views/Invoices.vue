<template lang="pug">
	.invoices
		h2.invoices__title.g-title__l
			span.g-title__l-line(v-html="invoiceTitle")
		router-view
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { formValidate } from '@/mixins';
import { MODULES } from '@/scripts/constants';

export default {
	name: 'Invouces',
	mixins: [formValidate],
	created() {
		this.A_INVOICES_LIST();
	},
	methods: {
		...mapActions(MODULES.invoices, [
			'A_INVOICES_LIST'
		]),
		...mapMutations(MODULES.invoices, [
			'M_INVOICES_ITEM'
		])
	},
	computed: {
		...mapState(MODULES.invoices, [
			'S_INVOICES_ROUTE_TITLE',
			'S_INVOICES_LIST'
		]),
		invoiceFinded() {
			const finded = [...this.S_INVOICES_LIST].find(item => item.id == this.$route.params.id) || {};
			this.M_INVOICES_ITEM(finded);
			return finded;
		},
		invoiceTitle() {
			let title = this.S_INVOICES_ROUTE_TITLE[this.$route.name];
			if (this.$route.params.id) {
				if (!this.invoiceFinded) return title;
				title = title.replace(/{(.*?)}/g, (x) => {
					x = x.replace(/(^.*\{|\}.*$)/g, '');
					x = x.replace(x, this.invoiceFinded[x]);
					if (x) return x;
				});
			};
			return title;
		}
	}
};
</script>

<style lang="scss">
	.invoices {
		&__actions {
			margin-bottom: em(4);
		}

		&__list {
			.container {
				margin-bottom: em(2);
			}

			&-title {
				@include media($width_xs) {
					display: none;
				}
			}

			&-btns {
				display: flex;
				align-items: center;

				.app-btn__icon{
					padding: em(1);
					box-sizing: border-box;

					.app-icon {
						margin-left: 0;
					}

					&:not(:last-child) {
						margin-right: em(2);
					}
				}
			}
		}

		h4 {
			color: clr(dark, light);
			margin-top: 0;
		}

		.table {

			caption {
				@include media($width_xs) {
					display: block;
				}
			}
			&__td {
				@include media($width_md, 1) {
					min-width: 150px;

					&:nth-child(1) {
						min-width: 100px;
					}

					&:nth-child(3) {
						min-width: 100px;
					}
					
					&:last-child {
						min-width: 0;
					}
				}
			}

			&__thead {
				@include media($width_xs) {
					display: none;
				}
			}

			&__tbody {
				.table {
					&__td {
						color: clr(text, light);

						@include media($width_xs) {

							&:not(:first-child) {
								padding-top: 0;
							}

							&:before {
								content: attr(title);
								display: block;
								color: clr(dark, light);
								margin-bottom: 5px;
							}
						}
					}

					&__tr {
						@include media($width_xs) {
							display: flex;
							flex-direction: column;
							border-bottom: 1px solid clr(secondary, dark);
						}
					}
				}
			}
		}
	}
</style>
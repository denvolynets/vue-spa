<template lang="pug">
	form.invoices-manage(@submit.prevent="invoiceSave")
		.container
			.invoices-manage__fieldset.g-fieldset
				.invoices-manage__row
					AppField(
						name="number",
						v-model="formData.number",
						label="Number:",
						v-validate="'required'",
						iconName="settings",
						readonly,
						@click="formData.number = $helpers.numberGenerate(S_INVOICES_LIST, typeAdd)",
						:color="!typeAdd ? 'disabled': ''",
						data-vv-as="Number"
					)

					AppField(
						name="dateInvoice",
						v-model="formData.date_due",
						label="Invoice Date:",
						v-validate="'required'",
						iconName="calendar",
						type="calendar",
						data-vv-as="Invoice Date"
					)
				.invoices-manage__row
					AppField(
						name="dateSupply",
						v-model="formData.date_supply",
						label="Supply Date:",
						v-validate="'required'",
						iconName="calendar",
						type="calendar",
						data-vv-as="Supply Date"
					)
				.invoices-manage__row
					AppField(
						name="comment",
						v-model="formData.comment",
						label="Comment:",
						tagName="textarea",
						v-validate="'required|min:10|max:2000'",
						data-vv-as="Comment"
					)
			.invoices-manage__btn
				AppBtn(
					iconName="go-back-left-arrow",
					tagName="router-link",
					:to="{name: 'InvoicesList'}",
					title="Back"
				)
				AppBtn(
					iconName="upload",
					type="submit",
					:color="formValidateStatus ? 'disabled' : ''"
				) Save
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { formValidate } from '@/mixins';
import { MODULES } from '@/scripts/constants';

export default {
	name: 'InvoicesManage',
	mixins: [formValidate],
	watch: {
		S_INVOICES_ITEM(val) {
			if (!val && this.typeAdd) return;
			this.setFormData();
			this.$nextTick(() => {
				this.$validator.validateAll();
			});
		}
	},
	data() {
		return {
			typeAdd: this.$route.name === 'InvoicesItemAdd',
			formData: {
				id: '',
				direction: '',
				number: '',
				date_created: '',
				date_due: '',
				date_supply: '',
				comment: ''
			}
		};
	},
	created() {
		this.setFormData();
	},
	computed: {
		...mapState(MODULES.invoices, [
			'S_INVOICES_ITEM',
			'S_INVOICES_LIST'
		]),
		...mapState(['S_LOADING'])
	},
	methods: {
		...mapActions(MODULES.invoices, [
			'A_INVOICES_MANAGE'
		]),
		setFormData() {
			const item = { ...this.S_INVOICES_ITEM };
			
			if (this.typeAdd) return;
			if (!this.S_LOADING && !item.date_created) this.$router.push({ name: '404' });
			
			Object.keys(this.formData).map((key) => {
				if (key.includes('date')) item[key] = item[key] && this.$helpers.pickerDate(item[key]);
				this.formData[key] = item[key];
			});
		},
		invoiceSave() {
			const data = this.formData;
			
			if (this.typeAdd) {
				data.date_created = new Date();
				data.id = this.$helpers.idGenerate(this.S_INVOICES_LIST);
				data.typeManage = 'add';
				this.formData.id = this.$helpers.idGenerate(this.S_INVOICES_LIST);
			} else {
				data.typeManage = 'edit';
			}
			
			this.$validator.validateAll().then((result) => {
				if (!result) {
					this.errorsFields(false);
					return;
				}
				
				this.A_INVOICES_MANAGE(data).then(() => {
					this.$router.push({ name: 'InvoicesList' });
				});
			});
		}
	}
};
</script>

<style lang="scss">
	.invoices-manage {
		&__row {
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-bottom: em(3);

			&:last-child {
				margin-bottom: 0;
			}
		}

		&__btn {
			margin-top: em(3);
			display: flex;
			align-items: center;
			justify-content: space-between;

			.app-btn {
				&:first-child {
					padding: em(1);

					.app-icon {
						margin-left: 0;
					}
				}
			}
		}

		&__fieldset {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.app-field__wrapper {
				width: calc(50% - 10px);

				@include media($width_xs) {
					width: 100%;

					&:not(:last-child) {
						margin-bottom: em(3);
					}
				}

				.app-icon {
					pointer-events: none;
				}

				&.field {
					&__textarea {
						width: 100%;
						max-width: 100%;

						textarea {
							resize: vertical;
							min-height: 200px;
							max-height: 400px;
						}
					}
				}
			}
		}
	}
</style>

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
						@click="numberGenerate",
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
import { pickerDate } from '@/scripts/functions';
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
		])
	},
	methods: {
		...mapActions(MODULES.invoices, [
			'A_INVOICES_ADD_NEW',
			'A_INVOICES_EDIT'
		]),
		numberGenerate() {
			if (!this.typeAdd) return;

			const maximum = 999999;
			const minimum = 100000;
			const randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
			const invoiceNumber = `INV-${randomnumber}`;

			if (this.S_INVOICES_LIST.find(item => item.number === invoiceNumber)) {
				this.numberGenerate();
				return;
			}
			this.formData.number = invoiceNumber;
		},
		idGenerate() {
			const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
				.replace(/[018]/g, c =>
					(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4)
						.toString(16));

			if (this.S_INVOICES_LIST.find(item => item.id === id)) {
				this.idGenerate();
				return;
			}

			this.formData.id = id;
			return id;
		},
		setFormData() {
			if (this.typeAdd) return;

			const item = { ...this.S_INVOICES_ITEM };

			Object.keys(this.formData).map((key) => {
				if (key.includes('date')) item[key] = item[key] && pickerDate(item[key]);
				this.formData[key] = item[key];
			});
		},
		invoiceSave() {
			this.$validator.validateAll().then((result) => {
				if (!result) {
					this.errorsFields(false);
					return;
				}

				const data = this.formData;
				const dispatchName = this.typeAdd ? 'A_INVOICES_ADD_NEW' : 'A_INVOICES_EDIT';

				if (this.typeAdd) {
					data.date_created = new Date();
					data.id = this.idGenerate();
				}

				this[dispatchName](data).then(() => {
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

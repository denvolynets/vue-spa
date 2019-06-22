export const formValidate = {
	mounted() {
		this.formValidateStatusTrigger();
	},
	methods: {
		errorsFields(hide = true) {
			let requiredFields = [...this.$validator.fields];
			requiredFields.forEach((field) => {
				field.el.setAttribute('aria-hide-error', hide);
				field.el.addEventListener('blur', function() {
					field.el.setAttribute('aria-hide-error', false);
				}, true);
			});
		},
		formValidateStatusTrigger() {
			this.$validator.validateAll().then(() => {
				this.errorsFields(true);
			});
		}
	},
	computed: {
		formValidateStatus() {
			return this.errors.any();
		}
	}
};
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

export const invoicesDelete = {
	methods: {
		invoicesDelete(data) {
			if (!data) throw Error('data is empty');
			
			this.$toast.show(`You are sure that you want to delete the invoice <strong>№ ${data.number}</strong>?`, 'User,', {
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
							data.typeManage = 'delete';
							this.A_INVOICES_MANAGE(data);
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

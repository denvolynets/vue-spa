<script>
export default {
	name: 'AppTextCrop',
	render(h) {
		const checkLength = this.crop && this.text.length > this.maxLength;
		const buttonShowMore = <a href="javascript:void(0)" onClick={this.btnToggleHandle}>{this.btnToggleText}</a>;

		const text = !this.showText && checkLength ? this.cropText.substring(0, this.maxLength) + `... ` : this.text;

		return(
			<span class="app-text-crop">
				{text} {checkLength && buttonShowMore}
			</span>
		);
	},
	props: {
		crop: {
			type: Boolean,
			default: false
		},
		text: {
			type: String,
			default: 'default text',
			required: true
		},
		maxLength: {
			type: [Number, String],
			default: 150
		},
		buttonLabel: {
			type: String,
			default: 'more'
		}
	},
	data() {
		return {
			cropText: this.text,
			showText: false
		};
	},
	methods: {
		btnToggleHandle() {
			this.showText = !this.showText;
		}
	},
	computed: {
		btnToggleText() {
			return `(${!this.showText ? 'show ' + this.buttonLabel : 'hide ' + this.buttonLabel})`;
		}
	}
};
</script>

<style lang="scss">
    .app-text-crop {
		word-break: break-all;
		
        a {
            border-bottom: 1px solid clr(primary);

            &:hover {
                border-bottom-color: transparent;
            }
        }
    }
</style>

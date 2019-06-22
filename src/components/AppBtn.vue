<script>
export default {
	render(h) {
		const BtnTag = this.tagName;
		const AttrsButton = { class: this.classObject };
		const AttrsIcon = {
			props: {
				name: this.iconName
			}
		};

		return (
			<BtnTag to={this.to} class="app-btn" {...AttrsButton}>
				<span class="app-btn__title">{this.$slots.default}</span>
				{this.iconName && <AppIcon {...AttrsIcon}/>}
			</BtnTag>
		);
	},
	props: {
		tagName: {
			type: String,
			default: 'button',
			validator: (value) => {
				return ['button', 'a', 'span', 'div', 'router-link'].indexOf(value) !== -1;
			}
		},
		color: {
			type: String
		},
		iconName: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: ''
		},
		to: {
			type: [String, Object],
			default() {}
		}
	},
	computed: {
		classObject() {
			const name = 'app-btn__';
			return {
				[`${name}disabled`]: this.color === 'disabled',
				[`${name}icon`]: this.iconName
			};
		}
	}
};
</script>

<style lang="scss">
	.app-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		outline: none;
		background-color: clr(primary);
		color: clr(white);
		padding: em(1) em(4);
		border-radius: $br_1;
		cursor: pointer;
		transition: all $trans;

		&:hover {
			background-color: clr(primary, light);
			color: clr(white);
		}

		&__disabled {
			background-color: clr(secondary, dark);

			&:hover {
				background: clr(secondary, dark_h);
			}
		}

		&__icon {
			.app-icon {
				width: 20px;
				height: 20px;
				fill: clr(white);
				margin-left: 5px;
			}
		}
	}
</style>
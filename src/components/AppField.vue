<script type="text/jsx">
import AppIcon from '@Components/AppIcon';
import Cleave from 'cleave.js';

export default {
	name: 'AppField',
	render(h) {
		let FieldTag = this.tagName;
		let AttrsMain, AttrsWrapper, AttrsIcon;
		let FieldSelector, FieldLabel, FieldError, AppIconComponent;

		const Generate = {
			attrs: () => {
				AttrsMain = {
					on: { ...this.inputListeners },
					domProps: {
						value: this.value
					},
					props: {
						value: this.value
					},
					attrs: {
						error: this.errors.first(this.name),
						...this.$attrs
					},
					class: { 'app-field__input': true }
				};

				AttrsWrapper = {
					class: this.classObject,
					ref: this.type == 'select' ? 'select' : 'input'
				};

				AttrsIcon = {
					props: {
						name: this.iconName
					}
				};

				if (this.type === 'calendar') {
					FieldTag = 'v-date-picker';
					AttrsMain.props.locale = 'en';
					AttrsMain.ref = 'masked';
				}
			},

			components: () => {
				AppIconComponent = this.iconName && <AppIcon class="form-svg" {...AttrsIcon}/>;
				FieldSelector = <FieldTag {...AttrsMain}></FieldTag>;
				FieldLabel = <div class="app-field__label">{this.placeholder || this.label}</div>;
				FieldError = this.errors.has(this.name) && (
					<strong class="app-field__error">{this.errors.first(this.name)}</strong>
				);
			}
		};

		Generate.attrs();
		Generate.components();

		return (
			<div class="app-field__wrapper" {...AttrsWrapper}>
				{FieldLabel}
				<div class="app-field__inner">
					{AppIconComponent}
					{FieldSelector}
				</div>
				{FieldError}
			</div>
		);
	},
	components: { AppIcon },
	inject: ['$validator'],
	inheritAttrs: false,
	props: {
		type: {
			type: String,
			default: 'text'
		},
		name: {
			type: String,
			required: true
		},
		tagName: {
			type: String,
			default: 'input'
		},
		label: {
			type: String,
			default: ''
		},
		value: {
			type: ''
		},
		iconName: {
			type: String
		},
		color: {
			type: String
		}
	},
	data() {
		return {
			calendarInput: ''
		};
	},
	mounted() {
		if (!this.$refs.masked) return;

		const maskedElement = this.$refs.masked.$el;
		this.calendarInput = maskedElement.querySelector('input');
		const cleave = new Cleave(this.calendarInput, {
			date: true,
			datePattern: ['d', 'm', 'Y'],
			delimiter: '.'
		});
	},
	computed: {
		inputListeners: function() {
			let vm = this;
			return Object.assign({},
				this.$listeners,
				{
					focus: function(event) {
						vm.$emit('focus', event);
					},
					blur: function(event) {
						vm.$emit('blur', event);
					},
					input: function(event) {
						if (vm.type === 'calendar') {
							vm.calendarInput.value = event && vm.$helpers.formatDate(event);
							vm.$emit('input', event);
							return;
						}
						vm.$emit('input', event.target.value);
					},
					change: function(event) {
						vm.$emit('input', event.target.value);
					}
				}
			);
		},
		classObject() {
			const name = 'field__';
			return {
				[`${name}error`]: this.errors.has(this.name),
				[`${name}label`]: this.label,
				[`${name}icon`]: this.iconName,
				[`${name}${this.tagName}`]: this.tagName,
				[`${name}${this.color}`]: this.color,
				[`${name}has_value`]: !this.errors.has(this.name)
			};
		}
	}
};
</script>

<style lang="scss">
    .app-field {
		$af: &;
		$field: '.field';

		&__input:not(.vc-reset),
		&__input.vc-reset input {
            min-height: 20px;
            padding: em(1) em(2);
            outline: none;
            border: 1px solid clr(text, base);
			transition: all $trans;
            width: 100%;
            box-sizing: border-box;
			border-radius: $br_1;
			box-shadow: none;

            &:read-only {
                cursor: pointer;
            }

            &:focus{
				border-color: clr(primary);
				box-shadow: none;
            }
        }

        &__error {
            font-size: 12px;
            color: clr(error);
            font-weight: normal;
            position: absolute;
			margin-top: 2px;
			display: none;
        }

        &__label {
            margin-bottom: 5px;
            color: clr(dark, light);
            font-weight: 600;
            font-size: $fsz_h6;
        }

        &__inner {
            position: relative;
            width: 100%;
        }

        &__wrapper {
            width: 50%;
            max-width: 600px;
			position: relative;

			&:not([aria-hide-error="true"]) {
				#{$af}__error {
					display: block;
				}
			}

            &#{$field} {
                &__error:not([aria-hide-error="true"]){
                    #{$af} {
						&__input,
						&__input.vc-reset input {
                            border-color: clr(error);
                        }
                    }

                    &#{$field}__icon {
                        .app-icon {
                            border-color: clr(error);
                            fill: clr(error);
                        }
                    }
                }

                &__icon {
                    .app-icon {
                        cursor: pointer;
                        width: 20px;
                        height: 100%;
                        position: absolute;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        margin: auto;
                        padding: 0 20px;
                        border-left: 1px solid clr(text, base);
                        transition: all $trans;
                        fill: clr(text, base);
                    }
				}

				&__disabled {
					opacity: .55;
					cursor: default;

					#{$af}__input {
						cursor: auto;
					}
				}
            }

            &:focus,
			&:focus-within {
                #{$af} {
					&__input,
					&__input.vc-reset input {
                        border-color: clr(primary)
                    }
                }
			}

			&#{$field}__has_value[aria-hide-error] {
				#{$af} {
					&__input,
					&__input.vc-reset input {
                        border-color: clr(success)
                    }
                }

                &#{$field}__icon {
                    .app-icon {
                        border-color: clr(success);
                        fill: clr(success);
                    }
                }
			}
        }
    }

</style>

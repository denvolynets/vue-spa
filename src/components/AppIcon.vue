<script type="text/jsx">
export default {
	name: 'AppIcon',
	render(h) {
		return (
			<svg class="app-icon" role="presentation">
				<use xlinkHref={this.src}/>
			</svg>
		);
	},
	props: {
		name: {
			type: String,
			default: 'null'
		}
	},
	computed: {
		src() {
			return `#${this.name}`;
		}
	}
};
</script>

<script>
export default {
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

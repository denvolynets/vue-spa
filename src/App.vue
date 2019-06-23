<template lang="pug">
	main#app
		Loading(
			:active.sync="S_LOADING",
			:can-cancel="true",
			:is-full-page="true",
			color="#4973FF",
			:opacity="0.9"
		)
		.g-grid
			router-view

</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { mapState, mapMutations } from 'vuex';
export default {
	components: {
		Loading
	},
	computed: {
		...mapState(['S_LOADING'])
	},
	methods: {
		...mapMutations(['M_LOADING'])
	},
	created() {
		window.Axios.interceptors.response.use(null, (error) => {
			if (error) {
				this.$toast.error(`An unknown error has occurred.`, 'Error');
				this.M_LOADING(false);
			}
		});
	}
};
</script>
<style lang="scss">
	@import '~@/scss/general';
</style>

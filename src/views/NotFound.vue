<template lang="pug">
    .not-found
        h1 Error 404!
        AppBtn(tagName="router-link", :to="{name: 'InvoicesList'}") Go Home page
</template>

<script>
import { mapMutations } from 'vuex';
export default {
	name: 'NotFound',
	created() {
		this.M_LOADING(false);
	},
	methods: {
		...mapMutations(['M_LOADING'])
	}
};
</script>

<style lang="scss" scoped>
    .not-found {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 400px;

        h1 {
            font-size: 70px;
            margin-bottom: em(1);
        }
    }
</style>

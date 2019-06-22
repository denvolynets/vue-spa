<template lang="pug">
	.invoices__actions
		.container
			h4.invoices__actions-title Actions
			AppBtn(iconName="approve-invoice" :tagName="`router-link`", :to="{name: 'InvoicesItemAdd'}") Add new
</template>

<script>
export default {
	name: 'InvoicesActions'
};
</script>
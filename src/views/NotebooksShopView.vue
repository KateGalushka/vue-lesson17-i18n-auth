<template>
	<div class="container">
		<product-filters/>
		<products-list/>
	</div>
</template>

<script>
import ProductFilters from '@/components/ProductFilters.vue';
import ProductsList from '@/components/ProductsList.vue';

	export default {
    name: 'NotebooksShopView',
    components: { ProductFilters, ProductsList }
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	margin: 3rem auto;
}

</style>
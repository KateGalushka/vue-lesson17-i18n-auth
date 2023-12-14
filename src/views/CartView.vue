<template>
	<div class="container">
		<h2>{{ $t('cart.title') }}</h2>
		<cart-list/>
		<router-link :to="{name:'shop'}" class="button">{{ $t('actionTitles.back') }}</router-link>
	</div>
</template>

<script>
import CartList from '../components/CartList'

	export default {
		name: 'CartView',

		components: {
			CartList,
		},
	}
</script>

<style lang="scss" scoped>
.container{
	max-width: 75vw;
	margin: 0 auto;
}
h2 {
	color: rgb(107, 107, 167);
}
a {
	text-decoration: none;
	display: block;
	width: 200px;
	margin: 3rem auto;
	background-color: lightgrey;
	border: 1px solid grey;
	color: #000;
	margin-bottom: 2rem;
}

</style>
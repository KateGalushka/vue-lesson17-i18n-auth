<template>
	<div class="product-container">
			<div class="product__img">
				<img :src="itemInCart.imgSrc">
			</div>
			<p> {{ itemTitle }}</p>
			<p class="product__price">
				{{ itemInCart.price }} ₴
			</p>
			<button class="button" @click="removeItemFromCart(itemInCart.id)" >
				<font-awesome-icon :icon="['fas', 'delete-left']" />
				{{ $t('actionTitles.delete') }}
			</button>
		</div>
</template>

<script>
import { mapActions } from 'vuex';

	export default {
		name: 'CartItem',
		props: {
			itemInCart: {
				type: Object,
				default: ()=>({})
			},
		},
		computed: {
			itemTitle() {
				return (this.$i18n.locale === 'ua' ? this.itemInCart.title.ua : this.itemInCart.title.en)
			}
		},

		methods: {
			...mapActions('cart', ['removeItemFromCart']) 
		},

	}
</script>

<style lang="scss" scoped>
.product-container{
	display: flex;
	// flex-direction: column;
	align-items: center;
	gap: 2rem;
	// width: 18rem;
	justify-content: space-between;
	border: .5px solid grey;
	border-radius: .5rem;
	padding: 1rem .5rem;
	&:hover {
		box-shadow: 5px 8px 8px rgb(93, 88, 88);
	}
}
.product__img{
	max-width: 150px;
	img{
		max-width: 100%;
	}
}
</style>
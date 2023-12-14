<template>
	<div v-if="isCartEmpty" class="message">
		{{ $t('cart.message') }}
	</div>
	<div v-else class="cart-container">
		<cart-item v-for="item in getCartList" :key="item.id" :item-in-cart="item"/>
		<div>{{ $t('cart.total') }}: {{ getTotalSum }} ₴</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex';
import CartItem from './CartItem.vue';


	export default {
		name: 'CartList',

		components: { CartItem },
		
		computed: {
			...mapGetters('cart', ['getCartList', 'getTotalSum']),

			isCartEmpty(){
				return !this.getCartList.length;

			} 
		},
	}
</script>

<style lang="scss" scoped>
.cart-container{
	display: flex;
	flex-direction: column;
	gap: 1.5em;
	
}
.message {
	margin: 3rem;
	font-size: 1.5rem;
	color: rgb(107, 107, 167);
}

</style>
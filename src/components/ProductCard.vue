<template>
	<div class="product-container">
		<div class="edit">
			<button v-if="userPermissions.update" @click="onEdit">
				<font-awesome-icon :icon="['fas', 'pen-to-square']" />
				{{ $t('actionTitles.edit') }}
			</button><br>
			<button v-if="userPermissions.delete" @click="deleteNotebook(productData.id)">
				<font-awesome-icon :icon="['fas', 'trash-can']" />
				{{ $t('actionTitles.delete') }}
			</button>
		</div>
		<div class="product__img">
			<img :src="productData.imgSrc">
		</div>
		<div class="product__desrc">
			<h3> {{ productTitle }}</h3>
			<p v-if="isDiscount" class="product__old-price"> 
				<span> {{ productData.oldPrice }}</span> ₴
			</p>
			<div>
				<p class="product__price">
					<span> {{ productData.price }} ₴ </span> 
					<button class="cart-btn" @click="onAddToCart"><font-awesome-icon icon="cart-shopping" /></button>
				</p>
			</div>
			
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
		name: 'ProductCard',

		props: {
			productData: {
				type: Object,
				default: () => ({}),
			},
		},
		computed: {
			...mapGetters('users', ['userPermissions']),
			...mapGetters('auth', ['getUser']),

			isDiscount() {
				if (this.productData.oldPrice){
					return (this.productData.oldPrice-this.productData.price)
				} else return null
			},
			productTitle() {
				return (this.$i18n.locale === 'ua' ? this.productData.title.ua : this.productData.title.en)
			},
		},
		methods: {
			...mapActions('notebooks', ['deleteNotebook']),
			...mapActions('cart', ['addItemToCart']),

			onEdit() {
				this.$router.push({
					name: 'productEditor',
					params: {
						productId: this.productData.id
					}
				})
			},
			onAddToCart() {
				if (this.getUser) {
					this.addItemToCart(this.productData);
					this.$router.push({
						name: 'cart'
					})
				} else {
					this.$router.push({
						name: 'login'
					})
				}
				
			}
		},
	}
</script>

<style lang="scss" scoped>
.product-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	width: 18rem;
	justify-content: space-between;
	border: .5px solid grey;
	border-radius: .5rem;
	padding: 1rem .5rem;
	&:hover {
		box-shadow: 5px 8px 8px rgb(93, 88, 88);
	}
}
.edit {
	align-self: flex-end;
	button{
		cursor: pointer;
		padding: .25rem;
		margin: .25rem;
	}

}
.product__img{
	max-width: 250px;
	img{
		max-width: 100%;
	}
}
.product__desrc {
	display: flex;
	flex-direction: column;
	// padding: 20px;
	h3{
		color:rgb(107, 107, 167);
		font-size: 1.125rem;
		margin: 1rem 0 2rem;
	}
}

.product__old-price{
	color: rgb(37, 37, 37);
	align-self: flex-start;
	margin-left: 1.5rem;
	span {
		text-decoration: line-through;
	}
}
.product__price{
	color:red;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	margin: 0 1.5rem;
	span {
		font-size: 1.5rem;
	}
}
.cart-btn{
	color: green;
	font-size: 1.5rem;
	background-color: #fff;
	border: none;
	cursor:pointer;
}


</style>
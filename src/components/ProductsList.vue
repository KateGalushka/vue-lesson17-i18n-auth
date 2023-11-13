<template>
	<div class="products__container">
		<div v-for="product in currentCategory.products" :key=product.id class="product__card">
			<img :src="product.imgSrc">
			<div class="product__desrc">
				<h2> {{ product.title }}</h2>
				<p class="product__discount">
					Ваша економія: <span>{{ product.discount }}₴</span> 
				</p>
				<p class="product__old-price"> 
					<span> {{ product.oldPrice }}</span> ₴
				</p>
				<div class="product__price">
					<span>{{ product.price }} ₴</span>
					<a :href="product.link" target="_blank">
							<button>Купити</button>
					</a>
				</div>
			</div>
		</div>
		<div class="nav__buttons">
			<button @click="goBack">НАЗАД</button>
			<button @click="goHome">НА ГОЛОВНУ</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
	export default {
		name: 'ProductsList',

		data() {
			return {
				currentCategory: {}
			}
		},
		computed: {
			...mapGetters(['getCategoryById']),

			currentCategoryId() {
				return this.$route.params.categoryId
			},
		},
		methods: {
			goBack() {
				this.$router.push({
					name:'shop'
				})
			},
			goHome(){
				this.$router.push({
					name:'home'
				})
			}
		},
		created() {
			this.currentCategory = this.getCategoryById(this.currentCategoryId);
		},
	}
</script>

<style lang="scss" scoped>
button{
	cursor: pointer;
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
}
.products__container{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 15px;
	max-width: 75vw;
	padding: 15px;
	background-color: rgb(236, 236, 236);
}
.product__card{
	flex-basis: 45%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fff;
	gap: 15px;
	padding: 15px;
	border-radius: 10px;
	&:hover{
		box-shadow: 5px 5px 10px rgb(105, 68, 114);
	}
	img{
		width: 150px;
		height: 130px;
		object-fit: cover;
		margin-right: 10px;
	}
}
.product__descr {
	display: flex;
	flex-direction: column;
}
h2{
	color:rgb(107, 107, 167);
	font-size: 1.1em;
	margin: 10px 0;
}
.product__discount {
	margin: 0;
	font-size: 0.75em;
	color: rgb(37, 37, 37);
	span{
		color:red;
	}
}
.product__old-price{
	color: rgb(37, 37, 37);
	font-size: 0.85em;
	span{
		text-decoration: line-through;
	}
}
.product__price{
	color:red;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	span{
		font-size: 1.5em;
		margin-right: 5px;
	}
	button{
		background-color: green;
		color:#fff;
		margin-right: 10px;
	}
}
.nav__buttons button{
	margin: 10px;
	font-weight: bold;
	background-color: rgb(153, 153, 235);
	&:hover{
		transform: translateY(2px);
		box-shadow: 0 4px 8px rgba(153, 130, 199, 0.4) , -3px 0 inset;
	}
}
</style>
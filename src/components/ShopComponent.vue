<template>
	<div class="category-container">
		<div v-for="category in categoriesList"
		 :key="category.id"
		 class="category__card"
		 @click="onSelectCategory(category.id)"
		>
			{{ category.title }}
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	export default {
		name: 'ShopComponent',

		computed: {
		...mapGetters(['categoriesList'])
		},
		methods: {
			...mapActions(['loadCategoriesList']),

			onSelectCategory(id) {
				this.$router.push({
					name: 'products',
					params: {
						categoryId: id
					}
				})
			}
		},
		created () {
			this.loadCategoriesList();
		},

	}
</script>

<style lang="scss" scoped>
.category-container{
	display: flex;
	flex-direction: column;
	padding: 10px;
	gap: 20px;
}
.category__card{
	cursor: pointer;
	background-color: rgba(224, 190, 236, 0.7);
	padding: 20px 100px;
	text-align: center;
	font-size: 20px;
	font-weight: 600;
	border-radius: 10px;
	&:hover{
		box-shadow: 5px 5px 10px rgb(105, 68, 114);
		transform: scale(1.03);
	}

}

</style>
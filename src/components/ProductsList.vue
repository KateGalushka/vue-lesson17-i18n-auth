<template>
	<div v-if="isLoading">Loading ....</div>
	<div v-else-if="hasError">Error</div>
	<template v-else>
		<div>
			<button v-if="userPermissions.create" class="button add-btn" @click="onAdd" >{{ $t('actionTitles.add') }} </button>
			<div class="list-container">
				<product-card 
					v-for="note in getNotebooksList" :key="note.id" :product-data="note">
				</product-card>
				<div v-if="isListEmpty" class="message">
					{{ $t('list.message') }}
				</div>
			</div>

		</div>
	</template>

</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import ProductCard from './ProductCard.vue';

	export default {
		name: 'ProductsList',
		components: {
			ProductCard,
		},
		computed: {
			...mapGetters('notebooks', ['hasError','isLoading', 'getNotebooksList']),
			...mapGetters('users', ['userPermissions']),

			isListEmpty(){
				return !this.getNotebooksList.length;
			} 
		},
		created () {
			this.loadNotebooksList();
		},
		methods: {
			...mapActions('notebooks', ['loadNotebooksList']),
			
			onAdd(){
				this.$router.push({
					name: 'productEditor'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.list-container{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	// align-items: center;
	max-width: 90vw;
	gap: 2rem;
}
.message {
	margin: 3rem;
	font-size: 1.5rem;
	color: rgb(107, 107, 167);
}
.add-btn {
	margin-bottom: 2rem;
	padding: 1rem 3rem;
}

</style>
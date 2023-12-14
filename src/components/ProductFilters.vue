<template>
	<div class="filters-container">
		<div class="filters">
			<h2>{{ $t('filters.seller') }}:</h2>
			<label v-for="seller in getSellersList" :key="seller.id">
				<input v-model="filterObj.checkedSellers" type="checkbox"  :value="seller.title">
						{{ seller.title }}
			</label>
		</div>
		<div class="filters">
			<h2>{{ $t('filters.brand') }}:</h2>
			<input v-model="brandSearchInput" type="text" :placeholder="$t('filters.search')" >
			<label v-for="brand in getBrandsList" :key="brand.id">
				<input v-model="filterObj.checkedBrands" type="checkbox"  :value="brand.title">
					{{ brand.title }}
			</label>
		</div>
		<button class="button" @click="onClearFilter" >
			<font-awesome-icon :icon="['fas', 'eraser']" />
			{{ $t('actionTitles.clearFilters') }}
		</button>

	</div>
	
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
		name: 'ProductFilters',
		data() {
			return {
				filterObj: {
					checkedSellers: [],
					checkedBrands: [],
				},
				brandSearchInput: null
			}
		},
		computed: {
			...mapGetters('brands', ['getBrandsList']), 
			...mapGetters('sellers', ['getSellersList']), 
		},
		watch: {
			brandSearchInput(newVal, oldValue){
				if (newVal) {
					this.loadFilteredBrandsList(newVal);
				}
				if (oldValue && newVal==''){
					this.loadBrandsList();
				}
			},
			filterObj: {
				handler(newVal, oldValue){
					if (newVal) {
					 this.updateFilterObj(newVal);
					 this.loadFilteredNotebooksList(newVal);
					};
					if (oldValue !== '' && newVal == '') {
					this.loadNotebooksList();
					}	
				},
				deep: true
			},

		},
		created () {
			this.loadSellersList();
			this.loadBrandsList();
		},

		methods: {
			...mapActions('sellers', ['loadSellersList','updateSellersFilter'] ), 
			...mapActions('brands', ['loadBrandsList', 'loadFilteredBrandsList', 'updateBrandsFilter'] ), 
			...mapActions('notebooks', ['loadNotebooksList', 'loadFilteredNotebooksList', 'updateFilterObj']),

			onClearFilter(){
				this.filterObj.checkedBrands = [];
				this.filterObj.checkedSellers = [];
				this.brandSearchInput = '';
			}
		},
		
	}
</script>

<style lang="scss" scoped>
.filters-container{
	display: flex;
	flex-direction: column;
	gap:2rem;
	margin-right: 2rem;
}
.filters {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	border: 1px solid #000;
	border-radius: .5rem;
	padding: 1rem;
	input[type="text"]{
		margin-bottom: 1rem;
		font-size: 1rem;
		padding: .25rem;	
	}
}


</style>
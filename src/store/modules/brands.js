import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('brands')

export default ({
	namespaced: true,
	state: {
		brandsList: [],
		loading: false,
		error: null,
		brandsFilter: []
	},
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getBrandsList: (state) => state.brandsList.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())),
		getBrandById: (state) => (brandId) => state.brandsList.find((note) => note.id == brandId),
	},
	mutations: {
		setBrandsList(state, list) {
			state.brandsList = list
		},
		setError(state, error) {
			state.error = error
		},
		setLoading(state, value) {
			state.loading = value
		},
		deleteBrand(state, brandId) {
			state.brandsList = state.brandsList.filter((note) => note.id !== brandId)
		},
		updateBrandsFilter(state, filterData){
			state.brandsFilter = [...filterData]
		}
	},
	actions: {
		loadBrandsList({ commit }) {
			commit('setError', null);
			commit('setLoading', true);

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setBrandsList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addBrand({ commit, dispatch }, brandData) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.addItem(brandData)
				.then(() => {
					dispatch('loadBrandsList');
					commit('addBrand', brandData)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},

		// deleteBrand({ commit, dispatch }, brandId) {
		// 	commit('setError', null);
		// 	commit('setLoading', true);
		// 	collectionDB
		// 		.deleteItem(brandId)
		// 		.then(() => {
		// 			dispatch('loadBrandsList').then(() => {
		// 				commit('deleteBrand', brandId);
		// 			})
		// 		})
		// 		.catch((error) => {
		// 			commit('setError', error)
		// 		})
		// 		.finally(() => {
		// 			commit('setLoading', false)
		// 		})
		// },
		// updateBrand({ commit, dispatch }, { brandId, brandData }) {
		// 	console.log('brandId', brandId);
		// 	console.log('brandData', brandData);
		// 	commit('setError', null);
		// 	commit('setLoading', true);
		// 	collectionDB
		// 		.updateItem(brandId, brandData)
		// 		.then(() => {
		// 			dispatch('loadBrandsList')
		// 		})
		// 		.catch((error) => {
		// 			commit('setError', error)
		// 		})
		// 		.finally(() => {
		// 			commit('setLoading', false)
		// 		})
		// },
		loadFilteredBrandsList({ commit }, filterVal) {
			commit('setError', null);
			commit('setLoading', true);
			
			collectionDB
				.loadFilteredData('title', '>=', filterVal)
				.then((list) => {
					commit('setBrandsList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})

		},
		updateBrandsFilter({ commit }, filterData){
			commit('updateBrandsFilter', filterData)
		}
	},

})

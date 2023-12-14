import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('sellers')

export default ({
	namespaced: true,
	state: {
		sellersList: [],
		loading: false,
		error: null,
		sellersFilter: []
	},
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getSellersList: (state) => state.sellersList,
		
		getSellerById: (state) => (sellerId) => state.sellersList.find((note) => note.id == sellerId),
	},
	mutations: {
		setSellersList(state, list) {
			state.sellersList = list
		},
		setError(state, error) {
			state.error = error
		},
		setLoading(state, value) {
			state.loading = value
		},
	},
	actions: {
		loadSellersList({ commit }) {
			commit('setError', null);
			commit('setLoading', true);

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setSellersList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		// addSeller({ commit, dispatch }, sellerData) {
		// 	commit('setError', null);
		// 	commit('setLoading', true);
		// 	collectionDB
		// 		.addItem(sellerData)
		// 		.then(() => {
		// 			dispatch('loadSellersList')
		// 		})
		// 		.catch((error) => {
		// 			commit('setError', error)
		// 		})
		// 		.finally(() => {
		// 			commit('setLoading', false)
		// 		})
		// },

		// deleteSeller({ commit, dispatch }, sellerId) {
		// 	commit('setError', null);
		// 	commit('setLoading', true);
		// 	collectionDB
		// 		.deleteItem(sellerId)
		// 		.then(() => {
		// 			dispatch('loadSellersList').then(() => {
		// 				commit('deleteSeller', sellerId);
		// 			})
		// 		})
		// 		.catch((error) => {
		// 			commit('setError', error)
		// 		})
		// 		.finally(() => {
		// 			commit('setLoading', false)
		// 		})
		// },
		// updateSeller({ commit, dispatch }, { sellerId, sellerData }) {
		// 	console.log('sellerId', sellerId);
		// 	console.log('sellerData', sellerData);
		// 	commit('setError', null);
		// 	commit('setLoading', true);
		// 	collectionDB
		// 		.updateItem(sellerId, sellerData)
		// 		.then(() => {
		// 			dispatch('loadSellersList')
		// 		})
		// 		.catch((error) => {
		// 			commit('setError', error)
		// 		})
		// 		.finally(() => {
		// 			commit('setLoading', false)
		// 		})
		// },
		updateSellersFilter({ commit }, filterData){
			commit('updateSellersFilter', filterData)
		}
	},

})

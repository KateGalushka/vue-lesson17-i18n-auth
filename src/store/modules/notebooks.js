import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('notebooks')

export default({
	namespaced: true,
	state: {
		notebooksList:[],
		loading: false,
		error: null,
		filterObj: {
			checkedSellers: [],
			checkedBrands: []
		}
	},
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getNotebooksList: (state) => state.notebooksList,
		getNotebookById: (state) => (notebookId) => state.notebooksList.find((note) => note.id == notebookId),
	},
	mutations: {
		setNotebooksList(state, list) {
			state.notebooksList = list
		},
		setError(state, error) {
			state.error = error
		},
		setLoading(state, value) {
			state.loading = value
		},
		deleteNotebook(state, notebookId) {
			state.notebooksList = state.notebooksList.filter((note) => note.id !== notebookId)
		},
		updateFilterObj(state, filterObjData){
			state.filterObj = filterObjData;
		}
	},
	actions: {
		loadNotebooksList({ commit }) {
			commit('setError', null);
			commit('setLoading', true);

			collectionDB
				.loadItemsList()
				.then((list) => {
					commit('setNotebooksList', list)
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		addNotebook({ commit, dispatch }, notebookData) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.addItem(notebookData)
				.then(() => {
					dispatch('loadNotebooksList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},

		deleteNotebook({ commit, dispatch }, notebookId) {
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.deleteItem(notebookId)
				.then(() => {
					dispatch('loadNotebooksList').then(() => {
						commit('deleteNotebook', notebookId);
					})
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		updateNotebook({ commit, dispatch }, { notebookId, notebookData }) {
			console.log('notebookId', notebookId);
			console.log('NotebookData', notebookData);
			commit('setError', null);
			commit('setLoading', true);
			collectionDB
				.updateItem(notebookId, notebookData)
				.then(() => {
					dispatch('loadNotebooksList')
				})
				.catch((error) => {
					commit('setError', error)
				})
				.finally(() => {
					commit('setLoading', false)
				})
		},
		loadFilteredNotebooksList({ commit, dispatch }, filterObj){
			const sellersFilterArr = filterObj.checkedSellers;
			const brandsFilterArr = filterObj.checkedBrands;
			if (sellersFilterArr.length && brandsFilterArr.length){
				
				console.log('Sellers', sellersFilterArr);
				console.log('Brands', brandsFilterArr);
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.loadFilteredDataWithTwoFields('seller', 'in', sellersFilterArr, 'brand', 'in', brandsFilterArr)
					.then((list) => {
						commit('setNotebooksList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			} else if (sellersFilterArr.length && !brandsFilterArr.length) {
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.loadFilteredData('seller', 'in', sellersFilterArr)
					.then((list) => {
						commit('setNotebooksList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			} else if (!sellersFilterArr.length && brandsFilterArr.length) {
				commit('setError', null);
				commit('setLoading', true);
				collectionDB
					.loadFilteredData('brand', 'in', brandsFilterArr)
					.then((list) => {
						commit('setNotebooksList', list)
					})
					.catch((error) => {
						commit('setError', error)
					})
					.finally(() => {
						commit('setLoading', false)
					})
			} else {
				dispatch('loadNotebooksList')
			}

		},
		updateFilterObj({ commit }, filterObjData){
			commit('updateFilterObj', filterObjData);
			console.log('filter: ', filterObjData)
		}
	},
	
})

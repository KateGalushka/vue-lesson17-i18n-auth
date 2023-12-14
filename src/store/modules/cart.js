export default ({
	namespaced: true,
	state: {
		cartList: [],
		
	},
	getters: {
		getCartList: (state) => state.cartList,
		getTotalSum: (state) => state.cartList.reduce((sum, current) => sum + current.price, 0 )
		
	},
	mutations: {
		addItemToCart(state, productData){
			state.cartList.push(productData)
		},
		removeItemFromCart(state, itemId){
			state.cartList = state.cartList.filter(item => item.id !== itemId)
		}
	
	},
	actions: {
		addItemToCart({ commit }, productData){
			commit('addItemToCart', productData)
		},
		removeItemFromCart({ commit }, itemId){
			commit('removeItemFromCart', itemId)
		}

	},

})

import { createStore } from 'vuex'
import auth from './modules/auth'
import notebooks from './modules/notebooks'
import brands from './modules/brands'
import sellers from './modules/sellers'
import cart from './modules/cart'
import users from './modules/users'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
		auth,
		notebooks,
		brands,
		sellers,
		cart,
		users
		
	 },
})

import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
			meta: {
				requireAuth: false,
			},
    },
    {
        path: '/shop',
        name: 'shop',
		 component: () => import('../views/NotebooksShopView.vue'),
		 meta: {
			 requireAuth: false,
		 },
    },
    {
        path: '/shop/:productId?',
        name: 'productEditor',
		  props: true,
		 component: () => import('../views/ProductEditorView.vue'),
		 meta: {
			 requireAuth: true,
		 },
    },
    {
        path: '/cart',
        name: 'cart',
		  props: true,
		 component: () => import('../views/CartView.vue'),
		 meta: {
			 requireAuth: true,
		 }
		},
    {
        path: '/login',
        name: 'login',
		  props: true,
		 component: () => import('../views/LoginPage.vue'),
		 meta: {
			 requireAuth: false,
		 },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(async (to) => {
	if (to.meta?.requireAuth) {
		let isAuthenticated = store.state.auth.user;

		if (!isAuthenticated){
			isAuthenticated = await store.dispatch('auth/loginWithCredential')
		}

		if (!isAuthenticated)
			return {
				name: 'login'
			}
	}
})

export default router

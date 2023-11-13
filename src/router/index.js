import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView'
// import ProductsListView from '../views/ProductsListView'
import ProductsList from '../components/ProductsList'
import PaymentsView from '../views/PaymentsView'
import ContactsView from '../views/ContactsView'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/shop',
        name: 'shop',
        component: ShopView,
    },
    {
        path: '/products/:categoryId?',
        name: 'products',
        component: ProductsList,
    },
    {
        path: '/payments',
		  name: 'payments',
		  component: PaymentsView,
    },
    {
        path: '/contacts',
		  name: 'contacts',
		  component: ContactsView,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router

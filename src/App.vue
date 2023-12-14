<template>
	<div class="wrapper">
		<header class="header">
			<nav>
			  <router-link to="/">{{ $t('menu.home') }}</router-link> |
			  <router-link :to="{name:'shop'}">{{ $t('menu.shop' )}}</router-link> |
			  <router-link :to="{name:'cart'}">{{ $t('menu.cart') }} <font-awesome-icon icon="cart-shopping" /></router-link>
			 </nav>
			 <div>
				 <current-lang-component/>
				 <user-profile-component/>

			 </div>

		</header>
		<hr>
		 
		 <router-view />
	</div>
</template>

<script>
	import CurrentLangComponent from '../src/components/CurrentLangComponent.vue';
	import UserProfileComponent from './components/UserProfileComponent.vue';

	export default {
	
		components: { CurrentLangComponent, UserProfileComponent },

		created () {
			this.$i18n.locale = localStorage.getItem('lastLocale') ?? process.env.VUE_APP_I18N_LOCALE;
			// if (localStorage.getItem('lastLocale') !== this.$i18n.locale) {
			// 	localStorage.setItem('lastLocale', this.$i18n.locale)
			// }
			const self = this;
			window.addEventListener('storage', function() {
				// console.log('window.addEventListener');
				if (self.$i18n.locale !== this.localStorage.getItem('lastLocale')) {
					self.$i18n.locale = this.localStorage.getItem('lastLocale');
					self.$router.go()
				}
			})
		},
	}

</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
   //  padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
.wrapper {
	max-width: 90vw;
	margin: 0 auto;
}
.button {
	padding: .5rem 1rem;
	font-size: .875rem;
	align-self: center;
	border-radius: .25rem;
	transition: all .3s ease-out;
	&:hover{
		background-color: rgb(107, 107, 167);
		color: #fff;
		box-shadow: 5px 5px 5px grey;
	}
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem;
	flex-wrap: wrap;
	gap: 1rem;
}

</style>

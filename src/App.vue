<template>
	<div class="container">
		<nav>
        <router-link to="/">Головна</router-link> 
        <router-link to="/shop">Магазин</router-link>
        <router-link to="/payments">Правила оплати</router-link>
        <router-link to="/contacts">Контакти</router-link>
    	</nav>
    <router-view />
	</div>
    
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.container{
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 40px 0;
}

nav {
    padding: 30px;
	 display: flex;
	 gap: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
		  text-decoration: none;
		  padding: 10px;

        &.router-link-exact-active {
            border: 2px solid red;
				border-radius: 10px;
        }
    }
}
</style>

<template>
	<div class="login">
		<h1>{{ $t('loginPage.title') }}</h1>
		<img src="@/assets/login.png">

		<button class="button" @click="onLogin">
			<font-awesome-icon icon="fa-solid fa-user" />
				{{ $t('actionTitles.login') }}
		</button>

	</div>
</template>

<script>
import { mapActions } from 'vuex';

	export default {
		name: 'LoginPage',

		methods: {
		...mapActions('auth', ['loginWithGoogle']),

		async onLogin(){
			try {
				await this.loginWithGoogle();
				this.$router.push({
					name: 'shop'
				})
			}
			catch(error){
				alert(error.message);
			}
		}
	},
	}
</script>

<style lang="scss" scoped>
.login{
	width: 500px;
	margin: 0 auto;
	img{
		width: 100%;
	}
}

</style>
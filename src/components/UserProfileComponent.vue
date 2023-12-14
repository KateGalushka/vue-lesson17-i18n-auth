<template>
	<div v-if="getUser" class="user-profile">
		<span>{{ getUser.displayName }}</span>
		<img :src="imgSrc">
		<button class="button" @click="onLogout">
			<font-awesome-icon icon="fa-solid fa-right-from-bracket" />
				{{ $t('actionTitles.logout') }}
		</button>
	</div>
	<div v-else>
		<button class="button" @click="loginWithGoogle">
			<font-awesome-icon icon="fa-solid fa-user" />
				{{ $t('actionTitles.login') }}
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

	export default {
		name: 'UserProfileComponent',

		computed: {
		...mapGetters('auth', ['getUser']),
		imgSrc(){
			return this.getUser.photoURL? this.getUser.photoURL : '../assets/user.jpg'
		}
	},
	methods: {
		...mapActions('auth', ['loginWithGoogle', 'logout']),

		onLogout() {
			this.logout()
			this.$router.push({
				name: 'home',
			})
		},
	},

	}
</script>

<style lang="scss" scoped>
.user-profile {
	display: flex;
	justify-content:flex-end;
	align-items: center; 
	gap: 1rem;
	img{
		border-radius: 50%;
		width: 2.5rem;
	}
}

</style>
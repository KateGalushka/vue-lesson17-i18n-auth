<template>
	<div>
		<h1>
			{{ $t('homepage.title1')}}
		</h1>
		<div v-if="!getUser">
			<h2>
				{{ $t('homepage.title2') }}
			</h2>
		</div>
		<div v-else>
			{{ $t('homepage.title3') }}, {{ getUser.displayName }}!
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'HomeView',
   
	 computed: {
		...mapGetters('auth', ['getUser']),
	},
}
</script>

<style lang="scss" scoped>
h1 {
	color: rgb(107, 107, 167);
	font-style: italic;
}
</style>


<template>
	<div class="editor">
		<label>
			{{ $t('editor.productTitleEng') }}:
			<input v-model="product.title.en" type="text" :placeholder="$t('editor.productTitleEng')">
		</label>
		<label>
			{{ $t('editor.productTitleUkr') }}:
			<input v-model="product.title.ua" type="text" :placeholder="$t('editor.productTitleUkr')">
		</label>
		<label>
			{{ $t('editor.productBrand') }}:
			<input v-model="product.brand" type="text">
		</label>
		<label>
			{{ $t('editor.productPrice') }}:
			<input v-model="product.price" type="number">
		</label>
		<label>
			{{ $t('editor.productOldPrice')}}:
			<input v-model="product.oldPrice" type="number">
		</label>
		<label>
			{{ $t('editor.productImg') }}:
			<input v-model="product.imgSrc" type="text">
		</label>
		<label>
			{{ $t('editor.productSeller')}}:
			<input v-model="product.seller" type="text">
		</label>
		<div>
			<button class="button" :disabled="isBtnDisabled" @click="onAction"  >
				{{ actionButtonTitle }}
			</button>
			<button class="button" @click="onCancel" >
				{{ $t('actionTitles.cancel') }}
			</button>

		</div>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


	export default {
		name: 'ProductEditorView',
		props: {
			productId: {
				type: String,
				default: null
			},
		},
		data() {
			return {
				product: {
					title: {
						en: null,
						ua: null
					},
					brand: null,
					price: null,
					oldPrice: null,
					imgSrc: null,
					seller: null
				}
			}
		},
		computed: {
			...mapGetters('notebooks', ['getNotebookById']),

			isEditing() {
				return this.productId;
			},
			isBtnDisabled(){
				return !this.product.title || !this.product.brand || !this.product.price || !this.product.seller
			},
			isEng(){
				return this.$i18n.locale =='en'
			},

			actionButtonTitle(){
				if (this.isEng){
					return this.isEditing? 'Update' : 'Add product'
				} else {
					return this.isEditing ? 'Оновити товар' : 'Добавити товар'
				}
			},
		},
		created () {
			if (this.productId) {
				this.product = {...this.getNotebookById(this.productId)};
			};
		},
		methods: {
			...mapActions('notebooks', ['updateNotebook', 'addNotebook']),

			onAction() {
				if (this.isEditing) {
					this.updateNotebook({
						notebookId: this.productId,
						notebookData: this.product
					})
				} else {
					this.addNotebook(this.product);
				}
				this.$router.push({
					name: 'shop'
				})
			},
			onCancel(){
				this.$router.push({ name: 'shop'	})
			}
		},

	}
</script>

<style lang="scss" scoped>
.editor{
	display: flex;
	flex-direction: column;
	max-width: 75vw;
	margin: 0 auto;
	gap: 1rem;
	align-items: flex-start;
}
input{
	width: 300px;
}
</style>
<template>
	<div>
		<no-ssr>
			<custom-scrollbar class="card-slider glass">
				<div class="card-slider-content d-flex my-auto h-100">
					<div class="my-auto" v-for="property in properties" :key="property.id">
						<card-ticket type="horizontal" :property.sync="property"/>
					</div>
				</div>
			</custom-scrollbar>
		</no-ssr>
	</div>
</template>

<script>
	import CardTicket from '~/components/CardTicket.vue'
	export default {
		props: ['properties'],
		components: {
		    CardTicket
		},
		data() {
			return {
				
			}
		},
		mounted() {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/components/card-slider.scss";
</style>
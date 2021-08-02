<template>
	<div class="container">
		<div class="row justify-content-center text-left">
	    	<div class="col-md-10 pr-md-1">
				<div class="search p-3 mx-4 ml-md-4 mr-md-2">
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-6 p-0 pr-1">
								<b-form-group>
									<label>Location</label>
							        <b-input v-model="addressFilter"
							          id="inline-form-input-name"
							          class="w-100 robotoregular"
							          placeholder="Where do you wanna go?"
							        ></b-input>
								</b-form-group>
							</div>
							<div class="col-md-3 p-0 pr-1">
								<b-form-group>
									<label>Date</label> <br>
									<no-ssr>
										<data-range-picker v-model="datesFilter" inputclass=""></data-range-picker>
									</no-ssr>
								</b-form-group>
							</div>
							<div class="col-md-3 p-0 pr-1">
								<b-form-group>
									<label>Guests</label>
							        <b-input v-model="guestsFilter"
							        	id="inline-form-input-username"
							        	placeholder="1 Guest"
							        	class="w-100 robotoregular"
										type="number"
										:formatter="formatNumber"
							        ></b-input>
								</b-form-group>
							</div>
						</div>
					</div>
		    	</div>
	    	</div>
	    	<div class="col-md-2 pl-md-1">
	    		<div class="mx-md-2 mx-4">
		    		<b-button @click="search" block class="search-button p-3" variant="dark"><img src="~/assets/icons/search.svg"/></b-button>
	    		</div>
	    	</div>
		</div>
	</div>
</template>

<script>
import DataRangePicker from '~/components/DataRangePicker.vue'

	export default {
		components : {
			DataRangePicker
		},
		data() {
			return {
				guestsFilter: null,
				addressFilter: null,
				datesFilter: ''
			}
		},
		methods: {
			search: function() {
				this.$store.dispatch('fillFilters', { filters: { 
					maxGuests: this.guestsFilter,  
					address: this.addressFilter, 
					dates: this.datesFilter, 
					price: [0,0], 
					stars: "" 
				} });
				this.$router.push({
				    path: '/results'
				})
			},
			formatNumber: function(value, event) {
				return parseInt(Math.abs(value));
			}
		}
	}
</script>

<style lang="scss">
	@import "~assets/css/components/search-box.scss";
</style>
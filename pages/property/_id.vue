<template>
	<div>
		<FilterBar v-on:toggleMapResults="shouldShowMap = $event" :showBackButton="true"/>
		<div class="container-fluid my-3">
			<div class="row">
				<div class="col-lg-7 row justify-content-center align-items-start p-2">
					<div class="col-md-12">
						<img :src="this.images[0]" alt="" class="mx-auto img-fluid w-100"/>
						<template>
							<custom-scrollbar class="overflow-scroll gallery-scroll col row flex-nowrap">
								<div class="img-gallery"
									v-for="(image, imageIndex) in images"
									:key="imageIndex"
									@click="index = imageIndex"
									>
									<img :src="image" alt="" class="img-fluid">
								</div>
							</custom-scrollbar>
						</template>
						<no-ssr>
							<gallery :images="images" :index="index" @close="index = null"/>
						</no-ssr>
					</div>
				</div>
				<div class="col-lg-5 row no-gutters p-2">
					<div class="col-md-12">
						<div class="card card-property row no-gutters flex-row mb-5">
							<div class="card-img-left col-md-4 col-xl-2 text-center py-4">
								<b-img :src="`${$axios.defaults.baseURL}/user/get-image/${property.homeowner.image}`" class="cover-fit-image my-auto align-middle" rounded="circle"></b-img>
							</div>
							<div class="card-body col-md-8 col-xl-10">
								<p class="card-text p-1 mb-0">
									<span>Entire apartment</span>
									<span>
										<font-awesome-icon :icon="['fas', 'star']" v-for="(n, index) in property.stars" :key="index" @click="makeReview(index)"/>
									</span>
									<span>TULUM</span>
								</p>
								<h2 class="card-title p-2 text-center text-md-left text-capitalize">{{ property.title }}</h2>
								<div class="row no-gutters justify-content-center"> 
									<div class="col-md-12 py-2">
										<div class="text-center">
											<b-nav pills>
												<b-nav-item v-for="(amenity, index) in property.amenities" :key="index" class="secondary robotoregular">
													<font-awesome-icon :icon="['fas', amenity.amenity.icon]"/>
													{{amenity.qty + ' ' + amenity.amenity.name}}
												</b-nav-item>
												<!-- <b-nav-item class="secondary robotoregular">
													<font-awesome-icon :icon="['fas', 'building']"/>
													2 bedrooms
												</b-nav-item>
												<b-nav-item class="secondary robotoregular">
													<font-awesome-icon :icon="['fas', 'bed']"/>
													2 bed
												</b-nav-item>
												<b-nav-item class="secondary robotoregular">
													<font-awesome-icon :icon="['fas', 'bath']"/>
													1 bath
												</b-nav-item> -->
											</b-nav>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="card card-property row no-gutters flex-row mb-5">
							<div class="card-body">
								<div class="price mb-3">
									<span>$&nbsp;{{property.price.$numberDecimal}}</span>
									<span> / per night</span>
								</div>
								<div class="row no-gutters mb-3">
									<div class="col-md-6 px-3 my-2">
										<data-range-picker v-model="datesToBook" class="w-100 h-100 input-disabled" @input="changeNights" inputclass="btn btn-disableds"></data-range-picker>
										<!-- <b-form-input size="lg" value="09/02/2019 - 09/07/2019" class="input-disabled"></b-form-input> -->
									</div>
									<div class="col-md-6 px-3 my-2">
										<b-dropdown size="lg" variant="disabled" class="w-100" no-caret>
											<template slot="button-content">
												<div class="float-left">
													{{guestsToBook}} guests
												</div>
												<div class="float-right">
													<font-awesome-icon :icon="['fas', 'long-arrow-alt-down']"/>
												</div>
											</template>
											<b-dropdown-item-button @click="guestsToBook = n" v-for="(n, index) in property.maxGuests" :key="index">{{ n }}</b-dropdown-item-button>
										</b-dropdown>
									</div>
								</div>
								<div class="container-fluid">
									<div class="row no-gutters">
										<div class="col-md-12">
											<span class="calc-text">${{property.price.$numberDecimal}} * {{nigthsToBook}} nights =</span> <span class="number-text">${{nightsPrice}}</span><br>
											<span class="calc-text">Cleaning fee =</span> <span class="number-text">${{cleaningFee}}</span><br>
											<span class="calc-text">Service fee =</span> <span class="number-text">${{serviceFee}}</span><br>
											<span class="calc-text">Total =</span> <span class="number-text">${{total}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row mb-5 m-0 align-items-center">
							<div class="col-md-5">
								<b-button size="lg" variant="primary" block @click="book" :disabled="!this.$auth.loggedIn">Book</b-button>
							</div>
							<div class="col-md-7">
								<span class="calc-text">
									Total: 
								</span>
								<span class="number-text">${{total}}</span>
							</div>
						</div>
						<b-alert show variant="danger" v-if="errors">
                            <ul>
                                <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
                            </ul>
                        </b-alert>
						<div class="card card-property card-property-description row no-gutters flex-row mb-5">
							<div class="card-body">
                                <p>{{property.description}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		
	</div>
</template>

<script>
import FilterBar from '~/components/FilterBar.vue'
import DataRangePicker from '~/components/DataRangePicker.vue'
import moment from 'moment'

export default {
	auth: false,
    async asyncData({$axios, isDev, route, store, env, params, query, req, res, redirect, error}) {
        const data = await $axios.$get(`${$axios.defaults.baseURL}/property/${params.id}`);
        return {property: data.property}
    },
	data() {
      return {
        images: [],
        index: null,
        datesToBook: null,
        nigthsToBook: 0,
        guestsToBook: 1,
        cleaningFee: 40,
		serviceFee: 70,
		review: {
			stars: 0,
			user: null,
			comment: ''
		},
		errorMessage: '',
        errors: null
      }
	},
	components: {
      FilterBar,
      DataRangePicker
	},
	mounted() {
		this.images = this.property.images.map(({name}) => { return `${this.$axios.defaults.baseURL}/property/get-image/${name}` })
    },
    computed: {
        nightsPrice() {
            return this.property.price.$numberDecimal * this.nigthsToBook; 
        },
        total() {
            return this.nightsPrice + this.cleaningFee + this.serviceFee;
        }
	},
	methods: {
		changeNights() {
			var date1 = !!this.datesToBook && !!this.datesToBook.startDate ? moment(this.datesToBook.startDate) : null;
			var date2 = !!this.datesToBook && !!this.datesToBook.endDate ? moment(this.datesToBook.endDate) : null;
			var diff = date2.diff(date1, 'days');
			this.nigthsToBook = diff;
		},
		makeReview(stars) {
			stars = stars + 1;
			this.review.stars = stars;
			this.review.user = this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id
			this.$axios.$post(`/property/${this.property._id}/make-review`, this.review).then( (response) => {
				this.$swal.fire({
					type: 'success',
					text: 'Review saved!'
				});
			} );
		},
		book() {
			if (!this.datesToBook || !this.guestsToBook || !this.property) {
				this.$swal.fire({
					type: 'error',
					text: 'You need to fill dates and guests first.'
				});
			} else {
				let payloadToBook = {
					guests: [
						{
							qty: this.guestsToBook, 
							guestType: String('Adults')
						}
					],
					dateBegin: this.$moment(this.datesToBook.startDate).format('YYYY-MM-DD'),
					dateEnd: this.$moment(this.datesToBook.endDate).format('YYYY-MM-DD'),
					user: this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id,
					property: this.property._id
				}
	
				this.$axios.$post(`/property/${this.property._id}/make-reservation`, payloadToBook).then( (response) => {
					let booking = response.reservation;
					console.log(booking);
					this.$swal.fire({
						type: 'success',
						text: 'Your booking has been submited and its in confirmation process. We will send you an email when approval is complete.'
					});
				} )
				.catch((err) => {
					this.errors = null;
					this.errorMessage = '';
					if (!!err.response.data.errors) {
						this.errors = err.response.data.errors;
					}
					if (!!err.response.data.message) {
						this.errorMessage = err.response.data.message;
						this.$swal.fire({
							type: 'error',
							text: this.errorMessage
						});
					}
				});
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "~assets/css/components/property.scss";
</style>

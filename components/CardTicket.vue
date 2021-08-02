<template>
	<div class="row card-ticket no-gutters" :class="type">
		<div class="col-card-ticket p-0 card-ticket-corner">
			<div class="card bg-transparent">
				<div class="card-body">
					<div class="row h-100">
						<div class="col-12 p-1 my-auto">
							<b-button v-if="$auth.loggedIn" class="favorite-toggler" variant="transparent" @click.stop="markPropertyAsFavorite" :class="{'marked-as-favorite': favorite || favoriteProp}">
									<font-awesome-icon style="color:white;" :icon="['fas', 'heart']"/>
							</b-button>
							<b-carousel class="property-carousel"
						      v-model="slide"
						      :interval="0"
						      controls
						      indicators
						      img-width="1024"
						      img-height="480"
						      style="text-shadow: 1px 1px 2px #333;"
						      @sliding-start="onSlideStart"
						      @sliding-end="onSlideEnd"
						    >
						      <!-- Text slides with image -->
						      <b-carousel-slide v-for="(image, index) in property.images" :key="index"
						        :img-src="`${$axios.defaults.baseURL}/property/get-image/${image.name}`"
						      ></b-carousel-slide>
							  <b-carousel-slide v-if="property.images.length == 0" img-src="~/assets/icons/property-default.svg"></b-carousel-slide>
						    </b-carousel>
						    <div class="card-card-back"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-card-ticket p-0 card-ticket-corner d-flex flex-column justify-content-center">
			<div class="card bg-transparent h-100">
				<div class="card-body p-3 d-flex flex-column justify-content-between h-100">
					<div class="row no-gutters h-100 flex-column justify-content-between h-100">
						<div class="col-12 my-auto mx-2 text-left row flex-column justify-content-between h-100">
							<div>
								<span class="robotoblack text-uppercase">{{ property.title }}</span><br>
								<span class="robotoblack">{{ property.description | sbstr }}</span><br>
								<span style="letter-spacing: -2px">
									<font-awesome-icon v-for="(n, index) in property.stars" :key="index" :icon="['fas', 'star']"/>
								</span>&nbsp;12<br>
								<p class="text-gray"><span v-for="(amenity, index) in property.amenities" :key="index">{{amenity.qty}} {{amenity.amenity.name}}, </span></p>
							</div>
							<div class="">
								<div class="row no-gutters">
									<div class="col-10 p-0">
										<span class="price-text">${{ property.price.$numberDecimal }}</span> <span class="per-text"> / per night</span>
									</div>
									<div class="col-2 p-0 text-right justify-content-center">
										<img src="~/assets/icons/go-arrow.svg" class="img-fluid go-arrow" alt="" @click="$router.push({ path: '/property/'+property._id })">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			property: {
				type: Object,
				required: false
			},
			type: {
				type: String,
				required: false,
				default: 'horizontal'
			},
			favorite: {
				type: Boolean,
				default: false,
				required: false
			}
		},
		data() {
	      return {
			favoriteProp: false,
	        slide: 0,
			sliding: null
	      }
		},
		filters: {
			sbstr(txt) {
				return txt.substring(0,100) + "...";
			}
		},
	    methods: {
			onSlideStart(slide) {
				this.sliding = true
			},
			onSlideEnd(slide) {
				this.sliding = false
			},
		 	markPropertyAsFavorite() {
				this.$axios.$post(`/property/${this.property._id}/favorite`).then( (response) => {
					this.favoriteProp = true;
				} );
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "~assets/css/components/card-ticket.scss";
</style>
<template>
  <div class="clickable-result" @click="$router.push({ path: `/property/${property._id}` })" style="cursor:pointer;">
    <div class="card-stacked-container">
		<b-button v-if="$auth.loggedIn" variant="transparent" @click.stop="markPropertyAsFavorite" :class="{'marked-as-favorite': favorite || favoriteProp}">
				<font-awesome-icon style="color:white;" :icon="['fas', 'heart']"/>
		</b-button>
      <b-carousel 
			v-model="slide"
			:interval="0"
			controls
			indicators
			img-width="1024"  
			img-height="480"
			style="text-shadow: 1px 1px 2px #333"
			@sliding-start="onSlideStart"
			@sliding-end="onSlideEnd">
			<!-- Text slides with image -->
			<b-carousel-slide v-for="(image, index) in property.images" :key="index"
			:img-src="`${$axios.defaults.baseURL}/property/get-image/${image.name}`"
			>
			</b-carousel-slide>
			<b-carousel-slide v-if="property.images.length == 0" img-src="~/assets/icons/property-default.svg"></b-carousel-slide>
		</b-carousel>
    </div>
     
    <div class="mt-3 mb-4 card-text">
        <span>
			<div class="d-inline" v-for="(amenity, index) in property.amenities" :key="index">
				{{ amenity.qty }} {{ amenity.amenity.name }}, 
			</div>
		</span> <br/>
        <span class="text-capitalize">
			{{ property.title }}
		</span> <br/>
        <span>
			$&nbsp;{{ property.price.$numberDecimal }} 
			<span class="text-muted" style="font-size:0.9rem;font-weight:200;"> /per night</span>
		</span> <br/>
		<span style="font-size:0.8rem;">
			<span v-for="(n, index) in property.stars" :key="index">
				<font-awesome-icon :icon="['fas', 'star']" class="align-baseline"/>
			</span>
			<span>
				<b class="text-dark">{{ property.stars }}</b> <span class="text-muted">(12)</span>
			</span>
		</span>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		img: {
			type: String,
			required: false
		},
		property: {
			type: Object,
			required: true
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
	    	sliding: null,
        	url: this.img ? require('~/assets/images/demo_properties/'+ this.img) : require('~/assets/images/demo_properties/dmo1.png'),
        
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
	@import "~assets/css/components/card-list.scss";
</style>
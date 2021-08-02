<template>
    <div>
        <div class="App">
          <no-ssr>
            <l-map :zoom=20 :center="center">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-marker v-for="property in properties" :key="property.id" :lat-lng="[property.location.lat, property.location.long]">
                <l-icon
                  :icon-size="[40, 23]"
                  class-name="map-tag text-center robotobold">
                  <div class="headline">$&nbsp;{{ property.price.$numberDecimal }}</div>
                </l-icon>
                <l-popup>
                  <div class="card">
                    <img class="card-img-top" v-if="property.images.length > 0" :src="`${$axios.defaults.baseURL}/property/get-image/${property.images[0].name}`" alt="">
                    <div class="card-body">
                      <h4 class="card-title text-capitalize">{{ property.title }}</h4>
                      <p class="card-text">{{property.price.$numberDecimal + ' ' + property.currency.code}}</p>
                      <p class="card-text"><span v-for="(amenity, index) in property.amenities" :key="index">{{amenity.qty}} {{amenity.amenity.name}}, </span></p>
                      <b-button block variant="success" :to="`/property/${property._id}`" style="color:white;">View property</b-button>
                    </div>
                  </div>
                </l-popup>
              </l-marker>
            </l-map>
          </no-ssr>
        </div>
    </div>
</template>

<script>

export default {
  props: ['properties', 'center']
  // async mounted() {
  //   try {
  //     const { init } = require('~/plugins/gmaps.js')
  //     const google = await init();
  //     const geocoder = new google.maps.Geocoder();
  //     const map = new google.maps.Map(this.$el);

  //     geocoder.geocode({ address: 'Austria' }, (results, status) => {
  //       if (status !== 'OK' || !results[0]) {
  //         throw new Error(status);
  //       }

  //       map.setCenter(results[0].geometry.location);
  //       map.fitBounds(results[0].geometry.viewport);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
</style>

<template>
    <div>
        <div class="App">
          <no-ssr>
            <l-map :zoom="zoom" :center="center" @click="setLocation($event)">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
              <l-marker v-for="property in properties" :key="property.id" :lat-lng="[property.location.lat, property.location.long]" :draggable="true" @update:latLng="updateLocation($event)">
                <l-icon
                  :icon-size="[40, 23]"
                  class-name="map-tag text-center robotobold">
                  <div class="headline">$&nbsp;{{ property.price.$numberDecimal }}</div>
                </l-icon>
              </l-marker>
            </l-map>
          </no-ssr>
        </div>
    </div>
</template>

<script>

export default {
  props: ['properties', 'center', 'zoom'],
  methods: {
      updateLocation(event) {
          this.$emit('updateLocation', event);
      },
      setLocation(event) {
          this.$emit('updateLocation', event.latlng);
      }
  }
};
</script>

<style lang="scss" scoped>
</style>

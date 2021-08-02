<template>
    <div>
         <!-- <navbar :nav-variant="'light'" :nav-type="'light'" :nav-logo="'logo-dark.png'" /> -->
         <FilterBar v-on:toggleMapResults="shouldShowMap = $event"/>
         <div class="list-content py-0 pt-2 mt-2 pr-md-0">
            <div v-if="shouldShowMap" class="row mx-0" >
              <div class="col-md-6 pr-0 pl-0 col-xl-5 order-2 order-md-1">
                  <b-card no-body class="border-0">
                    <b-card-body
                      id="nav-scroller"
                      ref="content"
                      style="position:relative; overflow-y:scroll;background-color:#fafafa;"
                      class="card-scroll-md card-scroll-lg"
                    >
                      <div v-for="property in properties" :key="property.id" @mouseover="centerMap(property.location)">
                        <card-ticket type="horizontal" class="m-0 mb-4" :property="property" :favorite="isPropertyFavorite(property._id)"/>
                      </div>

                      <div class="mt-5"></div>                     
                    </b-card-body>
                  </b-card>
              </div>
            <!-- navbar click -->
              <div class="col-md-6 col-xl-7 order-1 order-md-2 mb-3 pr-md-0">
                  <g-map :properties="properties" :center="centerOn"/>
              </div> 
            <!-- navbar click -->

            </div>
            <div v-if="!shouldShowMap">
              <h1 class="list-title" v-if="properties.length > 0">Jinn in Tulum</h1>
              <h1 class="list-title" v-if="properties.length == 0">No results</h1>
              <p class="list-subtitle pt-3 pb-3" v-if="properties.length > 0">Stay in Tulum with all the comforts of home, verified.</p>
              <div class="row">
                  <div v-for="(property, index) in properties" :key="index" class="col-md-6 col-lg-3">
                    <card-list :img="'dmo3.png'" :property="property" :favorite="isPropertyFavorite(property._id)"/>
                  </div>
                  <div v-if="properties.length == 0" class="col-md-12 my-4 row justify-content-center no-gutters">
                    <img src="~/assets/icons/not-found.svg" alt="not found" class="img-fluid w-75"/>
                  </div>
              </div>
            </div>
         </div>
          <footer />
    </div>
</template>

<script>
  import Navbar from '~/components/NavBar.vue'
  import CardList from '~/components/CardList.vue'
  import FilterBar from '~/components/FilterBar.vue'
	import CardTicket from '~/components/CardTicket.vue'
  import gMap from '~/components/Map.vue'
  import { mapState } from 'vuex'
  
  export default {
    auth: false,
    components: {
      Navbar,
      CardList,
      FilterBar,
      CardTicket,
      gMap
    },
    data() {
      return {
        shouldShowMap: false,
        centerOn: []
      }
    },
    async asyncData({ $axios, $auth, params }) {
        if ($auth.$state.user) {
          var id = $auth.$state.user.sub ? $auth.$state.user.sub : $auth.$state.user._id;
          let { user } =  await $axios.$get(`/user/${id}/favorites`);
          let favorites = user.favorites;
  
          return { favorites };
        }
    },
    async fetch ({ store, params }) {
      await store.dispatch("properties/fetchProperties");
    },
    computed: {
      ...mapState({
        properties: state => state.properties.all
      })
    },
    mounted() {
      if (this.properties.length > 0) {
        this.centerOn = [this.properties[0].location.lat, this.properties[0].location.long];
      }
    }, 
    methods: {
      scrollIntoView(evt) {
        evt.preventDefault()
        const href = evt.target.getAttribute('href')
        const el = href ? document.querySelector(href) : null
        if (el) {
          this.$refs.content.scrollTop = el.offsetTop
        }
      },
      centerMap(location) {
        this.centerOn = [location.lat, location.long];
      },
      isPropertyFavorite(propertyId) {
        if (this.$auth.$state.user) {
          let found = this.favorites.find( element => element._id == propertyId)
          return !!found;
        }

        return false;
      }
    }
  }
</script>

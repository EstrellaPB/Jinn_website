<template>
  <div>
    <navbar :nav-variant="'transparent'" :nav-type="'jinn-transparent'"/>
    <div class="full-section">
        <div class="position-md-absolute absolute-content-center">
          <h1 class="title align-center">
            Discover your dream vacation
          </h1>
          <h2 class="subtitle robotoregular mb-3">
            Find the place to stay near the Ruins of Tulum.
          </h2>
          <div class="mb-5">
            <search-box/>
          </div>
        </div>
        <card-slider :properties="popular"/>
    </div>
    <div class="p-0 home-properties position-relative">
      <div class="home-properties-bg">
        <div class="bg-cut"></div>
        <span class="home-properties-tag position-relative">
          <div class="home-properties-tag-bg"></div>
          <img src="~/assets/icons/location.svg">
          <span class="position-relative">&nbsp;Find properties in</span>
        </span>
        <h2 class="home-properties-title m-0">Tulum</h2>
        <div class="home-properties-content">
          <div class="">
            <div class="row">
              <div class="col-md-12 px-4">
                <h2>Jinn in Tulum</h2>
                <span>Stay in Tulum With all the conforts of home, verified</span>
              </div>
            </div>
            <div class="row my-4">
              <div class="col-md-6 px-4">
                <a href="/results" class="show-all">Show all ({{properties.length}}) <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']"/></a>
              </div>
            </div>
            <no-ssr>
              <properties-paginated :properties="properties"></properties-paginated>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row blog-section">
        <div class="col-md-7 blog-advice px-xl-5">
          <div class="card">
            <span class="bg-primary always-rotated-270"></span>
            <h3 class="text-secondary always-rotated-270">VISIT OUR BLOG</h3>
          </div>
        </div>
        <div class="col-md-5 blog-relevant-posts px-xl-5">
          <div class="row mb-3">
            <div class="col-12">
              <div class="card relevant-post-lg">
                <div class="post-title">
                  <div class="row align-items-center">
                    <div class="col-2 col-md-1 p-0 text-right">
                      <!-- <svg>
                       <defs>
                         <mask id="text-mask-1" x="0" y="0" height="160">
                           <text x="30" y="80" class="robotoregular d-inline" fill="#999">1</text>
                         </mask>
                       </defs>
                       <image class="img-fluid float-left" height="160" xlink:href="~/assets/images/home/post1-titular.png" mask="url(#text-mask-1)"/>
                      </svg> -->
                      <div class="clip-text robotoregular d-inline" :style="{backgroundImage: `url(${firstRecomendedPost.imageUrl})`}">1</div>
                    </div>
                    <div class="col-2 col-md-2 col-xl-1 p-0 text-right">
                      <div class="clip-text robotoregular d-inline" :style="{backgroundColor: `#608875`}">/</div>
                    </div>
                    <div class="col-8 col-md-9 col-xl-10 p-0">
                      <h3 class="d-inline post-title-text"> 6 reasons to invest in tulum real state</h3>
                    </div>
                  </div>
                </div>
                <div class="post-content">
                  <p>Merida has consolidated as the safest city in Mexico, and one of the best places to live in the country. Its infrastructure, shopping, cultural and entertaining options, gastronomy, quality of life and housing developments at excellent prices make it the ideal place to travel, live and invest.</p>

                  <p>Why is living in Merida the best option?</p>

                  <p>1.- Cost of housing. Unlike other cities, Merida is still in full growth and the cost of a home here, is by far, less expensive than in other Mexican state capital. For example, a house in Mexico City can cost up to five or six times more than the same type of property in Mérida.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-12">
              <div class="card relevant-post-md-hor">
                <div class="card-body p-0">
                  <div class="row align-items-center no-gutters">
                    <div class="col-10 p-0">
                      <div class="post-title text-center d-flex flex-column justify-content-center" :style="{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${secondRecomendedPost.imageUrl})`}">
                        <span class="align-items-center d-flex justify-content-center">
                          <span class="post-title-number d-inline text-secondary">2</span>
                          <span class="post-title-bar d-inline text-primary">/</span>
                          <span class="post-title-text text-secondary d-inline">Why is living in Merida the best option?</span>
                        </span>
                      </div>
                    </div>
                    <div class="col-2 p-0 text-center">
                      <div class="post-button bg-primary text-secondary text-center d-flex flex-column justify-content-center">
                        <font-awesome-icon class="mx-auto" :icon="['fas', 'long-arrow-alt-right']" size="2x"/>
                      </div>
                    </div>
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
import Navbar from '~/components/NavBar.vue'
import SearchBox from '~/components/SearchBox.vue'
import CardSlider from '~/components/CardSlider.vue'
import CardTicket from '~/components/CardTicket.vue'
import PropertiesPaginated from '~/components/PropertiesPaginated.vue'
import { mapState } from 'vuex'

export default {
  auth: false,
  components: {
    Navbar,
    SearchBox,
    CardSlider,
    CardTicket,
    PropertiesPaginated
  },
  layout: 'withoutNavBar',
  data() {
    return {
      firstRecomendedPost: {
        imageUrl: require("~/assets/images/home/post1-titular.png")
      },
      secondRecomendedPost: {
        imageUrl: require("~/assets/images/home/post2-titular.png")
      }
    }
  },
  async fetch ({ store, params }) {
    await store.dispatch("properties/fetchPopular");
    await store.dispatch("properties/fetchProperties");
  },
  computed: {
    ...mapState({
      properties: state => state.properties.all,
      popular: state => state.properties.popular
    })
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~assets/css/components/index.scss";
</style>

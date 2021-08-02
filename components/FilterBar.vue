<template>
    <div class="container-fluid px-2">
        <div class="row no-gutters"> 
            <div class="col-md-9">
                <div class=" text-center">
                    <b-nav pills>
                        <b-button @click="$bvToast.show('guests-toast')" class="secondary robotoregular" variant="light">{{ maxGuestsFilter + ' Guests' }}</b-button>

                        <b-button @click="$bvToast.show('location-toast')" class="secondary robotoregular" variant="light">{{ addressFilter ? addressFilter : 'Location' }}</b-button>
                        
                        <b-button @click="$bvToast.show('price-toast')" class="secondary robotoregular" variant="light">{{ '$' + priceFilter }}</b-button>

                        <b-button @click="$bvToast.show('dates-toast')" class="secondary robotoregular" variant="light">{{ datesFilter }}</b-button>

                        <!-- <b-nav-item-dropdown :text="starsFilter" right class="secondary robotoregular">
                            <b-dropdown-item href="#">1</b-dropdown-item>
                            <b-dropdown-item href="#">2</b-dropdown-item>
                            <b-dropdown-item href="#">3</b-dropdown-item>
                            <b-dropdown-item href="#">4</b-dropdown-item>
                        </b-nav-item-dropdown> -->
                
                    </b-nav>
                    <div class="containter">

                        <b-toast id="guests-toast" title="Guests" static no-auto-hide>
                            <b-input v-model="filters.maxGuests"
                                @change="changeFilters"
                                class="w-100 robotoregular"
                                placeholder="Guests"
                                type="number"
                                :formatter="formatNumber"
                            ></b-input>
                        </b-toast>
                        <b-toast id="location-toast" title="Location" static no-auto-hide>
                            <b-input v-model="filters.address"
                                class="w-100 robotoregular"
                                @change="changeFilters"
                                placeholder="Where do you wanna go?"
                            ></b-input>
                        </b-toast>
                        <b-toast id="price-toast" title="Price" static no-auto-hide>
                            <no-ssr>
                                <vue-slider class="d-block" v-model="filters.price" :min="prices[0]" :max="prices[1]" :interval="1" @change="changeFilters"></vue-slider>
                            </no-ssr>
                        </b-toast>
                        <b-toast id="dates-toast" title="Dates" static no-auto-hide>
                            <no-ssr>
                                <data-range-picker v-model="filters.dates"></data-range-picker>
                            </no-ssr>
                        </b-toast>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="pr-md-3 text-right">
                    <b-button v-if="showBackButton" variant="outline-primary" to="/results">Back to list</b-button>
                    <switch-button v-if="!showBackButton" v-on:toggle="toggleMap" v-model="switchMap" class="justify-content-md-end justify-content-center">See map</switch-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SwitchButton from '~/components/SwitchButton.vue'
import DataRangePicker from '~/components/DataRangePicker.vue'
import 'vue-slider-component/theme/default.css'
import { mapState } from 'vuex'

export default {
    props: {
        showBackButton: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    data() {
        return {
            switchMap: false
        }
    },
    components: {
        SwitchButton,
        DataRangePicker
    },
    methods: {
        toggleMap: function() {
            this.$emit('toggleMapResults', this.switchMap);
        },
        changeFilters: async function() {
            this.$store.dispatch('fillFilters', { filters: this.filters });
            await this.$store.dispatch("properties/fetchProperties");

            // this.$store.commit('SET_FILTERS', this.filters)
        },
        formatNumber: function(value, event) {
            return !!value ? parseInt(Math.abs(value)) : null;
        }
    },
    computed: {
        ...mapState({
            maxGuestsFilter: state => !!state.filters.maxGuests ? state.filters.maxGuests : '',
            datesFilter: state => !!state.filters.dates ? state.filters.dates : 'Dates',
            addressFilter: state => !!state.filters.address ? state.filters.address : null,
            priceFilter: state => !!state.filters.price ? state.filters.price : ' Price',
            starsFilter: state => !!state.filters.stars ? state.filters.stars : 'Stars',
            prices: state => state.properties.prices.length > 0 ? state.properties.prices : [0, 100],
            filters: function(state) {
                return {
                    dates: this.datesFilter,
                    maxGuests: this.maxGuestsFilter,
                    address: this.addressFilter,
                    price: this.priceFilter,
                    stars: this.starsFilter
                }
            }
        })
    }
}
</script>
<style lang="scss" scoped>
	@import "~assets/css/components/filter-bar.scss";
</style>
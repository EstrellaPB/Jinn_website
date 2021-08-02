<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-12">
                <nav-profile-card>
                    <b-card bg-variant="light" :header="`New property`">
                        <b-card-body>
                            <b-form @submit.prevent="saveProperty">
                                <b-alert show variant="danger" v-if="!!errorMessage">{{ errorMessage }}</b-alert>
                                <b-alert show variant="danger" v-if="errors">
                                    <ul>
                                        <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
                                    </ul>
                                </b-alert>
                                <div class="row mb-5">
                                    <div class="col-md-6">
                                        <b-form-group
                                            id="input-group-title"
                                            label="Title *"
                                            label-for="title"
                                        >
                                            <b-form-input
                                            id="name"
                                            v-model="property.title"
                                            type="text"
                                            required
                                            placeholder="Enter title"
                                            ></b-form-input>
                                        </b-form-group>
                                        <b-form-group
                                            id="input-group-description"
                                            label="Description *"
                                            label-for="description"
                                        >
                                            <b-form-textarea
                                            id="description"
                                            v-model="property.description"
                                            required
                                            placeholder="Enter description"
                                            ></b-form-textarea>
                                        </b-form-group>
                                        <b-form-group
                                            id="input-group-price"
                                            label="Price *"
                                            label-for="price"
                                        >
                                            <b-form-input
                                            id="price"
                                            v-model="property.price.$numberDecimal"
                                            type="number"
                                            required
                                            placeholder="Enter price"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group
                                            id="input-group-price"
                                            label="Currency *"
                                            label-for="currency"
                                        >
                                            <b-form-select id="currency" v-model="property.currency" :options="currencies" placeholder="Select currency"></b-form-select>
                                        </b-form-group>

                                        <b-form-group
                                            id="input-group-maxguests"
                                            label="Max guests *"
                                            label-for="maxguests"
                                        >
                                            <b-form-input
                                            id="maxguests"
                                            v-model="property.maxGuests"
                                            type="number"
                                            required
                                            placeholder="Enter maximum number of guests"
                                            ></b-form-input>
                                        </b-form-group>

                                        <b-form-group
                                            id="input-group-latitude"
                                            label="Latitude *"
                                            label-for="latitude"
                                        >
                                            <b-form-input
                                            id="latitude"
                                            v-model="property.location.lat"
                                            @input="inputLat"
                                            @keyup="inputLat"
                                            type="text"
                                            required
                                            placeholder="Enter location latitude"
                                            ></b-form-input>
                                        </b-form-group>
                                        <b-form-group
                                            id="input-group-longitude"
                                            label="Longitude *"
                                            label-for="longitude"
                                        >
                                            <b-form-input
                                            id="longitude"
                                            v-model="property.location.long"
                                            @input="inputLong"
                                            @keyup="inputLong"
                                            type="text"
                                            required
                                            placeholder="Enter location longitude"
                                            ></b-form-input>
                                        </b-form-group>

                                        <hr>
                                        <h5>Amenities</h5>
                                        <b-form-group v-for="(amenity, index) in amenities" :key="index"
                                            id="input-group-longitude"
                                            :label="`${amenity.name}`"
                                            :label-for="`${amenity.name}`"
                                        >
                                            <b-input-group prepend="Quantity">
                                                <b-form-input
                                                    :id="`${amenity.name}`"
                                                    @input="updateAmenity($event, amenity)"
                                                    :value="getPropertyAmenityQty(amenity)"
                                                    type="number"
                                                    required
                                                    ></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6">
                                        <no-ssr>
                                            <map-input :zoom="15" :properties="[property]" :center="centerOn" @updateLocation="updateLocation($event)"></map-input>
                                        </no-ssr>
                                    </div>
                                </div>
                                
                                
                                <b-form-group>
                                    <button type="submit" name="" id="" class="btn btn-primary btn-lg btn-block">
                                        Save
                                    </button>
                                </b-form-group>
                            </b-form>
                        </b-card-body>
                    </b-card>

                    <hr>
                    
                    
                </nav-profile-card>
            </div>
        </div>
    </div>
</template>

<script>
import NavProfileCard from '~/components/NavProfileCard.vue';
import MapInput from '~/components/MapInput.vue';

export default {
    components: {
        NavProfileCard,
        MapInput
    },
    async asyncData({ $axios, $auth, params }) {
        let { currencies } = await $axios.$get('/currency/get-all');
        currencies = await currencies.map(currency => {
            return { text: currency.code, value: currency._id }
        });
        let { amenities } = await $axios.$get('/amenity/get-all');
        let property = {
                title: null,
                description: null,
                price: {
                    $numberDecimal: 0
                },
                currency: null,
                location: {
                    lat: 0,
                    long: 0
                },
                maxGuests: '',
                homeowner: $auth.$state.user.sub ? $auth.$state.user.sub : $auth.$state.user._id,
                amenities: []
            }
        return { currencies, property, amenities };
    },
    data() {
        return {
            errors: null,
            errorMessage: '',
            successMsg: null,
            centerOn: [20.209306, -87.469046]
        }
    },
    methods: {
        getPropertyAmenityQty(amenity) {
            let found = this.property.amenities.find(element => element.amenity._id === amenity._id);
            if (!!found) {
                return found.qty;
            } else {
                return 0;
            }
        },
        updateAmenity(inputValue, amenity) {
            let found = this.property.amenities.find(element => element.amenity._id === amenity._id);
            if (!!found) {
                found.qty = inputValue;
            } else {
                this.property.amenities.push({
                    qty: inputValue,
                    amenity: amenity
                })
            }
            console.log(this.property.amenities);
        },
        updateLocation(event) {
            this.property.location.lat = event.lat;
            this.property.location.long = event.lng;
        },
        async saveProperty() {
            this.property.price = this.property.price.$numberDecimal;
            this.$axios.$post(`/property`, this.property).then( (response) => {
                this.property = response.property;
                this.$swal({
                    type: 'success',
                    text: 'Property saved'
                });
                this.$router.push({
				    path: '/profile/my-properties'
				})
            } )
            .catch( (err) => {
                this.errors = null;
                this.errorMessage = '';
                if (!!err.response.data.errors) {
                    this.errors = err.response.data.errors;
                }
                if (!!err.response.data.message) {
                    this.errorMessage = err.response.data.message;
                }
                this.$swal({
                    type: 'error',
                    text: 'Could not save property'
                });
            } );
        },
        inputLat(value) {
            if (!value || isNaN(value)) {
                value = 0;
            }
            value = parseFloat(value);
            this.property.location.lat = value;
        },
        inputLong(value) {
            if (!value || isNaN(value)) {
                value = 0;
            }
            value = parseFloat(value);
            this.property.location.long = value;
        }
    }
}
</script>
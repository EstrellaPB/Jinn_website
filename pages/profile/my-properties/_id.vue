<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-12">
                <nav-profile-card>
                    <b-card bg-variant="light" :header="`Edit property ${property.title}`">
                        <b-card-body>
                            <b-form @submit.prevent="saveProperty">
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
                                            id="input-group-latitude"
                                            label="Latitude *"
                                            label-for="latitude"
                                        >
                                            <b-form-input
                                            id="latitude"
                                            :value="parseFloat(property.location.lat)"
                                            @input="value => property.location.lat = parseFloat(value)"
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
                                            :value="parseFloat(property.location.long)"
                                            @input="value => property.location.long = parseFloat(value)"
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
                    <div class="row">
                        <div class="col-md-12">
                            <b-card bg-variant="light" header="Images" class="text-center">
                                <div class="row">
                                    <div class="col-md-12 mb-5">
                                        <uploader :multiple="true" v-model="imageToUpload" classes="btn-block" :apiUrl="`${$axios.defaults.baseURL}/property/${property._id}/upload-image`" @presigned="fetchProperty($event.property)"></uploader>
                                    </div>
                                </div>
                                <b-card-body>
                                    <div class="row">
                                        <div v-for="(image,index) in property.images" :key="index" class="col-md-4">
                                            <b-card
                                                overlay
                                                :img-src="`${$axios.defaults.baseURL}/property/get-image/${image.name}`"
                                                :img-alt="image.name"
                                                text-variant="white"
                                            >
                                                <b-card-header>
                                                    <b-button variant="danger" block @click="deleteImage(image.name)">Delete image</b-button>
                                                </b-card-header>
                                            </b-card>
                                        </div>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </div>
                    </div>
                    
                </nav-profile-card>
            </div>
        </div>
    </div>
</template>

<script>
import NavProfileCard from '~/components/NavProfileCard.vue';
import MapInput from '~/components/MapInput.vue';
import Uploader from '~/components/Uploader.vue';

export default {
    components: {
        NavProfileCard,
        MapInput,
        Uploader
    },
    async asyncData({ $axios, $auth, params }) {
        let { property } = await $axios.$get(`/property/${params.id}`);
        let { currencies } = await $axios.$get('/currency/get-all');
        currencies = await currencies.map(currency => { 
            return { text: currency.code, value: currency._id }
        });
        let { amenities } = await $axios.$get('/amenity/get-all');

        return { property, currencies, amenities };
    },
    data() {
        return {
            errors: null,
            successMsg: null,
            centerOn: [],
            imageToUpload: null,
            amenitiesToSave: []
        }
    },
    mounted() {
        console.log(this.property.amenities);
        this.centerOn = [this.property.location.lat, this.property.location.long];
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
            this.$axios.$post(`/property/${this.property._id}/update`, this.property).then( (response) => {
                this.property = response.property;
                this.$swal({
                    type: 'success',
                    text: 'Property updated'
                });
                this.$router.push({
				    path: '/profile/my-properties'
				})
            } );
        },
        async fetchProperty(property) {
            var { property } = await this.$axios.$get(`/property/${property._id}`);
            this.property = property;
        },
        async deleteImage(imageName) {
            this.$axios.$post(`/property/${this.property._id}/delete-image/${imageName}`).then( (response) => {
                this.fetchProperty(this.property);
                this.$swal({
                    type: 'success',
                    text: 'Property updated'
                });
            } );
        }
    }
}
</script>
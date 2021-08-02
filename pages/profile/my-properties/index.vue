<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-12">
                <nav-profile-card>
                    <div class="row mb-5">
                        <div class="col-md-12 text-right">
                            <b-button variant="success" to="/profile/my-properties/create">Create property</b-button>
                        </div>
                    </div>
                    <b-table id="my-properties" responsive striped hover :items="properties" :fields="fields" :busy.sync="isBusy">
                        <template slot="actions" slot-scope="data">
                            <b-button-group>
                                <nuxt-link :to="`/profile/my-properties/${data.item._id}`">
                                    <b-button variant="success">Editar</b-button>
                                </nuxt-link>
                                <b-button @click="deleteProperty(data.item._id)" variant="danger">Eliminar</b-button>
                            </b-button-group>
                        </template>
                    </b-table>
                    <b-pagination
                        align="right"
                        v-model="currentPage"
                        :total-rows="total"
                        :per-page="perPage"
                        @input="changePageProperties"
                        >
                    </b-pagination>
                </nav-profile-card>
            </div>
        </div>
    </div>
</template>

<script>
import NavProfileCard from '~/components/NavProfileCard.vue';

export default {
    components: {
        NavProfileCard
    },
    async asyncData({ $axios, $auth }) {
        var authUser = $auth.$state.user.sub ? $auth.$state.user.sub : $auth.$state.user._id;
        let { properties, total, perPage } = await $axios.$get(`/property/${authUser}/owned`);
        properties = await properties.map(property => { 
            return { 
                _id: property._id,
                title: property.title,
                price: property.price.$numberDecimal + ' ' + property.currency.code, 
                description: property.description,
                address: property.address,
                reviews: property.reviews.length
            }
        });
        return { properties, total, perPage };
    },
    data() {
        return {
            fields: ['title', 'description', 'price', 'address', 'reviews', 'actions'],
            errors: null,
            successMsg: null,
            isBusy: false,
            currentPage: 1
        }
    },
    methods: {
        async changePageProperties(e) {
            var authUser = this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id;
            var params = {
                page: e
            }
            let { properties, total, perPage } = await this.$axios.$get(`/property/${authUser}/owned`, { params });
            this.properties = await properties.map(property => { 
                return {
                    _id: property._id,
                    title: property.title,
                    price: property.price.$numberDecimal + ' ' + property.currency.code, 
                    description: property.description,
                    address: property.address,
                    reviews: property.reviews.length
                }
            });
            console.log(e);
        },
        deleteProperty(idProperty) {
            console.log(idProperty);
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#608875',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.isBusy = true;
                    this.$axios.$get(`/property/${idProperty}/owner-delete`).then((response) => {
                        console.log(response);
                        if (response.message) {
                            this.$swal.fire(
                                'Deleted!',
                                'Your property has been deleted.',
                                'success'
                            );
                            this.fetchProperties();
                        }
                    });
                }
            });
        },
        async fetchProperties() {
            var authUser = this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id;
            let { properties } = await this.$axios.$get(`/property/${authUser}/owned`);
            properties = await properties.map(property => { 
                return { 
                    _id: property._id,
                    title: property.title,
                    price: property.price.$numberDecimal + ' ' + property.currency.code, 
                    description: property.description,
                    address: property.address,
                    reviews: property.reviews.length
                }
            });

            this.isBusy = false;
            this.properties = properties;
        }
    },
    computed: {
        rows() {
            return this.properties.length
        }
    }
}
</script>
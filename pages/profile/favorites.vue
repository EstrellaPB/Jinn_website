<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-12">
                <nav-profile-card>
                    <div class="row mb-4">
                        <h4>My favorite properties</h4>
                    </div>
                    <div class="row">
                        <div v-for="(property,index) in favorites" :key="index" class="col-md-4">
                            <b-card
                                overlay
                                :img-src="property.images.length > 0 ? `${$axios.defaults.baseURL}/property/get-image/${property.images[0].name}` : '~/assets/icons/not-found.svg'"
                                text-variant="white"
                            >
                                <b-card-header>
                                    <b-button variant="info" block :to="`/property/${property._id}`">View</b-button>
                                </b-card-header>
                                <b-card-body>
                                    {{ property.title }}
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

export default {
    components: {
        NavProfileCard
    },
    async asyncData({ $axios, $auth, params }) {
        var id = $auth.$state.user.sub ? $auth.$state.user.sub : $auth.$state.user._id;
        let { user } =  await $axios.$get(`/user/${id}/favorites`);
        let favorites = user.favorites;

        return { favorites };
    },
    data() {
        return {
            errors: null,
            successMsg: null
        }
    },
    methods: {
        
    }
}
</script>
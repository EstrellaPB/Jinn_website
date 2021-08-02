<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-12 mb-5">
                <nav-profile-card>
                    <b-form @submit.prevent="saveProfile">
                        <div class="col-md-6">
                                <b-form-group
                                    id="input-group-name"
                                    label="Name *"
                                    label-for="name"
                                >
                                    <b-form-input
                                    id="name"
                                    v-model="model.name"
                                    type="text"
                                    required
                                    placeholder="Enter name"
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-surname"
                                    label="Lastname *"
                                    label-for="surname"
                                >
                                    <b-form-input
                                    id="surname"
                                    v-model="model.surname"
                                    type="text"
                                    required
                                    placeholder="Enter lastname"
                                    ></b-form-input>
                                </b-form-group>
                                <b-form-group
                                    id="input-group-email"
                                    label="Email *"
                                    label-for="email"
                                >
                                    <b-form-input
                                    id="email"
                                    v-model="model.email"
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                    ></b-form-input>
                                </b-form-group>
                            
                        </div>
                        <div class="col-md-6">

                        </div>
                        <b-form-group>
                            <button type="submit" name="" id="" class="btn btn-primary btn-block">
                                Save
                            </button>
                        </b-form-group>
                    </b-form>
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
    data() {
        return {
            model: {
                name: this.$auth.$state.user.name,
                email: this.$auth.$state.user.email,
                surname: this.$auth.$state.user.surname,
                role: this.$auth.$state.user.role
            },
            errors: null,
            successMsg: null
        }
    },
    methods: {
        saveProfile() {
            var id = this.$auth.$state.user.sub ? this.$auth.$state.user.sub : this.$auth.$state.user._id;
            this.$axios.$post(`/user/${id}/update`, this.model).then((response) => {
                if (response.user) {
                    this.errors = null;
                    this.successMsg = 'User updated!';
                    this.$auth.fetchUser();
                    this.$swal({
                        type: 'success',
                        text: this.successMsg
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data);
                this.errors = err.response.data.errors;
            })
        }
    }
}
</script>
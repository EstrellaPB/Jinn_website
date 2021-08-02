<template>
    <div class="container">
        <div class="row justify-content-center align-items-center h-100 mt-5 mb-4">
            <div class="col-md-4">
                <div class="card text-white my-5 text-black-50">
                    <div class="card-body">
                        <h4 class="card-title">Login</h4>
                        <b-alert show variant="danger" v-if="!!errorMessage">{{ errorMessage }}</b-alert>
                        <b-alert show variant="danger" v-if="errors">
                            <ul>
                                <li v-for="(error, index) in errors" :key="index">{{ error.msg }}</li>
                            </ul>
                        </b-alert>
                        <b-form @submit.prevent="login">
                            <b-form-group
                                id="input-group-1"
                                label="Email address:"
                                label-for="email"
                                description="We'll never share your email with anyone else."
                            >
                                <b-form-input
                                id="email"
                                v-model="form.email"
                                type="email"
                                required
                                placeholder="Enter email"
                                ></b-form-input>
                            </b-form-group>
                            <b-form-group
                                id="input-group-1"
                                label="Password:"
                                label-for="password"
                            >
                                <b-input type="password" v-model="form.password" id="text-password" aria-describedby="password-help-block"></b-input>
                            </b-form-group>
                            <b-form-group>
                                <button type="submit" name="" id="" class="btn btn-primary btn-lg btn-block glow">
                                    Submit
                                </button>
                            </b-form-group>
                        </b-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            errorMessage: '',
            errors: null
        }
    },
    methods: {
        login() {
            this.$auth.loginWith('local', { data: { email: this.form.email, password: this.form.password, gethash: true } })
            .then(() => this.$toast.success('Logged In!'))
            .catch((err) => {
                this.errors = null;
                this.errorMessage = '';
                if (!!err.response.data.errors) {
                    this.errors = err.response.data.errors;
                }
                if (!!err.response.data.message) {
                    this.errorMessage = err.response.data.message;
                }
            })
        }
    }
}
</script>
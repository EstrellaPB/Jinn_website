<template>
  <b-navbar toggleable="lg" :type="type" :variant="variant" fixed="top">
    <b-navbar-brand @click="$router.push({ path: '/' })" style="cursor:pointer;">
      <img :src="url" alt="jinn">

    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" @click="toggleNavMobile">
      <hamburger
          :stroke='2'
          :gap='5'
          :color='color'
          :open.sync='open'>
      </hamburger>
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav class="align-items-center">
      <div class="container text-center nav-text">

      <b-navbar-nav  align="left">
        <b-nav-item href="#">Tulum, México </b-nav-item>

      </b-navbar-nav>
      </div>
      <div class="container text-center nav-text">
        <!-- <b-navbar-nav class="justify-content-start " >
          <b-nav-item href="#" active>Magazine </b-nav-item>
          <b-nav-item href="#">Homeowners </b-nav-item>
          <b-nav-item href="#">Contact </b-nav-item>


        </b-navbar-nav> -->
      </div>
      <div class="container text-center nav-text">
<!-- :justified="true" -->
        <b-navbar-nav  align="right" class="" v-if="userLoggedIn">
          <b-nav-item to="/profile/favorites">Saved </b-nav-item>
          <b-nav-item href="#">Message </b-nav-item>
          <b-nav-item href="#">Help </b-nav-item>
          <!-- Navbar dropdowns -->
          <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Account</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
          </b-nav-item-dropdown> -->
        </b-navbar-nav>
        <b-navbar-nav align="right" class="" v-if="!userLoggedIn">
          <b-nav-item href="/login">Login </b-nav-item>
        </b-navbar-nav>
      </div>

       
      <b-navbar-nav class="justify-content-center mx-auto" v-if="userLoggedIn">
        <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" right no-caret>
          <template slot="button-content">
            <img :src="`${$axios.defaults.baseURL}/user/get-image/${$auth.$state.user.image}`" class="rounded-circle mx-auto img-fluid w-25"/>
            <span class="sr-only">{{ $auth.$state.user.name }}</span>
          </template>
          <!-- <b-dropdown-item href="#">{{ $auth.$state.user.name }}</b-dropdown-item> -->
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
          <b-dropdown-item @click="$auth.logout()">Logout</b-dropdown-item>
        </b-dropdown>
      </b-navbar-nav>
     
     
    </b-collapse>
  </b-navbar>
</template>

<script>
  import Vue from 'vue'
  import 'vue-hamburger/index.css'
  Vue.component('hamburger', require('vue-hamburger'))

  export default {
    props: ['navType', 'navVariant', 'navLogo'],
    data() {
      return {
        open: false,
        type: this.navType ? this.navType : 'light',
        variant: this.navVariant ? this.navVariant : 'light',
        url: this.navLogo ? require('~/assets/images/'+ this.navLogo) : require('~/assets/images/logo.png'),
        color: this.navType == 'light' ? 'black' : '#fafafa'
      }
    },
    mounted() {
    },
    computed: {
      userLoggedIn() {
        console.log('LoggedIn: ', this.$auth.loggedIn);
        return this.$auth.loggedIn;
      },
      state() {
        return JSON.stringify(this.$auth.$state, undefined, 2)
      }
    },
    methods: {
      toggleNavMobile() {
        if (this.navType == 'jinn-transparent') {  
          if (this.open) {
            this.variant = 'light';
            this.color = 'black';
            this.url = require('~/assets/images/logo-dark.png');
          } else {
            this.variant = 'transparent';
            this.color = '#fafafa';
            this.url = require('~/assets/images/logo.png');
          }
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
	@import "~assets/css/components/nav-bar.scss";
</style>
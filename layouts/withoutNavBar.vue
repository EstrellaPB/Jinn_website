<template>
  <div>
    <nuxt />
    <footer-bar/>

  </div>
</template>

<script>
  import FooterBar from '~/components/FooterBar.vue'

  export default {
    components: {
      FooterBar
    }
  }
</script>
<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

</style>

<template>
  <div>
      <paginate name="propertiesPaginated" :list="properties" :per="8" tag="div" class="row no-gutters align-items-center mb-3">
          <div v-for="(property, index) in paginated('propertiesPaginated')" :key="index" class="col-md-3 p-0 mb-3 align-self-center float-left">
              <div class="m-auto">
                <card-ticket type="vertical" :property.sync="property"/>
              </div>
          </div>
      </paginate>
      <paginate-links
        for="propertiesPaginated"
      ></paginate-links>
      <div class="row text-center text-md-left justify-content-left mt-5">
        <div class="col-md-5 order-12 order-md-1 pl-md-5">
          <b-button variant="primary glow">Find homes in Cancun</b-button>
        </div>
      </div>
  </div>
</template>

<script>
  import CardTicket from '~/components/CardTicket.vue'
  export default {
    data() {
      return {
        paginate: ['propertiesPaginated']
      }
    },
    props: ['properties'],
    components: {
      CardTicket
    },
    created() {
    }
  }
</script>
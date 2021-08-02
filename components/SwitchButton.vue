<template>
    <div class="switch-button-control">
        <div class="switch-button-label mr-2">
            <slot></slot>
        </div>
        <div class="switch-button" :class="{ enabled: isEnabled }" @click="toggle" :style="{'--color': color}" >
            <div class="button text-center">
              <img src="~/assets/icons/check.svg" v-if="isEnabled"/>
              <img src="~/assets/icons/times.svg" v-if="!isEnabled"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  model: {
    prop: "isEnabled",
    event: "toggle"
  },
  props: {
    isEnabled: Boolean,
    color: {
      type: String,
      required: false,
      default: "#608875"
    }
  },
  methods: {
    toggle: function() {
      this.$emit("toggle", !this.isEnabled);
    }
  }
}
</script>
<style lang="scss" scoped>
	@import "~assets/css/components/switch-button.scss";
</style>
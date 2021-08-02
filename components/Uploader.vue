<template>
  <b-form-group>
    <b-form-file ref="uploaderInput"
                 v-model="file"
                 :state="Boolean(file)"
                 placeholder="Choose a file..."
                 @input="onInput"
                 :multiple="multiple"
                 :accept="accept" class="d-none"></b-form-file>
    <b-button variant="dark" :class="classes" @click="$refs.uploaderInput.$refs.input.click()">Upload Image</b-button>
    <b-progress v-show="uploadPercentage > 0 && uploadPercentage !== 100"
                striped
                animated
                :max="100"
                class="mt-3"
                :value="uploadPercentage"></b-progress>
  </b-form-group>
</template>
<script>
  export default {
    name: 'uploader',
    props: {
      accept: {
        type: String,
        default: 'image/*'
      },
      apiUrl: {
        type: String,
        default: '/uploads'
      },
      sendOnInput: {
        type: Boolean,
        default: true
      },
      classes: {
        type: String,
        default: '',
        required: false
      },
      multiple: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data() {
      return {
        file: null,
        presigned: {},
        uploadPercentage: 0,
      }
    },
    mounted() {
      
    },
    methods: {
      onInput() {
        var vm = this;
        if (vm._props.sendOnInput && !!vm.file) {
          vm.sendFile();
        } else if(!!vm.file){
          vm.toDataUrl();
        }
      },
      sendFile() {
        let vm = this;
        if (vm._props.multiple && Array.isArray(vm.file)) {
          vm.file.forEach(element => {
            let formData = new FormData;
            formData.append('image', element);
            this.$axios.post(vm._props.apiUrl, formData, {
                onUploadProgress: function (progressEvent) {
                  vm.$emit('uploading');
                  vm.uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            })
            .then(resp => { console.log(resp.data); vm.$emit('presigned', resp.data) })
            .catch(function (errors) {
              console.log(errors)
            })
          });

          vm.$emit('done');
        } else {
          let formData = new FormData;
          formData.append('image', vm.file);
          this.$axios.post(vm._props.apiUrl, formData, {
              onUploadProgress: function (progressEvent) {
                vm.$emit('uploading');
                vm.uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              }
          })
          .then(resp => { console.log(resp.data); vm.$emit('presigned', resp.data) })
          .catch(function (errors) {
            console.log(errors)
          })
          .finally(resp => vm.$emit('done'));

          this.toDataUrl()
        }
      },
      toDataUrl() {
        let vm = this;
        let reader = new FileReader();
        reader.addEventListener("load", function () {
          let dataUrl = reader.result;
          vm.$emit('image', dataUrl);
          // vm.$store.commit('image_preview/set', dataUrl)
        }.bind(vm), false);
        if (/\.(jpe?g|png|gif)$/i.test(vm.file.name)) {
          reader.readAsDataURL(vm.file);
        }
      }
    }
  }
</script>
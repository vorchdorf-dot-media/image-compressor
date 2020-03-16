<template>
  <div v-if="state === 0" class="container">
    <Dropzone />
  </div>
  <div v-else class="container">
    <Preview />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dropzone from '~/components/preview-container/dropzone/index.vue';
import Preview from '~/components/preview-container/preview/index.vue';
export default Vue.extend({
  components: {
    Dropzone,
    Preview
  },
  computed: {
    state() {
      return this.$store.state.statemachine.state;
    }
  }
});
</script>

<style scoped>
.container {
  position: relative;
  background-repeat: repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-4 -4 8 8" fill="rgba(255, 255, 255, 0.05)" height="32" width="32"><circle r=".5"/><path d="M-2-.125h1v.25h-1zM1-.125h1v.25H1zM-.125-2h.25v1h-.25zM-.125 1h.25v1h-.25z"/></svg>');
}
</style>

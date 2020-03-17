<template>
  <div v-if="clear" class="container">
    <Dropzone />
  </div>
  <div v-else class="container">
    <Preview />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import Dropzone from '~/components/preview-container/dropzone/index.vue';
import Preview from '~/components/preview-container/preview/index.vue';
import { STATE } from '~/store/statemachine';
export default Vue.extend({
  components: {
    Dropzone,
    Preview
  },
  computed: mapState('statemachine', {
    clear: ({ state: { state } }: any) => state === STATE.CLEAR
  })
});
</script>

<style scoped>
.container {
  position: relative;
  background-repeat: repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-4 -4 8 8" fill="rgba(255, 255, 255, 0.05)" height="32" width="32"><circle r=".5"/><path d="M-2-.125h1v.25h-1zM1-.125h1v.25H1zM-.125-2h.25v1h-.25zM-.125 1h.25v1h-.25z"/></svg>');
}
</style>

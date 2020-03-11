<template>
  <div class="container">
    <ThumbnailList />
    <UploadItem />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ThumbnailList from '~/components/thumbnail-container/thumbnail-list/index.vue';
import UploadItem from '~/components/thumbnail-container/upload-item/index.vue';
export default Vue.extend({
  components: {
    ThumbnailList,
    UploadItem
  }
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  box-shadow: inset 0 -5px 10px -5px var(--color-bg-dark);
  background: var(--color-bg-dark);
  height: 100%;
  width: 100%;
}
</style>

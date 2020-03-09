<template>
  <div class="container">
    <div>Thumbnails</div>
    <div>Thumbnail Action</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-areas: 'thumbnails action';
  grid-template-columns: 1fr auto;
  align-items: stretch;
  box-shadow: inset 0 -5px 10px -5px var(--color-bg-dark);
  background: var(--color-bg-dark);
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

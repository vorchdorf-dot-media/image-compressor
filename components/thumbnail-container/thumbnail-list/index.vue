<template>
  <div class="list-container">
    <ul v-if="images.length > 0">
      <li v-for="({ src }, i) in images" :key="i">
        <ThumbnailListItem :src="src" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ThumbnailListItem from '~/components/thumbnail-container/thumbnail-list/thumbnail-list-item/index.vue';
export default Vue.extend({
  components: {
    ThumbnailListItem
  },
  data: () => ({
    images: [
      { src: '//source.unsplash.com/random/320x240' },
      { src: '//source.unsplash.com/random/320x240' },
      { src: '//source.unsplash.com/random/320x240' },
      { src: '//source.unsplash.com/random/320x240' },
      { src: '//source.unsplash.com/random/320x240' },
      { src: '//source.unsplash.com/random/320x240' }
    ]
  })
});
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  list-style-type: none;
}

li {
  display: inline-flex;
  align-items: center;
}

li:not(:last-child) {
  margin-right: 0.25rem;
}

.list-container {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 38.2%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 10%,
      var(--color-bg-dark) 90%
    );
  }
}
</style>

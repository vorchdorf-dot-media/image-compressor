<template>
  <div class="list-container">
    <ul v-if="images.length > 0">
      <li v-for="({ src }, i) in images" :key="i">
        <ThumbnailListItem :src="src" />
      </li>
      <li>
        <span>
          <strong>{{ images.length > 9 ? '9+' : images.length }}</strong>
          <br />images
        </span>
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
  align-items: center;
  align-self: flex-start;
  justify-content: flex-start;
  height: calc(100% + 16px);
  margin: 0;
  padding: 0 0 16px;
  overflow-x: scroll;
  list-style-type: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

li {
  display: inline-flex;
  align-items: center;
}

li:not(:last-child) {
  margin-right: 0.25rem;
}

li:last-child {
  align-items: flex-end;
  margin-left: 0.25rem;
  padding-bottom: 0.25rem;
  min-width: 64px;
  font-size: 0.75em;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  line-height: 1.75;

  strong {
    font-size: 1.2rem;
  }
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
    width: 64px;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 10%,
      var(--color-bg-dark) 90%
    );
  }
}
</style>

<template>
  <button :disabled="!url">
    <DownloadIcon />
    <span>Save</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import DownloadIcon from '~/components/icon/download.vue';
export default Vue.extend({
  components: {
    DownloadIcon
  },
  computed: mapState('statemachine', {
    url: ({ state: { url } }: any) => url && url.length,
    title(state: any) {
      const {
        state: { id }
      } = state;
      const { title, mimetype }: { title: string; mimetype: string } =
        this.$store.getters['queue/image'](id) || {};
      return title.replace(
        /\.[a-z0-9]+$/i,
        `.min.${mimetype === 'image/webp' ? 'webp' : 'jpg'}`
      );
    }
  })
});
</script>

<style lang="scss" scoped>
button:not([disabled]) {
  box-shadow: inset 0 0 12px -3px var(--color-bg-dark);
  background: var(--color-success);
  color: var(--color-default);
  fill: var(--color-default);
}

span {
  display: block;
  margin-top: 0.5rem;
}
</style>

<template>
  <button :disabled="!blob" @click="download">
    <DownloadIcon />
    <span>Download</span>
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
    blob() {
      const image = this.$store.getters['queue/image'](this.id);
      if (image && image.buffer) {
        return new Blob([image.buffer], { type: image.mimetype });
      }
      return null;
    },
    id: ({ state: { id } }: any) => id,
    title(state: any) {
      const { title, mimetype }: { title: string; mimetype: string } =
        this.$store.getters['queue/image'](this.id) || {};
      return title.replace(
        /^([^.]+)\.?(?:[a-z0-9]*)?$/i,
        `$1.min.${mimetype === 'image/webp' ? 'webp' : 'jpg'}`
      );
    }
  }),
  methods: {
    download() {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(this.blob);
      a.download = this.title;
      a.click();
    }
  }
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

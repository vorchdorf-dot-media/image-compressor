<template>
  <div class="container">
    <ThumbnailList :images="images" />
    <UploadItem v-if="upload" :disabled="!ready || !ready.length" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import ThumbnailList from '~/components/thumbnail-container/thumbnail-list/index.vue';
import UploadItem from '~/components/thumbnail-container/upload-item/index.vue';
import { UPLOAD } from '~/store/queue';
export default Vue.extend({
  components: {
    ThumbnailList,
    UploadItem
  },
  data() {
    return {
      upload: process.env.UPLOAD === 'true'
    };
  },
  computed: mapState('queue', {
    images: ({ images }: any) => {
      return Object.keys(images)
        .filter((key: string) => images[key].buffer)
        .map((key: string) => {
          const { buffer, mimetype, upload } = images[key];
          return {
            id: key,
            src: URL.createObjectURL(new Blob([buffer], { type: mimetype })),
            upload
          };
        })
        .reverse();
    },
    ready() {
      return this.images.filter(
        ({ upload }: { upload: UPLOAD }) => upload === UPLOAD.READY
      );
    }
  })
});
</script>

<style scoped>
.container {
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  box-shadow: inset 0 -5px 10px -5px var(--color-bg-dark);
  background: var(--color-bg-dark);
  height: 100%;
  width: 100%;
}

@media screen and (min-width: 1024px), (orientation: landscape) {
  .container {
    grid-template-columns: 1fr minmax(0, 96px);
  }
}
</style>

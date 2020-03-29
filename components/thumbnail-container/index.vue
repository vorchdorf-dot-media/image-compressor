<template>
  <div class="container">
    <ThumbnailList :images="images" />
    <UploadItem v-if="upload && token" :disabled="!ready || !ready.length" />
    <LoginItem v-if="upload && !token" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ImageEncoderStore } from '~/assets/helpers/store';
import LoginItem from '~/components/thumbnail-container/login-item/index.vue';
import ThumbnailList from '~/components/thumbnail-container/thumbnail-list/index.vue';
import UploadItem from '~/components/thumbnail-container/upload-item/index.vue';
import { UPLOAD } from '~/store/queue';
export default Vue.extend({
  components: {
    LoginItem,
    ThumbnailList,
    UploadItem
  },
  data() {
    return {
      upload: process.env.UPLOAD === 'true'
    };
  },
  computed: mapState({
    images: ({ queue: { images } }: ImageEncoderStore) => {
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
    },
    token({ user }: ImageEncoderStore): boolean {
      const { auth: { token: { expires_at: expiresAt = 0 } = {} } = {} } = user;
      return expiresAt > Date.now();
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

@media screen and (min-width: 1024px),
  (min-width: 568px) and (orientation: landscape) {
  .container {
    grid-template-columns: 1fr minmax(0, 96px);
  }
}
</style>

<template>
  <div class="dropzone" @click="open">
    <CirclePlusIcon />
    Tap or click to open an image. Drag &amp; drop to include it directly.
    <input ref="fileupload" type="file" @change="change" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Exif } from '@saschazar/wasm-exif';
import readAsBuffer from '~/assets/helpers/filereader';
import { STATE } from '~/store/statemachine';
import CirclePlusIcon from '~/components/icon/circle-plus.vue';

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export default Vue.extend({
  components: {
    CirclePlusIcon
  },
  methods: {
    open(e: MouseEvent) {
      const input: any = this.$refs.fileupload;
      return input && input.click();
    },
    async change(e: HTMLInputEvent) {
      let image = {};
      const { target: { files = [] } = {} } = e || {};
      const self: any = this;
      const exifWorker = await self.$worker.exif();

      exifWorker.onmessage = ({ data }: { data: Exif }) => {
        image = Object.assign({}, image, data || null);
        exifWorker.terminate();
      };

      if (files?.length) {
        const buffer = await readAsBuffer(files[0]);
        exifWorker.postMessage({ buffer });
      }
      return this.$store.commit('statemachine/set', STATE.IMAGE);
    }
  }
});
</script>

<style lang="scss" scoped>
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 6px dashed rgba(255, 255, 255, 0.25);
  margin: 2rem;
  padding: 2rem;
  height: calc(100% - 4rem);
  width: calc(100% - 4rem);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.25;
  line-height: 1.25rem;
}

svg {
  margin-bottom: 2rem;
}

input {
  display: none;
}
</style>

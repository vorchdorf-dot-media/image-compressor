<template>
  <div class="dropzone" @click="open">
    <CirclePlusIcon />Tap or click to open an image. Drag &amp; drop to include
    it directly.
    <input ref="fileupload" type="file" @change="change" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import nanoid from 'nanoid/non-secure';
import { Exif } from '@saschazar/wasm-exif';
import readAsBuffer from '~/assets/helpers/filereader';
import { WorkerPayload } from '~/assets/worker/definitions';
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
      const { target: { files = [] } = {} } = e || {};
      if (files?.length) {
        await this.decode(files);
      }
    },
    async decode(fileList: FileList | any[]) {
      let buffer: Uint8Array;
      const self: any = this;
      const id = nanoid(7);
      const decodeWorker = await self.$worker.decode();
      const exifWorker = await self.$worker.exif();

      decodeWorker.onmessage = ({ data }: { data: WorkerPayload }) => {
        const title = fileList[0]?.name;
        this.$store.commit(
          'queue/set',
          Object.assign({}, { id }, title ? { title } : null)
        );
        this.$store.commit('originals/set', {
          id,
          buffer: data.buffer,
          ...data.options
        });
        this.$store.commit('statemachine/set', { state: STATE.IMAGE, id });
        decodeWorker.terminate();

        if (data?.options?.mimetype === 'image/jpeg') {
          exifWorker.postMessage({ buffer });
        } else {
          exifWorker.terminate();
        }
      };

      exifWorker.onmessage = ({ data }: { data: Exif }) => {
        this.$store.commit('queue/set', { id, exif: data });
        exifWorker.terminate();
      };

      if (fileList.length) {
        buffer = await readAsBuffer(fileList[0]);
        decodeWorker.postMessage({
          buffer,
          options: { mimetype: fileList[0].type }
        });
      }
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

<template>
  <div class="container" @load="encode">
    <img v-if="buffer.length" :src="src" />
    <SpinnerArrow v-else class="spinner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SpinnerArrow from '~/components/icon/spinner-arrow.vue';
import { WorkerPayload } from '~/assets/worker/definitions';
import { ImageStore } from '~/store/originals';
import { ImageModel } from '~/store/queue';
export default Vue.extend({
  components: {
    SpinnerArrow
  },
  data(): {
    id: string;
    buffer?: Uint8Array;
    format: string;
    original: ImageStore;
    queue: ImageModel;
  } {
    const { id, format } = this.$store.state.statemachine;
    return {
      id,
      buffer: new Uint8Array(),
      format,
      original: this.$store.getters['originals/image'](id),
      queue: this.$store.getters['queue/image'](id)
    };
  },
  computed: {
    src() {
      const id = this.$store.state.statemachine.id;
      if (this.buffer) {
        const current = this.$store.getters['queue/image'](id);
        const blob = new Blob([current.buffer], { type: current.mimetype });
        return URL.createObjectURL(blob);
      }
      return '';
    }
  },
  mounted() {
    this.encode();
  },
  methods: {
    async encode() {
      const self: any = this;
      const format = this.format === 'image/webp' ? 'webp' : 'mozjpeg';
      const { buffer, height, id, width } = this.original;
      const encodeWorker = await self.$worker.encode();

      encodeWorker.onmessage = ({ data }: { data: WorkerPayload }) => {
        if (data) {
          this.buffer = data.buffer;

          this.$store.commit('queue/set', {
            id,
            buffer: data.buffer,
            mimetype: data?.options?.mimetype,
            height: data?.options?.height,
            width: data?.options?.width
          });
        }
        encodeWorker.terminate();
      };

      const payload = {
        buffer,
        encoder: this.$store.getters[`${format}/options`],
        options: {
          height,
          width,
          mimetype: this.format
        }
      };
      return encodeWorker.postMessage(payload);
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.spinner {
  animation: rotate 2s infinite;
  position: absolute;
  border-radius: 9999px;
  padding: 1rem;
  height: 4rem;
  width: 4rem;
  max-height: 4rem;
  max-width: 4rem;
  bottom: 32px;
  left: 50%;
  background: var(--color-bg-dark);
}
</style>

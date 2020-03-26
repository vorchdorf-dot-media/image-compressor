<template>
  <span v-if="percent"
    ><strong>{{ relation }}%</strong> {{ difference }}</span
  >
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ImageEncoderStore } from '~/assets/helpers/store';
export default Vue.extend({
  computed: mapState({
    difference({
      originals: { images: originals },
      queue: { images: queue },
      statemachine: {
        state: { id }
      }
    }: ImageEncoderStore) {
      const { size: originalSize = 0 } = originals.get(id || '') || {};
      const { buffer = new Uint8Array() } = queue[id || ''] || {};
      return buffer.length < originalSize ? 'smaller' : 'bigger';
    },
    relation() {
      return Math.abs(100.0 - Math.round(this.percent * 100.0));
    },
    percent({
      originals: { images: originals },
      queue: { images: queue },
      statemachine: {
        state: { id }
      }
    }: ImageEncoderStore): number {
      const { size: originalSize = 0 } = originals.get(id || '') || {};
      const { buffer = new Uint8Array() } = queue[id || ''] || {};
      return buffer.length / originalSize;
    }
  })
});
</script>

<style lang="scss" scoped>
span {
  position: absolute;
  display: block;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  box-shadow: 0 5px 10px -5px var(--color-bg-dark);
  background: var(--color-bg-dark);
  color: var(--color-default);
  padding: 0.5rem 0.75rem;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>

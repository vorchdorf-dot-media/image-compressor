<template>
  <ul v-if="originalSize && resultSize">
    <li
      :style="{ top: rel(originalSize) + '%' }"
      v-html="format(originalSize)"
    />
    <li
      :style="{ top: rel(resultSize) + '%' }"
      :class="{
        error: resultSize >= originalSize,
        success: resultSize < originalSize
      }"
      v-html="format(resultSize)"
    ></li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ImageEncoderStore } from '~/assets/helpers/store';

const SIZES = ['B', 'KB', 'MB'];
const KB = 1024;

export default Vue.extend({
  computed: mapState({
    id: ({
      statemachine: {
        state: { id }
      }
    }: ImageEncoderStore): string => {
      return id || '';
    },
    max(): number {
      return Math.max(this.originalSize, this.resultSize);
    },
    originalSize({ originals: { images } }: ImageEncoderStore): number {
      const { size } = images.get(this.id) || {};
      return size || 0;
    },
    resultSize({ queue: { images } }: ImageEncoderStore): number {
      const id: any = this.id || '';
      const { buffer = new Uint8Array() } = images[id] || {};
      return buffer.length;
    }
  }),
  methods: {
    rel(compare: number) {
      return 100.0 - (compare / this.max) * 100.0;
    },
    format: (size: number): string => {
      let i = SIZES.length - 1;
      for (i; i >= 0; i--) {
        const barrier = KB ** i;
        const factor = size / barrier;
        if (factor > 1.0) {
          const formatted = Math.round(factor * 100.0) / 100;
          return `${formatted}&nbsp;${SIZES[i]}`;
        }
      }
      return '';
    }
  }
});
</script>

<style lang="scss" scoped>
ul {
  position: absolute;
  border-left: 2px dashed var(--color-bg-dark);
  margin: 1rem 0 0 1rem;
  padding: 0;
  top: 1.5em;
  left: 0;
  bottom: 1.5em;
  right: auto;
  list-style-type: none;
}

li {
  position: absolute;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin-left: 0.5rem;
  background: var(--color-bg-dark);
  top: 0;
  text-align: right;

  + li {
    top: calc(1em + 1rem);
  }

  &::after {
    content: '';
    position: absolute;
    border: 4px solid transparent;
    border-right-color: var(--color-bg-dark);
    height: 0;
    width: 0;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
  }
}

.error {
  background: var(--color-alert);

  &:after {
    border-right-color: var(--color-alert);
  }
}

.success {
  background: var(--color-success);

  &:after {
    border-right-color: var(--color-success);
  }
}
</style>

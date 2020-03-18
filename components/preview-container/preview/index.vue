<template>
  <div class="container">
    <img v-if="src" :src="src" />
    <div v-if="src" class="overlay">
      <Size />
      <button @click="remove">
        <CloseIcon />
        <span>Remove</span>
      </button>
    </div>
    <SpinnerArrow v-else class="spinner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { ImageEncoderStore } from '~/assets/helpers/store';
import CloseIcon from '~/components/icon/close.vue';
import Size from '~/components/preview-container/preview/size/index.vue';
import SpinnerArrow from '~/components/icon/spinner-arrow.vue';
import { STATE } from '~/store/statemachine';

export default Vue.extend({
  components: {
    CloseIcon,
    Size,
    SpinnerArrow
  },
  computed: mapState({
    id: ({
      statemachine: {
        state: { id }
      }
    }: ImageEncoderStore): string => id || '',
    src({ queue: { images } }: ImageEncoderStore) {
      const { buffer = new Uint8Array(), mimetype } = images[this.id] || {};
      return buffer.length
        ? URL.createObjectURL(new Blob([buffer], { type: mimetype }))
        : null;
    }
  }),
  mounted() {
    this.$store.dispatch('queue/encode');
  },
  methods: {
    remove(): void {
      this.$store.commit('queue/delete', this.id);
      this.$store.commit('originals/delete', this.id);
      this.$store.commit('statemachine/set', { state: STATE.CLEAR, id: null });
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

button {
  transition: border-color 200ms ease-in;
  position: absolute;
  display: inline-flex;
  align-items: center;
  box-shadow: 0 5px 10px -3px var(--color-alert);
  border-radius: 9999px;
  border: 1px solid transparent;
  background-color: var(--color-alert);
  color: var(--color-default);
  fill: var(--color-default);
  padding: 0.5rem;
  left: 50%;
  bottom: 32px;
  transform: translateX(-50%);

  &:hover {
    border-color: var(--color-default);
  }

  > span {
    margin-left: 0.5rem;
  }
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  background: linear-gradient(to bottom, transparent 50%, var(--color-bg-dark));
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
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

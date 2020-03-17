<template>
  <div class="container">
    <img v-if="src" :src="src" />
    <SpinnerArrow v-else class="spinner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import SpinnerArrow from '~/components/icon/spinner-arrow.vue';
export default Vue.extend({
  components: {
    SpinnerArrow
  },
  computed: mapState({
    id: (store: any) => store.statemachine.state.id,
    src(store: any) {
      const current = store.queue.images[this.id];
      const { buffer = new Uint8Array(), mimetype } = current || {};
      if (buffer.length) {
        const url = URL.createObjectURL(new Blob([buffer], { type: mimetype }));
        this.$store.commit('statemachine/set', { url });
        return url;
      }
      return null;
    }
  }),
  mounted() {
    this.$store.dispatch('queue/encode');
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

<template>
  <button :class="{ error, loading, success }" @click="logger">
    <img :src="src" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    error: Boolean,
    loading: Boolean,
    src: {
      type: String,
      required: true
    },
    success: Boolean
  },
  methods: {
    logger: (e: Event) => console.log(e)
  }
});
</script>

<style lang="scss" scoped>
@keyframes rotating {
  to {
    transform: rotate(360deg);
  }
}

button {
  position: relative;
  border-radius: 50%;
  border: 4px solid var(--thumbnail-border, var(--color-light));
  box-shadow: 0 2px 10px -3px var(--thumbnail-border, var(--color-light));
  margin: 4px;
  height: 48px;
  width: 48px;

  &::after {
    content: '';
    display: none;
    position: absolute;
    border-radius: inherit;
    border: 6px solid var(--thumbnail-border, var(--color-light));
    height: 0;
    width: 0;
    top: -8px;
    left: calc(50% - 6px);
    transform-origin: 6px 28px;
  }
}

img {
  border-radius: inherit;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.error,
.loading,
.success {
  &::after {
    display: block;
  }
}

.error {
  --thumbnail-border: var(--color-alert);

  &::after {
    transform: rotate(180deg);
  }
}

.loading::after {
  animation: rotating 3s infinite;
}

.success {
  --thumbnail-border: var(--color-success);
}
</style>

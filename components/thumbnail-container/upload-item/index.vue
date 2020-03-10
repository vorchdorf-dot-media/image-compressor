<template>
  <button :disabled="false" @click="logger">
    <CloudUploadIcon />
    <span>Upload</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import CloudUploadIcon from '~/components/icon/cloud-upload.vue';
export default Vue.extend({
  components: {
    CloudUploadIcon
  },
  methods: {
    logger(e: MouseEvent) {
      console.log(e);
    }
  }
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: 0.5px solid rgba(255, 255, 255, 0.333);
  min-width: 64px;
  padding: 0.25rem 0.5rem;

  &:not([disabled]) {
    box-shadow: inset 0 0 15px -3px rgba(0, 0, 0, 0.667);
    background-color: var(--color-light);
    fill: var(--color-bg-dark);
    color: var(--color-bg-dark);
  }

  &[disabled] {
    color: var(--color-grey);
    fill: var(--color-grey);
  }
}

span {
  display: block;
  margin-top: 0.5rem;
}
</style>

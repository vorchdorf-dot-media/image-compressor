<template>
  <button :disabled="disabled" @click="upload">
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
  props: {
    disabled: {
      type: Boolean,
      required: true
    }
  },
  created(): void {
    this.$store.dispatch('albums/fetch');
  },
  methods: {
    upload(e: MouseEvent): void {
      e.preventDefault();
      this.$store.dispatch('queue/upload');
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
  min-width: 64px;
  padding: 0.25rem 0.5rem;

  &:not([disabled]) {
    box-shadow: inset 0 0 15px -3px rgba(0, 0, 0, 0.667),
      0 0 15px 5px var(--color-bg);
    border-bottom-left-radius: 16px;
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

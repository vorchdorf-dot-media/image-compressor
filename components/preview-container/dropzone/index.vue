<template>
  <div class="dropzone" @click="open">
    <CirclePlusIcon />
    Tap or click to open an image. Drag &amp; drop to include it directly.
    <input ref="fileupload" type="file" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CirclePlusIcon from '~/components/icon/circle-plus.vue';
export default Vue.extend({
  components: {
    CirclePlusIcon
  },
  methods: {
    open(e: MouseEvent) {
      const input: any = this.$refs.fileupload;
      return input && input.click();
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

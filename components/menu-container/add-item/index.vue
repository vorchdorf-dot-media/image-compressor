<template>
  <button :disabled="false" @click="logger">
    <CirclePlusIcon aria-hidden />
    <span>Add Image</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import CirclePlusIcon from '~/components/icon/circle-plus.vue';
export default Vue.extend({
  components: {
    CirclePlusIcon
  },
  methods: {
    logger(e: MouseEvent) {
      console.log(e);
    }
  }
});
</script>

<style lang="scss" scoped>
span {
  display: block;
  margin-top: 0.5rem;
}
</style>

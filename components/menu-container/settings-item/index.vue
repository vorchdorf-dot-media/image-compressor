<template>
  <button :disabled="false" @click="logger">
    <CogIcon />
    <span>Settings</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import CogIcon from '~/components/icon/cog.vue';
export default Vue.extend({
  components: {
    CogIcon
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
  margin-top: 0.25rem;
}
</style>

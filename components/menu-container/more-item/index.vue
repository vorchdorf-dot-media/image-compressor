<template>
  <button :disabled="false" @click="logger">
    <MoreAltIcon />
    <span>More</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import MoreAltIcon from '~/components/icon/more-alt.vue';
export default Vue.extend({
  components: {
    MoreAltIcon
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

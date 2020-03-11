<template>
  <button :disabled="clear" @click="logger">
    <DownloadIcon />
    <span>Save</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { STATE } from '~/store/statemachine';
import DownloadIcon from '~/components/icon/download.vue';
export default Vue.extend({
  components: {
    DownloadIcon
  },
  computed: mapState('statemachine', {
    clear: (state: any) => state.state === STATE.CLEAR
  }),
  methods: {
    logger(e: MouseEvent) {
      console.log(e);
    }
  }
});
</script>

<style lang="scss" scoped>
button:not([disabled]) {
  box-shadow: inset 0 0 12px -3px var(--color-bg-dark);
  background: var(--color-success);
  color: var(--color-default);
  fill: var(--color-default);
}

span {
  display: block;
  margin-top: 0.5rem;
}
</style>

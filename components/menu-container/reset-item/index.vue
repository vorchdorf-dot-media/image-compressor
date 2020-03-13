<template>
  <button :disabled="clear" @click="open">
    <EraserIcon aria-hidden />
    <span>Clear</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { STATE } from '~/store/statemachine';
import EraserIcon from '~/components/icon/eraser.vue';
export default Vue.extend({
  components: {
    EraserIcon
  },
  computed: mapState('statemachine', {
    clear: (state: any) => state.state === STATE.CLEAR
  }),
  methods: {
    open(e: MouseEvent) {
      e.preventDefault();
      return this.$store.commit('statemachine/set', { state: STATE.CLEAR });
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

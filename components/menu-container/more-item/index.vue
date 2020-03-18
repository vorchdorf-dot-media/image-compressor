<template>
  <button :disabled="disabled" @click="logger">
    <MoreAltIcon />
    <span>More</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import { STATE } from '~/store/statemachine';
import MoreAltIcon from '~/components/icon/more-alt.vue';
export default Vue.extend({
  components: {
    MoreAltIcon
  },
  computed: mapState('statemachine', {
    disabled: ({ state: { state } }: any) => state !== STATE.IMAGE
  }),
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

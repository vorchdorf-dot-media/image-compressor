<template>
  <div class="container">
    <ResetItem />
    <DownloadItem />
    <MoreItem />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DownloadItem from '~/components/menu-container/download-item/index.vue';
import MoreItem from '~/components/menu-container/more-item/index.vue';
import ResetItem from '~/components/menu-container/reset-item/index.vue';
export default Vue.extend({
  components: {
    DownloadItem,
    MoreItem,
    ResetItem
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  align-items: stretch;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: inset 0px 5px 10px -5px var(--color-bg-dark);
  height: 100%;
  width: 100%;
  background: var(--color-default);
  color: var(--color-brown);
  fill: var(--color-brown);
  z-index: 9999;

  > * {
    min-height: 0;
    max-height: 100%;
    width: 100%;
  }

  > button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 15px -5px rgba(0, 0, 0, 0.667);
    padding: 0.25rem 0.5rem;
    text-align: center;

    &[disabled] {
      color: var(--color-grey);
      fill: var(--color-grey);
      opacity: 0.5;
    }

    &:not(:last-child) {
      border-right: 0.5px solid rgba(0, 0, 0, 0.333);
    }
  }
}
</style>

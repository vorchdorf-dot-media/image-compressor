<template>
  <div class="container">
    <AddItem />
    <DownloadItem />
    <SettingsItem />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddItem from '~/components/menu-container/add-item/index.vue';
import DownloadItem from '~/components/menu-container/download-item/index.vue';
import SettingsItem from '~/components/menu-container/settings-item/index.vue';
export default Vue.extend({
  components: {
    DownloadItem,
    AddItem,
    SettingsItem
  }
});
</script>

<style lang="scss" scoped>
@keyframes circle-grow {
  to {
    height: 100%;
    width: 100%;
    opacity: 0;
  }
}
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
  overflow: hidden;
  z-index: 9999;

  > * {
    min-height: 0;
    max-height: 100%;
    width: 100%;
  }

  > button {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0 0 5px -2px rgba(0, 0, 0, 0.333);
    padding: 0.25rem 0.5rem;
    text-align: center;

    &[disabled] {
      color: var(--color-grey);
      fill: var(--color-grey);
      opacity: 0.5;
    }

    &:focus::after {
      animation: circle-grow 500ms ease-out;
      position: absolute;
      content: '';
      border-radius: 9999px;
      background-color: rgba(0, 0, 0, 0.333);
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &:not(:last-child) {
      border-right: 0.5px solid rgba(0, 0, 0, 0.333);
    }
  }
}
</style>

<template>
  <main>
    <ThumbnailContainer />
    <div style="background: var(--color-grey);">Main</div>
    <MenuContainer />
  </main>
</template>

<script lang="ts">
import MenuContainer from '~/components/menu-container/index.vue';
import ThumbnailContainer from '~/components/thumbnail-container/index.vue';

export default {
  components: {
    MenuContainer,
    ThumbnailContainer
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300&display=swap');

:root {
  --color-default: #fff7db;
  --color-bg: #163663;
  --color-bg-dark: #03161e;
  --color-light: #71aeca;
  --color-alert: #cd5334;
  --color-success: #7e8f66;
  --color-brown: #703806;
  --color-grey: #424b54;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-default);
  font-family: 'Open Sans Condensed', -apple-system, system-ui,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
}

main {
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: minmax(64px, 1fr) 80% minmax(64px, 1fr);
  align-items: stretch;
  height: 100vh;
  min-width: 0;
  max-width: 100vw;
  overflow: hidden;
}
</style>

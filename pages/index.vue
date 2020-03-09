<template>
  <main>
    <ThumbnailContainer />
    <div>Main</div>
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
  --color-default: #f3f7f0;
  --color-bg: #002626;
  --color-bg-light: #0e4749;
  --color-light: #74b3ce;
  --color-alert: #f2545b;
  --color-success: #95c623;
  --color-grey: #424c55;
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
  align-items: center;
  justify-items: stretch;
  height: 100vh;
  min-width: 0;
  max-width: 100vw;
  overflow: hidden;
}
</style>

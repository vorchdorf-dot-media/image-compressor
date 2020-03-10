<template>
  <main>
    <ThumbnailContainer />
    <PreviewContainer />
    <MenuContainer />
  </main>
</template>

<script lang="ts">
import MenuContainer from '~/components/menu-container/index.vue';
import PreviewContainer from '~/components/preview-container/index.vue';
import ThumbnailContainer from '~/components/thumbnail-container/index.vue';

export default {
  components: {
    MenuContainer,
    PreviewContainer,
    ThumbnailContainer
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');
:root {
  --color-default: #fff7db;
  --color-bg: #163663;
  --color-bg-dark: #03161e;
  --color-light: #71aeca;
  --color-alert: #9e2b25;
  --color-success: #357266;
  --color-brown: #703806;
  --color-grey: #66717e;
}

body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-default);
  fill: var(--color-default);
  font-family: 'Roboto Condensed', -apple-system, system-ui, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  box-sizing: border-box;
}

main {
  display: grid;
  grid-template-areas:
    'header'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: minmax(auto, 64px) auto minmax(auto, 64px);
  align-items: stretch;
  height: 100vh;
  min-width: 0;
  max-width: 100vw;
  overflow: hidden;
}

button {
  border: none;
  padding: 0;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}

svg {
  min-height: 0;
  min-width: 0;
  height: 2em;
  width: 2em;
  max-height: 32px;
  max-width: 32px;
  fill: inherit;
  stroke: inherit;
  stroke-width: inherit;
}
</style>

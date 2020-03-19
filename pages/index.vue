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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');

@keyframes circle-grow {
  to {
    height: 100%;
    width: 100%;
    opacity: 0;
  }
}

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
  background-color: var(--color-bg);
  background: linear-gradient(
    0deg,
    var(--color-bg) 66.67%,
    var(--color-bg-dark) calc(100% - 64px)
  );
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
  min-height: 0;
  min-width: 0;
  height: 100vh;
  width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}

button {
  position: relative;
  border: none;
  padding: 0;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.25em;

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
}

input[type='text'],
input[type='number'] {
  display: block;
  position: relative;
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid var(--color-border, var(--color-bg-dark));
  padding: 0.5em 2em 0.5em 1em;
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

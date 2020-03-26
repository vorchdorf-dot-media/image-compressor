<template>
  <div v-if="clear" :class="{ clear }" class="container">
    <Dropzone />
    <div class="link-container">
      <a :href="url" rel="noopener noreferrer" target="_blank">Source Code</a>
      <a :href="privacy" rel="noopener noreferrer" target="_blank">Privacy</a>
    </div>
  </div>
  <div v-else class="container">
    <Preview />
    <Options v-if="options" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import pkg from '~/package.json';
import Dropzone from '~/components/preview-container/dropzone/index.vue';
import Options from '~/components/preview-container/options/index.vue';
import Preview from '~/components/preview-container/preview/index.vue';
import { STATE } from '~/store/statemachine';
export default Vue.extend({
  components: {
    Dropzone,
    Options,
    Preview
  },
  data() {
    const { repository: { url = '' } = {} } = pkg;
    return {
      privacy: `${url}#privacy`,
      url
    };
  },
  computed: mapState('statemachine', {
    clear: ({ state: { state } }: any): Boolean => state === STATE.CLEAR,
    options: ({ state: { state } }: any): Boolean => state === STATE.OPTIONS
  })
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  grid-area: main;
  max-height: 100%;
  max-width: 100%;
  background-repeat: repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="-4 -4 8 8" fill="rgba(255, 255, 255, 0.05)" height="32" width="32"><circle r=".5"/><path d="M-2-.125h1v.25h-1zM1-.125h1v.25H1zM-.125-2h.25v1h-.25zM-.125 1h.25v1h-.25z"/></svg>');
  overflow: hidden;
}

.clear {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
}

.link-container {
  display: flex;
  justify-content: space-between;
  margin: 1rem 2rem;

  a {
    position: relative;
    padding-bottom: 0.5rem;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.25em;

    &::after {
      content: '';
      display: block;
      border-bottom: 1px solid var(--color-default);
      height: 0;
      width: 100%;
    }
  }

  a,
  a:hover,
  a:visited {
    color: var(--color-default);
  }
}
</style>

import { Context, Plugin } from '@nuxt/types';
import createPersistedState from 'vuex-persistedstate';

declare module window {
  export const onNuxtReady: (cb: () => void) => void;
}

const plugin: Plugin = (ctx: Context) =>
  window.onNuxtReady(() =>
    createPersistedState({
      key: 'img',
      paths: ['jpeg', 'statemachine.state.mimetype', 'user', 'webp']
    })(ctx.store)
  );

export default plugin;

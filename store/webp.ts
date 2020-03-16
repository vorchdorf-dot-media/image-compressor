import options, { EncodeOptions } from '@saschazar/wasm-webp/options';

export const state = (): { options: EncodeOptions } => ({ options });

export const mutations = {
  set(state: { options: EncodeOptions }, updated: EncodeOptions) {
    return (state.options = { ...state.options, ...updated });
  }
};

export const getters = {
  options: (current: { options: EncodeOptions }) => current.options
};

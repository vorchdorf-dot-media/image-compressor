import options, { MozJPEGOptions } from '@saschazar/wasm-mozjpeg/options';

export const state = (): { options: MozJPEGOptions } => ({ options });

export const mutations = {
  set(state: { options: MozJPEGOptions }, update: MozJPEGOptions) {
    return (state.options = { ...state.options, ...update });
  }
};

export const getters = {
  options: (current: { options: MozJPEGOptions }) => current.options
};

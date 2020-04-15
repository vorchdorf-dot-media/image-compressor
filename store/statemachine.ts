import Bowser from 'bowser';

import { MIMETYPE } from '~/assets/helpers/formats';

export enum STATE {
  CLEAR,
  IMAGE,
  OPTIONS
}

export interface StateMachine {
  state: STATE;
  mimetype?: MIMETYPE;
  id?: string;
  url?: string;
}

const supportsWebP = () => {
  if (window?.navigator?.userAgent) {
    const {
      browser: { name: browser },
      os: { name: os }
    } = Bowser.parse(window?.navigator?.userAgent);
    return !(browser === 'Safari' || os === 'iOS');
  }
};

export const state = (): { state: StateMachine } => ({
  state: {
    state: STATE.CLEAR,
    mimetype: supportsWebP() ? 'image/webp' : 'image/jpeg'
  }
});

export const mutations = {
  set(current: { state: StateMachine }, update: StateMachine) {
    current.state = { ...current.state, ...update };
  }
};

export const getters = {
  state: (current: { state: StateMachine }) => current.state,
  url: (current: { state: StateMachine }) => current.state.url
};

export const actions = {
  id(context: any, id: string): void {
    context.commit('set', { id });
  }
};

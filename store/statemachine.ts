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

export const state = (): { state: StateMachine } => ({
  state: { state: STATE.CLEAR, mimetype: 'image/webp' }
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

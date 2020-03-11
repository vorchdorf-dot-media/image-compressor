export enum STATE {
  CLEAR,
  IMAGE,
  OPTIONS
}

export const state = (): { state: STATE } => ({
  state: STATE.CLEAR
});

export const mutations = {
  set(state: { state: STATE }, update: STATE) {
    return (state.state = update);
  }
};

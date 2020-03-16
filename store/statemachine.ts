export enum STATE {
  CLEAR,
  IMAGE,
  OPTIONS
}

export interface StateMachine {
  state: STATE;
  format?: 'image/jpeg' | 'image/webp';
  id?: string;
}

export const state = (): StateMachine => ({
  state: STATE.CLEAR,
  format: 'image/webp'
});

export const mutations = {
  set(current: StateMachine, update: StateMachine) {
    current.state = update.state;
    current.format = update.format || current.format;
    current.id = update.id;
  }
};

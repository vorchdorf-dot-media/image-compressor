export enum STATE {
  CLEAR,
  IMAGE,
  OPTIONS
}

export interface StateMachine {
  state: STATE;
  id?: string;
}

export const state = (): StateMachine => ({
  state: STATE.CLEAR
});

export const mutations = {
  set(current: StateMachine, update: StateMachine) {
    current.state = update.state;
    current.id = update.id;
  }
};

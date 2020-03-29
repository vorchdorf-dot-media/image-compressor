import { Token, User } from 'netlify-identity-widget';

export interface UserStore extends User {}

export const state = (): { auth: UserStore | undefined } => ({
  auth: undefined
});

export const mutations = {
  set(current: { auth: UserStore | null }, update: UserStore) {
    return (current.auth = update);
  }
};

export const getters = {
  token: (current: { auth: UserStore }): Token | undefined =>
    current.auth?.token,
  user: (current: { auth: UserStore }): UserStore | null => current.auth
};

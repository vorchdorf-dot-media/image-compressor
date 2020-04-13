export enum FETCH {
  NONE,
  PENDING,
  SUCCESS,
  ERROR
}

export interface Album {
  _id: string;
  description: string;
  title: string;
}

export const state = (): { albums: Album[]; status: FETCH } => ({
  albums: [],
  status: FETCH.NONE
});

export const mutations = {
  set(state: { albums: Album[]; status: FETCH }, update: Album[]) {
    return (state.albums = update);
  },
  status(state: { albums: Album[]; status: FETCH }, status: FETCH) {
    return (state.status = status);
  }
};

export const getters = {
  options: (current: { albums: Album[] }) => current.albums
};

export const actions = {
  async fetch(context: any): Promise<void> {
    if (process.env.UPLOAD !== 'true') {
      return;
    }
    const self: any = this;
    const body = {
      query: '{ albums { _id title description } }'
    };
    try {
      context.commit('status', FETCH.PENDING);
      const { data: { albums = [] } = {} } = await self.$http.$post(
        'api/graphql',
        body,
        {
          prefixUrl: '/'
        }
      );
      context.commit('set', albums);
      context.commit('status', FETCH.SUCCESS);
    } catch (e) {
      console.error(e);
      context.commit('status', FETCH.ERROR);
    }
  }
};

export interface Album {
  _id: string;
  description: string;
  title: string;
}

export const state = (): { albums: Album[] } => ({
  albums: []
});

export const mutations = {
  set(state: { albums: Album[] }, update: Album[]) {
    return (state.albums = update);
  }
};

export const getters = {
  options: (current: { albums: Album[] }) => current.albums
};

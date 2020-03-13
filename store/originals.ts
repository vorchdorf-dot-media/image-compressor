export interface ImageStore {
  buffer: Uint8Array;
  height: number;
  id: string;
  mimetype?: string;
  width: number;
}

export const state = () => ({
  images: new Map<string, ImageStore>()
});

export const mutations = {
  set(state: { images: Map<string, ImageStore> }, image: ImageStore) {
    state.images.set(image.id, image);
  },
  delete(state: { images: Map<string, ImageStore> }, id: string) {
    state.images.delete(id);
  }
};

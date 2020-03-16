export interface ImageStore {
  buffer: Uint8Array;
  height: number;
  id: string;
  mimetype?: string;
  width: number;
}

export const state = (): { images: Map<string, ImageStore> } => ({
  images: new Map<string, ImageStore>()
});

export const mutations = {
  set(current: { images: Map<string, ImageStore> }, image: ImageStore) {
    const model = current.images.get(image.id);
    const updated = Object.assign({}, model || null, image);
    current.images.set(image.id, updated);
  },
  delete(current: { images: Map<string, ImageStore> }, id: string) {
    current.images.delete(id);
  }
};

export const getters = {
  image: (current: { images: Map<string, ImageStore> }) => (id: string) =>
    current.images.get(id)
};

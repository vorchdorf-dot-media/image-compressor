import { Exif } from '@saschazar/wasm-exif';
import { ImageStore } from '~/store/originals';

export interface ImageModel extends ImageStore {
  album?: string[];
  title?: string;
  description?: string;
  exif?: Exif;
}

export const state = (): { images: Map<string, ImageModel> } => ({
  images: new Map()
});

export const mutations = {
  set(current: { images: Map<string, ImageModel> }, image: ImageModel) {
    const model = current.images.get(image.id);
    const updated = Object.assign({}, model || null, image);
    current.images.set(image.id, updated);
  },
  delete(current: { images: Map<string, ImageModel> }, id: string) {
    current.images.delete(id);
  }
};

export const getters = {
  image: (current: { images: Map<string, ImageModel> }) => (id: string) =>
    current.images.get(id)
};

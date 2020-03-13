import { Exif } from '@saschazar/wasm-exif';
import { ImageStore } from '~/store/originals';

export interface ImageModel extends ImageStore {
  album?: string[];
  title?: string;
  description?: string;
  exif?: Exif;
}

export const state = () => ({
  images: new Map<string, ImageModel>()
});

export const mutations = {
  set(state: { images: Map<string, ImageModel> }, image: ImageModel) {
    state.images.set(image.id, image);
  },
  delete(state: { images: Map<string, ImageModel> }, id: string) {
    state.images.delete(id);
  }
};

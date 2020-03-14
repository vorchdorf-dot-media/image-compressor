import { Exif } from '@saschazar/wasm-exif';
import { ImageStore } from '~/store/originals';

export interface ImageModel extends ImageStore {
  album?: string[];
  title?: string;
  description?: string;
  exif?: Exif;
}

export const state = (): { images: { [key: string]: ImageModel } } => ({
  images: {}
});

export const mutations = {
  set(current: { images: { [key: string]: ImageModel } }, image: ImageModel) {
    current.images = { ...current.images, [image.id]: image };
  },
  delete(current: { images: { [key: string]: ImageModel } }, id: string) {
    const { [id]: toDelete, ...images } = current.images;
    current.images = { ...images };
  }
};

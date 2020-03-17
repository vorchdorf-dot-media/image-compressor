import { WorkerPayload } from '~/assets/worker/definitions';
import { EncoderPayload } from '~/assets/worker/encode.worker';

import { Exif } from '@saschazar/wasm-exif';
import { ImageStore } from '~/store/originals';

export interface QueueStore {
  images: { [key: string]: ImageModel };
  update?: Date;
}

export interface ImageModel extends ImageStore {
  album?: string[];
  title?: string;
  description?: string;
  exif?: Exif;
}

export const state = (): QueueStore => ({
  images: {}
});

export const mutations = {
  set(current: QueueStore, image: ImageModel) {
    current.images = {
      ...current.images,
      [image.id]: { ...current.images[image.id], ...image }
    };
    current.update = new Date();
  },
  delete(current: QueueStore, id: string) {
    const { [id]: toDelete, ...images } = current.images;
    current.images = images;
    current.update = new Date();
  }
};

export const getters = {
  image: (current: QueueStore) => (id: string) => current.images[id]
};

export const actions = {
  async encode(context: any) {
    const timestamp = Date.now();
    const { format, id } = context.rootGetters['statemachine/state'] || {};
    const { buffer, height, width } =
      context.rootGetters['originals/image'](id) || {};
    const { width: outWidth = width } = context.getters.image(id) || {};
    const codec = format === 'image/webp' ? 'webp' : 'mozjpeg';
    const scale = outWidth / width;
    const encoder = context.rootGetters[`${codec}/options`];

    const payload: EncoderPayload = {
      buffer,
      encoder,
      options: {
        height,
        mimetype: format,
        scale,
        width
      }
    };

    const encodeWorker = new (
      await import('worker-loader!~/assets/worker/encode.worker.ts')
    ).default();
    encodeWorker.onmessage = ({ data }: { data: WorkerPayload }) => {
      console.log(`Done after ${Date.now() - timestamp}ms`);
      context.commit('set', {
        id,
        buffer: data.buffer,
        height: data.options?.height,
        mimetype: data.options?.mimetype,
        width: data.options?.width
      });
    };

    encodeWorker.postMessage(payload);
  }
};

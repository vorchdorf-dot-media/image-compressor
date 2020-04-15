import { Exif } from '@saschazar/wasm-exif';
import { FORMAT } from '~/assets/helpers/formats';
import { WorkerPayload } from '~/assets/worker/definitions';
import { EncoderPayload } from '~/assets/worker/encode.worker';
import { ImageStore } from '~/store/originals';

export enum UPLOAD {
  INCOMPLETE,
  READY,
  LOADING,
  SUCCESS,
  ERROR
}

export interface QueueStore {
  images: { [key: string]: ImageModel };
  update?: Date;
}

export interface ImageModel extends ImageStore {
  album?: string[];
  title?: string;
  description?: string;
  exif?: Exif;
  upload?: UPLOAD;
}

export const state = (): QueueStore => ({
  images: {}
});

export const mutations = {
  set(current: QueueStore, image: ImageModel) {
    const title = image.title || current.images[image.id].title;
    current.images = {
      ...current.images,
      [image.id]: Object.assign(
        {},
        current.images[image.id],
        title && title.length ? { upload: UPLOAD.READY } : null,
        image
      )
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
  async encode(context: any): Promise<void> {
    const timestamp = Date.now();
    const { mimetype, id } = context.rootGetters['statemachine/state'] || {};
    const { buffer, height, width } =
      context.rootGetters['originals/image'](id) || {};
    const { width: outWidth = width } = context.getters.image(id) || {};
    const codec: FORMAT = mimetype === 'image/webp' ? 'webp' : 'jpeg';
    const scale = outWidth / width;
    const encoder = context.rootGetters[`${codec}/options`];

    const payload: EncoderPayload = {
      buffer,
      encoder,
      options: {
        height,
        mimetype,
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
  },
  async upload(context: any): Promise<void> {
    const self: any = this;
    const { state: { images = {} } = {} } = context;
    try {
      await Promise.all(
        Object.keys(images).map(
          async (id: string): Promise<void> => {
            const {
              buffer,
              description,
              exif,
              height,
              mimetype,
              title,
              width
            } = context.getters.image(id);

            try {
              const operations = {
                query:
                  'mutation createPicture($file: Upload!, $picture: PictureInput!) {  createPicture(file: $file, picture: $picture) {    _id    title    src  }}',
                variables: {
                  picture: {
                    description,
                    exif,
                    height,
                    mimetype,
                    title,
                    width
                  }
                },
                operationName: 'createPicture'
              };
              const formData = new FormData();
              formData.append('operations', JSON.stringify(operations));
              formData.append('map', JSON.stringify({ 0: ['variables.file'] }));
              formData.append('0', new Blob([buffer], { type: mimetype }));

              context.commit('set', {
                ...context.getters.image(id),
                upload: UPLOAD.LOADING
              });

              const { id: stateId } = context.rootGetters['statemachine/state'];

              const {
                data: { createPicture: { _id = '' } = {} } = {}
              } = await self.$http.$post('api/graphql', formData, {
                prefixUrl: '/'
              });

              if (_id.length > 0) {
                context.commit('set', {
                  ...context.getters.image(id),
                  id: _id,
                  upload: UPLOAD.SUCCESS
                });
                context.commit('delete', id);

                if (id === stateId) {
                  context.dispatch('statemachine/id', _id, { root: true });
                }
              }

              return context.getters.image(id);
            } catch (e) {
              console.error(`${id}: ${e.message || e}`);
              context.commit('set', {
                ...context.getters.image(id),
                upload: UPLOAD.ERROR
              });
              return context.getters.image(id);
            }
          }
        )
      );
    } catch (e) {
      console.error(e);
    }
  }
};

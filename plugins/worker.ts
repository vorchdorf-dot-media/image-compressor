import { Context } from '@nuxt/types';

export default (
  context: Context,
  inject: (
    namespace: string,
    obj: { [key: string]: () => Promise<Worker> }
  ) => void
) =>
  inject('worker', {
    decode: async (): Promise<Worker> =>
      new (
        await import('worker-loader!~/assets/worker/decode.worker.ts')
      ).default(),
    encode: async (): Promise<Worker> =>
      new (
        await import('worker-loader!~/assets/worker/encode.worker.ts')
      ).default(),
    exif: async (): Promise<Worker> =>
      new (
        await import('worker-loader!~/assets/worker/exif.worker.ts')
      ).default()
  });

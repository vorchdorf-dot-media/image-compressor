import { Context } from '@nuxt/types';

export default (
  context: Context,
  inject: (
    namespace: string,
    obj: { [key: string]: () => Promise<Worker> }
  ) => void
) =>
  inject('worker', {
    exif: async (): Promise<Worker> =>
      new (
        await import('worker-loader!~/assets/worker/exif.worker.ts')
      ).default(),
    decode: async (): Promise<Worker> =>
      new (
        await import('worker-loader!~/assets/worker/decode.worker.ts')
      ).default()
  });

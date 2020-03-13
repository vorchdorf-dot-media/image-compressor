import { WorkerPayload } from '~/assets/worker/definitions';

const worker: Worker = self as any;

const decode = async (
  buffer: Uint8Array,
  mimetype: 'image/jpeg' | 'image/webp'
): Promise<WorkerPayload> => {
  const decoder =
    mimetype === 'image/webp'
      ? await (await import('~/assets/worker/shared/webp')).default
      : await (await import('~/assets/worker/shared/loader')).default;
  const { decode, dimensions, free } = await decoder;
  const decodeWebP = decode as (b: Uint8Array, l: number) => Uint8Array;
  const decodeJPEG = decode as (
    b: Uint8Array,
    l: number,
    c: number
  ) => Uint8Array;

  const decoded = new Uint8Array(
    mimetype === 'image/webp'
      ? decodeWebP(buffer, buffer.length)
      : decodeJPEG(buffer, buffer.length, 3)
  );
  const { height, width } = dimensions();
  free();

  return {
    buffer: decoded,
    options: {
      mimetype,
      height,
      width
    }
  };
};

worker.addEventListener(
  'message',
  async ({ data }: { data: WorkerPayload }) => {
    const { buffer, options: { mimetype = null } = {} } = data;

    switch (mimetype) {
      case 'image/jpeg':
      case 'image/webp':
        const decoded = await decode(buffer, mimetype);
        return worker.postMessage(decoded);
      default:
        return worker.postMessage(null);
    }
  }
);

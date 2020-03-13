import mozjpegOptions, { EncodeOptions } from '@saschazar/wasm-webp/options';
import webpOptions, { MozJPEGOptions } from '@saschazar/wasm-mozjpeg/options';
import { WorkerPayload } from './definitions';

export interface EncoderPayload extends WorkerPayload {
  encoder?: EncodeOptions | MozJPEGOptions;
}

const worker: Worker = self as any;

const encode = async (payload: EncoderPayload): Promise<WorkerPayload> => {
  let encodePayload: EncoderPayload = { ...payload };
  const {
    buffer,
    options: { mimetype = null, height = 0, scale = 1.0, width = 0 } = {},
    encoder
  } = payload;

  if (scale < 1.0) {
    const loaderModule = await (await import('~/assets/worker/shared/loader'))
      .default;
    const { resize, free } = await loaderModule;
    const out = {
      height: Math.round(scale * height),
      width: Math.round(scale * width)
    };
    const resized = new Uint8Array(
      resize(buffer, width, height, 3, out.width, out.height) as Uint8Array
    );
    encodePayload = {
      ...payload,
      buffer: resized,
      options: { ...payload.options, ...out },
      encoder
    };
    free();
  }

  const encoderModule =
    mimetype === 'image/webp'
      ? await (await import('~/assets/worker/shared/webp')).default
      : await (await import('~/assets/worker/shared/mozjpeg')).default;
  const { encode, free } = await encoderModule;

  const encoderOptions = Object.assign(
    {},
    mimetype === 'image/webp' ? webpOptions : mozjpegOptions,
    encoder
  );
  const {
    buffer: encodeBuffer,
    options: { height: encodeHeight = 0.0, width: encodeWidth = 0.0 } = {}
  } = encodePayload;
  const encoded = new Uint8Array(
    encode(
      encodeBuffer,
      encodeWidth,
      encodeHeight,
      encoderOptions
    ) as Uint8Array
  );
  free();

  return { ...encodePayload, buffer: encoded };
};

worker.addEventListener(
  'message',
  async ({ data }: { data: EncoderPayload }) => {
    try {
      const encoded = await encode(data);
      return worker.postMessage(encoded);
    } catch (e) {
      return worker.postMessage(null);
    }
  }
);

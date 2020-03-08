import imageLoaderWasm from '@saschazar/wasm-image-loader/wasm_image_loader.wasm';
import imageLoader, { ImageLoaderModule } from '@saschazar/wasm-image-loader';

export enum IMAGE_ACTION {
  DECODE = 'decode',
  ENCODE = 'encode',
  RESIZE = 'resize'
}

export interface WorkerPayload {
  action: IMAGE_ACTION;
  buffer: Uint8Array;
  options?: {
    format?: 'jpeg' | 'webp';
    height?: number;
    scale?: number;
    width?: number;
  };
}

const wasmFactory = async (module: any, wasm: string): Promise<any> =>
  new Promise((resolve) => {
    const w = module({
      noInitialRun: true,
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return wasm;
        }
        return path;
      },
      onRuntimeInitialized: () => {
        const { then, ...other } = w;
        return resolve(other);
      }
    });
  });

const worker: Worker = self as any;

worker.onmessage = async ({ data }: { data: WorkerPayload }): Promise<void> => {
  // TODO:
};

import { Exif, ExifModule } from '@saschazar/wasm-exif';
import { WorkerPayload } from '~/assets/worker/definitions';
import wasmFactory from '~/assets/worker/shared/exif';

const worker: Worker = self as any;

let exifModule: Omit<ExifModule, 'then'>;
self.addEventListener(
  'message',
  async ({ data: { buffer } }: { data: WorkerPayload }): Promise<void> => {
    try {
      if (!exifModule) {
        exifModule = await wasmFactory;
      }
      const result = exifModule.exif(buffer, buffer.length) as Exif;
      return worker.postMessage(result);
    } catch (e) {
      return worker.postMessage(null);
    }
  }
);

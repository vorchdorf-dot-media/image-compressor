import { MozJPEGOptions } from '@saschazar/wasm-mozjpeg/options';
import { EncodeOptions } from '@saschazar/wasm-webp/options';

import { ImageStore } from '~/store/originals';
import { ImageModel } from '~/store/queue';
import { StateMachine } from '~/store/statemachine';

export interface ImageEncoderStore {
  mozjpeg: { options: MozJPEGOptions };
  originals: { images: Map<string, ImageStore> };
  queue: { images: { [key: string]: ImageModel } };
  statemachine: { state: StateMachine };
  webp: { options: EncodeOptions };
}

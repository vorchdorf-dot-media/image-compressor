import { MozJPEGOptions } from '@saschazar/wasm-mozjpeg/options';
import { EncodeOptions } from '@saschazar/wasm-webp/options';

import { Album } from '~/store/albums';
import { ImageStore } from '~/store/originals';
import { ImageModel } from '~/store/queue';
import { StateMachine } from '~/store/statemachine';
import { UserStore } from '~/store/user';

export interface ImageEncoderStore {
  albums: { albums: Album[] };
  jpeg: { options: MozJPEGOptions };
  originals: { images: Map<string, ImageStore> };
  queue: { images: { [key: string]: ImageModel } };
  statemachine: { state: StateMachine };
  user: { auth: UserStore };
  webp: { options: EncodeOptions };
}

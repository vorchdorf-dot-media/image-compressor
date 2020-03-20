import { MIMETYPE } from '~/assets/helpers/formats';

export interface WorkerPayload {
  buffer: Uint8Array;
  options?: {
    mimetype?: MIMETYPE;
    height?: number;
    scale?: number;
    width?: number;
  };
}

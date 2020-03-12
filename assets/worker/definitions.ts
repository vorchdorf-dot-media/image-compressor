export interface WorkerPayload {
  buffer: Uint8Array;
  options?: {
    mimetype?: 'image/jpeg' | 'image/webp';
    height?: number;
    scale?: number;
    width?: number;
  };
}

import exifWasm from '@saschazar/wasm-exif/wasm_exif.wasm';
import exif from '@saschazar/wasm-exif';

import wasmFactory from '~/assets/worker/shared/factory';

export default wasmFactory(exif, exifWasm);

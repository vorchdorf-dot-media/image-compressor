import mozjpegWasm from '@saschazar/wasm-mozjpeg/wasm_mozjpeg.wasm';
import mozjpeg from '@saschazar/wasm-mozjpeg';

import wasmFactory from '~/assets/worker/shared/factory';

export default wasmFactory(mozjpeg, mozjpegWasm);

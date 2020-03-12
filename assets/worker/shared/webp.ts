import webpWasm from '@saschazar/wasm-webp/wasm_webp.wasm';
import webp from '@saschazar/wasm-webp';

import wasmFactory from '~/assets/worker/shared/factory';

export default wasmFactory(webp, webpWasm);

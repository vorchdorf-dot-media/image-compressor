import imageLoaderWasm from '@saschazar/wasm-image-loader/wasm_image_loader.wasm';
import imageLoader from '@saschazar/wasm-image-loader';

import wasmFactory from '~/assets/worker/shared/factory';

export default wasmFactory(imageLoader, imageLoaderWasm);

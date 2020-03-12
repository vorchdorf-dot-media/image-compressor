declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.wasm' {
  const wasm: any;
  export default wasm;
}

declare module '*.worker.ts' {
  class TestWorker extends Worker {
    constructor();
  }

  export default TestWorker;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.wasm' {
  const wasm: any;
  export default wasm;
}

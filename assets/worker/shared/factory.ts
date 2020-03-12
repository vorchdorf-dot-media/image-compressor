const wasmFactory = async <T extends EmscriptenModule>(
  module: (options: { [key: string]: any }) => T,
  wasm: string
): Promise<Omit<T, 'then'>> =>
  new Promise<Omit<T, 'then'>>((resolve) => {
    const w: T = module({
      noInitialRun: true,
      locateFile: (path: string) => {
        if (path.endsWith('.wasm')) {
          return wasm;
        }
        return path;
      },
      onRuntimeInitialized: () => {
        const { then, ...other } = w;
        return resolve(other);
      }
    });
  });

export default wasmFactory;

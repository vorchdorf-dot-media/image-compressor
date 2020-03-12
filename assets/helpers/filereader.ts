export enum FILEREADER_READYSTATE {
  EMPTY,
  LOADING,
  DONE
}

export default (file: File): Promise<Uint8Array> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(reader.error);

    reader.onload = () => {
      if (reader.readyState === FILEREADER_READYSTATE.DONE) {
        const { result } = reader;
        resolve(new Uint8Array(result as ArrayBuffer));
      }
    };

    reader.readAsArrayBuffer(file);
  });

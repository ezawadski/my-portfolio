export default {
  /**
   * Removes any typing or custom object properties from an object
   * @param object Object to be stripped
   * @returns A plain javascript object
   */
  prepareData(object: Record<string, any>): Record<string, any> {
    return JSON.parse(JSON.stringify(object));
  },

  /**
   * Converts a blob into a file
   * @param blob Blob to be converted
   * @param fileName The file name for the resulting file
   * @param lastModified THe date that the file was last modified
   * @returns A file object
   */
  blobToFile(blob: Blob, fileName: string, lastModified: string): File {
    const file = new File([blob], fileName, { lastModified: +lastModified });
    return file;
  },

  /**
   * Converts a base64 encoded file into a File object
   * @param dataUrl Base64 encoded string
   * @param fileName The file name for the resulting file
   * @param fileType The type of the resulting file
   * @returns A promise that resolves to a file object
   */
  async base64ToFile(
    dataUrl: string,
    fileName: string,
    fileType: string
  ): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: fileType });
  },

  /**
   * Takes a string, number, array, or object and returns a easily readable string
   * @param entry Values to be printed
   * @param maxLenth Optional - Maximum length of the resulting string, Default is 200
   * @returns A string with a maximum length
   */
  prettyPrint(entry: number | string | [], maxLenth = 200): string {
    if (!entry) {
      return '';
    }
    let output = entry;
    if (Array.isArray(entry)) {
      output = entry.toString().replaceAll(',', ', ');
    }
    if (typeof entry === 'object' && entry !== null) {
      output = Object.values(entry)
        .toString()
        .replaceAll(',', ', ');
    }
    if (typeof output === 'string' && output.length > maxLenth) {
      output = `${output.slice(0, maxLenth - 3)}...`;
    }
    return output.toString();
  }
};

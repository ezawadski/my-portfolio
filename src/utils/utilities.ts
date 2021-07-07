export default {
  prepareData(object: Record<string, any>): Record<string, any> {
    return JSON.parse(JSON.stringify(object));
  },

  blobToFile(blob: Blob, fileName: string, lastModified: string): File {
    const file = new File([blob], fileName, { lastModified: +lastModified });
    return file;
  },

  async base64ToFile(
    dataUrl: string,
    fileName: string,
    fileType: string
  ): Promise<File> {
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    return new File([blob], fileName, { type: fileType });
  }
};

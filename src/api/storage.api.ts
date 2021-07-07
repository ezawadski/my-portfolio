import firebaseApi from './firebase.api';

interface MetaData {
  contentType: string;
  customMetadata: {
    fileName: string;
    lastModified: string;
  };
}

export default {
  /**
   * Saves a file to Firebase Storage and returns the download URL
   * @param path Path to where the file is stored
   * @param key Key to be used to save the file
   * @param file File to be saved in Firebase Storage
   * @returns Resulting download URL
   */
  saveFile(path: string, key: string, file: File): Promise<string> {
    const metaData: MetaData = {
      contentType: file.type,
      customMetadata: {
        fileName: file.name,
        lastModified: file.lastModified.toString()
      }
    };
    const fileRef = firebaseApi.storage.ref().child(`${path}/${key}`);
    const uploadTask = fileRef.put(file, metaData);
    return uploadTask.then(
      async snapshot => {
        return await snapshot.ref.getDownloadURL();
      },
      error => {
        throw new Error(error.message);
      }
    );
  },

  /**
   * Deletes a file in Firebase Storage
   * @param path Path to where the file is stored
   * @param key Key for the file
   * @returns A void promise
   */
  deleteFile(path: string, key: string): Promise<void> {
    const fileRef = firebaseApi.storage.ref().child(`${path}/${key}`);
    return fileRef.delete();
  }
};

export default {
  /**
   * Stores a key-value pair into the local storage of the device or browser
   * @param key Key to store the information
   * @param value Information to be stored
   * @returns nothing
   */
  setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * Returns the information stored in the local storage of the device or browser for a specified key
   * @param key Key used to store the information
   * @returns The information stored for that key
   */
  getLocalStorage(key: string): any {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },

  /**
   * Removed the information stored in the local storage of the device or browser for a specified key
   * @param key Key used to store the information
   * @returns nothing
   */
  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * Clears the local storage of the device or browser
   * @returns nothing
   */
  clearLocalStorage(): void {
    localStorage.clear();
  }
};

import firebaseApi from './firebase.api';

export default {
  /**
   * Logs into firebase using email and password
   * @param email Email to be used to login
   * @param password Password to be used to login
   * @returns Promise with User data for the user that logged in
   */
  async login(email: string, password: string): Promise<firebase.default.User> {
    const userCred = await firebaseApi.auth.signInWithEmailAndPassword(
      email,
      password
    );
    if (userCred.user) {
      return userCred.user;
    }
    throw new Error('Failed to Login');
  },

  /**
   * Logs out the user
   * @returns A void promise
   */
  logout(): Promise<void> {
    return firebaseApi.auth.signOut();
  },

  /**
   * Checks if a user is authenticated
   * @returns A boolean saying if someone is authenticated or not
   */
  checkAuthentication(): boolean {
    return !!firebaseApi.auth.currentUser;
  }
};

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

class Firebase {
  private app!: firebase.app.App;
  auth!: firebase.auth.Auth;
  firestore!: firebase.firestore.Firestore;
  storage!: firebase.storage.Storage;

  constructor() {
    this.initApp();
    this.initAuth();
    this.initFirestore();
    this.initStorage();
  }

  /**
   * Initializes the Firebase SDK client
   */
  private initApp() {
    this.app = firebase.initializeApp(
      JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG)
    );
  }

  /**
   * Initializes the Firebase Auth client
   */
  private initAuth() {
    if (!this.app) throw new Error('Firebase Not Initilaized');

    this.auth = this.app.auth();
  }

  /**
   * Initializes the Firebase Firestore client
   */
  private initFirestore() {
    if (!this.app) throw new Error('Firebase Not Initilaized');

    this.firestore = this.app.firestore();
  }

  /**
   * Initializes the Firebase Storage client
   */
  private initStorage() {
    if (!this.app) throw new Error('Firebase Not Initilaized');

    this.storage = this.app.storage();
  }
}

export default new Firebase();

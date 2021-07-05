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
    }

    private initApp() {
        console.log('FIREBASE', 'Init App');
        this.app = firebase.initializeApp(JSON.parse(process.env.VUE_APP_FIREBASE_CONFIG));
    }

    private initAuth() {
        console.log('FIREBASE', 'Init Auth');
        if (!this.app) throw new Error('Firebase Not Initilaized');

        this.auth = this.app.auth();
    }

    private initFirestore() {
        console.log('FIREBASE', 'Init Firestore');
        if (!this.app) throw new Error('Firebase Not Initilaized');

        this.firestore = this.app.firestore();
    }

    private initStorage() {
        console.log('FIREBASE', 'Init Storage');
        if (!this.app) throw new Error('Firebase Not Initilaized');

        this.storage = this.app.storage();
    }
}

export default new Firebase();

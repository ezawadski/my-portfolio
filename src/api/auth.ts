import firebaseApp from './firebase';

export default {
    login(email: string, password: string): Promise<any> {
        return firebaseApp.auth.signInWithEmailAndPassword(email, password);
    },
    logout(): Promise<void> {
        return firebaseApp.auth.signOut();
    },
    checkAuthenticated(): boolean {
        return !!firebaseApp.auth.currentUser;
    },
};

import { getAuth, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signInWithPopup, signOut } from "firebase/auth";
import { app } from './firebase_config.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function createUserStore() {
    const credentials={username:"", id:""};

    async function googleLogin() {
        return await signInWithPopup(auth, provider);
    }

    async function emailSignUp(email, pwd){
        return await createUserWithEmailAndPassword(auth, email, pwd);
    }

    async function emailLogin(email, pwd) {
        return await signInWithEmailAndPassword(auth, email, pwd)
    }

    async function logout() {
        return await signOut(auth);
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            credentials.username=user.displayName;
            credentials.id=user.email;
        } else {
            credentials.username="";
        }
    });

    return {
        credentials, googleLogin, emailSignUp, emailLogin, logout
    };
}

export const userStore = createUserStore(); 
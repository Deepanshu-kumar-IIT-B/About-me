import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import config from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Authentication Providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app, config.firestoreDatabaseId);

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_3Ol8xu8408Koht3rTkLYq-rky4Xg-q0",
  authDomain: "clothing-project-db-b431c.firebaseapp.com",
  projectId: "clothing-project-db-b431c",
  storageBucket: "clothing-project-db-b431c.appspot.com",
  messagingSenderId: "749555999279",
  appId: "1:749555999279:web:bfeab983840e02ef97dcda",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// getting user from auth service and storing it inside firestore database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // 1st - database; 2nd - collection; 3rd - unique identifier of a user (getting from response of signInWithGooglePopup)
  const userDocRef = doc(db, "users", userAuth.uid); // specific document for signed in user

  const userSnapshot = await getDoc(userDocRef); // user document snapshot
  // console.log(userSnapshot.exists()); // true/false whether this document already exists in database

  // if user data doesn't exist
  // create/set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // create user doc with fields: name, email and creation date
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }

  // if user data exists - return userDocRef;
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

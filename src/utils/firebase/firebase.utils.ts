import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/categories.types";

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

export type ObjectToAdd = {
  title: string;
}

// collectionKey - name of a table(collection); objectsToAdd - documents i want to add
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
  // Promise<void> when there is no return statement
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); // batch is needed for set of actions to the db

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); // the key for each object in db will be its title!
    batch.set(docRef, object);
  });

  await batch.commit(); // this will run batching process
  console.log("done");
};

export const getCategoriesAndDocuments = async (collectionKey: string): Promise<Category[]> => {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

// getting user from auth service and storing it inside firestore database
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  // if user data exists - return userSnapshot, which contains user data;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// when auth state changes(sign in, sign out), invokes callback!
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        // unsubscribe is a function which allows to stop listening for an auth change :)
        // the user is either the user object or null
        unsubscribe(); // unsubscribe immediately after we get data about user auth (closes the listener)
        resolve(userAuth); // returns either user object or null
      },
      reject
    );
  });
};

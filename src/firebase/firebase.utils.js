import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCe7b4jSVYdOccfq-XIyOwZQ2EU5D3bA8o",
  authDomain: "crwn-clothing-746ad.firebaseapp.com",
  projectId: "crwn-clothing-746ad",
  storageBucket: "crwn-clothing-746ad.appspot.com",
  messagingSenderId: "753826157473",
  appId: "1:753826157473:web:7077cb8c81c7ce4b2431e0",
  measurementId: "G-RE1N789T6H",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

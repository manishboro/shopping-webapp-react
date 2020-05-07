import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyByjqYovDciqnCvsrIZYoZpfXs0h-YpgDw",
  authDomain: "crwn-clothing-c670b.firebaseapp.com",
  databaseURL: "https://crwn-clothing-c670b.firebaseio.com",
  projectId: "crwn-clothing-c670b",
  storageBucket: "crwn-clothing-c670b.appspot.com",
  messagingSenderId: "922153593811",
  appId: "1:922153593811:web:c565d6b208352c1fc39d26",
  measurementId: "G-R9R3EF3KRR",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // console.log(userRef);
  const snapShot = await userRef.get();
  // console.log(snapShot);

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
    } catch (err) {
      console.log("error creating user", err.message);
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

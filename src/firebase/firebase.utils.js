import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJT2N0WbsP6Ivun40-Ck-s9-R5_LvvKpc",
    authDomain: "memespoty.firebaseapp.com",
    databaseURL: "https://memespoty.firebaseio.com",
    projectId: "memespoty",
    storageBucket: "memespoty.appspot.com",
    messagingSenderId: "548917801923",
    appId: "1:548917801923:web:f58bd75a2cb98a6a194376",
    measurementId: "G-E3KCFW8V5D"
  };

  export const createUserProfileDocument = async (userAuth, data) => {
      if(!userAuth) return;
      const userRef = firestore.doc(`memesters/${userAuth.uid}`);

      const snapshot = await userRef.get();

      if(!snapshot.exists){

        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...data
            })
        }
        catch(error){
            console.log(error)
        }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
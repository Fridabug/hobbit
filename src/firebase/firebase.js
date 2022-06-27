// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAibWkuGjiJ5ngOcKfThSuBLWb4ZH4Ph3Y",
    authDomain: "hobbyt-6b5c6.firebaseapp.com",
    projectId: "hobbyt-6b5c6",
    storageBucket: "hobbyt-6b5c6.appspot.com",
    messagingSenderId: "842001819775",
    appId: "1:842001819775:web:a43733d4731f98d19e774a",
    measurementId: "G-S80VK4QBKS"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// instantiate our database:
export const db = getFirestore();

// async function that receives a user documentation object from logGoogleUser:
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    // check if there is a user document reference. 
    // userDocRef = doc() - that takes three arguments: first: database, second: collections, third: identifier. 
    // after user authentication we get a response with the user object. we can use it to access the unique id and use it as identifier. (user = userAuth)
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    // to get the data related to a document
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot) // points to the same identifier as userDocRef - but this is a special object because it enables us to check if that object exists
    console.log(userSnapshot.exists())

    // if user data does not exist --> create / set document with the data from the userAuth in my collection

    if(!userSnapshot.exists()) {
        // destructure display name and email from the user object that I get back after log in
        const {displayName, email} = userAuth;

        // to keep track of when the users log in
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation})
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
          

    }
    // if user data exists --> return userDocRef
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

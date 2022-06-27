// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


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
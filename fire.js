import 'firebase/firestore'
import firebase from "firebase/app"
import "firebase/auth"

var firebaseConfig = {
    apiKey: "AIzaSyC2_4ZOIT8p2prkVNXsrRTEHIJm_GBC3kU",
    authDomain: "moveoapp-2ed78.firebaseapp.com",
    projectId: "moveoapp-2ed78",
    storageBucket: "moveoapp-2ed78.appspot.com",
    messagingSenderId: "134232669853",
    appId: "1:134232669853:web:7a0bef381c50b17ab39e74"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;

  export const dbFirestore = fire.firestore();
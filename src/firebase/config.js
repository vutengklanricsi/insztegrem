import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyClPgcQzg5gxo4SPe9D4seOfS3VbTqGf8g",
  authDomain: "ingsztegrem.firebaseapp.com",
  databaseURL: "https://ingsztegrem.firebaseio.com",
  projectId: "ingsztegrem",
  storageBucket: "ingsztegrem.appspot.com",
  messagingSenderId: "933242786601",
  appId: "1:933242786601:web:7bc185b5f4a67c97f35d38",
  measurementId: "G-X233YRG3RX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { projectStorage, projectFirestore, timestamp };

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDF-yFdjGXQ6qknurMKfpvlJwaATup_mLM',
  authDomain: 'neptune-8eb67.firebaseapp.com',
  projectId: 'neptune-8eb67',
  storageBucket: 'neptune-8eb67.appspot.com',
  messagingSenderId: '1014111866687',
  appId: '1:1014111866687:web:761102becdef82b9b80d8a',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

export const firestore = firebase.firestore();
export const firebaseStorage = firebase.storage();

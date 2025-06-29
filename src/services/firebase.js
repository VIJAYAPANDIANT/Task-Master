// services/firebase.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, push, set, query, orderByChild, equalTo, remove, update } from 'firebase/database';

import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebaseConfig';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {
  auth,
  database,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  ref,
  onValue,
  push,
  set,
  query,
  orderByChild,
  equalTo,
  remove,
  update,

  onAuthStateChanged ,
};

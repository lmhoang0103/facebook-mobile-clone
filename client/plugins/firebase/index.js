import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyB1qC6a992Qi0qym__61UZ--vDCNgxr4sY',
    authDomain: 'cross-platform-d7ba9.firebaseapp.com',
    projectId: 'cross-platform-d7ba9',
    storageBucket: 'cross-platform-d7ba9.appspot.com',
    messagingSenderId: '953813007143',
    appId: '1:953813007143:web:c72f4f43a9a6e8e8ffc702',
    measurementId: 'G-75F1QWD693',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { app, firebase };

import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAcd9sKBFEnMftwhCuLqGUJs86q-f1R49U",
    authDomain: "mobilestore-455ea.firebaseapp.com",
    databaseURL: "https://mobilestore-455ea.firebaseio.com",
    projectId: "mobilestore-455ea",
    storageBucket: "mobilestore-455ea.appspot.com",
    messagingSenderId: "455575051506",
    appId: "1:455575051506:web:4550c67a95db4d167ec46b",
    measurementId: "G-25KLSMMQW0"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}

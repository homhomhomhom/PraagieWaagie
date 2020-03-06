import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBkVxJm01n_8rnzL1wjl3cG0ZhAeN0Z1R0",
    authDomain: "praagiewaagie.firebaseapp.com",
    databaseURL: "https://praagiewaagie.firebaseio.com",
    projectId: "praagiewaagie",
    storageBucket: "praagiewaagie.appspot.com",
    messagingSenderId: "53110014268",
    appId: "1:53110014268:web:3cc38c80f3663f614d1e39"
  };


firebase.initializeApp(firebaseConfig);

export default firebase
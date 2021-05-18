import firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyDm3fjxVymt8U9HDw7CDd0BSgUnatklc-0",
    authDomain: "zamowienia-59bfa.firebaseapp.com",
    databaseURL: "https://zamowienia-59bfa-default-rtdb.firebaseio.com",
    projectId: "zamowienia-59bfa",
    storageBucket: "zamowienia-59bfa.appspot.com",
    messagingSenderId: "468696926624",
    appId: "1:468696926624:web:3c5a2faef9c6deb54a3cc5"
  };

firebase.initializeApp(config);

export default firebase.database();
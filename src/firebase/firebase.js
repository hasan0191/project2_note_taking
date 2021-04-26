import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBAgqHXlcfDF6nUYZQ__QOpy7ku9KUmn7w",
  authDomain: "mystudent-35181.firebaseapp.com",
  projectId: "mystudent-35181",
  storageBucket: "mystudent-35181.appspot.com",
  messagingSenderId: "945212005967",
  appId: "1:945212005967:web:3d5dbdea892e9e40ff943a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
import firebase from 'firebase';
import 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyBkwljv8Dt1yHRKlBorR3RpiCEDlW_Y720',
  authDomain: 'forinho-2.firebaseapp.com',
  projectId: 'forinho-2',
  storageBucket: 'forinho-2.appspot.com',
  messagingSenderId: '987346767671',
  appId: '1:987346767671:web:4e7b24d444ddf73291d4b2',
  measurementId: 'G-LH2QNZ1376',
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

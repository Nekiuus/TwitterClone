// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB8PrcQ5-XRUiir7xWl6L8gnRg1_NcxlE4",
  authDomain: "fir-twitter-ba173.firebaseapp.com",
  projectId: "fir-twitter-ba173",
  storageBucket: "fir-twitter-ba173.firebasestorage.app",
  messagingSenderId: "254523833610",
  appId: "1:254523833610:web:39fef25fb715d7e1f90ef3",
  measurementId: "G-377Q89QBNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const authPersistence = setPersistence(auth, browserLocalPersistence);
const handleLogout = () => signOut(auth);

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
  try {
    await authPersistence;
    const result = await signInWithPopup(auth, googleProvider);
    setError('');
    console.log('Google Sign-In', result.user);
  } catch (err) {
    console.log(err)
    setError('Google Sign-In failed')
  }
} 


//HANDLE LOGIN EMAIL AND PASSWORD
const handleSubmit = async (e, setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
      await authPersistence;
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCred.user);
      setError('')
  } catch (err) {
    console.log(err);
    setError('Invalid email or password');
    
  }
  e.target.reset();
}

export { auth, googleProvider, handleGoogleLogin, handleSubmit, handleLogout }
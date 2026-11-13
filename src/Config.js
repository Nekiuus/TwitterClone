import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";

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


//HANLDE SING UP EMAIL AND PASSWORD
const handleSignUp = async (e, setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    await authPersistence;
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserProfile(userCred.user);
    console.log('User signed up:', userCred.user);
    setError('');
  } catch (err) {
    console.log(err);
    setError('Sign up failed');
  }
}

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError) => {
  try {
    await authPersistence;
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserProfile(result.user);
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
      await saveUserProfile(userCred.user);
      console.log('User signed in:', userCred.user);
      setError('')
  } catch (err) {
    console.log(err);
    setError('Invalid email or password');
    
  }
  e.target.reset();
}
//Follow and Unfollow function
export const db = getFirestore(app)

export async function saveUserProfile(user) {
const username = user.email?.split("@")[0] || user.uid;

await setDoc(doc(db, "users", user.uid), {
  uid: user.uid,
  email: user.email || "",
  username: username,
  usernameKey: username.toLowerCase(),
  displayName: user.displayName || username,
  photoURL: user.photoURL || "",
  updatedAt: serverTimestamp(),
},
 { merge: true });
}

function relationshipProfile(profile, uid) {
  const email = profile.email || "";
  const username = profile.username || email.split("@")[0] || uid;
  const displayName = profile.displayName && profile.displayName !== email
    ? profile.displayName
    : username;

  return {
    uid,
    username,
    email,
    displayName,
    photoURL: profile.photoURL || "",
  };
}

export async function toggleFollow(currentUid, targetUid) {
  if (!currentUid || !targetUid || currentUid === targetUid) {
    throw new Error('No se puede seguir esta cuenta')
  }

  const followingRef = doc(db, 'users', currentUid, 'following', targetUid)
  const followerRef = doc(db, 'users', targetUid, 'followers', currentUid)
  const currentProfileRef = doc(db, 'users', currentUid)
  const targetProfileRef = doc(db, 'users', targetUid)

  await runTransaction(db, async (transaction) => {
    const following = await transaction.get(followingRef)

    if (following.exists()) {
      transaction.delete(followingRef)
      transaction.delete(followerRef)
    } else {
      const [currentProfile, targetProfile] = await Promise.all([
        transaction.get(currentProfileRef),
        transaction.get(targetProfileRef),
      ])

      transaction.set(followingRef, {
        ...relationshipProfile(targetProfile.data() || {}, targetUid),
        createdAt: serverTimestamp(),
      })
      transaction.set(followerRef, {
        ...relationshipProfile(currentProfile.data() || {}, currentUid),
        createdAt: serverTimestamp(),
      })
    }
  })
}

export { auth, googleProvider, handleGoogleLogin, handleSubmit, handleLogout, handleSignUp }
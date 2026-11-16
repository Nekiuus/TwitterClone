import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import { getFirestore, doc, runTransaction, serverTimestamp, setDoc } from "firebase/firestore";
import type { Dispatch, FormEvent, SetStateAction } from "react";

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

type SetError = Dispatch<SetStateAction<string>>;

//HANLDE SING UP EMAIL AND PASSWORD
const handleSignUp = async (event: FormEvent<HTMLFormElement>, setError: SetError) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    await authPersistence;
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await saveUserProfile(userCred.user);
    setError('');
  } catch (err) {
    console.log(err);
    setError('Sign up failed');
  }
}

// HANDLE GOOGLE LOGIN
const handleGoogleLogin = async (setError: SetError) => {
  try {
    await authPersistence;
    const result = await signInWithPopup(auth, googleProvider);
    await saveUserProfile(result.user);
    setError('');
  } catch (err) {
    console.log(err)
    setError('Google Sign-In failed')
  }
} 


//HANDLE LOGIN EMAIL AND PASSWORD
const handleSubmit = async (event: FormEvent<HTMLFormElement>, setError: SetError) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
      await authPersistence;
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      await saveUserProfile(userCred.user);
      setError('')
  } catch (err) {
    console.log(err);
    setError('Invalid email or password');
    
  }
  form.reset();
}
//Follow and Unfollow function
export const db = getFirestore(app)

interface UserProfile {
  uid: string;
  email: string;
  username: string;
  usernameKey: string;
  displayName: string;
  photoURL: string;
}

export async function saveUserProfile(user: User) {
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

function relationshipProfile(profile: Partial<UserProfile>, uid: string) {
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

export async function toggleFollow(currentUid: string, targetUid: string) {
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

export { auth, handleGoogleLogin, handleSubmit, handleLogout, handleSignUp }
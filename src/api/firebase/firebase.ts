// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup ,createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {query, getDocs, collection, where, addDoc, getFirestore, updateDoc, doc, getDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD4ceO9pNawMaYID_j4n-WIcoUE2TXMayk",
    authDomain: "pokedex-f034e.firebaseapp.com",
    projectId: "pokedex-f034e",
    storageBucket: "pokedex-f034e.appspot.com",
    messagingSenderId: "98086856639",
    appId: "1:98086856639:web:e4f2aaf577477af760a30a",
    measurementId: "G-Z088CLEFNF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const getFavorites = async(email: string, setFavorites: (value: []) => void)=>{
    const q = query(collection(db, "users"), where("email", "==", email));
  
    const querySnapshot = await getDocs(q);
    let docID = '';
    let pokemonIds: any
    querySnapshot.forEach((doc) => {
    // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
      pokemonIds = doc.data().pokemonId
    });
    setFavorites(pokemonIds)
  }

  const addToFavorites = async(email: string, pokemonId:number, setFavorites: (value: []) => void)=>{
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    let docID = '';
    let d: any
    querySnapshot.forEach((doc) => {
    // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
      d = doc.data().pokemonId ? doc.data().pokemonId : []
    });
    const user = doc(db, "users", docID);
    await updateDoc(user, {
       pokemonId: [...d,pokemonId]
    });

    getFavorites(email,setFavorites)
}

const removeFavorites =async (email:string, pokemonId: number, setFavorites: (value: []) => void) => {
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  let docID = '';
  let d: any
  querySnapshot.forEach((doc) => {
  // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
    docID = doc.id;
    d = doc.data().pokemonId
  });
  const user = doc(db, "users", docID);
  var filteredArray = d.filter((e: number) => e !== pokemonId);
  await updateDoc(user, {
     pokemonId: filteredArray
  });
  getFavorites(email, setFavorites)
  
}

  export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    addToFavorites,
    getFavorites,
    removeFavorites
  };
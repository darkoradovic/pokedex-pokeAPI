// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup ,createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import {query, getDocs, collection, where, addDoc, getFirestore, updateDoc, doc, getDoc} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import dayjs from "dayjs";
import {  toast } from 'react-toastify';

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
const storage = getStorage(app);

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

const logInWithEmailAndPassword = async (email: string, password: string,setModal: (value: boolean) => void, setError: (value: string) => void) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setModal(false);
    } catch (error: any) {
      if(error.message === "Firebase: Error (auth/email-already-in-use).") {
        
          setError("Email already in use")
      }
      if(error.message === "Firebase: Error (auth/invalid-email).") {
        
        setError("Invalid email")
    }
    if(error.message === "Firebase: Error (auth/wrong-password).") {
        
      setError("Wrong password")
  }
  if(error.message === "Firebase: Error (auth/user-not-found).") {
        
    setError("User not found")
}

if(error.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'){
  setError('To many attempts, try again later')
}
      
    }
  };

  const registerWithEmailAndPassword = async (name: string, email: string, password: string, setModal: (value: boolean) => void, setError: (value: string) => void) => {
    try {
      
      let subscription
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);
      let docID = '';
      querySnapshot.forEach((doc) => {
        docID = doc.id;
        subscription = doc.data().subscription
      });
      
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        subscription: !subscription ? 'free' : subscription,
        limit: 20,
        pokemonFavorites: [],
        avatar: '',
        birthday: ''
      });
      setModal(false);
    } catch (error: any) {
      if(error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email already in use")
    }
    }
  };

  const sendPasswordReset = async (email: string, setModal: (value: boolean) => void) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setModal(false)
      alert("Password reset link sent! Please check your email.");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    signOut(auth);
    window.location.href = '/'
    localStorage.removeItem('user')
    localStorage.removeItem('prevUser')
  };

  const getFavorites = async(email: string, setFavorites?: (value: []) => void)=>{
    const q = query(collection(db, "users"), where("email", "==", email));
  
    const querySnapshot = await getDocs(q);
    let docID = '';
    let pokemonIds: any
    let name = ''
    let userEmail = ''
    let avatar = ''
    let birthday = ''
    let subscription = ''
    querySnapshot.forEach((doc) => {
      docID = doc.id;
      pokemonIds = doc.data().pokemonFavorites
      name = doc.data().name
      userEmail = doc.data().email
      avatar = doc.data().avatar
      birthday = doc.data().birthday
      subscription = doc.data().subscription
    });
    const localData = {
      name,
      email: userEmail,
      avatar,
      birthday,
      subscription
    }
    setFavorites && setFavorites(pokemonIds)
    localStorage.setItem('user', JSON.stringify(localData))
  }

  const addToFavorites = async(email: string, id:number, setFavorites: (value: []) => void,  name: string, types: any, height: number, weight: number, stats: any, setStripeModal: (event: boolean) => void)=>{
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);
    let docID = '';
    let d: any
    let pokemonList:any
    let subscription: string
    querySnapshot.forEach((doc) => {
    // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
      docID = doc.id;
      d = doc.data().pokemonFavorites ? doc.data().pokemonFavorites : []
      pokemonList = doc.data().pokemonFavorites.length
      subscription = doc.data().subscription
    });
    const user = doc(db, "users", docID);
    const data ={
      id,
      name, 
      types,
      height,
      weight,
      stats,
      timestamp: dayjs().unix()
    }
    if(pokemonList <= 19 && subscription === 'free' ){
      await updateDoc(user, {
        pokemonFavorites: [...d,data]
     })
    }else if(pokemonList <= 20 && subscription === 'basic'){
      await updateDoc(user, {
        pokemonFavorites: [...d,data]
     })
    }else if( subscription === 'premium'){
      await updateDoc(user, {
        pokemonFavorites: [...d,data]
     })
    } else{
      setStripeModal(true)
    }

    getFavorites(email,setFavorites)
}

const updateSubsriptionPlan = async(email: string, subscription: string, limit: number)=>{
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  let docID = '';
  querySnapshot.forEach((doc) => {
  // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
    docID = doc.id;
  });
  const user = doc(db, "users", docID);
  
    await updateDoc(user, {
      subscription: subscription,
      limit: limit
   })
 
}

const removeFavorites =async (email:string, id: number, setFavorites: (value: []) => void) => {
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  let docID = '';
  let d: any
  querySnapshot.forEach((doc) => {
  // if email is you primary key then only document will be fetched so it is safe to continue, this line will get the documentID of user so that we can update it
    docID = doc.id;
    d = doc.data().pokemonFavorites
  });
  const user = doc(db, "users", docID);
  var filteredArray = d.filter((e: any) => e.id !== id);
  await updateDoc(user, {
    pokemonFavorites: filteredArray
  });
  getFavorites(email, setFavorites)
  
}

const updateProfile = async (email: string, name: string , updatedEmail: string, avatar: string, birthday: string, setUpdating: (value: boolean) => void) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  setUpdating(true)
  const querySnapshot = await getDocs(q);
  let docID = '';
  querySnapshot.forEach((doc) => {
    docID = doc.id;
  });
  const user = doc(db, "users", docID);
  
   try {
    await updateDoc(user, {
      name: name,
      email: updatedEmail,
      avatar: avatar,
      birthday: birthday
   })
   setUpdating(false)
   toast.success('Profile successfully updated!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
   } catch (error) {
    toast.error('Profile not updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
   }
}

  export {
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    addToFavorites,
    getFavorites,
    removeFavorites,
    updateSubsriptionPlan,
    updateProfile
  };
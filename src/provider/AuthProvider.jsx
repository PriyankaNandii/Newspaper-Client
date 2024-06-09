
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, linkWithCredential, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from '../firebase/firebaseConfig';
import axios from 'axios';


export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const updateUserProfile = (name, image) =>{
   return updateProfile(auth.currentUser, {
      displayName: name, 
      photoURL: image
    })
  }

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  }

  const logOut = () => {
    
    setLoading(true);
    signOut(auth);
    
    
  }



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
            const loggedUser = { email: user.email };
            axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, {
                withCredential: true
            }).then(response => {
                console.log("JWT token:", response.data); 
            }).catch(error => {
                console.error("Error:", error); 
            });
        } else {
            setUser(null);
        }
        setLoading(false);
    });
    return () => unsubscribe();
}, []);


  const allValues = {
    createUser,
    signInUser,
    googleLogin,
    githubLogin,
    logOut,
    user,
    updateUserProfile,
    loading
  }

  return (
    <AuthContext.Provider value={allValues}>
      {children} 
    </AuthContext.Provider>
  );
};

export default AuthProvider;

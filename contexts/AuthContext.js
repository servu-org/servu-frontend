// contexts/AuthContext.js
// Manages user authentication state globally using Firebase.

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  // RecaptchaVerifier, // Needed for phone auth
  // signInWithPhoneNumber // Needed for phone auth
  updateProfile // To set display name
} from 'firebase/auth';
import { auth, db } from '../firebase/config'; // Firebase services
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions
import { ROLES } from '../lib/constants';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Store user role

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const userProfile = await fetchUserProfile(user.uid);
        setCurrentUser({ ...user, ...userProfile }); // Combine auth user with profile data
        if (userProfile && userProfile.role) {
          setUserRole(userProfile.role);
        } else {
          // Handle case where profile might not exist yet or role is missing
           // This could happen if signup process was interrupted
          setUserRole(null);
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  async function fetchUserProfile(uid) {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        console.log("No such user profile document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }


  // Signup with email, password, and additional details
  async function signup(email, password, name, role = ROLES.USER) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    // Create user profile in Firestore
    const userProfileData = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: name,
      role: role,
      createdAt: new Date(),
      photoURL: userCredential.user.photoURL || '', // Store photoURL if available
      // Add other profile fields as needed (e.g., phoneNumber, address)
    };
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfileData);

    // Update local state
    const fullUser = { ...userCredential.user, ...userProfileData };
    setCurrentUser(fullUser);
    setUserRole(role);
    return fullUser;
  }

  // Login with email and password
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Auth state change listener will pick up the user and fetch profile
    return userCredential.user;
  }

  // Logout
  async function logout() {
    await signOut(auth);
    // Auth state change listener will set currentUser to null
  }

  // Login/Signup with Google
  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore, if not, create a profile
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // New user via Google, create profile with default role (or prompt for role)
      // For now, defaulting to USER role. This might need adjustment based on UX flow.
      const userProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        role: ROLES.USER, // Default role for Google sign-ups
        createdAt: new Date(),
        photoURL: user.photoURL || '',
      };
      await setDoc(userDocRef, userProfileData);
      setCurrentUser({ ...user, ...userProfileData });
      setUserRole(ROLES.USER);
    } else {
      // Existing user, auth state listener will handle profile fetching.
      // We can manually set it here too to ensure immediate update if needed.
      const profileData = userDocSnap.data();
      setCurrentUser({ ...user, ...profileData });
      setUserRole(profileData.role);
    }
    return user;
  }

  // Placeholder for Phone Number Login (more complex, involves Recaptcha)
  // async function loginWithPhoneNumber(phoneNumber, appVerifier) {
  //   return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  // }
  //
  // async function setupRecaptcha(elementId) {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(elementId, {
  //       'size': 'invisible', // Can be 'normal' or 'invisible'
  //       'callback': (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         // ...
  //       },
  //       'expired-callback': () => {
  //         // Response expired. Ask user to solve reCAPTCHA again.
  //         // ...
  //       }
  //     }, auth);
  //   }
  // }

  const value = {
    currentUser,
    userRole, // Expose userRole
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
    // loginWithPhoneNumber, // Add when implemented
    // setupRecaptcha, // Add when implemented
    fetchUserProfile // Expose if needed by components directly
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only when not loading to prevent flash of unauthenticated content */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

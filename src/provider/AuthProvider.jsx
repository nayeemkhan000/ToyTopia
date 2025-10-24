import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setCurrentUser(authenticatedUser);
      setIsLoading(false);
    });
    return () => authUnsubscribe();
  }, []);

  const userLogin = async (userEmail, userPassword) => {
    setIsLoading(true);
    try {
      const loginResult = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      setCurrentUser(loginResult.user);
      return loginResult.user;
    } finally {
      setIsLoading(false);
    }
  };

  const userRegister = async (userEmail, userPassword, userDisplayName, userPhotoURL) => {
    setIsLoading(true);
    try {
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      await updateProfile(registrationResult.user, { displayName: userDisplayName, photoURL: userPhotoURL });
      setCurrentUser(registrationResult.user);
      return registrationResult.user;
    } finally {
      setIsLoading(false);
    }
  };

  const socialAuthentication = async (socialProviderName) => {
    setIsLoading(true);
    let socialProvider;
    if (socialProviderName === "google") socialProvider = new GoogleAuthProvider();
    if (socialProviderName === "github") socialProvider = new GithubAuthProvider();
    try {
      const socialResult = await signInWithPopup(auth, socialProvider);
      setCurrentUser(socialResult.user);
      return socialResult.user;
    } catch (socialError) {
      if (socialError.code === "auth/account-exists-with-different-credential") {
        throw new Error(
          "An account already exists with this email but a different sign-in method."
        );
      }
      throw socialError;
    } finally {
      setIsLoading(false);
    }
  };

  const googleAuthentication = () => socialAuthentication("google");

  const userLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading: isLoading,
        setUser: setCurrentUser,
        login: userLogin,
        register: userRegister,
        socialLogin: socialAuthentication,
        googleLogin: googleAuthentication,
        logout: userLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

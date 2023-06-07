import React, { createContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../Firebase/Firebase.init";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const user = { displayName: "Ashik" };
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };
    const authInfo = {
        user,
        googleLogin,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;

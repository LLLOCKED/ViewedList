import {useContext, createContext, useEffect, useState, ReactNode} from 'react';
import firebase from "firebase/auth"
import {
    GoogleAuthProvider,
    signOut,
    signInWithPopup
} from 'firebase/auth';

import { auth } from '../firebase';

type Props = {
    children: JSX.Element|JSX.Element[]|ReactNode;
}
type AppContext = {
    user?: firebase.User | null;
    googleSignIn?: () => void;
    logOut?: () => void;
}

const AuthContext = createContext<AppContext>({});

export const AuthContextProvider = ({children} : Props) => {

    const [user, setUser] = useState<firebase.User | null > (null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    };

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser: firebase.User | null) => {
            setUser(currentUser);
            console.log('User', currentUser)
        });
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <AuthContext.Provider value={{user, googleSignIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}


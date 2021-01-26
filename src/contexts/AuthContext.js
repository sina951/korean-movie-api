import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"  // used for functions signup, login, logout etc, the functionality is given by firebase

// Context provides a way to pass data through the component tree without having to pass props down manually at every level.
// 2. Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.
const AuthContext = React.createContext()

// 3. Function allows us to use the context
// This function allows us to use the AuthContext
export function useAuth() {
    return useContext(AuthContext)
}

// 1.
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()  // by default we have no user to begin with
    const [loading, setLoading] = useState(true)      // 2. this here handels our Auth loading state by default we are loading to check if there is a user!

    function signup(email, password) {
        // returns a promise, it's value will be stored in {value} but first it calls setCurrentUser(user)
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    // auth.onAuthStateChanged is firebase's own way to notify you whenever a user gets set!
    // import to add this inside a useEffect and not in our render, since we only want to run it when we mount our component
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)  // this will be current user or null
          setLoading(false)     // 1. setLoading(false) means we actually got a user. firebase sets token for you, thus we can check from the beginning if user is logged in! it will create that user for you using the onAuthStateChanged. However you need to created the initial state with [loading, setLoading]. 
        })
    
        return unsubscribe      // this will unsubscribe us from the auth.onAuthStateChanged listener when whenever we unmount our component 
    }, [])                      // [] makes sure useEffect only runs once

    // {value} contains all of our information we want to provide with our authentication
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updatePassword,
        updateEmail
    }

    // currentUser gets returned here to our provider to use anywhere in our application
    // {/* 3. !loading means user is logged in and useState is set to (false)! thus we can render our app(children) safely , this mean we make sure we wont render any of our application until user gets set for the very first time! */}
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

// Why do private route?
// When we logout react-route had the default setting to redirect use to dashboard, That gives the error;
// TypeError: Cannot read property 'email' of null . email is null because we logged out! To avoid this we need to setup a private route
// 1. Create a wrapper for out current route with: PrivateRoute({ component: Component, ...rest }) also import Route from react-router-dom
export default function PrivateRoute({ component: Component, ...rest }) {
    const {currentUser} = useAuth()  // get current user from firebase data

    
    // PrivateRoute wraps the current Route here! 
    // important to pass all the ...rest of the props, as they would normally be passed to Route in App.js
    // next we create our own render, first it checks if there is a currentUser logged in, if there is a currentUser we want to render our PrivateRoute with a the Components!
    // however, if no currentUser is available we want to redirect user to the login page!
    // The logic is:  true ? if true render me : if not true render me instead!
    return (
        <Route
            {...rest}
            render = { props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/" />
            }}
        ></Route>
    )
}

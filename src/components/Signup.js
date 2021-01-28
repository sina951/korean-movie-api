import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"  // useHistory takes us back to dashboard after login
import { useAuth } from "../contexts/AuthContext"

// useRef() refs are just an object for storing a value that persists between renders, ref is always an object with a single .current property which is set to the current value of the ref. Refs in React are incredibly useful for accessing and manipulating DOM elements directly.
export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()                   // we are pulling the signup directly from the AuthContext.js, so we use it as a part of our form
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)  // avoid multiple clicks on signup button
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        
        // validation check - the function stops here if no match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) { // this is is imporant! motheyecker I was stick for days for writing this wrong!
            return setError("Passwords do not match") // create new state for this
        }

        try {
            setError("")        // before we try anything we want to set our error back to an empty string
            setLoading(true)    // setLoading state is used to avoid the user creating multiple account by spamming clicking
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")   // brings us back to home if signup is seccesfull
        } catch {
            setError("Failed to create an account")

        }

        setLoading(false)       // setLoading back to false only after try/catch is succesfull = now the user can try click on signup button again
    }

    // disabled={loading} = when state is set to loading we wont be able to click on button and resubmit! avoiding spam

    
    return (
        <section className="contact-page">

        <article className="card">
            <div className="card-body">
                <h3>Sign Up</h3>
                {error && <div className="form-alert-box"> {error} </div> }

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email"  placeholder="email" className="form-control" autoComplete="on" id="email" ref={emailRef} required></input>
                        <input type="password"  placeholder="password" className="form-control" autoComplete="on" id="password" ref={passwordRef} required></input>
                        <input type="password" placeholder="Password Confirmation" className="form-control" autoComplete="on" id="password-confirm" ref={passwordConfirmRef} required></input>
                    </div>
                    
                    <button disabled={loading} type="submit" className="submit-btn btn">
                        Submit
                    </button>
                </form>
            </div>
            <div className="form-option">
                Already have an account? <Link to="/login" style={{textDecoration: 'none', color: 'cyan'}}>Log In </Link>
                || <Link to="/" style={{textDecoration: 'none', color: 'cyan'}}>Home</Link>
            </div>
        </article>
        </section>
    )
}

import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"  // useHistory takes us back to dashboard after login
import { useAuth } from "../contexts/AuthContext"
import Nav from "./Nav"
// import { Link, useHistory } from "react-router-dom"
// useRef() refs are just an object for storing a value that persists between renders, ref is always an object with a single .current property which is set to the current value of the ref. Refs in React are incredibly useful for accessing and manipulating DOM elements directly.
export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()                    // we are pulling the signup directly from the AuthContext.js, so we use it as a part of our form
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)  // avoid multiple clicks on signup button
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")        // before we try anything we want to set our error back to an empty string
            setLoading(true)    // setLoading state is used to avoid the user creating multiple account by spamming clicking
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")   // brings us back to home if signup is successful
        } catch {
            setError("Failed to log in")

        }

        setLoading(false)       // setLoading back to false only after try/catch is succesfull = now the user can try click on signup button again
    }

    return (
        <section className="contact-page">
            <Nav />
        <article>
            <div className="card-body">
                <h3>Log In</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {error && <div className="form-alert-box"> {error} </div> }
                        <input type="email" name="email" placeholder="email" className="form-control" ref={emailRef} required></input>
                        <input type="password" name="password" placeholder="password" className="form-control" ref={passwordRef} required></input>
                    </div>
                    {/* disabled={loading} = when state is set to loading we wont be able to click on button and resubmit! avoiding spam */}
                    <button disabled={loading} type="submit" className="submit-btn btn">
                        Submit
                    </button>
                </form>
            </div>
            <div className="form-option">
                Need an account? <Link to="/signup" style={{textDecoration: 'none', color: 'cyan'}}>Sign Up </Link>
                || <Link to="/forgot-password" style={{textDecoration: 'none', color: 'cyan'}}>Forgot Password?</Link>
            </div>
        </article>
        </section>
    )
}

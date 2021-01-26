import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"  // useHistory takes us back to dashboard after login
import { useAuth } from "../contexts/AuthContext"
import Nav from "./Nav"
// import { Link, useHistory } from "react-router-dom"
// useRef() refs are just an object for storing a value that persists between renders, ref is always an object with a single .current property which is set to the current value of the ref. Refs in React are incredibly useful for accessing and manipulating DOM elements directly.
export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)  // avoid multiple clicks on signup button

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")        // before we try anything we want to set our error back to an empty string
            setLoading(true)    // setLoading state is used to avoid the user creating multiple account by spamming clicking
            await resetPassword(emailRef.current.value)
            setMessage("Success, Check you inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)       // setLoading back to false only after try/catch is succesfull = now the user can try click on signup button again
    }

    return (
        <section className="contact-page">
            <Nav />
        <article>
            <div className="card-body">
                <h3>Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        {error && <div className="form-alert-box"> {error} </div> }
                        {message && <div className="form-alert-box-success" > {message} </div> }
                        <input type="email" name="email" placeholder="email" className="form-control" ref={emailRef} required></input>
                    </div>
                    <button disabled={loading} type="submit" className="submit-btn btn">
                        Submit
                    </button>
                </form>
            </div>
            <div className="form-option">
                Need an account? <Link to="/signup" style={{textDecoration: 'none', color: 'cyan'}}>Sign Up </Link>
                || <Link to="/login" style={{textDecoration: 'none', color: 'cyan'}}>Login</Link>
            </div>
        </article>
        </section>
    )
}


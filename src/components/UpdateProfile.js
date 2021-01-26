import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"  // useHistory takes us back to dashboard after login
import { useAuth } from "../contexts/AuthContext"
import Nav from "./Nav"

// useRef() refs are just an object for storing a value that persists between renders, ref is always an object with a single .current property which is set to the current value of the ref. Refs in React are incredibly useful for accessing and manipulating DOM elements directly.
export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()      // we are pulling the signup directly from the AuthContext.js, so we use it as a part of our form
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)                       // avoid multiple clicks on signup button
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        // validation check - the function stops here if no match
        if (passwordRef.current.value !== passwordConfirmRef.current.value) { // this is is imporant! motheyecker I was stick for days for writing this wrong!
            return setError("Passwords do not match") // create new state for this
        }

        const promises = []
        setLoading(true)    // setLoading state is used to avoid the user creating multiple account by spamming clicking
        setError("")        // before we try anything we want to set our error back to an empty string

        // Check if our email is NOT equal to our current email. If they are not equal(meaning we wish to change our email) push he new email to firefox to update it
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        // Check if the new password we wish to replace the old one with, is not the same
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        // IF all of the above if statements pass, then run .then and pass our promise array
        Promise.all(promises)
        .then(() => {
            history.push("/")
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally(() => {
            setLoading(false)   // Avoid spam
        })
    }

    return (
        <section className="contact-page">
            <Nav />
        <article className="card">
            <div className="card-body">
                <h3>Update Profile</h3>
                {error && <div className="form-alert-box"> {error} </div> }

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email"  placeholder="email" className="form-control" autoComplete="on" id="email" ref={emailRef} required defaultValue={currentUser.email}></input>
                        <input type="password"  placeholder="New password - Leave blank to keep the same" className="form-control" autoComplete="on" id="password" ref={passwordRef}></input>
                        <input type="password" placeholder="Confirm new password" className="form-control" autoComplete="on" id="password-confirm" ref={passwordConfirmRef}></input>
                    </div>
                    {/* disabled={loading} = when state is set to loading we wont be able to click on button and resubmit! avoiding spam */}
                    <button disabled={loading} type="submit" className="submit-btn btn">
                        Submit Update
                    </button>
                </form>
            </div>
            <div className="form-option">
                <Link to="/" style={{textDecoration: 'none', color: 'cyan'}}>Cancel</Link>
            </div>
        </article>
        </section>
    )
}

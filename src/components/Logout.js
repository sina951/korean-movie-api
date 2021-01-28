import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

// Log in(changes to Logout), Sign up button beside it  -- This is the Dashboard.js from the course originally

export default function Logout() {
    const [error, setError] = useState("")
    const { currentUser, logout} = useAuth()  // logout is function we define in AuthContext.js, it gives us current user from logged in from firebase
    const history = useHistory()


    async function handleLogout() {
        setError("")

        try {
            await logout()        // await to when logout finished, then continue with rest of the code
            history.push('/')     // direct us to home when logged out

        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <section className="contact-page">
        <article className="card">
            <div className="card-body">
                <h3>Profile</h3>
                    <div className="form-group">
                        {error && <div className="form-alert-box"> {error} </div> }
                        <strong>Email:</strong> {currentUser.email}
                    </div>
                    <button className="submit-btn btn">
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to="update-profile">Update Profile</Link>
                    </button>
            </div>
            <div className="form-option">
                <Link to="" onClick={handleLogout} style={{textDecoration: 'none', color: 'cyan'}}>Log out </Link>
                ||
                <Link to="/" style={{textDecoration: 'none', color: 'cyan'}}> Home</Link>
            </div>
        </article>
        </section>
    )
}

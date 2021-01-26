import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import logo2 from "../img/logo2.png";

// rafce
// attach event listener to the window object. handleShow(true); = means black bar is shown. handleShow(false) means regular bar is shown
// Be sure to add this, its saying everytime useEffect fires of for whatever reason,
// before you fire it of again, just remove the listener, that way you wont get 20 listeners
// always have have nav class, but if ${show is true,(when scrolled pass 100px), then we want to append "nav-black" class
const Nav = () => {
  const [show, handleShow] = useState(false);
  const { currentUser } = useAuth()
  // I recently had this issue with the Navbar code in ReactJS to give the Navbar a background color after scrolling 100px on the y-axis and remove it if the page view is within 100px of the top.
  // All I had to do is introduce a reverse function in the removeEventListener to give it the rules for application.
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        // do this
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY < 100) {
          // do this
          handleShow(false);
        } else handleShow(true);
      });
    };
  });

  // user not logged in ? generate this button : otherwise generate this button

  return (
    <div className={`nav ${show && "nav-black"}`}>
      <Link to="/"><img className="nav-logo" src={logo2} alt="logo"/></Link>
      <div className="nav-button-group">
        {/* user not logged in ? generate this button : otherwise generate this button */}
        { !currentUser ? <button className="nav-button"><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }} >Log In</Link></button> : <button className="nav-button"><Link to="/logout" style={{ textDecoration: 'none', color: 'inherit' }} >Log Out</Link></button> }
        <button className="nav-button"><Link to="/signup" style={{ textDecoration: 'none', color: 'inherit' }} >Sign Up</Link></button>
      </div>
    </div>
  );
};

export default Nav;

import React, { useEffect, useState } from "react";
import logo2 from "../img/logo2.png";

// rafce
const Nav = () => {
  const [show, handleShow] = useState(false);
  // attach event listener to the window object. handleShow(true); = means black bar is shown. handleShow(false) means regular bar is shown
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    // Be sure to add this, its saying everytime useEffect fires of for whatever reason,
    // before you fire it of again, just remove the listener, that way you wont get 20 listeners
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    // always have have nav class, but if ${show is true,(when scrolled pass 100px), then we want to append "nav-black" class
    <div className={`nav ${show && "nav-black"}`}>
      <img className="nav-logo" src={logo2} alt="logo" />
    </div>
  );
};

export default Nav;

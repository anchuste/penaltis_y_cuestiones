import React, { useState } from "react";
import Hamburger from './../assets/hamburger.png';
import { QuestionsForm } from "./QuestionsForm";

export const NavBar = ({showNavbarWhilePlaying}) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

    return (
      <>
      {showNavbarWhilePlaying === false ?
      <nav className="navbar">
      <div className="container">
        <div className="logo">
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger} style={{width: "10%", height: "10%"}} alt="React Logo" />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <button className="btn_nav_bar" to="/support">Inicio</button>
            </li>
            <li>
              <button className="btn_nav_bar" to="/support">Acerca de</button>
            </li>
            <li>
              <button className="btn_nav_bar" to="/support">Clasificación</button>
            </li>
            <li>
              <button className="btn_nav_bar" to="/support">Instrucciones</button>
            </li>
            <li>
              <button className="btn_nav_bar" to="/support">Colabora</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>:null}
    </>
      );
}
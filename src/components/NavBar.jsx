import React, { useState } from "react";
import Hamburger from './../assets/hamburger_violet.png';

export const NavBar = ({showNavbarWhilePlaying, handleNavBarState}) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const navBarButtonOnClick = (event) => {
    console.log(event.target.id)
    handleNavBarState(event.target.id);
    setShowNavbar(showNavbar);
    handleShowNavbar();
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
              <button id="homeNavBarButton" onClick={navBarButtonOnClick} className="btn_nav_bar" to="/home">Inicio</button>
            </li>
            <li>
              <button id="infoNavBarButton" onClick={navBarButtonOnClick} className="btn_nav_bar" to="/info">Acerca de</button>
            </li>
            <li>
              <button id="rankingNavBarButton" onClick={navBarButtonOnClick} className="btn_nav_bar" to="/support">Clasificación</button>
            </li>
            <li>
              <button className="btn_nav_bar" to="/support">Instrucciones</button>
            </li>
            <li>
              <button id="supportNavBarButton" onClick={navBarButtonOnClick} className="btn_nav_bar" to="/support">Colabora</button>
            </li>
            <li>
              <button id="buyaCoffeeBarButton" onClick={navBarButtonOnClick} className="btn_nav_bar" to="/coffee">Apoyáme</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>:null}
    </>
      );
}
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import trivialLogo from './../assets/trivial_anchus_225.png'
import Hamburger from './../assets/hamburger.png';

export const NavBar = ({ showNavbarWhilePlaying  }) => {
  const [showNavbar, setShowNavbar] = useState(false)

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
              <NavLink style={{color: '#09f', textDecoration: 'none', fontSize: "26px"}} to="/home">Inicio</NavLink>
            </li>
            <li>
              <NavLink style={{color: '#09f', textDecoration: 'none', fontSize: "26px"}} to="/contact">Acerca de</NavLink>
            </li>
            
            <li>
              <NavLink style={{color: '#09f', textDecoration: 'none', fontSize: "26px"}} to="/ranking">Clasificación</NavLink>
            </li>
            <li>
              <NavLink style={{color: '#09f', textDecoration: 'none', fontSize: "26px"}} to="/help">Instrucciones</NavLink>
            </li>
            <li>
              <NavLink style={{color: '#09f', textDecoration: 'none', fontSize: "26px"}} to="/support">Colabora</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>:null}
    </>
      );


}
import React, { useState } from 'react'
import './Navbar.css';
import logo from '../../assets/logo.png'

function Navbar() {
  // State to track whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  //Toggle function to open/close mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className='navbar'>
        <div className='logo-container'>
          <img src={logo} alt='Logo' className='logo-img' />
          <h1 className='logo-text'>Myportfolio</h1>
          </div>

          {/* (Navigation links (appear horizontal on desktop, dropdown on mobile) */}
        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <a href='#home' onClick={toggleMenu}>Home</a>
            <a href='#about' onClick={toggleMenu}>About</a>
            <a href='#projects' onClick={toggleMenu}>Projects</a>
            <a href='#contact' onClick={toggleMenu}>Contact</a> 
        </div>

        {/* Hamburger menu icon for mobile view */}
        <div className='hamburger' onClick={toggleMenu}>
          {/* These 3 spans make up the hamburger icon */}
          <span className={menuOpen ? 'bar rotate1' : 'bar'}></span>
          <span className={menuOpen ? 'bar fade' : 'bar'}></span>
          <span className={menuOpen ? 'bar rotate2' : 'bar'}></span>

        </div>
    </nav>
  );
}

export default Navbar;
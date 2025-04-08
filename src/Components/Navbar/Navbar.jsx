import React from 'react'
import './Navbar.css';
import logo from '../../assets/logo.png'

function Navbar() {
  return (
    <nav className='navbar'>
        <div className='logo-container'>
          <img src={logo} alt='Logo' className='logo-img' />
          <h1 className='logo-text'>Myportfolio</h1>
          </div>
        <ul className='nav-links'>
            <li><a href='#home'>Home</a></li>
            <li><a href='#about'>About</a></li>
            <li><a href='#projects'>Projects</a></li>
            <li><a href='#contact'>Contact</a></li>
            
        </ul>
    </nav>
  );
}

export default Navbar;
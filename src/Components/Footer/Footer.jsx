import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Nelson's Portfolio. All rights reserved.</p>
      <p className="footer-links">
        <a href="#home">Home</a> | 
        <a href="#about">About</a> | 
        <a href="#projects">Projects</a> | 
        <a href="#contact">Contact</a>
      </p>
    </footer>
  );
}

export default Footer;
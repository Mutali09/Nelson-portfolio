import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';
import Projects from './Components/Projects/Projects';
import './styles.css';

function App() {
  return (
    <>
    <Navbar />
    <main>
      <About />
      <Projects />
      <Contact />
    </main>
    </>
    
    
  );
}

export default App;
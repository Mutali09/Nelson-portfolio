import React from 'react';
import './About.css';
import profile from '../../assets/profile.png'

function About() {
  return (
    <section className='about' id='about'>
      <img src={profile} alt='profile' className='profile' />
      <div className='about-text'>
        <h2>About me</h2>
        <p>
        Hi! I'm a passionate front-end developer with a love for crafting clean,
        responsive, and user-friendly websites. I enjoy solving problems and bringing ideas to life in the browser.
        </p>
        <ul>
        <li>🌐 HTML, CSS, JavaScript</li>
          <li>⚛️ React.js & JSX</li>
          <li>🎨 UI/UX Enthusiast</li>
        </ul>

      </div>
    </section>
  );
}

export default About;
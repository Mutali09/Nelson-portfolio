import React from "react";
import "./Home.css";

function Home() {
  return (
    <section className="home" id="home">
      <div className="home-content">
        <h1>Hi, I'm Nelson 👋</h1>
        <p>A passionate Frontend Developer</p>
        <a href="#projects" className="cta-btn">
          See My Work
        </a>
      </div>
    </section>
  );
}

export default Home;

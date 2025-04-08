import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className='contact' id='contact'>
        <h2>Contact me</h2>
        <p>If you would like to get in touch, please drop a message!</p>
        <form>
            <input type='text' placeholder='Your Name' required />
            <input type='text' placeholder='Your Email' required />
            <textarea placeholder='Your Message' rows='5' required></textarea>
            <button type='Submit'>Send Message</button>
        </form>
    </section>
  );
}

export default Contact
import React, { useState, useEffect } from 'react';
import './Contact.css';
import { submitContactForm } from '../../services/api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Clear success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      const response = await submitContactForm(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Handle specific error cases
      if (error.message === 'Too many requests. Please try again later.') {
        setErrorMessage('You have sent too many messages. Please wait a while before trying again.');
      } else if (error.message === 'Invalid email format') {
        setErrorMessage('Please enter a valid email address.');
      } else if (error.message === 'All fields are required') {
        setErrorMessage('Please fill in all fields.');
      } else {
        setErrorMessage(error.message || 'An error occurred while sending your message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='contact' id='contact'>
      <h2>Contact me</h2>
      <p>If you would like to get in touch, please drop a message!</p>
      
      {submitStatus === 'success' && (
        <div className="success-message">
          Thank you for your message! I'll get back to you soon.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <textarea
            name='message'
            placeholder='Your Message'
            rows='5'
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            disabled={isSubmitting}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button 
          type='submit' 
          disabled={isSubmitting}
          className={isSubmitting ? 'submitting' : ''}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </section>
  );
}

export default Contact;
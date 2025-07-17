import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; // Import Axios
import './style3.css'; // Import your CSS files

function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post('/contact', {
        name: fullName,
        email,
        message,
      });

      if (response.status === 201) {
        alert('Message sent successfully!');
        setFullName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      console.log('Axios response:', error.response); 
      alert('An error occurred while sending the message.');
    }

    setSubmitting(false);
  };

  return (
    <div className='bg1'>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
      </Helmet>
      <section className="contact">
        <div className="content">
          <h2>
            <b>Contact Us</b>
          </h2>
          <p>
            Hi Saransh this side, if you have any queries please feel free to
            contact us by providing the following details
          </p>
        </div>
        <div className="container">
          <div className="contactInfo">
            <div className="box">
              <div className="icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="text">
                <h3>Address</h3>
                <p>
                  4321 karol bagh road,
                  <br />
                  dilli, delhi,
                  <br />
                  12345
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p>8595775864</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>Saransh.singh50@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="contactForm">
            <form onSubmit={handleSubmit}>
              <h2>Send Message</h2>
              <div className="inputBox">
                <input
                  type="text"
                  name=""
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <span>Full name</span>
              </div>
              <div className="inputBox">
                <input
                  type="text"
                  name=""
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
              </div>
              <div className="inputBox">
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <span>Type Your Message...</span>
              </div>
              <div className="inputBox">
                <input
                  type="submit"
                  name=""
                  value={submitting ? 'Sending...' : 'Send'}
                  disabled={submitting}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
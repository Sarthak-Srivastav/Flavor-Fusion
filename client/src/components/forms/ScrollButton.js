import React, { useState, useEffect } from 'react';
import { BiSolidUpArrow } from "react-icons/bi";
import "../../styles/scroll_button.css";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <button
      className={`scroll-button ${visible ? 'visible' : ''}`}
      onClick={scrollToTop}
      style={{ position: 'fixed', bottom: '50px', right: '30px', zIndex: '1000' }}
    >
      <BiSolidUpArrow style={{ display: "block" }} />
    </button>
  );
}

export default ScrollButton;

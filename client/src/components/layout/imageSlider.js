import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "../../styles/scroll_button.css";

const ImageSlider = ({ images, interval = 3000, width, height }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(imageInterval);
  }, [images, interval]);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="image-slider" style={{ position: "relative", width, height }}>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        style={{ width: "94%", height: "100%", objectFit: "cover" }}
      />
      <button
        style={{ position: "absolute", top: "50%", left: "40px", transform: "translateY(-50%)" }}
        onClick={goToPreviousImage}
      >
        <IoIosArrowBack size={32} style={{ display: "block" }} />
      </button>
      <button
        style={{ position: "absolute", top: "50%", right: "40px", transform: "translateY(-50%)" }}
        onClick={goToNextImage}
      >
        <IoIosArrowForward size={32} style={{ display: "block" }} />
      </button>
      <div className="dot-container" style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;

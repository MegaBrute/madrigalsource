import { useState, useEffect } from 'react';
import './ImageCarousel.css';

import boostboard1 from '../assets/BoostBoard1.png';
import boostboard2 from '../assets/BoostBoard2.png';
import boostboard3 from '../assets/BoostBoard3.png';
import boostboard4 from '../assets/BoostBoard4.png';

import cdc1 from '../assets/cdc1.png';
import cdc2 from '../assets/cdc2.png';
import cdc3 from '../assets/cdc3.png';
import cdc4 from '../assets/cdc4.png';

const projectImages = {
  boostboard: [boostboard1, boostboard2, boostboard3, boostboard4],
  cdclite: [cdc1, cdc2, cdc3, cdc4],
};

function ImageCarousel({ project = 'boostboard' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = projectImages[project] || projectImages.boostboard;

  // Preload all images on mount
  useEffect(() => {
    Object.values(projectImages).flat().forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Reset to first image when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [project]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev-btn" onClick={goToPrevious} aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="carousel-viewport">
        <img
          src={images[currentIndex]}
          alt={`Screenshot ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>

      <button className="carousel-btn next-btn" onClick={goToNext} aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;

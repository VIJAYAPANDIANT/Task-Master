import React from 'react';
import './GalaxyBackground.css';

const GalaxyBackground = ({ theme }) => {
  return (
    <div className="galaxy-container">
      <div id="stars-small" className="star-layer"></div>
      <div id="stars-medium" className="star-layer"></div>
      <div id="stars-big" className="star-layer"></div>
    </div>
  );
};

export default GalaxyBackground;

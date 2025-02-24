// ThankYouPopup.js
import React from 'react';
import './ThankYouPopup.css';
import CommunityPlatformsLinks from '../CommunityPlatformsLinks/CommunityPlatformsLinks';
const ThankYouPopup = ({ onClose }) => {
  return (
    <div className="thank-you-overlay">
      <div className="thank-you-modal">
      
        <h2>Thank You!</h2>
        <p>Your submission has been received.</p>
        <p>Join Intaskr Community</p>
        <CommunityPlatformsLinks />
        <button onClick={onClose} className="close-popup-button mt-4">Close</button>
      </div>
    </div>
  );
};

export default ThankYouPopup;

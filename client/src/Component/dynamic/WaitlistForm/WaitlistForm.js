

import React, { useState, useEffect } from 'react';
import './WaitlistForm.css';
import './ThankYouPopup.css'; // Make sure to import the CSS for ThankYouPopup
import { fetchIpAddress } from '../../api/ipApi'; 
import axios from 'axios';
import Notification from '../../Notification/Notification'; 
import ThankYouPopup from './ThankYouPopup';
import CommunityPlatformsLinks from '../CommunityPlatformsLinks/CommunityPlatformsLinks';

const WaitlistForm = ({ onClose, setShowWaitlist }) => {
  const [ipAddress, setIPAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: ''
  });
  const [notification, setNotification] = useState(null);
  const [showThankYou, setShowThankYou] = useState(false); // Add this state

  const showNotification = (message, textColor, backgroundColor) => {
    setNotification({ message, textColor, backgroundColor });
  };

  const closeNotification = () => {
    setNotification(null);
    setShowWaitlist(false);
  };

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const data = await fetchIpAddress();
        setIPAddress(data);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    getIpAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/waitlist`, {
        ...formData,
        ipAddress
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 409) {
        showNotification('You are already in the waitlist.', 'white', 'red');
      } else {
        console.log('Form Data Submitted:', response.data);
        // showNotification('Form submitted successfully!', 'white', 'green');

        // Clear form inputs
        setFormData({
          name: '',
          email: '',
          phone: '',
          purpose: ''
        });

        // Close the form and show the "Thank You" popup
        // setShowWaitlist(false);
        setShowThankYou(true);
        // setTimeout(() => {
          // setShowThankYou(false);
        // }, 3000); // Close after 3 seconds
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      showNotification('Error submitting form data', 'white', 'red');
    }
  };

  return (
    <div className="waitlist-overlay">
      <div className="waitlist-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="waitlist-title">Join Our Waitlist</h2>
        {notification && (
          <Notification 
            message={notification.message} 
            textColor={notification.textColor} 
            backgroundColor={notification.backgroundColor} 
            onClose={closeNotification} 
          />
        )}
        <form className="waitlist-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone <span className="required">*</span></label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="purpose">Purpose (optional)</label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="form-input"
              rows="4"
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <CommunityPlatformsLinks />
      </div>
      {showThankYou && (
  <ThankYouPopup 
    onClose={() => {
      setShowThankYou(false);
      setShowWaitlist(false);
    }} 
  />
)}
{/* Conditionally render ThankYouPopup */}
    </div>
  );
};

export default WaitlistForm;


// import React, { useState, useEffect } from 'react';
// import './WaitlistForm.css';
// import { fetchIpAddress } from '../../api/ipApi'; 
// import axios from 'axios';
// import Notification from '../../Notification/Notification'; // Adjust the import path as necessary

// import CommunityPlatformsLinks from '../CommunityPlatformsLinks/CommunityPlatformsLinks';

// const WaitlistForm = ({ onClose, setShowWaitlist }) => {
//   const [ipAddress, setIPAddress] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     purpose: ''
//   });
//   const [notification, setNotification] = useState(null);

//   const showNotification = (message, textColor, backgroundColor) => {
//     setNotification({ message, textColor, backgroundColor });
//   };

//   const closeNotification = () => {
//     setNotification(null);
//     setShowWaitlist(false);
//   };

//   useEffect(() => {
//     const getIpAddress = async () => {
//       try {
//         const data = await fetchIpAddress();
//         setIPAddress(data);
//       } catch (error) {
//         console.error('Error fetching IP address:', error);
//       }
//     };

//     getIpAddress();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API}/api/waitlist`, {
//         ...formData,
//         ipAddress
//       }, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       // Handle response based on status
//       if (response.status === 409) {
//         showNotification('You are already in the waitlist.', 'white', 'red');
//       } else {
//         console.log('Form Data Submitted:', response.data);
//         showNotification('Form submitted successfully!', 'white', 'green'); // Show success notification

//         // Clear form inputs
//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           purpose: ''
//         });
//         setShowWaitlist(false);
//       }
//     } catch (error) {
//       console.error('Error submitting form data:', error);
//       showNotification('Error submitting form data', 'white', 'red'); // Show error notification
//     }
//   };

//   return (
//     <div className="waitlist-overlay">
//       <div className="waitlist-modal">
//         <button className="close-button" onClick={onClose}>×</button>
//         <h2 className="waitlist-title">Join Our Waitlist</h2>
//         {notification && (
//           <Notification 
//             message={notification.message} 
//             textColor={notification.textColor} 
//             backgroundColor={notification.backgroundColor} 
//             onClose={closeNotification} 
//           />
//         )}
//         <form className="waitlist-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name <span className="required">*</span></label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email <span className="required">*</span></label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="phone">Phone <span className="required">*</span></label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="form-input"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="purpose">Purpose (optional)</label>
//             <textarea
//               id="purpose"
//               name="purpose"
//               value={formData.purpose}
//               onChange={handleChange}
//               className="form-input"
//               rows="4"
//             />
//           </div>
//           <button type="submit" className="submit-button">Submit</button>
//         </form>
//  <CommunityPlatformsLinks/>


//       </div>
//     </div>
//   );
// };

// export default WaitlistForm;


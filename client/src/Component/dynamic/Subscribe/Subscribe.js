import React, { useState, useEffect } from 'react';
import { fetchIpAddress } from '../../api/ipApi'; 
import axios from 'axios';
import Notification from '../../Notification/Notification'; // Adjust the import path as necessary

const Subscribe = () => {
  const [ipAddress, setIPAddress] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
  });
  const [notification, setNotification] = useState(null);

  const showNotification = (message, textColor, backgroundColor) => {
    setNotification({ message, textColor, backgroundColor });
  };

  const closeNotification = () => {
    setNotification(null);
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call to subscribe (replace with actual API endpoint)
      await axios.post(`${process.env.REACT_APP_API}/api/subscribe`, {
        email: formData.email,
        ipAddress,
      });
      showNotification('Subscription successful!', 'white', 'green');
    } catch (error) {
      showNotification('Subscription failed. Please try again.', 'white', 'red');
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          textColor={notification.textColor}
          backgroundColor={notification.backgroundColor}
          onClose={closeNotification}
        />
      )}
    
        <input
          className='InputOfEmail'
       
          type="email"
          name="email"
          placeholder='Enter your email...'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button className='ButtonOfSignup' onClick={handleSubmit}>Subscribe</button>
 
    </>
  );
};

export default Subscribe;


import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchIpAddress } from '../api/ipApi'; 
import axios from "axios";
import './Logout.css';
function LogOut() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [ipAddress, setIPAddress] = useState(null);
  const navigate = useNavigate();
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
  useEffect(() => {
    setShowAnimation(true);
    const performLogout = async () => {
      // Retrieve the token and userId from localStorage
      const token = localStorage.getItem("IntaskrToken");
      const userId = localStorage.getItem("IntaskrUser");

      if (token && userId) {
        try {
          // Send a request to the backend to log out
          await axios.post(`${process.env.REACT_APP_API}/api/logout`, { userId, token,ipAddress });

          // Remove the token and userId from localStorage
          localStorage.removeItem("IntaskrToken");
          localStorage.removeItem("IntaskrUser");

          // Navigate to the home page
          navigate("/");
        } catch (error) {
          console.error("Error logging out:", error);
          // Optionally handle logout errors here
        }
      } else {
        // If no token or userId is found, navigate to home page
        navigate("/");
      }
    };

    performLogout();
  }, [navigate]);

  return   (<div className={`LogoutContainer ${showAnimation ? 'fadeOut' : ''}`}>
  <h1>Logging Out...</h1>
  <div className='LogoutAnimation'></div>
</div>);
}

export default LogOut;


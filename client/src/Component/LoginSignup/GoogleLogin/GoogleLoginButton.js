import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { fetchIpAddress } from '../../api/ipApi'; 
import { getDeviceInformation } from '../../api/deviceUtils'; // Adjust the path as necessary
import './GoogleLoginButton.css'; // Custom CSS file

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [ipAddress, setIPAddress] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({
    deviceName: '',
    platform: '',
    userAgent: '',
    uniqueDeviceNumber: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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
    const fetchDeviceInfo = async () => {
      const info = await getDeviceInformation();
      setDeviceInfo(info);
    };
    fetchDeviceInfo();
  }, []);

  const handleLogin = (response) => {
    console.log('Google Login Success:', response);
    const decoded = jwtDecode(response.credential);

    console.log(decoded);

    // Send the token to your server
    fetch(`${process.env.REACT_APP_API}/api/auth/google-login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleId: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        ipAddress,
        deviceInfo
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Store token in local storage
          localStorage.setItem('IntaskrToken', data.token);
          localStorage.setItem('IntaskrUser', data.UserId);
          navigate('/dashboard'); // Redirect to /dashboard on success
        } else {
          // If the response has a specific error message, set it in the state
          setErrorMessage(data.message || 'Login failed. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error sending token to server:', error);
        setErrorMessage('An error occurred during login. Please try again.');
      });
  };

  const handleError = (error) => {
    console.error('Google Login Error:', error);
    setErrorMessage('Failed to authenticate with Google. Please try again.');
  };

  return (
    <div className="google-login-container d-flex flex-column align-items-center justify-content-center">
    <div className='col-sm-12 text-center'>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={handleError}
        logo={<img src="/path/to/google-icon.png" alt="Google" />} // Custom Google icon
      />
    </div>
  );
};

export default GoogleLoginButton;





// // src/components/GoogleLoginButton.js
// import React,{useState,useEffect} from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import axios from 'axios';
// import { fetchIpAddress } from './Component/api/ipApi'; 
// import { getDeviceInformation } from './Component/api/deviceUtils'; // Adjust the path as necessary
// import './GoogleLoginButton.css'; // Custom CSS file

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();
//   const [ipAddress, setIPAddress] = useState(null);
//   const [deviceInfo, setDeviceInfo] = useState({
//     deviceName: '',
//     platform: '',
//     userAgent: '',
//     uniqueDeviceNumber: ''
// });






// useEffect(() => {
//     const getIpAddress = async () => {
//         try {
//             const data = await fetchIpAddress();
//             setIPAddress(data);
//         } catch (error) {
//             console.error('Error fetching IP address:', error);
//         }
//     };
//     getIpAddress();
// }, []);

// useEffect(() => {
//     const fetchDeviceInfo = async () => {
//         const info = await getDeviceInformation();
//         setDeviceInfo(info);
//     };
//     fetchDeviceInfo();
// }, []);


//   const handleLogin = (response) => {
//     console.log('Google Login Success:', response);
//     const decoded = jwtDecode(response.credential);

//     console.log(decoded);

//     // Send the token to your server
//     fetch(`${process.env.REACT_APP_API}/api/auth/google-login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ googleId:  decoded.sub,name:decoded.name,email: decoded.email,
//         picture: decoded.picture ,ipAddress, deviceInfo}),
//     })
//       .then(res => res.json())
//       .then(data => {
//         // Store token in local storage or handle it as needed
   
//         localStorage.setItem('IntaskrToken', data.token);
//         localStorage.setItem('IntaskrUser', data.UserId);
//         navigate('/dashboard'); // Redirect to /dashboard on success
//         // Redirect to the dashboard page
       
//       })
//       .catch(error => {
//         console.error('Error sending token to server:', error);
//       });
//   };

//   const handleError = (error) => {
//     console.error('Google Login Error:', error);
//   };

//   return (
//     <div className="google-login-container">
//       <GoogleLogin
//         onSuccess={handleLogin}
//         onError={handleError}
//         logo={<img src="/path/to/google-icon.png" alt="Google" />} // Custom Google icon
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;







// import React, { useState, useEffect } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
// import { fetchIpAddress } from './Component/api/ipApi'; 
// import { getDeviceInformation } from './Component/api/deviceUtils'; 
// import './GoogleLoginButton.css'; 

// const GoogleLoginButton = () => {
//   const navigate = useNavigate();
//   const [ipAddress, setIPAddress] = useState(null);
//   const [deviceInfo, setDeviceInfo] = useState({
//     deviceName: '',
//     platform: '',
//     userAgent: '',
//     uniqueDeviceNumber: ''
//   });

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

//   useEffect(() => {
//     const fetchDeviceInfo = async () => {
//       const info = await getDeviceInformation();
//       setDeviceInfo(info);
//     };
//     fetchDeviceInfo();
//   }, []);

//   const handleLogin = async (response) => {
//     console.log('Google Login Success:', response);
//     const decoded = jwtDecode(response.credential);

//     // Send the token and additional data to the server
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API}/api/auth/google-login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           googleId: decoded.sub,
//           name: decoded.name,
//           email: decoded.email,
//           picture: decoded.picture,
//           ipAddress,
//           deviceInfo,
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         // Store token and user info in local storage
//         localStorage.setItem('IntaskrToken', data.token);
//         localStorage.setItem('IntaskrUser', data.UserId);
//         navigate('/dashboard'); // Redirect to dashboard on success
//       } else {
//         console.error('Login failed:', data.message);
//       }
//     } catch (error) {
//       console.error('Error sending token to server:', error);
//     }
//   };

//   const handleError = (error) => {
//     console.error('Google Login Error:', error);
//   };

//   return (
//     <div className="google-login-container">
//       <GoogleLogin
//         onSuccess={handleLogin}
//         onError={handleError}
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;






// // src/components/GoogleLoginButton.js
// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

// const GoogleLoginButton = () => {
//   const handleLogin = (response) => {
//     console.log('Google Login Success:', response);
//     const decoded = jwtDecode(response.credential);

// console.log(decoded);
//     // Process the response or send it to your server
//   };

//   const handleError = (error) => {
//     console.error('Google Login Error:', error);
//   };

//   return (
//     <div>
//       <GoogleLogin
//         onSuccess={handleLogin}
//         onError={handleError}
//       />
//     </div>
//   );
// };

// export default GoogleLoginButton;

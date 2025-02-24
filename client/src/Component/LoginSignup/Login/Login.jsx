
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchIpAddress } from '../../api/ipApi'; 
import { getDeviceInformation } from '../../api/deviceUtils'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../../Images/MainNavSiteLogo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Spin } from 'antd'; // Ant Design spinner for loading animation (or use your own)
import GoogleLoginButton from '../GoogleLogin/GoogleLoginButton';

function Login() {
    const [ipAddress, setIPAddress] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [deviceInfo, setDeviceInfo] = useState({
        deviceName: '',
        platform: '',
        userAgent: '',
        uniqueDeviceNumber: ''
    });
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const token = localStorage.getItem("IntaskrToken");
        if (token) {
            navigate("/dashboard");
        }

        const refreshTokenInterval = setInterval(() => {
            const newToken = localStorage.getItem("IntaskrToken");
            if (newToken) {
                navigate("/dashboard");
            }
        }, 1000); // 15 minutes in milliseconds

        return () => {
            clearInterval(refreshTokenInterval);
        };
    }, [navigate]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/signin-intaskr`, {
                email, password, ipAddress, deviceInfo
            });
            localStorage.setItem('IntaskrToken', response.data.token);
            localStorage.setItem('IntaskrUser', response.data.UserId);
            navigate('/dashboard'); // Redirect to /dashboard on success
            setMessage('Login successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // End loading animation
        }
    };
   // Navigate to signup page
   const handleSignUpRedirect = () => {
    navigate('/signup');
};
   const handleForgetPass = () => {
    navigate('/forgot-password');
};
    return (
        <>
            <div className='MainDivOfLogoLogin'>
                <img className='ImageOfLogoLogin' src={Logo} alt="Site Logo" />
            </div>
            <div className='MainDivOfAllLogin'>
                <div>
                    <h3 className='TextOfLogin'>Welcome back to Intaskr</h3>
                </div>
                <div className='MainDivOfLoginInputs'>
                    <label className='LabelOfEmail' htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='intaskr@gmail.com'
                        className='InputOfLoginEmail'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <label className='LabelOfPassword' htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='password'
                        className='InputOfLoginPassword'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className='ForgotPassword' onClick={handleForgetPass}>Forgot your password?</p>
                    <p className='LoginWith'>Login with</p>
                    <div className='DivOfLoginWith  d-flex align-items-center justify-content-center col-sm-12'>
                        {/* <FcGoogle className='IconOfLoginWith' /> */}


                        <GoogleLoginButton/>
                        {/* <FaApple className='IconOfLoginWith' /> */}
                    </div>



                    <div>
                    <p className='CreateAccount' >
                            Don't have an account? <span className='SignUpLink' onClick={handleSignUpRedirect}>Sign up</span>
                        </p>
                        {/* <p className='CreateAccount'>Don't have an account? Sign up</p> */}
                    </div>
                    {message && <p className='Message'>{message}</p>}
                    {loading ? (
                        <div className='LoadingContainer'>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <button onClick={handleSubmit} className='ButtonOfLogin' disabled={loading}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;


// // components/LogIn.js
// import React, { useState ,useEffect} from 'react';
// import axios from 'axios';
// import { fetchIpAddress } from '../../api/ipApi'; 
// import { useNavigate } from 'react-router-dom';
// import { getDeviceInformation } from '../../api/deviceUtils'; // Adjust the path as necessary

// import './Login.css';
// import Logo from '../../Images/MainNavSiteLogo.png';
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";

// function Login() {



//     const [ipAddress, setIPAddress] = useState(null);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [deviceInfo, setDeviceInfo] = useState({
//       deviceName: '',
//       platform: '',
//       userAgent: '',
//       uniqueDeviceNumber: ''
//   });
//     const navigate = useNavigate(); // Initialize useNavigate
  
  
  
  
  
  
//      // --------------if login then not shwing login page-------------
//      useEffect(() => {
//       // Read the JWT token from localStorage when the component mounts
//       const token = localStorage.getItem("IntaskrToken");
//       if (token) {
//         navigate("/dashboard");
//       }
  
//       // Set up a timer to refresh the token every, for example, 15 minutes
//       const refreshTokenInterval = setInterval(() => {
//         const newToken = localStorage.getItem("IntaskrToken");
//         if (newToken) {
//           navigate("/dashboard");
//         }
//       }, 1000); // 15 minutes in milliseconds
  
//       // Clean up the timer when the component unmounts
//       return () => {
//         clearInterval(refreshTokenInterval);
//       };
//     }, []);
//     // -------------------------------------------------------------
  
  
//     useEffect(() => {
//       const getIpAddress = async () => {
//         try {
//           const data = await fetchIpAddress();
//           setIPAddress(data);
//         } catch (error) {
//           console.error('Error fetching IP address:', error);
//         }
//       };
  
//       getIpAddress();
//     }, []);
//     useEffect(() => {
//       const fetchDeviceInfo = async () => {
//           const info = await getDeviceInformation();
//           setDeviceInfo(info);
//       };
  
//       fetchDeviceInfo();
//   }, []);
  
  
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_API}/api/signin-intaskr`, { email, password ,ipAddress,deviceInfo});
//         localStorage.setItem('IntaskrToken', response.data.token);
//           localStorage.setItem('IntaskrUser', response.data.UserId);
//           navigate('/dashboard'); // Redirect to /dashboard on success
//         setMessage('Login successful!');
//       } catch (error) {
//         setMessage(error.response.data.message || 'An error occurred');
//       }
//     };



//     return (
//         <>
//             <div className='MainDivOfLogoLogin'>
//                 <img className='ImageOfLogoLogin' src={Logo} alt="Site Logo" />
//             </div>
//             <div className='MainDivOfAllLogin'>
//                 <div>
//                     <h3 className='TextOfLogin'>Welcome back to Intaskr</h3>
//                 </div>
//                 <div className='MainDivOfLoginInputs'>
//                     <label className='LabelOfEmail' htmlFor='email'>Email</label>
//                     <input id='email' type='email' placeholder='intaskr@gmail.com' className='InputOfLoginEmail'   
                    
                 
         
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//                      /> <br />

//                     <label className='LabelOfPassword' htmlFor='password'>Password</label>
//                     <input id='password' type='password' placeholder='password' className='InputOfLoginPassword'
                    
                    
               
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
                    
//                      />

//                     <p className='ForgotPassword'>Forgot your password?</p>

//                     <p className='LoginWith'>Login with</p>
//                     <div className='DivOfLoginWith'>
//                         <FcGoogle className='IconOfLoginWith' />
//                         <FaApple className='IconOfLoginWith' />
//                     </div>

//                     <div>
//                         <p className='CreateAccount'>Don't have an account? Sign up</p>
//                     </div>
//                     {message && <p>{message}</p>}
//                     <button onClick={handleSubmit} className='ButtonOfLogin'>Login</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;




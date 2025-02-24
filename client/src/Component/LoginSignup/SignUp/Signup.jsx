import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd'; // Ant Design spinner for loading animation (or use your own)

import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Logo from '../../Images/MainNavSiteLogo.png';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Otp from '../OTP/Otp';
import GoogleLoginButton from '../GoogleLogin/GoogleLoginButton';
function Signup() {

    const [loading, setLoading] = useState(false); // State for loading
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showOtp, setShowOtp] = useState(false); // Manage OTP screen visibility
    const navigate = useNavigate(); // Initialize useNavigate
  
  
  
     // --------------if login then not shwing login page-------------
     useEffect(() => {
      // Read the JWT token from localStorage when the component mounts
      const token = localStorage.getItem("IntaskrToken");
      if (token) {
        navigate("/dashboard");
      }
  
      // Set up a timer to refresh the token every, for example, 15 minutes
      const refreshTokenInterval = setInterval(() => {
        const newToken = localStorage.getItem("IntaskrToken");
        if (newToken) {
          navigate("/dashboard");
        }
      }, 1000); // 15 minutes in milliseconds
  
      // Clean up the timer when the component unmounts
      return () => {
        clearInterval(refreshTokenInterval);
      };
    }, []);
    // -------------------------------------------------------------
  
  
  
  
    
    const handleSubmit = async (e) => {
        setLoading(true); // Start loading animation
      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/signup-send-otp`, { email, password });
        setMessage(response.data.message);
        if (response.data.success) { // Assuming the response has a success flag
          setShowOtp(true); // Show OTP screen on success
        }
      } catch (error) {
        setMessage(error.response.data.message || 'An error occurred');
      }finally {
        setLoading(false); // End loading animation
    }
    };

      // Navigate to signup page
   const handleSignInRedirect = () => {
    navigate('/login');
};
    return (
        <>

{showOtp ? (
        <Otp email={email} /> // Pass email to OTP component
      ) : (
        <>

            <div className='MainDivOfLogoSign'>
                <img className='ImageOfLogoSign' src={Logo} alt="Site Logo" />
            </div>
            <div className='MainDivOfAllstOfWorkEmail'>
                <div>
                    <h3 className='TextOfSignUp'>Connect every team, task, <br />
                        and project together with <br /> Intaskr</h3>
                </div>
                <div className='MainDivOfWorkEmail'>
                    <label className='LabelOfWorkEmail' htmlFor='email'>Work email</label>
                    <input id='email' type='email' placeholder='intaskr@gmail.com' className='InputOfWorkEmail' 


              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required

                    /> <br />

                    <label className='LabelOfPassword' htmlFor='password'>Password</label>
                    <input id='password' type='password' placeholder='password' className='InputOfWorkEmail' 


              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
                    />

                    <p className='ParagraphOfSignAgreement'>
                        I agree to the <span className='SpanOfSignAgreement'>Customer Agreement</span>, which 
                        incorporates by reference the <span className='SpanOfSignAgreement'> Product-Specific Terms</span> ,
                        & acknowledge the <span className='SpanOfSignAgreement'> Privacy Policy</span>.
                    </p>

                    <p className='ParaOfSign'>Sign in With</p>
                    <div className='DivOfSignWith'>

                    <GoogleLoginButton/>
                        {/* <FcGoogle className='IconOfSignWith' /> */}
                        {/* <FaApple className='IconOfSignWith' /> */}
                    </div>
                    <div>
                    <p className='SignInAccount'>
                            Already have an account? <span className='SignUpLink' onClick={handleSignInRedirect}>Sign in</span>
                        </p>
                        {/* <p className='SignInAccount'>Don't have an account?  </p> */}
                    </div>



                    {loading ? (
                        <div className='LoadingContainer'>
                            <Spin size="large" />
                        </div>
                    ) : (
                        
                    <button onClick={handleSubmit} className='ButtonOfSignIntaskar'>Get Intaskr free</button>
                    )}
                </div>
            </div>
        </>
    )}
        </>
    );
}

export default Signup;

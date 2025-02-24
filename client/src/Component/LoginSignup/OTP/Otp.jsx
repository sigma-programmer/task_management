import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Spin } from 'antd'; // Ant Design spinner for loading animation (or use your own)

import { fetchIpAddress } from '../../api/ipApi'; 
import { useNavigate } from 'react-router-dom';
import { getDeviceInformation } from '../../api/deviceUtils'; // Adjust the path as necessary
import './Otp.css';
import Logo from '../../Images/MainNavSiteLogo.png';

function Otp({ email }) {
    const inputRefs = useRef([]);
    const [ipAddress, setIPAddress] = useState(null);
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const [deviceInfo, setDeviceInfo] = useState({
      deviceName: '',
      platform: '',
      userAgent: '',
      uniqueDeviceNumber: ''
    });
    const [loading, setLoading] = useState(false); // State for loading
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        setOtp(prevOtp => {
            const otpArray = [...prevOtp];
            otpArray[index] = value;
            return otpArray.join('');
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && !e.target.value) {
            inputRefs.current[index - 1].focus();
        }
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

    useEffect(() => {
        const fetchDeviceInfo = async () => {
            const info = await getDeviceInformation();
            setDeviceInfo(info);
        };
        fetchDeviceInfo();
    }, []);

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation

        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/api/signup-verify-otp`, {
              email, 
              otp, 
              ipAddress, 
              deviceInfo 
          });

          setMessage(response.data.message);
          if (response.data.success) {
            localStorage.setItem('IntaskrToken', response.data.token);
            localStorage.setItem('IntaskrUser', response.data.UserId);
            navigate('/dashboard');
          }
        } catch (error) {
          setMessage(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false); // End loading animation
        }
    };

    return (
        <>
            <div className='MaainDivOdVarifyy'>
                <div className='SecMainDivOfVariffyy'>
                    <div className='SecondMainDivOfVarify'>
                        <div className='MainDivOfLogoVerify'>
                            <img className='ImageOfLogoSign' src={Logo} alt="Site Logo" />
                        </div>
                        <h1 className='TextOfEmailed'>We’ve emailed you a <br /> code</h1>
                        <p className='ParagraphOfAccountSetup'>
                            To complete your account setup, enter the code we’ve sent to:
                        </p>
                        <div className='MainDivOfBoxx'>
                            {[...Array(6)].map((_, index) => (
                                <input
                                    key={index}
                                    ref={(el) => inputRefs.current[index] = el}
                                    type='text'
                                    maxLength='1'
                                    className='OtpInputBox'
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                            ))}
                        </div>
                        
                        <div className='MainDivOfEmailed'>
                            {message && <p>{message}</p>}

                            {loading ? (
                        <div className='LoadingContainer'>
                            <Spin size="large" />
                        </div>
                    ) : (
                        
                   
                            <button onClick={handleOtpSubmit} className='ButtonOfVerifyIntaskar'>Verify</button>
                    )}
                        </div>
                        <h5 className='TextOfResendEmail'>
                            Didn’t receive an email? <span className='ResendEmail'>Resend email</span>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Otp;

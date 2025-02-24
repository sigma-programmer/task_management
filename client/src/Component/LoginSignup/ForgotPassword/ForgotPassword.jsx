// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd'; // For loading spinner
import './ForgotPassword.css';
import Logo from '../../Images/MainNavSiteLogo.png';
function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear any previous messages

        try {
            // Update the endpoint to match the correct route
            const response = await axios.post(`${process.env.REACT_APP_API}/api/request-password-reset`, { email });
            setMessage(response.data.message || 'Password reset link sent! Check your email.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ForgotPasswordContainer">
        <div className='MainDivOfLogoLogin'>
                <img className='ImageOfLogoLogin' src={Logo} alt="Site Logo" />
            </div>
            <h2 className="ForgotPasswordTitle">Forgot Password</h2>
            <p className="ForgotPasswordInfo">Enter your email address below to receive a password reset link.</p>
            <form onSubmit={handleForgotPassword} className="ForgotPasswordForm">
                <label className="ForgotPasswordLabel" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="ForgotPasswordInput"
                    placeholder="intaskr@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {message && <p className="ForgotPasswordMessage">{message}</p>}
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <button type="submit" className="ForgotPasswordButton">Send Reset Link</button>
                )}
            </form>
        </div>
    );
}

export default ForgotPassword;

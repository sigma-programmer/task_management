// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd'; // For loading spinner
import './ResetPassword.css';
import Logo from '../../Images/MainNavSiteLogo.png';
function ResetPassword() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear any previous messages

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/reset-password`, { email, otp, newPassword });
            setMessage(response.data.message || 'Password reset successfully!');
            navigate("/login");
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ResetPasswordContainer">
        <div className='MainDivOfLogoLogin'>
                <img className='ImageOfLogoLogin' src={Logo} alt="Site Logo" />
            </div>
            <h2 className="ResetPasswordTitle">Reset Password</h2>
            <form onSubmit={handleResetPassword} className="ResetPasswordForm">
                <label className="ResetPasswordLabel" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="ResetPasswordInput"
                    placeholder="intaskr@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label className="ResetPasswordLabel" htmlFor="otp">OTP</label>
                <input
                    id="otp"
                    type="text"
                    className="ResetPasswordInput"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <label className="ResetPasswordLabel" htmlFor="newPassword">New Password</label>
                <input
                    id="newPassword"
                    type="password"
                    className="ResetPasswordInput"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                {message && <p className="ResetPasswordMessage">{message}</p>}
                {loading ? (
                    <Spin size="large" />
                ) : (
                    <button type="submit" className="ResetPasswordButton">Reset Password</button>
                )}
            </form>
        </div>
    );
}

export default ResetPassword;

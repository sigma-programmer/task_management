import React, { useEffect } from 'react';
import './Notification.css'; // Import your CSS file

const Notification = ({ message, textColor, backgroundColor, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 20000); // 40000 milliseconds = 40 seconds
        return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }, [onClose]);

    return (
        <div className="notification" style={{ color: textColor, backgroundColor: backgroundColor }}>
            <span>{message}</span>
            <span className="close-icon" onClick={onClose}>&times;</span>
        </div>
    );
};

export default Notification;

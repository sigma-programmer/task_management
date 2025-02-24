import React from 'react';

// Reusable Button Component
const CustomButton = ({ backgroundColor, onClick, children }) => {
    const buttonStyle = {
        backgroundColor: backgroundColor,
        color: 'white',
        minWidth: '140px', // Corrected style property
        border: 'none',
        padding: '8px 20px',
        cursor: 'pointer',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight:'bold'
    };




    return (
        <button style={buttonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default CustomButton;

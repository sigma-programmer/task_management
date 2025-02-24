import React, { useState } from 'react';
import Notification from '../../Notification/Notification';
const NotificationContainer = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, textColor, backgroundColor) => {
        setNotification({ message, textColor, backgroundColor });
    };

    const closeNotification = () => {
        setNotification(null);
    };

    return (
        <div>
            <button onClick={() => showNotification('This is a notification!', '#fff', '#333')}>
                Show Notification
            </button>
            {notification && (
                <Notification
                    message={notification.message}
                    textColor={notification.textColor}
                    backgroundColor={notification.backgroundColor}
                    onClose={closeNotification}
                />
            )}
        </div>
    );
};

export default NotificationContainer;

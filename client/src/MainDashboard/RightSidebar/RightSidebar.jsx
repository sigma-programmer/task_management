
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import { formatDistanceToNow } from 'date-fns'; // Import the function from date-fns
import { io } from 'socket.io-client';
import './RightSidebar.css';
import { IoIosCalendar, IoIosChatbubbles } from 'react-icons/io'; // Import relevant icons

const socket = io(`${process.env.REACT_APP_API}`); // Update with your backend URL if hosted remotely
// const socket = io('https://intaskr-g9atawd7d7gndudw.eastus-01.azurewebsites.net');
const RightSidebar = ({ isRightMenuOpen, orgId, setUnreadCount, unreadCount }) => {
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications from backend on page load
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/notifications/${orgId}`); // Replace with your API URL
            setNotifications(response.data);

            // Count unread notifications (isRead: false)
            const unread = response.data.filter((notif) => !notif.isRead).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
    useEffect(() => {

        fetchNotifications();
    }, [orgId]);

    // Listen for real-time notifications from backend
    useEffect(() => {
        socket.on('notification', (data) => {
            if (data.OrgId === orgId) {
                setNotifications((prev) => [...prev, data]);
                setUnreadCount((prevCount) => prevCount + 1); // Increment unread count
                
        fetchNotifications();
            }
        });

        // Cleanup on unmount
        return () => socket.off('notification');
    }, [orgId]);

    // Mark a notification as read
    const markAsRead = async (id) => {
        try {
            // Update in the backend
            await axios.put(`${process.env.REACT_APP_API}/api/notifications/markAsRead/${orgId}`, { id });

            // Update state locally
            setNotifications((prev) =>
                prev.map((notif) =>
                    notif._id === id ? { ...notif, isRead: true } : notif
                )
            );

            // Decrement unread count
            setUnreadCount((prevCount) => prevCount - 1);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Sort notifications by timestamp in descending order
    const sortedNotifications = [...notifications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    return (
        <section className={`RightSidebar ${isRightMenuOpen ? 'open1' : 'closed1'}`}>
            <div className="NotificationPart">
                <h2 className="NotificationGroupHeading">Notifications</h2>

                <ul>
                    {sortedNotifications.map((notif, index) => (
                        <div
                            key={index}
                            className={`NotificationHeader ${notif.isRead ? 'readmessage' : 'unreadMessage'}`}
                            onClick={() => !notif.isRead && markAsRead(notif._id)}
                        >
                            <div className="d-flex align-items-start">
                                {/* Conditionally render icons based on notification type */}
                                {notif.type === 'meeting' ? (
                                    <IoIosCalendar className="NotificationIcon" /> // Meeting icon
                                ) : (
                                    <IoIosChatbubbles className="NotificationIcon" /> // Message icon
                                )}

                                <div>
                                    <h2 className="NotificationTitle">{notif.message}</h2>

                                    {/* Display the formatted time */}
                                    <p className="NotificationDate">
    {formatDistanceToNow(new Date(notif.timestamp || Date.now()), { addSuffix: true })}
</p>

                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default RightSidebar;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // For API calls
// import { formatDistanceToNow } from 'date-fns'; // Import the function from date-fns

// import { io } from 'socket.io-client';
// import './RightSidebar.css';
// import { IoIosCalendar, IoIosChatbubbles } from 'react-icons/io'; // Import relevant icons

// const socket = io('http://localhost:8000'); // Update with your backend URL if hosted remotely

// const RightSidebar = ({ isRightMenuOpen, orgId,setUnreadCount ,unreadCount}) => {
//     const [notifications, setNotifications] = useState([]);

//     // Fetch notifications from backend on page load
//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/notifications/${orgId}`); // Replace with your API URL
//                 setNotifications(response.data);
// console.log(response.data)
//                 // Count unread notifications (isRead: false)
//                 const unread = response.data.filter((notif) => !notif.isRead).length;
//                 setUnreadCount(unread);
//             } catch (error) {
//                 console.error('Error fetching notifications:', error);
//             }
//         };

//         fetchNotifications();
//     }, [orgId]);

//     // Listen for real-time notifications from backend
//     useEffect(() => {
//         socket.on('notification', (data) => {
//             if (data.OrgId === orgId) {
//                 setNotifications((prev) => [...prev, data]);
//                 setUnreadCount((prevCount) => prevCount + 1); // Increment unread count
//             }
//         });

//         // Cleanup on unmount
//         return () => socket.off('notification');
//     }, [orgId]);

//     // Mark a notification as read
//     const markAsRead = async (id) => {
//         try {
//             // Update in the backend
//             await axios.put(`http://localhost:8000/api/notifications/markAsRead/${orgId}`, { id });

//             // Update state locally
//             setNotifications((prev) =>
//                 prev.map((notif) =>
//                     notif._id === id ? { ...notif, isRead: true } : notif
//                 )
//             );

//             // Decrement unread count
//             setUnreadCount((prevCount) => prevCount - 1);
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     return (
//         <section className={`RightSidebar ${isRightMenuOpen ? 'open1' : 'closed1'}`}>
//             <div className="NotificationPart">
//                 <h2 className="NotificationGroupHeading">Notifications</h2>

//                 <ul>



 


//                     {notifications.map((notif, index) => (
                        
//                 <div       key={index}
//                             className={`NotificationHeader ${notif.isRead ? 'readmessage' : 'unreadMessage'}`}
//                             onClick={() => !notif.isRead && markAsRead(notif._id)} >
//                             <div className='d-flex align-items-start'>
//                                     {/* Conditionally render icons based on notification type */}
//         {notif.type === 'meeting' ? (
//             <IoIosCalendar className="NotificationIcon" /> // Meeting icon
//         ) : (
//             <IoIosChatbubbles className="NotificationIcon" /> // Message icon
//         )}

//                                 {/* <img src={notif.icon} alt="Notification Icon" className="NotificationIcon" /> */}
//                                 <div>
//                                      <h2 className='NotificationTitle'>{notif.message}</h2>
//                                     {/* <h2 className='NotificationTitle'>{notification.title}</h2>
//                                     */}


//                                     <p className='NotificationDate'>{formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}</p> 
//                                     {/* <p className='NotificationDate'>{notif.time}</p>  */}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </ul>
//             </div>
//         </section>
//     );
// };

// export default RightSidebar;


// import React, { useState, useEffect } from 'react';
// import './RightSidebar.css';

// import { io } from 'socket.io-client';
// import bugIcon from "../../Component/Images/IconSet.png"; // Path to your bug icon
// import userIcon from "../../Component/Images/IconSet (1).png"; // Path to your user icon
// import meetingIcon from "../../Component/Images/IconSet (2).png"; // Path to your meeting icon
// import contact from "../../Component/Images/Female06.png"; // Path to your meeting icon

// const socket = io('http://localhost:8000'); // Replace with your backend URL if hosted remotely
// // const socket = io('https://intaskr-g9atawd7d7gndudw.eastus-01.azurewebsites.net'); // Replace with your backend URL if hosted remotely
// const RightSidebar = ({isRightMenuOpen,orgId}) => {
//     // const notifications = [
//     //     { title: 'You fixed a bug.', time: 'Just now', icon: bugIcon },
//     //     { title: 'New user registered.', time: '59 minutes ago', icon: userIcon },
//     //     { title: 'You fixed a bug.', time: '12 hours ago', icon: bugIcon },
//     //     { title: 'Meet is scheduled.', time: 'Today, 11:59 AM', icon: meetingIcon }
//     // ];
// // const orgId="6752b549c5a0ad334f7f9747"
//     // const contacts = [
//     //     { name: 'John Doe', icon: contact },
//     //     { name: 'Jane Smith', icon: contact },
//     //     { name: 'Emily Brown', icon: contact },
//     // ];
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         // Listen for notifications from backend
//         socket.on('notification', (data) => {
//             console.log(data.OrgId)
//             // Only add notifications for the current OrgId
//             if (data.OrgId === orgId) {
//                 setNotifications((prev) => [...prev, data]);
//             }
//         });

//         // Cleanup on unmount
//         return () => socket.off('notification');
//     }, [orgId]); // Re-subscribe to notifications when orgId changes

//     return (
//         <section className={`RightSidebar ${isRightMenuOpen ? 'open1' : 'closed1'}`}  >
//             <div className='NotificationPart'>
//                 <h2 className='NotificationGroupHeading'>Notifications</h2>
//                 <div>
//                     {/* {notifications.map((notification, index) => (
//                         <div key={index} className='NotificationHeader'>
//                             <div className='d-flex align-items-start'>
//                                 <img src={notification.icon} alt="Notification Icon" className="NotificationIcon" />
//                                 <div>
//                                     <h2 className='NotificationTitle'>{notification.title}</h2>
//                                     <p className='NotificationDate'>{notification.time}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))} */}
//                     Welcome to Intaskr
//                 </div>
//             </div>

//             {/* <h2>Notifications for OrgId: {orgId}</h2> */}
//             <ul>
//                 {notifications.map((notif, index) => (
//                     <li key={index}>
//                         <b>{notif.email}:</b> {notif.message}
//                     </li>
//                 ))}
//             </ul>
//             {/* <div className='Contacts'>
//                 <h2 className='ContactsHeading'>Contacts</h2>
//                 {contacts.map((contact, index) => (
//                     <div key={index} className='ContactItem'>
//                         <div className='d-flex align-items-start'>
//                             <img src={contact.icon} alt={`${contact.name} Icon`} className="ContactIcon" />
//                             <p className='ContactName'>{contact.name}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div> */}
//         </section>
//     );
// }

// export default RightSidebar;



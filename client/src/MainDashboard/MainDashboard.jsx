


// MainDashboard.js
import React, { useState, useEffect,useRef } from 'react';

import Navbar from './Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import './MainDashboard.css';
import { fetchPageAuth } from "../Component/api/pageAuth"; // Adjust the path as needed
import axios from 'axios';

import DasImage from '../Component/Images/DasFrame.png';
import Overview from './Layouts/Dashboard/Overview/Overview';
import CalendarComponent from './Layouts/Dashboard/Calender/CalenderFeature';
import InvoiceInputForm from './Layouts/Dashboard/Invoice/InvoiceInputForm';

import Note from './Layouts/Notes/Note';




import TodoList from './Layouts/TodoList/TodoList';
import ChatInterface from './Layouts/Community/ChatInterface';
import Profile from './Layouts/Profile/Profile';
import Setting from './Layouts/Setting/Setting';
import Blog from './Layouts/Blog/Blog';

const MainDashboard = () => {
  const navigate = useNavigate();
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0); // To track total count of unread notifications
  
  const UserId = localStorage.getItem('IntaskrUser');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved dark mode preference
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true'; // Convert string to boolean
  });


  const [selectedContent, setSelectedContent] = useState('Overview');
  const [activeGroup, setActiveGroup] = useState('Dashboard'); // To track active group
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);

   // -------------Profile--------------------
   const [userData, setUserData] = useState({
    name: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    phoneNumber: '',
    email: '',
});


useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API}/api/users/${UserId}`);
          setUserData(response.data);
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };
  fetchData();
}, [UserId]);
  //  -----------------------------
  
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);



   
   useEffect(() => {
     const loadData = async () => {
       try {
         const result = await fetchPageAuth();
         setData(result); // Set the fetched data
       } catch (err) {
         setError(err);
         navigate("/"); // Redirect to home page on error
       }
     };
   
     loadData();
   }, [navigate]);
   // ---------------------------
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsLeftMenuOpen(false);
        setIsRightMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
 
  useEffect(() => {
    const body = document.body;
    body.classList.toggle('dark', isDarkMode);
    body.classList.toggle('light', !isDarkMode);
    
    // Save the dark mode preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleLeftMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
  const toggleRightMenu = () => setIsRightMenuOpen(!isRightMenuOpen);
  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);


  
  



  
  const handleSelectItem = (content, group) => {
    setSelectedContent(content);
    setActiveGroup(group); // Update active group

    if (window.innerWidth < 768) {
      setIsLeftMenuOpen(false);
      setIsRightMenuOpen(false);
    }
    // const storedActiveItem = localStorage.getItem("overviewActiveItem");
       // Close the right sidebar if the selected content is not "Overview"

       
    if (window.innerWidth > 768) {
   
      if (content !== 'Overview') {
       setIsRightMenuOpen(false);
     } else {
       setIsRightMenuOpen(true);
     }
    }
  };



  // ----------------------SETTING masterdata---------------
  const [previewPhoto, setPreviewPhoto] = useState(DasImage);
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyGST, setCompanyGST] = useState('');
  const [appPassword, setAppPassword] = useState('');
  const [meetingLink ,setMeetingLink] = useState('');
  const [email, setEmail] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const fetchData = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API}/api/get-user-setting`, {
              params: { UserId }
          });
          const user = response.data;
          if (user) {
              setPreviewPhoto(user.masterSiteLogo || DasImage);
              setCompanyAddress(user.masterFullCompanyAddress || '');
              setAppPassword(user.masterEmailAppPassword || '');
              setEmail(user.masterEmail || '');
              setCompanyGST(user.companyGST || '');
              setMeetingLink(user.meetingLink || '');
          }
      } catch (error) {
          console.error('Error fetching user data:', error.response?.data?.message || error.message);
      }
  };
  useEffect(() => {
      // Fetch existing data when the component mounts

      if (UserId) fetchData();
  }, [UserId]);

  const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
          setUploadedFile(file);
          const reader = new FileReader();
          reader.onload = () => {
              setPreviewPhoto(reader.result);
          };
          reader.readAsDataURL(file);
      }
  };

  const handleUpdate = async () => {
      if (!UserId) {
          alert('UserId is missing!');
          return;
      }
      if (!companyAddress && !appPassword && !email && !uploadedFile && !companyGST && !meetingLink) {
          alert('Please fill out at least one field.');
          return;
      }

      const formData = new FormData();
      formData.append('UserId', UserId);
      formData.append('companyAddress', companyAddress);
      formData.append('appPassword', appPassword);
      formData.append('email', email);
      formData.append('companyGST', companyGST);
      formData.append('meetingLink', meetingLink);
      if (uploadedFile) {
          formData.append('picture', uploadedFile);
      }

      try {
          const response = await axios.post(`${process.env.REACT_APP_API}/api/update-masterdatasetting`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          fetchData()
          alert(response.data.message || 'Data updated successfully!');
      } catch (error) {
          alert(error.response?.data?.message || 'An error occurred while updating data.');
      }
  };


  const handleRemoveImage = async () => {
    if (!UserId) {
        alert('UserId is missing!');
        return;
    }

    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/remove-master-logo`, { UserId });
        alert(response.data.message || 'Image removed successfully!');
        setPreviewPhoto(null); // Clear the preview photo in the UI
    } catch (error) {
        console.error('Error removing image:', error.response?.data?.message || error.message);
        alert('Failed to remove the image.');
    }
};


  // -----------------------Overview--------------------------

  const [cardData, setCardData] = useState([]);
  
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/tasks-and-events`, {
          params: { OrgId: UserId }, // Replace with the actual OrgId you want to fetch data for
        });
        const data = response.data;
        
        // Prepare the card data based on API response
        setCardData([
          {
            id: 1,
            title: "Total Task Scheduled",
            count: data.tasks.scheduled, 
            growth: "+11.00%", // You can calculate or set this based on your data
            bgColor: "#2185F7",
            textColor: "white"
          },
          {
            id: 2,
            title: "Total Task Completed",
            count: data.tasks.completed,
            growth: "-15.00%", // You can calculate or set this based on your data
            bgColor: "#9BCAFF",
            textColor: "black"
          },
          {
            id: 3,
            title: "Total Task Not Completed On Time",
            count: data.tasks.notCompleted,
            growth: "+15.00%", // You can calculate or set this based on your data
            bgColor: "#2185F7",
            textColor: "white"
          },
          {
            id: 4,
            title: "Total Numbers Of Meetings",
            count: data.events, 
            growth: "+8.00%", // You can calculate or set this based on your data
            bgColor: "#9BCAFF",
            textColor: "black"
          }
        ]);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // -----------------------------Profile-------------------------
 


const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`${process.env.REACT_APP_API}/api/users/${UserId}`, userData);
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};


  // ---------------------------Calender----------------------------


  // -------------------------------------------------------------

  const renderContent = () => {
    switch (selectedContent) {
      case 'Overview':
        return <Overview cardData={cardData} />;
      case 'Calendar':
        return <CalendarComponent meetingLink={meetingLink} setMeetingLink={setMeetingLink}/>;
        case 'Invoice':
        return <InvoiceInputForm previewPhoto={previewPhoto} companyAddress={companyAddress} companyGST={companyGST}/>;
        case 'Profile':
        return <Profile handleChange={handleChange} userData={userData} handleSubmit={handleSubmit}/>;
        case 'Note':
          return <Note />;
          case 'Settings':
        return <Setting UserId={UserId} previewPhoto={previewPhoto} handleImageUpload={handleImageUpload} companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} appPassword={appPassword} setAppPassword={setAppPassword} email={email} setEmail={setEmail} handleUpdate={handleUpdate}  companyGST={companyGST} setCompanyGST={setCompanyGST} handleRemoveImage={handleRemoveImage} meetingLink={meetingLink} setMeetingLink={setMeetingLink} />;
        case 'Task':
          return <TodoList />;
        case 'Blog':
          return <Blog />;
          case 'ChatInterface':
            return <ChatInterface />;
        // case 'Quotation':
        // return <PreviewFirstInvoice />;
        // case 'QuotationPr':
        // return <FinalInvoice />;
      default:
        return null;
    }
  };

  const handleLogout = () => {
    // Handle logout functionality here (e.g., clear tokens, redirect)
    console.log('User logged out');
  };


  const handleClickOutside = (e) => {
    // Close the left sidebar if clicked outside of it
    if (isLeftMenuOpen && leftSidebarRef.current && !leftSidebarRef.current.contains(e.target)) {
      setIsLeftMenuOpen(false);
    }
  
    // Close the right sidebar if clicked outside of it
    if (isRightMenuOpen && rightSidebarRef.current && !rightSidebarRef.current.contains(e.target)) {
      setIsRightMenuOpen(false);
    }
  };
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 880) {
        if (isLeftMenuOpen || isRightMenuOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
      } else {
        document.removeEventListener('mousedown', handleClickOutside); // Ensure it's removed for larger screens
      }
    };
  
    handleResize(); // Run the check on initial load
    window.addEventListener('resize', handleResize); // Recheck on screen resize
  
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup listener on unmount
    };
  }, [isLeftMenuOpen, isRightMenuOpen]); // Add isRightMenuOpen to dependencies
  
  return (
    <section className={`DashboardContainer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="DashboardLayout">
        <div ref={leftSidebarRef} className={`SidebarContainer ${isLeftMenuOpen ? '' : 'collapsed'}`}>
          <Sidebar onSelectItem={handleSelectItem} />
        </div>

        

        <div className={`MainContent 
          ${isLeftMenuOpen ? 'left-open' : ''} 
          ${isRightMenuOpen ? 'right-open' : ''} 
          ${isLeftMenuOpen && isRightMenuOpen ? 'both-open' : ''}`}>
          <div className="NavbarContainer">


            <Navbar
              toggleLeftMenu={toggleLeftMenu}
              toggleRightMenu={toggleRightMenu}
              toggleDarkMode={toggleDarkMode}
              isDarkMode={isDarkMode}
              activeGroup={activeGroup} // Pass active group to Navbar
              activeItem={selectedContent} // Pass active item to Navbar
              onLogout={handleLogout} // Pass logout handler to Navbar

              unreadCount={unreadCount}
              isLeftMenuOpen={isLeftMenuOpen}
              isRightMenuOpen={isRightMenuOpen}
            />
          </div>


          <div  className='MainDashbaordPartModifiedVersion'>

         
          <div className="DashboardContainerMiddle">
            {renderContent()}
          </div>

          <div ref={rightSidebarRef} className={`RightSidebarContainer ${isRightMenuOpen ? '' : 'collapsed'} RightSidebar1 ${isRightMenuOpen ? 'open' : 'closed'}`}>
  <RightSidebar isRightMenuOpen={isRightMenuOpen}  orgId={UserId} setUnreadCount={setUnreadCount} unreadCount={unreadCount}/>
</div>


          {/* <RightSidebar /> */}
        </div>

        </div>

      </div>
    </section>
  );
};

export default MainDashboard;


{/* <div ref={rightSidebarRef} className={`RightSidebarContainer ${isRightMenuOpen ? '' : 'collapsed'}`}>
</div> */}

// // MainDashboard.js
// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import RightSidebar from './RightSidebar/RightSidebar';
// import './MainDashboard.css';
// import Overview from './Layouts/Dashboard/Overview/Overview';
// import Calendar from './Layouts/Dashboard/Calendar/Calendar';

// const MainDashboard = () => {
//   const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);
//   const [isRightMenuOpen, setIsRightMenuOpen] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Check localStorage for saved dark mode preference
//     const savedMode = localStorage.getItem('darkMode');
//     return savedMode === 'true'; // Convert string to boolean
//   });
//   const [selectedContent, setSelectedContent] = useState('Overview');
//   const [activeGroup, setActiveGroup] = useState('Dashboard'); // To track active group

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsLeftMenuOpen(false);
//         setIsRightMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const body = document.body;
//     body.classList.toggle('dark', isDarkMode);
//     body.classList.toggle('light', !isDarkMode);
    
//     // Save the dark mode preference to localStorage
//     localStorage.setItem('darkMode', isDarkMode);
//   }, [isDarkMode]);

//   const toggleLeftMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
//   const toggleRightMenu = () => setIsRightMenuOpen(!isRightMenuOpen);
//   const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);






  
//   const handleSelectItem = (content, group) => {
//     setSelectedContent(content);
//     setActiveGroup(group); // Update active group
//   };

//   const renderContent = () => {
//     switch (selectedContent) {
//       case 'Overview':
//         return <Overview />;
//       case 'Calendar':
//         return <Calendar />;
//       default:
//         return null;
//     }
//   };

//   const handleLogout = () => {
//     // Handle logout functionality here (e.g., clear tokens, redirect)
//     console.log('User logged out');
//   };

//   return (
//     <section className={`DashboardContainer ${isDarkMode ? 'dark' : 'light'}`}>
//       <div className="DashboardLayout">
//         <div className={`SidebarContainer ${isLeftMenuOpen ? '' : 'collapsed'}`}>
//           <Sidebar onSelectItem={handleSelectItem} />
//         </div>

//         <div className={`MainContent 
//           ${isLeftMenuOpen ? 'left-open' : ''} 
//           ${isRightMenuOpen ? 'right-open' : ''} 
//           ${isLeftMenuOpen && isRightMenuOpen ? 'both-open' : ''}`}>
//           <div className="NavbarContainer">
//             <Navbar
//               toggleLeftMenu={toggleLeftMenu}
//               toggleRightMenu={toggleRightMenu}
//               toggleDarkMode={toggleDarkMode}
//               isDarkMode={isDarkMode}
//               activeGroup={activeGroup} // Pass active group to Navbar
//               activeItem={selectedContent} // Pass active item to Navbar
//               onLogout={handleLogout} // Pass logout handler to Navbar

              

//               isLeftMenuOpen={isLeftMenuOpen}
//               isRightMenuOpen={isRightMenuOpen}
//             />
//           </div>


          
//           <div className="DashboardContainerMiddle">
//             {renderContent()}
//           </div>



//         </div>

//         <div className={`RightSidebarContainer ${isRightMenuOpen ? '' : 'collapsed'}`}>
//           <RightSidebar />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MainDashboard;





// // MainDashboard.js
// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import RightSidebar from './RightSidebar/RightSidebar';
// import './MainDashboard.css';
// import Overview from './Layouts/Dashboard/Overview/Overview';
// import Calendar from './Layouts/Dashboard/Calendar/Calendar';

// const MainDashboard = () => {
//   const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(true);
//   const [isRightMenuOpen, setIsRightMenuOpen] = useState(true);
//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     // Check localStorage for saved dark mode preference
//     const savedMode = localStorage.getItem('darkMode');
//     return savedMode === 'true'; // Convert string to boolean
//   });
//   const [selectedContent, setSelectedContent] = useState('Overview');
//   const [activeGroup, setActiveGroup] = useState('Dashboard'); // To track active group

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsLeftMenuOpen(false);
//         setIsRightMenuOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const body = document.body;
//     body.classList.toggle('dark', isDarkMode);
//     body.classList.toggle('light', !isDarkMode);
    
//     // Save the dark mode preference to localStorage
//     localStorage.setItem('darkMode', isDarkMode);
//   }, [isDarkMode]);

//   const toggleLeftMenu = () => setIsLeftMenuOpen(!isLeftMenuOpen);
//   const toggleRightMenu = () => setIsRightMenuOpen(!isRightMenuOpen);
//   const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);






  
//   const handleSelectItem = (content, group) => {
//     setSelectedContent(content);
//     setActiveGroup(group); // Update active group
//   };

//   const renderContent = () => {
//     switch (selectedContent) {
//       case 'Overview':
//         return <Overview />;
//       case 'Calendar':
//         return <Calendar />;
//       default:
//         return null;
//     }
//   };

//   const handleLogout = () => {
//     // Handle logout functionality here (e.g., clear tokens, redirect)
//     console.log('User logged out');
//   };

//   return (
//     <section className={`DashboardContainer ${isDarkMode ? 'dark' : 'light'}`}>
//       <div className="DashboardLayout">
//         <div className={`SidebarContainer ${isLeftMenuOpen ? '' : 'collapsed'}`}>
//           <Sidebar onSelectItem={handleSelectItem} />
//         </div>

//         <div className={`MainContent 
//           ${isLeftMenuOpen ? 'left-open' : ''} 
//           ${isRightMenuOpen ? 'right-open' : ''} 
//           ${isLeftMenuOpen && isRightMenuOpen ? 'both-open' : ''}`}>
//           <div className="NavbarContainer">
//             <Navbar
//               toggleLeftMenu={toggleLeftMenu}
//               toggleRightMenu={toggleRightMenu}
//               toggleDarkMode={toggleDarkMode}
//               isDarkMode={isDarkMode}
//               activeGroup={activeGroup} // Pass active group to Navbar
//               activeItem={selectedContent} // Pass active item to Navbar
//               onLogout={handleLogout} // Pass logout handler to Navbar

              

//               isLeftMenuOpen={isLeftMenuOpen}
//               isRightMenuOpen={isRightMenuOpen}
//             />
//           </div>


          
//           <div className="DashboardContainerMiddle">
//             {renderContent()}
//           </div>



//         </div>

//         <div className={`RightSidebarContainer ${isRightMenuOpen ? '' : 'collapsed'}`}>
//           <RightSidebar />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MainDashboard;



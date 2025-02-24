

// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import DasImage from '../../Component/Images/DasFrame.png';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

const sidebarData = [
  {
    masterHeading: 'Dashboards',
    extraNavItem: [
      { title: 'Overview', icon: 'fas fa-th-large', content: 'OverviewContent' }
    ],
    groups: [
      {
        title: 'Tools',
        icon: 'fas fa-tachometer-alt',
        items: [
          { title: 'Calendar', icon: 'fas fa-calendar-alt', content: 'CalendarContent' },
          { title: 'Invoice', icon: 'fas fa-file-invoice', content: 'InvoiceContent' },
          { title: 'Note', icon: 'fas fa-file-signature', content: 'Note' },
          // { title: 'QuotationPr', icon: 'fas fa-file-signature', content: 'QuotationContent' },
          { title: 'Task', icon: 'fas fa-file-invoice', content: 'TodoListContent' },
          // { title: 'ChatInterface', icon: 'fas fa-file-invoice', content: 'ChatInterfaceContent' },
          // { title: 'Blog', icon: 'fas fa-file-invoice', content: 'ChatInterfaceContent' },
        ],
      },
      // {
      //   title: 'Projects',
      //   icon: 'fas fa-tachometer-alt',
      //   items: [
      //     { title: 'Calendar1', icon: 'fas fa-calendar-alt', content: 'CalendarContent' },
      //     { title: 'Invoice1', icon: 'fas fa-file-invoice', content: 'InvoiceContent' },
      //     { title: 'Quotation1', icon: 'fas fa-file-signature', content: 'QuotationContent' },
      //   ],
      // },
    ],
  },
  {
    masterHeading: 'Pages',
    groups: [
      {
        title: 'Pages',
        icon: 'fas fa-file-alt',
        items: [
          { title: 'Profile', icon: 'fas fa-user', content: 'ProfileContent' },
          // { title: 'Settings', icon: 'fas fa-cog', content: 'SettingsContent' },
          // { title: 'Reports', icon: 'fas fa-chart-line', content: 'ReportsContent' },
          // { title: 'Help', icon: 'fas fa-question-circle', content: 'HelpContent' },
        ],
      },
    ],
  },
];

const Sidebar = ({ onSelectItem }) => {
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState({});
  const [activeItem, setActiveItem] = useState('Overview');


// Check if 'activeItem' is not set in localStorage
if (!localStorage.getItem('activeItem')) {
  localStorage.setItem('activeItem', 'Overview'); // Set default value
}

// Check if 'activeGroup' is not set in localStorage
if (!localStorage.getItem('activeGroup')) {
  localStorage.setItem('activeGroup', 'Dashboard'); // Set default value
}

  useEffect(() => {
    // Function to update active item from localStorage
    const updateActiveItem = () => {
        // const storedActiveItem = localStorage.getItem('activeItem');
        // if (storedActiveItem && storedActiveItem !== activeItem) {
        //     setActiveItem(storedActiveItem);
        //     onSelectItem(storedActiveItem);
        // }




        const storedActiveItem = localStorage.getItem("activeItem");
        const storedActiveGroup = localStorage.getItem("activeGroup");
  
        if (storedActiveItem !== activeItem) {
          setActiveItem(storedActiveItem);
          onSelectItem(storedActiveItem, storedActiveGroup);
        }
  
    };

    // Initial check and setting interval
    updateActiveItem();
    const interval = setInterval(updateActiveItem, 10); // Check every 3 seconds

    // Cleanup interval on unmount
    return () => clearInterval(interval);
}, [activeItem, onSelectItem]);



  const toggleGroup = (groupTitle) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [groupTitle]: !prevState[groupTitle],
    }));
  };

  const handleItemClick = (itemTitle, groupTitle) => {
    setActiveItem(itemTitle);
    
    if (itemTitle === "Overview") {
      localStorage.setItem('overviewActiveItem', itemTitle); // Save separately for 'Overview'
      // localStorage.setItem('overviewActiveGroup', groupTitle); // Save group for 'Overview'
  }


    localStorage.setItem('activeItem', itemTitle); // Save active item to localStorage


    localStorage.setItem('activeGroup', groupTitle); // Save active item to localStorage
    onSelectItem(itemTitle, groupTitle); // Pass group title to the parent
  };

  
  const handleLogout = () => {
    console.log('User logged out');
  
    navigate('/logout');
  };

  const [userData, setUserData] = useState({
    name: '',
    nickName: '',
    gender: '',
    country: '',
    language: '',
    phoneNumber: '',
    email: '',
});
const userId = localStorage.getItem('IntaskrUser'); // Assuming user ID is stored in local storage

useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/users/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    fetchData();
}, [userId]);

  return (
    <div className="Sidebar">
         
         <div className="UserProfile">
        <img src={DasImage} alt="User" className="UserImage" />
        <span className="UserName">{userData.name || 'User'}</span>
      </div>
      {sidebarData.map((master) => (
        <div key={master.masterHeading} className='MasterHeadingOfText'>
          <div className="MasterHeading">{master.masterHeading}</div>
          {master.extraNavItem && (
            <ul className="SidebarExtraItems">
              {master.extraNavItem.map((item) => (
                <li
                  className={`SidebarItem ${activeItem === item.title ? 'active' : ''}`}
                  key={item.title}
                  onClick={() => handleItemClick(item.title, 'Dashboard')}
                >
                  <i className={item.icon}></i> {item.title}
                </li>
              ))}
            </ul>
          )}
          {master.groups.map((group) => (
            <div className="SidebarGroup" key={group.title}>
              <div className="SidebarHeader" onClick={() => toggleGroup(group.title)}>

              {/* <i className={`SidebarChevron fas fa-chevron-${openGroups[group.title] ? 'down' : 'angle-right'}`}></i> */}
              <span className="SidebarChevron">
        {openGroups[group.title] ? <FiChevronDown /> : <FiChevronRight />}
      </span>
                <span className="SidebarIcon"><i className={group.icon}></i></span>
                <span className="SidebarTitle">{group.title}</span>
              </div>
              {openGroups[group.title] && (
                <ul className="SidebarItems">
                  {group.items.map((item) => (
                    <li
                      className={`SidebarItem ${activeItem === item.title ? 'active' : ''}`}
                      key={item.title}
                      onClick={() => handleItemClick(item.title, group.title)}
                    >
                      <i className={item.icon} title={item.title}></i> <span  className='NavItemTextNew11'>{item.title}</span> 
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        
        </div>
      ))}

      {/* Static Settings and Logout section */}
      <div className="StaticNavItems">
        <ul className="SidebarStaticItems">
          <li
            className={`SidebarItem ${activeItem === 'Settings' ? 'active' : ''}`}
            onClick={() => handleItemClick('Settings', 'Settings')}
          >
            <i className="fas fa-cog"></i> <span className="NavItemTextNew11">Settings</span>
          </li>
          <li
            className={`SidebarItem ${activeItem === 'Logout' ? 'active' : ''}`}
            onClick={() => handleLogout()}
          >
            <i className="fas fa-sign-out-alt"></i> <span className="NavItemTextNew11">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;


// // Sidebar.js
// import React, { useState } from 'react';
// import './Sidebar.css';
// import DasImage from '../../Component/Images/DasFrame.png'
// import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

// const sidebarData = [
//   {
//     masterHeading: 'Dashboards',
//     extraNavItem: [
//       { title: 'Overview', icon: 'fas fa-th-large', content: 'OverviewContent' }
//     ],
//     groups: [
     
//       {
//         title: 'Calendar',
//         icon: 'fas fa-tachometer-alt',
//         items: [
        
//           { title: 'Calendar', icon: 'fas fa-calendar-alt', content: 'CalendarContent' },
//           { title: 'Invoice', icon: 'fas fa-file-invoice', content: 'InvoiceContent' },
//           { title: 'Quotation', icon: 'fas fa-file-signature', content: 'QuotationContent' },
//           { title: 'QuotationPr', icon: 'fas fa-file-signature', content: 'QuotationContent' },
//         ],
//       },
//       {
//         title: 'Projects',
//         icon: 'fas fa-tachometer-alt',
//         items: [
          
//           { title: 'Calendar1', icon: 'fas fa-calendar-alt', content: 'CalendarContent' },
//           { title: 'Invoice1', icon: 'fas fa-file-invoice', content: 'InvoiceContent' },
//           { title: 'Quotation1', icon: 'fas fa-file-signature', content: 'QuotationContent' },
//         ],
//       },
//     ],
//   },
//   {
//     masterHeading: 'Pages',
//     groups: [
//       {
//         title: 'Pages',
//         icon: 'fas fa-file-alt',
//         items: [
//           { title: 'Profile', icon: 'fas fa-user', content: 'ProfileContent' },
//           { title: 'Settings', icon: 'fas fa-cog', content: 'SettingsContent' },
//           { title: 'Reports', icon: 'fas fa-chart-line', content: 'ReportsContent' },
//           { title: 'Help', icon: 'fas fa-question-circle', content: 'HelpContent' },
//         ],
//       },
//     ],
//   },
// ];

// const Sidebar = ({ onSelectItem }) => {
//   const [openGroups, setOpenGroups] = useState({  });
//   const [activeItem, setActiveItem] = useState('Overview');

//   const toggleGroup = (groupTitle) => {
//     setOpenGroups((prevState) => ({
//       ...prevState,
//       [groupTitle]: !prevState[groupTitle],
//     }));
//   };

//   const handleItemClick = (itemTitle, groupTitle) => {
//     setActiveItem(itemTitle);
//     onSelectItem(itemTitle, groupTitle); // Pass group title to the parent
//   };

//   return (
//     <div className="Sidebar">


    
//       <div className="UserProfile">
//         <img src={DasImage} alt="User" className="UserImage" />
//         <span className="UserName">User</span>
//       </div>
//       {sidebarData.map((master) => (
//         <div key={master.masterHeading} className='MasterHeadingOfText'>
//           <div className="MasterHeading">{master.masterHeading}</div>
//           {master.extraNavItem && (
//             <ul className="SidebarExtraItems">
//               {master.extraNavItem.map((item) => (
//                 <li
//                   className={`SidebarItem ${activeItem === item.title ? 'active' : ''}`}
//                   key={item.title}
//                   onClick={() => handleItemClick(item.title, 'Dashboard')}
//                 >
//                   <i className={item.icon}></i> {item.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//           {master.groups.map((group) => (
//             <div className="SidebarGroup" key={group.title}>
//               <div className="SidebarHeader" onClick={() => toggleGroup(group.title)}>

//               {/* <i className={`SidebarChevron fas fa-chevron-${openGroups[group.title] ? 'down' : 'angle-right'}`}></i> */}
//               <span className="SidebarChevron">
//         {openGroups[group.title] ? <FiChevronDown /> : <FiChevronRight />}
//       </span>
//                 <span className="SidebarIcon"><i className={group.icon}></i></span>
//                 <span className="SidebarTitle">{group.title}</span>
//               </div>
//               {openGroups[group.title] && (
//                 <ul className="SidebarItems">
//                   {group.items.map((item) => (
//                     <li
//                       className={`SidebarItem ${activeItem === item.title ? 'active' : ''}`}
//                       key={item.title}
//                       onClick={() => handleItemClick(item.title, group.title)}
//                     >
//                       <i className={item.icon} title={item.title}></i> <span  className='NavItemTextNew11'>{item.title}</span> 
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
        
//         </div>
//       ))}






//     </div>
//   );
// };

// export default Sidebar;


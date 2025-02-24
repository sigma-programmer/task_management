
import React from 'react'; 
import "./Navbar.css";
import { FaRegSquareCaretLeft } from "react-icons/fa6";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const Navbar = ({ toggleLeftMenu, toggleRightMenu, toggleDarkMode, isDarkMode, activeGroup, activeItem, onLogout ,isLeftMenuOpen,isRightMenuOpen,unreadCount}) => {
  return (
    <div className={`NavbarNewDashboard ${isDarkMode ? 'dark' : ''}`}>
      {/* Left side container for menu toggle and active group/item */}
      <div className="NavbarLeft">
        {/* Left menu toggle */}
        <button className="NavbarIcon" onClick={toggleLeftMenu}>
          <FaRegSquareCaretLeft style={{ color: isDarkMode ? 'white' : 'black' }} />
        </button>

        <div className="NavbarCenter">
          <span>{activeGroup} / {activeItem}</span>
        </div>
      </div>

      {/* Right side container */}
      <div className="NavbarRight">
        {/* Search input with an icon */}
        <div className='SearchItemWithIcon'>
          <CiSearch className="Search-Icon-NEW" />
          <input className="SearchInput" type="text" placeholder="Search..." />
        </div>
        
        {/* Dark/Light mode toggle */}
        {/* <button className="NavbarIcon" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <FaSun style={{ color: 'white' }} />
          ) : (
            <FaMoon style={{ color: 'black' }} />
          )}
        </button> */}

        {/* Refresh icon */}
        <button className="NavbarIcon">
          <IoMdRefresh style={{ color: isDarkMode ? 'white' : 'black' }} />
        </button>
        
        {/* Notifications icon */}
        {/* <button className="NavbarIcon" onClick={toggleRightMenu}>
          <IoIosNotificationsOutline style={{ color: isDarkMode ? 'white' : 'black' }} />
        </button> */}
        
       {/* Notifications icon */}
<button className="NavbarIcon" onClick={toggleRightMenu}>
  <IoIosNotificationsOutline style={{ color: isRightMenuOpen ? 'purple' : isDarkMode ? 'white' : 'black' }} />
  {unreadCount > 0 && (
    <div className="notification-badge">{unreadCount}</div>
  )}

</button>

      </div>
    </div>
  );
};

export default Navbar;


 {/* Logout icon */}
        {/* <button className="NavbarIcon" onClick={onLogout}>
          <IoIosLogOut style={{ color: isDarkMode ? 'white' : 'black', cursor: 'pointer' }} title="Logout" />
        </button> */}

        {/* Right menu toggle */}
        {/* <button className="NavbarIcon" onClick={toggleRightMenu}>
          <FaRegCaretSquareRight style={{ color: isDarkMode ? 'white' : 'black' }} />
        </button> */}
// import React from 'react'; 
// import "./Navbar.css";
// import { FaRegSquareCaretLeft } from "react-icons/fa6";
// import { FaRegCaretSquareRight } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { IoMdRefresh } from "react-icons/io";
// import { IoIosLogOut } from "react-icons/io";
// import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

// const Navbar = ({ toggleLeftMenu, toggleRightMenu, toggleDarkMode, isDarkMode, activeGroup, activeItem, onLogout }) => {
//   return (
//     <div className={`NavbarNewDashboard ${isDarkMode ? 'dark' : ''}`}>
//       {/* Left side container for menu toggle and active group/item */}
//       <div className="NavbarLeft">
//         {/* Left menu toggle */}
//         <button className="NavbarIcon" onClick={toggleLeftMenu}>
//           <FaRegSquareCaretLeft style={{ color: isDarkMode ? 'white' : 'black' }} />
//         </button>

//         <div className="NavbarCenter">
//           <span>{activeGroup} / {activeItem}</span>
//         </div>
//       </div>

//       {/* Right side container */}
//       <div className="NavbarRight">
//         {/* Search input with an icon */}
//         <div className='SearchItemWithIcon'>
//           <CiSearch className="Search-Icon-NEW" />
//           <input className="SearchInput" type="text" placeholder="Search..." />
//         </div>
//         {/* Dark/Light mode toggle */}
      
//              {/* Dark/Light mode toggle */}
//              <button className="NavbarIcon" onClick={toggleDarkMode}>
//           {isDarkMode ? (
//             <FaSun style={{ color: 'white' }} /> // Show sun icon in dark mode
//           ) : (
//             <FaMoon style={{ color: 'black' }} /> // Show moon icon in light mode
//           )}
//         </button>
//         {/* Dark/Light mode toggle */}
//         <button className="NavbarIcon" >
//         <IoMdRefresh style={{ color: isDarkMode ? 'white' : 'black' }}/>
      
//         </button>
//         {/* Dark/Light mode toggle */}
//         <button className="NavbarIcon">
//         <IoIosNotificationsOutline style={{ color: isDarkMode ? 'white' : 'black' }}/>
//         </button>
//         {/* Dark/Light mode toggle */}
//         <button className="NavbarIcon">
//         <IoIosLogOut onClick={onLogout} title="Logout" style={{ color: isDarkMode ? 'white' : 'black',cursor: 'pointer' }}/>
//         </button>

       
//         {/* Right menu toggle */}
//         <button className="NavbarIcon" onClick={toggleRightMenu}>
//           <FaRegCaretSquareRight style={{ color: isDarkMode ? 'white' : 'black' }} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



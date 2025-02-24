import React,{useState,useEffect} from 'react'
import './Navbar.css'
// import logo from '../../Images/Logo.png'
import logo from '../../Images/MainNavSiteLogo.png'
import { NavLink ,useNavigate} from 'react-router-dom'
import WaitlistForm from '../../dynamic/WaitlistForm/WaitlistForm'
import Notification from '../../Notification/Notification'
function Navbar() {




  const [showWaitlist, setShowWaitlist] = useState(false);

  const [notification, setNotification] = useState(null);












  const showNotification = (message, textColor, backgroundColor) => {
      setNotification({ message, textColor, backgroundColor });
  };

  const closeNotification = () => {
      setNotification(null);
  };










  return (
    <div  className='d-flex align-items-center justify-content-center'>
      <nav className="navbar navbar-expand-lg navbar-light MainDivOfNAvbar ">
        <div className="container-fluid">
          <div className='MainCircleofNav'>
          <NavLink to="/">
                              
         <img src={logo} alt="SiteLogo" />
</NavLink>
          </div>
         
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            
              {/* <li className="nav-item ">

              <NavLink className="nav-link active MainNavItem"  aria-current="page" to="/">
                                Home
</NavLink>
        
              </li> */}

              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle MainNavItem" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Product
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                  <NavLink className="dropdown-item" to="/product-docs">
                              
                  Docs
                              </NavLink>
                  
                  {/* <a  href="#"></a> */}
                  </li>
                  <li>
                  <NavLink className="dropdown-item" to="/product-calendar">
                              
                  Calendar
                              </NavLink>
                  </li>
                  {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle MainNavItem" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Download
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle MainNavItem" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Resources
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
              {/* <li className="nav-item ">

              <NavLink className="nav-link MainNavItem"  aria-current="page" to="/pricing">
              Pricing
</NavLink>
              
              </li> */}
              {/* <li className="nav-item ">

              <NavLink className="nav-link MainNavItem"  aria-current="page" to="/blogs">
              Blogs
</NavLink>
              
              </li> */}
              <li className="nav-item ">

              <NavLink className="nav-link MainNavItem"  aria-current="page" to="/about-us">
              AboutUs
</NavLink>
              
              </li>
              <li className="nav-item ">

              <NavLink className="nav-link MainNavItem"  aria-current="page" to="/contact">
              ContactUs
</NavLink>
              
              </li>
            </ul>

            
            <ul className="navbar-nav  mb-2 mb-lg-0 end-0">


            
              <li className="nav-item ">

              <NavLink className="nav-link active MainNavItem"  aria-current="page"  to="/login">
              Request a demo
</NavLink>
              {/* <NavLink className="nav-link active MainNavItem"  aria-current="page" to="/" onClick={() =>  setShowWaitlist(true)}>
              Request a demo
</NavLink> */}
        
              </li>
            
              <li className="nav-item LoginParentLi">

              <NavLink  className="nav-link newOneButton active MainNavItem MainNavItemLogin BorderDesignLoginButton "  aria-current="page" to="/login">
              Login
</NavLink>
              {/* <NavLink  className="nav-link newOneButton active MainNavItem MainNavItemLogin BorderDesignLoginButton "  aria-current="page" onClick={() =>  setShowWaitlist(true)}>
              Login
</NavLink> */}

        
              </li>
            
              <li className="nav-item GetInstaKrParentLi">

              {/* <NavLink  className="nav-link MainNavItem newOneButton BorderDesignGetInstaKrfReeButton "  aria-current="page" onClick={() =>  setShowWaitlist(true)}>
              Get Intaskr free
</NavLink> */}
              <NavLink  className="nav-link MainNavItem newOneButton BorderDesignGetInstaKrfReeButton "  aria-current="page" to="/signup">
              Get Intaskr free
</NavLink>
        
              </li>


          
            </ul>


           
          </div>
        </div>
      </nav>





      {notification && (
                <Notification
                    message={notification.message}
                    textColor={notification.textColor}
                    backgroundColor={notification.backgroundColor}
                    onClose={closeNotification}
                />
            )}

            {showWaitlist && <WaitlistForm setShowWaitlist={setShowWaitlist} onClose={() => setShowWaitlist(false)} />}




    </div>
  )
}

export default Navbar
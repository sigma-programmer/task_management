import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Component/Static/Home/Home'
// import NotificationContainer from './Component/Static/Test/NotificationContainer';
import ContactUs from './Component/Static/ContactUs/ContactUs';
// import WaitlistForm from './Component/dynamic/WaitlistForm/WaitlistForm';
import AboutUs from './Component/Static/Aboutus/AboutUs';
// import MainUpdatedDashboard from './Component/Dashboard/MainDashboard/MainDashboard';
// import SingleBlogPage from './Component/Dashboard/Layouts/BlogMain/SingleBlogPage/SingleBlogPage';
// import AllBlogCards from './Component/Dashboard/Layouts/BlogMain/BlogsMany/AllBlogCards';
import ScrollToTop from './Component/ScrollToTop/ScrollToTop';




import Login from './Component/LoginSignup/Login/Login';
import Signup from './Component/LoginSignup/SignUp/Signup';

import LogOut from './Component/LoginSignup/LogOut';


// import Drawing from './Drawing';
import Pricing from './Component/Static/Pricing/Pricing';

import ProductDocs from './Component/Static/ProductDocs/ProductDocs';
import ProductCalendar from './Component/Static/ProductCalendar/ProductCalendar';
import PrivacyPolich from './Component/Static/PrivacyPolicy/PrivacyPolich';



import MainDashboard from './MainDashboard/MainDashboard';
import TemperatureChart from './MainDashboard/Charts/LineChart';
import MyChart from './MainDashboard/Charts/MyChart';
import StackedBarChart from './MainDashboard/Charts/StackedBarChart';
import SingleBlog from './Component/dynamic/Blog/SingleBlog';
import Blog from './Component/dynamic/Blog/Blog';
import NoteDetail from './MainDashboard/Layouts/Notes/NoteDetail';

import SinglePageViewOfInvoice from './MainDashboard/Layouts/Dashboard/Invoice/SinglePageViewOfInvoice';
import ForgotPassword from './Component/LoginSignup/ForgotPassword/ForgotPassword';
import ResetPassword from './Component/LoginSignup/ForgotPassword/ResetPassword';



import Test1 from './MainDashboard/Layouts/Dashboard/Invoice/Test1';

// import Test from './test';
function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
      {/* <Route path="/Test/:orgId" element={<Test/>} /> */}
      <Route path="/Test1" element={<Test1/>} />
      
    
      <Route path="/invoice/:invoiceId" element={<SinglePageViewOfInvoice/>} />


      <Route path="/notes/:noteId" element={<NoteDetail/>} />
      <Route path="/singlepageblog" element={<SingleBlog/>} />
      <Route path="/blogs" element={<Blog/>} />
      <Route path="/dashboard" element={<MainDashboard/>} />
      <Route path="/temperaturechart" element={<TemperatureChart />} />
      <Route path="/mychart" element={<MyChart />} />
      <Route path="/stackedbarchart" element={<StackedBarChart />} />
      
      <Route path="/product-docs" element={<ProductDocs/>} />
      <Route path="/product-calendar" element={<ProductCalendar/>} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/privacy-policy" element={<PrivacyPolich/>} />
 




      {/* <Route path="/Drawing" element={<Drawing/>} /> */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/logout" element={<LogOut/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword/>} />


     

      {/* <Route path="/articles/:articleslug" element={<SingleBlogPage/>} /> */}
      {/* <Route path="/blogs" element={<AllBlogCards/>} /> */}
        {/* <Route path="/dashboard" element={<MainUpdatedDashboard />} /> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/NotificationContainer" element={<NotificationContainer />} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        {/* <Route path="/WaitlistForm" element={<WaitlistForm />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App
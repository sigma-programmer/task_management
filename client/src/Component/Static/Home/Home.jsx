import React, { useState, useEffect } from 'react';
import './Home.css'
import './Responsive.css'

import {  useNavigate} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaRegFileAlt } from "react-icons/fa";
import { PiBookOpenTextLight } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { IoHomeSharp } from "react-icons/io5";
import { FaFlagCheckered } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { CgNotes } from "react-icons/cg";
import HeroPic from '../../Images/HeroPic.png'
import AllBrandImages from '../../Images/AllBrandImages.png'


import { IoAirplaneSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

import Engineering from '../../Images/Engineering.png'
import Design from '../../Images/Design.png'
import Product from '../../Images/Product.png'
import Marketing from '../../Images/Marketing.png'
import operating from '../../Images/operations.png'
import Hr from '../../Images/Hr.png'
import CutTool from '../../Images/CutTool.png'
import AllTool from '../../Images/AllTool.png'
import EndlessPic from '../../Images/EndlessPic.png'
import ComponyWiki from '../../Images/CompanyWiki.png'
import GetStarted from '../GetStarted/GetStarted';
import Elephant from '../../Images/Elephant.png'
import Girls from '../../Images/Girls1.png'
import Girls2 from '../../Images/Girls2.png'
import Girls3 from '../../Images/Girls3.png'
import Notification from '../../Notification/Notification'
import WaitlistForm from '../../dynamic/WaitlistForm/WaitlistForm'

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate



  const [showWaitlist, setShowWaitlist] = useState(false);

  const [notification, setNotification] = useState(null);

  const showNotification = (message, textColor, backgroundColor) => {
      setNotification({ message, textColor, backgroundColor });
  };

  const closeNotification = () => {
      setNotification(null);
  };


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolled = window.scrollY;
  //     const viewportHeight = window.innerHeight;
  //     const pageHeight = document.documentElement.scrollHeight;
  //     const scrollPercent = (scrolled / (pageHeight - viewportHeight)) * 100;
  //     if (scrollPercent >= 10) {
  //       setShowWaitlist(true);
  //       window.removeEventListener('scroll', handleScroll); // Remove the event listener after showing the popup
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
const handleLoginNavigate=()=>{
  navigate("/login");
}

   // --------------if login then not shwing login page-------------
   useEffect(() => {
    // Read the JWT token from localStorage when the component mounts
    const token = localStorage.getItem("IntaskrToken");
    if (token) {
      navigate("/dashboard");
    }

    // Set up a timer to refresh the token every, for example, 15 minutes
    const refreshTokenInterval = setInterval(() => {
      const newToken = localStorage.getItem("IntaskrToken");
      if (newToken) {
        navigate("/dashboard");
      }
    }, 1000); // 15 minutes in milliseconds

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(refreshTokenInterval);
    };
  }, []);
  // -------------------------------------------------------------


  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <h1 className='FistParaofHome mt-4'>Think, plan, create. <br />
            With  Intaskr  at your side.</h1>
          <h3 className='SecondParaOfHome'>Intaskr  is the connected workspace where better, faster work happens.</h3>
          <div className='MainDivOfButtonreq'>
            <button className='ButtonOfIntaskr'  onClick={()=>handleLoginNavigate()} >Get Intaskr free <IoIosArrowRoundForward className="ArrowIcon" /></button>
            <button className='SecButtonOfIntaskr' onClick={()=>handleLoginNavigate()} >Request a demo <IoIosArrowRoundForward className="ArrowIcon" /></button>
          </div>
          <div className='ImageOfHeroPic'>
            <img className='ImageOfHerooPicc' src={HeroPic} alt="" />
          </div>




          <div className='d-flex MainDivOfCard'>



            <div className='card CardOfCentralize'>
              <div>
                <div className='DivOfCenteralizeIcon'>
                  <FaRegFileAlt />
                </div>
                <h5 className='FirstCardText'>Docs</h5>
                <p className='FirstCardOfSEcText'>Simple, powerful, <br />
                  beautiful. Next- <br />
                  gen notes & docs.</p>
              </div>
            </div>



            <div className='card CardOfCentralize'>
              <div>
                <div className='DivOfCenteralizeIcon1'>
                  <PiBookOpenTextLight />
                </div>
                <h5 className='FirstCardText'>Wikis</h5>
                <p className='FirstCardOfSEcText'>Centralize your <br />
                  knowledge. No more <br />
                  hunting for answers.</p>
              </div>
            </div>



            <div className='card CardOfCentralize'>
              <div>
                <div className='DivOfCenteralizeIcon2'>
                  <TbTargetArrow />
                </div>
                <h5 className='FirstCardText'>Projects</h5>
                <p className='FirstCardOfSEcText'>Manage complex <br />
                  projects without <br />
                  the chaos.</p>
              </div>
            </div>



            <div className='card CardOfCentralize'>
              <div>
                <div className='DivOfCenteralizeIcon3'>
                  <SlCalender />
                </div>
                <h5 className='FirstCardText'>Calendar</h5>
                <p className='FirstCardOfSEcText'>Manage your time and <br />
                  projects, together.</p>
              </div>
            </div>
          </div>






          
        </div>
      </section>

      <section>
        <div className="container">
          <h3 className='TextOfThousand'>Thousands minds run on Intaskr every day</h3>
          <p className='SecTextOfThousand'>Powering the world’s best teams, minds from next-generation startups <br />
            to established enterprises.</p>
          <div>
            <div className="row RowOfFigma">



            <img className='BrandImagesInHomePage'  src={AllBrandImages} alt="" />
            

             
            </div>
          
          </div>
          <p className='TextOfIntaskkr mt-5'>Intaskr adapts to your needs. It’s as minimal or as <br/>powerful as you need it to be.</p>
          {/* <p className='TextOfIntaskkr'>powerful as you need it to be.</p> */}
          <h3 className='TextOfEveryTeam'>Every team, side-by-side</h3>




          <div className="row g-3 mt-4 mb-5">
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam text-center">
      <img className="ImageOfEveryTeam" src={Engineering} alt="Engineering" />
      <p>Engineering</p>
    </div>
  </div>
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam NewBackgroundColor text-center">
      <img className="ImageOfEveryTeam" src={Design} alt="Design" />
      <p>Design</p>
    </div>
  </div>
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam text-center">
      <img className="ImageOfEveryTeam" src={Product} alt="Product" />
      <p>Product</p>
    </div>
  </div>
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam NewBackgroundColor text-center">
      <img className="ImageOfEveryTeam" src={Marketing} alt="Marketing" />
      <p>Marketing</p>
    </div>
  </div>
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam text-center">
      <img className="ImageOfEveryTeam" src={operating} alt="Operating" />
      <p>Operating</p>
    </div>
  </div>
  <div className="col-6 col-sm-4 col-md-2 d-flex align-items-center justify-content-center">
    <div className="card MainCardOfEveryTeam NewBackgroundColor text-center">
      <img className="ImageOfEveryTeam" src={Hr} alt="HR" />
      <p>HR</p>
    </div>
  </div>
</div>




       
          <div className='MainDivOfConsolidate'>

              <h3 className='TextOfConsolidate'>Consolidate tools. <br />
                Cut costs.</h3>
            {/* <div className='DivOfConsolidate'>
            </div> */}
              {/* <img className='ConsolidatetoolsImage' src={CutTool} alt="" /> */}
            <div className='VectorLine d-flex align-items-center justify-content-center'>
              <img className='AllToolImg' src={AllTool} alt="" />
            </div>
          </div>




          <div>
            <p className='TextOfRid'>We got rid of nearly a dozen different tools because of <br/>  what Intaskr does for us.</p>
            {/* <p className='TextOfRid'>what Intaskr does for us.</p> */}
          </div>

          <div className='DivOfEndlessPic'>
            <img className='ImageOfEndlessPic' src={EndlessPic} alt="" />
            <div className='MainDivOfEndless'>
              <h3 className='TextOfEndless'>Endless ways to use it</h3>
              <p className='SecTextOfEndless'>Browse all templates<IoIosArrowRoundForward /></p>
            </div>
          </div>




          <div className="row p-3">
            <div className="col-md-5 ColumnOfComponywiki">
              <div>
                <IoHomeSharp className='IconOfComponyWiki' />
                <p className='TextOfProduct'>Company wiki</p>
                <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
              </div>
              <img className='ImagfeOfCompontyWiki' src={ComponyWiki} alt="" />
            </div>



            <div className="col-md-7">

              <div className="row MainRowOfCompanyWiki">
                <div className='ComponyWikiOfMainCol'>

                  <div className="col-md-6 MainColumnOfComponywiki">
                    <FaFlagCheckered className='IconOfFlagcompony' />
                    <p className='TextOfProduct'>Product roadmap</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                  <div className="col-md-6 MainColumnOfComponywiki">
                    <FaRegCheckCircle className='IconOfFlagcompony1' />
                    <p className='TextOfProduct'>To Do</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                </div>
              </div>
              <div className="row MainRowOfCompanyWiki">
                <div className='ComponyWikiOfMainCol'>

                  <div className="col-md-6 MainColumnOfComponywiki">
                    <CgNotes className='IconOfFlagcompony2' />
                    <p className='TextOfProduct'>Meeting notes</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                  <div className="col-md-6 MainColumnOfComponywiki">
                    <IoAirplaneSharp className='IconOfFlagcompony3' />
                    <p className='TextOfProduct'>Vacation planner</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                </div>
              </div>
              <div className="row MainRowOfCompanyWiki">
                <div className='ComponyWikiOfMainCol'>
                  <div className="col-md-6 MainColumnOfComponywiki">
                    <FaCalendarAlt className='IconOfFlagcompony4' />
                    <p className='TextOfProduct'>Editorial calendar</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                  <div className="col-md-6 MainColumnOfComponywiki">
                    <FiInbox className='IconOfFlagcompony5' />
                    <p className='TextOfProduct'>Habit tracker</p>
                    <p className='SecTextOfProduct'>Get template<IoIosArrowRoundForward /></p>
                  </div>
                </div>
              </div>


            </div>





          </div>








          <div className="row">
            <div className="col-md-6">
              <h3 className='FirstTextelephant'>Intaskr </h3>
              <p className='SecondTextOfElephant'>Finally, all your <br /> work in one place</p>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <img className='ImageOfElephant' src={Elephant} alt="" />
            </div>
          </div>

        </div>
      </section>
      <section>
        <div className="container">
          <hr />
          <div className="row  mt-5">




            <div className="col-md-6 ColumnOfDocsss">




              <div className="DivOfCardDocs">
                <img className='GirlImage11' src={Girls} alt="" />



                <div className="card mainCardOfDocs">
                  <div className='MainDivOfIconDoc'>
                    <IoDocumentTextOutline className='IconOfDocss' />
                    <h4 className='TextOfDocss'>Docs</h4>
                  </div>
                  <p className='ParaOfDocss'>Simple. Powerful. Beautiful. <br /> Communicate more efficiently <br /> with next generation docs.</p>
                  <p className='Explore'>Explore →</p>

                </div>


              </div>









              <div className="DivOfCardDocs2">
                <img className='GirlImage11 GirlImage12' src={Girls2} alt="" />
                <div className="card mainCardOfDocs">
                  <div className='MainDivOfIconDoc'>
                    <TbTargetArrow className='IconOfDocss1' />
                    <h4 className='TextOfDocss'>Projects</h4>
                  </div>
                  <p className='ParaOfDocss'>Manage any type of project more efficiently. No separate, clunky system.</p>
                  <p className='Explore1'>Explore →</p>

                </div>
              </div>
            </div>





            <div className="col-md-6 ColumnOfDocsss">
              <div className="DivOfCardDocs1">
               
                <div className="card mainCardOfDocs1">
                  <div className='MainDivOfIconDoc'>
                    <PiBookOpenTextLight className='IconOfDocss2' />
                    <h4 className='TextOfDocss'>Wikis</h4>
                  </div>
                  <p className='ParaOfDocss'>It’s hard to move fast if you can’t find anything. Centralize all your knowledge in Intaskr.</p>
                  <p className='Explore2'>Explore →</p>

                </div>
                <img className='GirlImage11' src={Girls3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <GetStarted onClick={()=>handleLoginNavigate()} />
      <Footer />












      {notification && (
                <Notification
                    message={notification.message}
                    textColor={notification.textColor}
                    backgroundColor={notification.backgroundColor}
                    onClose={closeNotification}
                />
            )}

            {/* {showWaitlist && <WaitlistForm setShowWaitlist={setShowWaitlist} onClose={() => setShowWaitlist(false)} />} */}


    </>
  )
}

export default Home
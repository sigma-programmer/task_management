import React from "react";
import "./Aboutus.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FistImage from "../../Images/AboutFirstImage.png";
import AboutFrame from "../../Images/AboutFrame.png";
import AboutGirl from "../../Images/AboutGirl.png";
import AboutSecFrame from "../../Images/AboutSecFrame.png";
import AboutSecGirl from "../../Images/AboutSecGirl.png";
import AboutMobile from "../../Images/AboutMobile.png";
import AboutThirdGirl from "../../Images/About3Girl.png";
import AboutThirdFrame from "../../Images/AboutThirdframe.png";
import Task2 from "../../Images/Task2.png";
import AboutBoy from "../../Images/AboutBoy.png";
import AboutSecBoy from "../../Images/AboutSecBoy.png";
import AboutFouthFrame from "../../Images/AboutForthFrame.png";
import AboutFifthBoy from "../../Images/BoyAbout5.png";
import AboutThirdMobile from "../../Images/AboutMobileThird.png";
import PhoneCall from "../../Images/phone-call.png.png";
import Customer from "../../Images/Customer.png";
import NewOneAboutuS from "../../Images/NewOneAboutuS.png";
import Community from "../../Images/Community.png";
import Support from "../../Images/Support.png";
import Apple from "../../Images/Apple.png";
import GoogleAppStore from "../../Images/GoogleApp.png";
import RequestDemo from '../../Images/RequestDemo.png'
import AboutLastPic from '../../Images/AboutLastPic.png'
import SignUpAboutUs from "../../dynamic/SignUpAboutUs/SignUpAboutUs";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <section>






        <div className="container">






          <div className="col-sm-12 pt-5">
          <div className="col-sm-12 d-flex align-items-center justify-content-center">
            <img className="ImageOfFirstImage" src={FistImage} alt="" />
            </div>

            <div className="row  mt-5 mb-3 col-sm-12 d-flex align-items-center justify-content-center">

              <div className="col-sm-6 text-center">
                <h3 className="TextOfAboutIntaskr">
                  Intaskr for <br /> everyone
                </h3>
              </div>

              <div className="col-sm-6  mainSignUpSection">
                <p className="SecTextOfAboutIntaskr">
                  Write, plan, & get organized in one place. <br />
                  Now <span className="FreeOfAboutUs">FREE</span>  for personal use.
                </p>
                <div className="MainDivOfAboutInput">



                <SignUpAboutUs/>



                </div>
                <p className="TerxtOfSecAbout mt-2">
                  For web, mobile, Mac & Windows
                </p>
              </div>




            </div>
          </div>













          <div className="d-flex align-items-center justify-content-center">
            <img className="MainImageBox" src={AboutFrame} alt="" />
          </div>


          <div>
            <h3 className="TextOfMoreAboutUs">KNOW MORE ABOUT US</h3>
            <div className="row mt-5  mainDivBox">
              <div className="col-md-7 p-7  d-flex  align-items-center justify-content-center">
          <div>

                <p className="px-2">

                <span className="OneDigit">1</span>
                  <span className="AboutUsText">About us</span>
                </p>
                <p className="px-2">
                  At Intaskr, we are passionate about simplifying work and
                  enhancing productivity for freelancers, agency founders,
                  startups, and business owners worldwide.Our all-in-one
                  platform offers a comprehensive suite of tools designed to
                  streamline project management, team collaboration, and
                  operational workflows, including essential features like time
                  tracking and team attendance. <br/> Founded with a vision to
                  revolutionize the way businesses operate, Intaskr aims to
                  provide a seamless experience that reduces the need for
                  multiple platforms. By consolidating various tools into one
                  intuitive interface, we empower our users to focus on what
                  matters most—growing their business and achieving their goals.
                </p>
          </div>
              
                
              </div>
              <div className="col-md-5 p-1  d-flex  align-items-center justify-content-center">
                <img className="ImagesTaskWise1"   src={AboutGirl} alt="" />
              </div>
            </div>
          </div>


          <div className="d-flex mt-5 align-items-center justify-content-center">
            <img  className="MainImageBox  ImageOfAboutSecFrameImage" src={AboutSecFrame} alt="" />
          </div>


      




          <div>
       
            <div className="row mt-5  secondMission2">
              <div className="col-md-7 d-flex  align-items-center justify-content-center">



              <img  className="ImagesTaskWise"  src={Task2} alt="" />
             
              </div>
              <div className="col-md-5 p-1 d-flex  align-items-center justify-content-center">
              <div>

             
              <p className="px-2">

<span className="OneDigit">2</span>
  <span className="AboutUsText">Our Mission</span>
</p>
<p className="px-2">
Our mission at Intaskr is to deliver a unified platform that simplifies business operations and enhances productivity for professionals around the globe. We strive to create a user-friendly, innovative, and efficient solution that meets the evolving needs of our diverse clientele. By offering a comprehensive set of features, we enable our users to manage their work, teams, and operations more effectively, fostering a more productive and harmonious work environment.
</p>
 </div>
              </div>
            </div>
          </div>


















          <div>
          
            <div className="row mt-5 mainDivBox">
              <div className="col-md-7 p-7  d-flex  align-items-center justify-content-center">
          <div>

                <p className="px-2">

                <span className="OneDigit">3</span>
                  <span className="AboutUsText">Our Vision</span>
                </p>
                <p className="px-2">
                Our vision is to be the leading global provider of integrated
                  business management solutions, known for our commitment to
                  excellence, innovation, and customer satisfaction. We envision
                  a future where businesses of all sizes can effortlessly manage
                  their operations, collaborate seamlessly with their teams, and
                  achieve unprecedented growth. With Intaskr, we aim to
                  transform the way businesses operate, making it easier for our
                  users to succeed and thrive in a competitive landscape.
                </p>
          </div>
              
                
              </div>
              <div className="col-md-5 p-1  d-flex  align-items-center justify-content-center">
                <img className="ImagesTaskWise1"   src={AboutThirdGirl} alt="" />
              </div>
            </div>
          </div>






        



          <div className="d-flex mt-5 align-items-center justify-content-center">
            <img  className="MainImageBox  ImageOfAboutSecFrameImage" src={AboutThirdFrame} alt="" />
          </div>
          
      





<div className="container">

          <div className=" col-sm-12 d-flex mt-5 mb-5 flex-column align-items-center justify-content-center   SecondPartSignupSection">
            <h3>Get started. <span className="FreeOfAboutUs">FREE</span> for personal use.</h3>
          

            <div className="MainDivOfAboutInput">



<SignUpAboutUs/>



</div>
<p className="TerxtOfSecAbout mt-2">
  For web, mobile, Mac & Windows
</p>
          </div>
</div>










<div>
       
       <div className="row mt-5 mainDivBox">
         <div className="col-md-7 d-flex  align-items-center justify-content-center">



         <img  className="ImagesTaskWisenew"  src={AboutBoy} alt="" />
        
         </div>
         <div className="col-md-5 p-1 d-flex  align-items-center justify-content-center">
         <div>

        
         <p className="px-2">

<span className="OneDigit">4</span>
<span className="AboutUsText">Why choose us?</span>
</p>
<p className="px-2">


<div className="ForthPartAboutUs">
                  <h5 >1. Comprehensive All-in-One Solution</h5>
                  <p>
                    Intaskr offers a unified platform that replaces the need for 
                   
                    multiple tools.
                  </p>

                  <h5>2. User-Friendly Interface</h5>
                  <p>
                    Designed with the user in mind, Intaskr boasts an intuitive 
                   
                    interface that makes it easy for anyone to navigate and 
                    
                    utilize its features.
                  </p>

                  <h5>3. Scalability and Flexibility</h5>
                  <p>
                    Intaskr is built to grow with your business. Whether you're 
                    a startup, a growing agency, or an established
                    enterprise,
                    our platform scales to meet your needs
                  </p>
                </div>

</p>
</div>
         </div>
       </div>
     </div>



     <div>
          
          <div className="row mt-5 mainDivBox secondMission2">
            <div className="col-md-7 p-7  d-flex  align-items-center justify-content-center">
        <div>

              
              <p className="px-2">
              <div className="ForthPartAboutUs">
                <h5> 4. Dedicated Customer Support</h5>
                <p>
                  We understand that every business is unique, and we're here to{" "}
                  <br />
                  support you every step of the way.
                </p>

                <h5>5. Commitment to Security and Reliability</h5>
                <p>
                  At Intaskr, we prioritize the security and reliability of your{" "}
                  <br />
                  data. We use industry-standard encryption and robust security{" "}
                  <br />
                  measures to protect your information, giving you peace of mind{" "}
                  <br />
                  as you manage your business operations.
                </p>

                <h5>6. Innovation and Continuous Improvement</h5>
                <p>
                  We are committed to innovation and continuously improving our{" "}
                  <br />
                  platform based on user feedback and emerging industry trends.
                </p>
              </div>
              </p>
        </div>
            
              
            </div>
            <div className="col-md-5 p-1  d-flex  align-items-center justify-content-center">
              <img className="ImagesTaskWise1"   src={AboutSecBoy} alt="" />
            </div>
          </div>
        </div>








         
         





        {/* <div className="d-flex mt-5 align-items-center justify-content-center">
            <img  className="MainImageBox  ImageOfAboutSecFrameImage" src={AboutFouthFrame} alt="" />
          </div> */}

          <div className="MainDivOfAboutSecFrame">
            <img
              className="ImageOfAboutSecFrame"
              src={AboutFouthFrame}
              alt=""
            />
          </div>

         


          <div>
       
       <div className="row mt-5 mainDivBox secondMission2">
         <div className="col-md-7 d-flex  align-items-center justify-content-center">



         <img  className="ImagesTaskWisenew1"  src={NewOneAboutuS} alt="" />
        
         </div>
         <div className="col-md-5 p-1 d-flex  align-items-center justify-content-center">
         <div>

        
         <p className="px-2">

<span className="OneDigit">5</span>
<span className="AboutUsText">Get better</span>
</p>
<p className="px-2">


<div className="ForthPartAboutUs">

               
                <p>
                  No matter how you want to improve, Intaskr is flexible enough 
                 
                  to help you achieve your goals.
               
                  Meal planners, reading lists, and habit trackers all live 
                 
                  side-by-side — no more switching between apps to stay on 
                  
                  target.
                </p>
                <h5>
                  Productivity expert Tommy built a system for
                  self-improvement
                </h5>
                <p>
                  Tommy is an entrepreneur who’s made getting things done his
                  career. Using Intaskr, he built a fully-customized (and
                  highly-quantified) system that helps him reach his goals, both
                  personal and professional. And it’s all in one place for
                  everyday use.
                </p>
           
                </div>

</p>
</div>
         </div>
       </div>
     </div>


         





          <hr />




{/* ------------------------------below left work----------- */}




<div className="col-sm-12 p-2 mt-5 d-flex flex-column align-items-center justify-content-center">
  <h4 className="Heading11About">Designed for you to get more done</h4>
  <p>These features and more are now free — forever.</p>
  <div className="MainDivOfAboutInput">
    <SignUpAboutUs/>
  </div>
  <div className="d-flex mt-3 mb-4 align-items-center justify-content-center">
    <img className="ImageOfGetACallInAboutUs" src={PhoneCall} alt="" />
  </div>
  <h4 className="Heading11About">Get a demo</h4>
  <p className="text-center">Talk to a human to understand how Intaskr can help your org.</p>
  <button className="demoButton">Request a demo</button>
</div>



          <div className="mt-5 mb-5 mainDivBox">
            <h3 className="Heading11About mt-3 mb-5 mainDivBox">Expert help, whenever you need it.</h3>
            <div className="row">
  <div className="col-md-4">
    <div className="card custom-card11">
      <div className="card-body">
        <h4 className="CardHeading">Customer success</h4>
        <p>
          Our customer success team will help you design and scale your Notion workspace.
        </p>
        <img src={Customer} alt="" />
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card custom-card11">
      <div className="card-body">
        <h4 className="CardHeading">Community</h4>
        <p>
          With millions of global users, there are endless ways to get inspired by and learn from industry peers.
        </p>
        <img src={Community} alt="" />
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <div className="card custom-card11">
      <div className="card-body">
        <h4 className="CardHeading">24/7 support</h4>
        <p>
          In addition to on-demand videos, templates, and tutorials, enterprise customers get priority support.
        </p>
        <img src={Support} alt="" />
      </div>
    </div>
  </div>
</div>

          </div>


          <hr />


<div className="d-flex mt-5 mb-5 mainDivBox flex-column align-items-center justify-content-center">

<h3 className="Heading11About">How to Reach Us</h3>
            <p className="text-center">
              Interactive task and schedule keeper, ready! All in one Intaskr
            </p>
</div>
          
       





          <div>
           
            <div className=" col-sm-12   MainContactUsAreaUnderAboutUs ">

            <div className="row  d-flex align-items-center justify-content-center">
  <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
  

  <div className="col-sm-12 mt-4 mb-3 px-md-5 px-0 text-start TextForMobile">
    <h4>Customer Support</h4>

</div>

    <div className="card custom-card1">
      <p>
       <b>Customer Support:</b>  For any technical issues or questions about using Intaskr, please contact our support team:


       <ul className="contact-list">
  <li><b>Email:</b> <a href="mailto:support@intaskr.com">support@intaskr.com</a></li>
  <li><b>Phone:</b> <a href="tel:+917461815397">+917461815397</a></li>
</ul>

 
       <b> Live Chat: </b> Available 24/7 via WhatsApp
        <br /> <b>Send Us a Message</b> <br/>  Feel free to fill out the contact form below, and one of our team members will get back to you as soon as possible.
      </p>
    </div>
  </div>
  <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
  <div className="col-sm-12 mt-4 mb-3 px-md-5 px-0 text-start TextForMobile">
  <h4>Sales & General Inquiries</h4>
</div>

    <div className="card custom-card1">
      <p>
      <b>Sales Inquiries:</b>   Interested in learning more about how Intaskr can benefit your business? Our sales team is here to provide you with all the information you need:


      <ul className="contact-list">
  <li><b>Email:</b> <a href="mailto:sales@intaskr.com">sales@intaskr.com</a></li>
  <li><b>Phone:</b> <a href="tel:+917461815397">+917461815397</a></li>
</ul>

        <b>General Inquiries:</b>
       For general questions, partnership opportunities, or media inquiries, please contact us at:
        <br /> Email: info@intaskr.com
      </p>
    </div>
  </div>
</div>




              <div className="col-sm-12 d-flex mt-4 mb-5 align-items-center justify-content-center">
              <div className="MainDivOfAboutInput">



<SignUpAboutUs/>



</div>
              </div>
              <hr />



              <div className="row d-flex align-items-center justify-content-center app-store-row">
  <div className="col-md-4 col-sm-6 d-flex flex-row align-items-center justify-content-center">
    <img className="mx-1" src={Apple} alt="Apple App Store" />
    <p className="m-0 underline1">Apple App Store</p>
  </div>
  <div className="col-md-4 col-sm-6 d-flex flex-row align-items-center justify-content-center">
    <img className="mx-1" src={GoogleAppStore} alt="Google App Store" />
    <p className="m-0 underline1">Google App Store</p>
  </div>
  <div className="col-md-4 col-sm-12 d-flex flex-row align-items-center justify-content-center">
    <img className="mx-1" src={RequestDemo} alt="Request a demo" />
    <p className="m-0">Using Intaskr at work? <span className="underline1">Request a demo</span></p>
  </div>
</div>







            </div>
          </div>









          <div  className="col-sm-12 d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <img src={AboutLastPic} alt="" />
            <h3 className="Heading11About text-center">Templates to get you started</h3>
            <p className="text-center">Access 50+ templates for free when you sign up.</p>


              <div className="col-sm-12 d-flex mt-4 mb-5 align-items-center justify-content-center">
              <div className="MainDivOfAboutInput">



<SignUpAboutUs/>



</div>
              </div>
          </div>






          
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default AboutUs;

import React, { useState } from "react";
import { Container, Row, Col, Button, Accordion } from "react-bootstrap";
import {
  FaBolt,
  FaCalendarCheck,
  FaGlobe,
  FaMobile,
  FaPlayCircle,
} from "react-icons/fa";
import { FaApple, FaWindows, FaPlus, FaMinus } from "react-icons/fa";
import "./ProductCalendar.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Image from "../../Images/IMG 28.png";
import Image1 from "../../Images/IMG 27.png";
import Image2 from "../../Images/IMG 29.png"; // New schedule image
import Image3 from "../../Images/IMG 30.png";
import Image4 from "../../Images/IMG 31.png";
import Image5 from "../../Images/IMG 32.png";
import Image6 from "../../Images/IMG 34.png";
import Image7 from "../../Images/IMG 33.png";
import Image8 from "../../Images/IMG 37.png";
import Image9 from "../../Images/IMG 38.png";
import Image10 from "../../Images/Frame 1.png";
import Image11 from "../../Images/gcal.svg.png";
import Image12 from "../../Images/gmeet.svg.png";
import Image13 from "../../Images/arc.png";
import Image14 from "../../Images/Vector.png";
import Image15 from "../../Images/zoom.png";
import Image16 from "../../Images/IMG 41.png";
import Image17 from "../../Images/IMG 42.png";

import { FaClock, FaLanguage } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import { GrDocumentPerformance, GrSelect } from "react-icons/gr";
import { VscChecklist } from "react-icons/vsc";
import { MdContacts } from "react-icons/md";
import { IoHandLeft } from "react-icons/io5";

const ProductCalendar = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    if (activeKey === key) {
      setActiveKey(null);
    } else {
      setActiveKey(key);
    }
  };
  return (
    <>
      {/* Top Navbar */}
      <Navbar />

      <div className="product-cal">
        {/* Main Section */}
        <Container className="text-center my-5 product-docs">





        <Row className="d-flex justify-content-center mb-4 BackgroundImageRow">
  <Col xs={12} md={6} className="text-content">
    <img alt="cal" src={Image} />
    <h1 className="display-4 text-bold">It's time.</h1>
    <p className="lead NewTxt6hjhjhj">
      All of your commitments, now in one <br /> place. Meet the
      beautifully designed, fully <br /> integrated calendar for your
      work and life.
    </p>
    <Button variant="dark">Get Intaskr Calendar Free</Button>
  </Col>
</Row>




<div className="CustomRow">
  <div className="CustomCol">
    <div className="CalendarScreenshot">
      <img
        src={Image1}
        alt="Calendar Screenshot"
        className="CalendarImage"
      />
      <FaPlayCircle className="PlayButton" />
    </div>
  </div>
</div>




          {/* Time Management Section */}
          <Container fluid className="time-management-section py-5">
            <h2 className="text-center mb-5">Time management, simplified.</h2>

            <Row className="justify-content-center align-items-center">
              <Col
                xs={12}
                md={10}
                className="feature-row text-left feature-text1 p-0"
              >
                <FaBolt size={40} className="mt-3 px-2" />
                <h4 className="px-2">See your schedule at a glance</h4>
                <p className="px-2">
                  Join meetings directly from the menu bar so you can stay
                  focused <br />
                  on the work that matters.
                </p>
                <img
                  src={Image2}
                  alt="Schedule at a glance"
                  className="img img-fluid rounded main mr-5"
                />
              </Col>
            </Row>





            

            {/* Second row with two features and added gutter spacing */}
            <Row className="justify-content-evenly align-items-center py-4">
              <Col
                xs={12}
                md={4}
                className="feature-row2 text-left feature-text mb-4"
              >
                <FaClock 
size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />
                <h4>Built-in scheduling</h4>
                <p>
                  Send your availability and scheduling link to let others book
                  time with you. No separate app.
                </p>
                <img
                  src={Image3}
                  alt="Built-in scheduling"
                  className="img img-fluid rounded"
                />
              </Col>
              <Col
                xs={12}
                md={5}
                className="feature-row2 text-left feature-text mb-4"
              >
                <FaGlobe 
size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />
                <h4>Work across time zones</h4>
                <p>
                  Thoughtfully collaborate with global teams as you visualize
                  your day across time zones.
                </p>
                <img
                  src={Image4}
                  alt="Time zones"
                  className="img img-fluid rounded"
                />
              </Col>
            </Row>
            <Row className="justify-content-evenly align-items-center ">
              <Col
                xs={12}
                md={6}
                className="feature-row2 text-left feature-text mb-4"
              >

                <FaCalendarCheck 
size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }} />
                <h4>Modern design</h4>
                <p>Use command menu and shortcuts for efficient workflows.</p>
                <img
                  src={Image4}
                  alt="Built-in scheduling"
                  className="img img-fluid rounded"
                />
              </Col>
              <Col
                xs={12}
                md={6}
                className="feature-row2 text-left feature-text mb-4"
              >
                
                <FaLanguage
        size={30} // Adjust the size here
        className="mt-3"
        style={{ color: '#0A85D1' }} // Set color to sky blue
      />
      

                <h4>Available in 12 languages</h4>
                <p>
                  Supports English, Japanese, Korean, French, German, Spanish,
                  Portuguese, Danish, Dutch, Finnish, Norwegian, and Swedish…
                  with more on the way!
                </p>
                <img
                  src={Image5}
                  alt="Time zones"
                  className="img img-fluid rounded"
                />
              </Col>
            </Row>


            
          </Container>

          <Container fluid className="time-management-section ">
         
          <h2 className="text-center  header-backgroundnew">
      Fully integrated with <br /> your Intaskr workspace.
    </h2>

            <Row className="justify-content-evenly align-items-center py-4">
              <Col
                xs={12}
                md={6}
                className="feature-row text-left feature-text1"
              >
                <FiRefreshCw  size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }} />
                <h4>Manage your time and work, together.</h4>
                <p>
                  See deadlines and project timelines alongside your calendar
                  events <br /> so you know where to focus your efforts.
                </p>
                <img src={Image6} className="img" alt="Task Scheduling" fluid />
              </Col>
            </Row>

            <Row className="justify-content-evenly align-items-center py-4">
              <Col
                xs={12}
                md={4}
                className="feature-row3 text-left feature-text mb-4"
              >
                <GrSelect size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }} />
                <h4>Update project Timlines</h4>
                <p>
                  Just drag and drop to edit Intaskr database items without
                  leaving your calendar.
                </p>
                <img
                  src={Image8}
                  alt="Built-in scheduling"
                  className="img img-fluid rounded set"
                />
              </Col>
              <Col
                xs={12}
                md={5}
                className="feature-row3 text-left feature-text mb-4"
              >
                <GrDocumentPerformance size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }} />
                <h4>Connect and create Intaskr docs</h4>

                <p>
                  With info from Intaskr right in your calendar, you’ll always
                  have full context for every meeting.
                </p>
                <img
                  src={Image7}
                  alt="Time zones"
                  className="img img-fluid rounded"
                />
              </Col>
            </Row>
          </Container>

          <Container fluid className="time-management-section py-5">
            <h2 className="text-center">Work and life, playing nice.</h2>
            <Row className="justify-content-evenly align-items-center py-4">
              <Col
                xs={12}
                md={8}
                className="feature-row text-left feature-text1"
              >
                <MdContacts size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />
                <h4> See all your commitments in the same place</h4>
                <p>
                  No more accidental conflicts between work and personal events.
                </p>

                <div className="col-sm-12 d-flex align-items-center justify-content-end">

                <img
                  src={Image9}
                  className="img"
                  alt="Work and Life Calendar"
                  fluid
                />

                </div>

              </Col>
            </Row>

            <Row className="justify-content-evenly align-items-center">
              <Col
                xs={12}
                md={4}
                className="feature-row4 text-left feature-text1 mt-2"
              >
                <VscChecklist size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />{" "}
                <h4>Connect multiple calendars</h4>
                <p>Easily sync work and personal calendars.</p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row4 text-left feature-text1 mt-2"
              >
                <IoHandLeft size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />
                <h4>No more double bookings</h4>
                <p>Auto-block busy slots across all your calendars.</p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row4 text-left feature-text1 mt-2"
              >
                <FaMobile size={30} 
        className="mt-3"
        style={{ color: '#0A85D1' }}  />
                <h4> Easy-to-use mobile app</h4>
                <p>
                  View your schedule at a glance and add events quickly with iOS
                  widgets.
                </p>
              </Col>
            </Row>
          </Container>

          <Container fluid className="time-management-section">
          
           
            <h2 className="text-center  header-backgroundnew11">
              Designed to work with <br /> your favourite tools.
      
    </h2>
            <Row className="justify-content-evenly align-items-center">
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image10} alt="logo" size={30} className="mt-1" />{" "}
                <h4>Intaskr</h4>
                <p>
                  Bring in important dates across workspaces into one calendar.
                </p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image11} alt="logo" size={30} className="mt-1" />
                <h4>Google Calendar</h4>
                <p>
                  Bring in important dates across workspaces into one calendar.
                </p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image12} alt="logo" size={30} className="mt-1" />
                <h4>Google Meet</h4>
                <p>Available by default with Google Calendar.</p>
              </Col>
            </Row>
            <Row className="justify-content-evenly align-items-center mt-4">
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image15} alt="logo" size={30} className="mt-1" />{" "}
                <h4>Zoom</h4>
                <p>Create new Zoom meetings directly in Intaskr Calendar.</p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image13} alt="logo" size={30} className="mt-1" />
                <h4>Arc</h4>
                <p>
                  Bring in important dates across workspaces into one calendar.
                </p>
              </Col>
              <Col
                xs={12}
                md={4}
                className="feature-row5 text-left feature-text1 mt-2"
              >
                <img src={Image14} alt="logo" size={30} className="mt-1" />
                <h4>Google Meet</h4>
                <p>
                  Add a custom link from other popular conferencing services.
                </p>
              </Col>
            </Row>
          </Container>

          <Container fluid className="time-management-section mt-5  mb-5">
            
{/* 
          <h2 className="text-center  header-backgroundnew11">
              Designed to work with <br /> your favourite tools.
      
    </h2> */}

    <div className="text-center  header-backgroundnew113">

            <h2>Get Intaskr Calendar for free.</h2>
            <p style={{ marginBottom: 0 }}>
              Unlock a better way to manage your time and life.
            </p>
            <span className="link">Get Intaskr Calendar free →</span>

    </div>

            <Row className="justify-content-evenly align-items-center py-4">
              <Col
                xs={12}
                md={4}
                className="feature-row6 text-left feature-text mb-4"
              >
                <h4>Desktop App</h4>

                <img
                  src={Image17}
                  alt="Built-in scheduling"
                  className="img try img-fluid rounded"
                />
                <Button className="m-2 device">
                  <FaApple /> macOS
                </Button>
                <Button className="m-2 device">
                  <FaWindows /> Windows
                </Button>
              </Col>
              <Col
                xs={12}
                md={5}
                className="feature-row6 text-left feature-text mb-4"
              >
                <h4>Mobile App</h4>

                <img
                  src={Image16}
                  alt="Time zones"
                  className="img try img-fluid rounded fit NewImage111"
                />
                <Button className="device">
                  <FaApple /> Apple App Store
                </Button>
              </Col>
            </Row>

        
          </Container>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ProductCalendar;

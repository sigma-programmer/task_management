import React from "react";
import "./ContactUs.css";
import Navbar from "../Navbar/Navbar";
import Right from "../../Images/Right.png";
import PixerFrame from "../../Images/PixerFrame.png";
import girl from "../../Images/girl.png";
import Footer from "../Footer/Footer";
import ContactUsForm from "../../dynamic/ContactUsForm/ContactUsForm";

function ContactUs() {
  return (
    <div>
      <Navbar />
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <h1 className="FirstTextOfContact">
                Contact our <br /> team
              </h1>
              <p className="SecTextOfContact">
                Let’s explore how Intaskr can work for you.
              </p>
              <div className="MainDivOfSupport">
                <div className="DivOfDiv">
                  <div>
                    {" "}
                    <img src={Right} alt="" />
                  </div>
                  <div>
                    {" "}
                    One flexible tool for your entire company to <br /> share
                    knowledge, ship projects, and collaborate.
                  </div>
                </div>
                <hr />

                <div className="DivOfDiv">
                  <div>
                    {" "}
                    <img src={Right} alt="" />
                  </div>
                  <div>
                    {" "}
                    Business features to securely manage user access and
                    security.
                  </div>
                </div>
                <hr />

                <div className="DivOfDiv">
                  <div>
                    {" "}
                    <img src={Right} alt="" />
                  </div>
                  <div>
                    {" "}
                    Dedicated support to work with you on your <br /> setup and
                    help you build the best plan for your <br /> company.
                  </div>
                </div>
              </div>
              <p className="TextOfLooking mt-4">Looking for support? <a href="mailto:support@gmail.com">Email us</a></p>

            </div>

            <div className="col-md-6">
<ContactUsForm/>


            </div>
          </div>
          <hr className="LineOfHr mt-5" />
          <div>

          <div className="col-sm-12 d-flex align-items-center justify-content-center">

            <div className="LineOfHr2" />
          </div>
            <h3 className="thousandConnect">
              Keeping teams of tens and thousands connected
            </h3>
            <div className="row">
              <img className="ImageOfPixerFrame" src={PixerFrame} alt="" />
            </div>
            <h3 className="SecthousandConnect">
              “Intaskr’s ease of use is one of its hallmarks. It helps you{" "}
              <br /> visually navigate content and remember where something is.”
            </h3>
            <div className="MainDivOfGirl">
              <div>
                <img src={girl} alt="" />
              </div>
              <div className="DivOfArchitagirl">
              
                <p className="mb-0 fw-bold">Archita Tiwari</p>

                <p>Freelancer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ContactUs;

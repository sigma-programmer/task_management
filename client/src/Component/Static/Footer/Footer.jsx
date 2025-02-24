import React from 'react'
import './Footer.css'
import logo from '../../Images/Logo.png'
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
    return (
        <section className='MainSectionOfFooter'>
            <div className="container">

                <div className="footer">

                    <div className="row  MainRowOfFooter">
                        <div className="col-md-3 mb-3">
                            <div>
                                <div className='MainDivOfFooterLogo'>
                                    <div className='MainCircleofFooterMain'>
                                        <img src={logo} alt="" />
                                    </div>
                                    <h3 className='TopicOfFooter d-flex align-items-center justify-content-center'>Intaskr</h3>
                                </div>
                                <p className='p-3 m-0'>Interactive task and schedule keeper, ready! All in one Intaskr.</p>


                                <ul className='DivOfUL m-2'>
                              
                                {/* <span className='d-flex justify-content-start align-items-center'>
  <a href="https://www.instagram.com/intaskr/" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaInstagram className='IconOfSocial' />
  </a>
  <a href="https://www.facebook.com/intaskr" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaFacebookF className='IconOfSocial' />
  </a>
  <a href="https://www.linkedin.com/company/intaskr/" target="_blank" rel="noopener noreferrer" className='m-1'>
    <RiLinkedinFill className='IconOfSocial' />
  </a>
  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaYoutube className='IconOfSocial' />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaTwitter className='IconOfSocial' />
  </a>
</span> */}

<span className='d-flex justify-content-start align-items-center'>
  <a href="https://www.instagram.com/intaskr/" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaInstagram className='IconOfSocial' />
  </a>
  <a href="https://www.facebook.com/intaskr" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaFacebookF className='IconOfSocial' />
  </a>
  <a href="https://www.linkedin.com/company/intaskr/" target="_blank" rel="noopener noreferrer" className='m-1'>
    <RiLinkedinFill className='IconOfSocial' />
  </a>
  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaYoutube className='IconOfSocial' />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='m-1'>
    <FaTwitter className='IconOfSocial' />
  </a>
</span>


                                    <li>
                                        <button className='ButtonOfGlEng'><FaGlobe />  English</button>
                                    </li>
                                </ul>



                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <h3 className='TopicOfFooter'>Product</h3>
                                <ul className='DivOfSecUL'>
                                    <li>About</li>
                                    <li>Mission</li>
                                    <li>Services</li>
                                    <li>Social</li>
                                    <li>Get in touch</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className='TopicOfFooter'>Build</h3>
                                <ul className='DivOfSecUL'>
                                    <li>About</li>
                                    <li>Mission</li>
                                    <li>Services</li>
                                    <li>Social</li>
                                    <li>Get in touch</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <h3 className='TopicOfFooter'>Download</h3>
                                <ul className='DivOfSecUL'>
                                    <li>About</li>
                                    <li>Mission</li>
                                    <li>Services</li>
                                    <li>Social</li>
                                    <li>Get in touch</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div>
                                <h3 className='TopicOfFooter'>Resources</h3>
                                <ul className='DivOfSecUL'>
                                    <li>About</li>
                                    <li>Mission</li>
                                    <li>Services</li>
                                    <li>Social</li>
                                    <li>Get in touch</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className='TopicOfFooter'>Learn</h3>
                                <ul className='DivOfSecUL'>
                                    <li>About</li>
                                    <li>Mission</li>
                                    <li>Services</li>
                                    <li>Social</li>
                                    <li>Get in touch</li>
                                </ul>
                            </div>
                        </div>
                    </div>
<hr />
<div className='BottomOfFooter'>
    {/* <p className='TextOfShare'>Do Not Sell or Share My Info</p> */}
    <p className='SecTextOfShare'>©2024Intaskr.</p>
</div>












                    {/* <div class="contain">
  <div class="col">
    <h1>Company</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>
  <div class="col">
    <h1>Products</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>
  <div class="col">
    <h1>Accounts</h1>
    <ul>
      <li>About</li>
      <li>Mission</li>
      <li>Services</li>
      <li>Social</li>
      <li>Get in touch</li>
    </ul>
  </div>
  <div class="col">
    <h1>Resources</h1>
    <ul>
      <li>Webmail</li>
      <li>Redeem code</li>
      <li>WHOIS lookup</li>
      <li>Site map</li>
      <li>Web templates</li>
      <li>Email templates</li>
    </ul>
  </div>
  <div class="col">
    <h1>Support</h1>
    <ul>
      <li>Contact us</li>
      <li>Web chat</li>
      <li>Open ticket</li>
    </ul>
  </div>
  <div class="col social">
    <h1>Social</h1>
    <ul>
      <li><img src="https://svgshare.com/i/5fq.svg"/></li>
      <li><img src="https://svgshare.com/i/5eA.svg"/></li>
      <li><img src="https://svgshare.com/i/5f_.svg"/></li>
    </ul>
  </div>
<div class="clearfix"></div>
</div> */}
                </div>

            </div>
        </section>
    )
}

export default Footer
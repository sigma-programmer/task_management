import React from 'react'
import './GetStarted.css'

import {  useNavigate} from 'react-router-dom'
import Counter from '../../Counter/Counter';
import { IoIosArrowRoundForward } from "react-icons/io";
import GetStartedPic from '../../Images/GetStarted.png'
import { TbTargetArrow } from "react-icons/tb";
import Networkpic from '../../Images/NetworkPic.png'
import SecNetworkpic from '../../Images/SecNetwork.png'
import EveryDayImage from '../../Images/ImageOfEveryDay.png'
import PlatformPic from '../../Images/PlatformPic.png'
import InTaskr from '../../Images/CircleIntaskr.png'
import Avatar1 from '../../Images/avatar1.png'
import Avatar2 from '../../Images/avatar2.png'
import Avatar3 from '../../Images/avatar3.png'
import TemplatePic from '../../Images/TemplatePic.png'
import Subscribe from '../../dynamic/Subscribe/Subscribe';

function GetStarted() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginNavigate=()=>{
        navigate("/login");
      }
    return (
        <>
            <section>
                <div className="container">
                    <hr />
                    <h3 className='TextOfAssistant'>Your assistant , docs , & <br/> <TbTargetArrow className='IconOfProject' /> projects Together.</h3>
                    {/* <h3 className='TextOfAssistant'></h3> */}
                    <p className='ParagraphOfAssistant'>Intaskr is the connected workspace where <br />
                        better, faster work happens.</p>
                  
                  
                  
                    <div className="row RoowOfNetwork">
                        <div className="col-md-4 ColmunOfMemmbers">
                            <div className="card MainCardOfMember d-flex flex-column align-items-center justify-content-center">
                                {/* <h3 className='NumberOfMember'>1000+</h3> */}
                                <Counter endValue="1000" />
                                <p className='TextOfMember'>community members</p>
                            </div>
                        </div>
                        <div className="col-md-4 ColmunOfMemmbers">
                            <div className="card MainCardOfMember d-flex flex-column align-items-center justify-content-center">
                                {/* <h3 className='NumberOfMember'>50+</h3> */}
                                <Counter endValue="50" />
                                <p className='TextOfMember'>community groups</p>
                            </div>
                        </div>
                        <div className="col-md-4 ColmunOfMemmbers">
                            <div className="card MainCardOfMember d-flex flex-column align-items-center justify-content-center">
                            <Counter endValue="5" />
                                {/* <h3 className='NumberOfMember'>5+</h3> */}
                                <p className='TextOfMember'>countries represented</p>
                            </div>
                        </div>
                    </div>





                    <div className="row">
                        <div className="col-md-6">
                            <div className="card MainCardOfNetwork">
                                <p className='TextOfNetwork'>An always-on support network</p>
                                <p className='SecTextOfNetwork'>Swap setups and share tips in over 50 online <br />
                                    communities.</p>
                                <img className='ImageOfNetwork' src={Networkpic} alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card MainCardOfNetwork">
                                <p className='TextOfNetwork'>Choose your language</p>
                                <p className='SecTextOfNetwork'>InTaskr currently supports English & many more languages. <br />
                                    With more to come!</p>
                                <img className='SecImageOfNetwork' src={SecNetworkpic} alt="" />
                            </div>
                        </div>
                    </div>
                    <h3 className='TextOfEveryDay'>Thousands run on Intaskr every day</h3>
                    <p className='SecTextOfEveryDay'>Powering the world’s best teams, from next-generation startups <br /> to established enterprises.</p>
                    <div className='MainDivOfEveryDay'>
                        <img className='ImageOfEveryDay' src={EveryDayImage} alt="" />
                    </div>
                    <h3 className='TextOfGlobal'>Join a global movement. <br />
                        Unleash your creativity.</h3>
                    <p className='TExtOfGlobal mt-3'>Our vibrant community produces content, teaches courses, and leads events all over <br />
                        the world.</p>
                    <h3 className='TextOfPlatform mt-5'>“Your All rounder platform.”</h3>
                    <p className='TextOfUser'>USERS</p>
                    <div className='MainDivOfEveryDay'>
                        <img className='ImageOfEveryDay' src={PlatformPic} alt="" />
                    </div>
                    <hr />
                    <div>
                        <div className="row RowOfEveryTeam mb-5 mt-5">
                            <div className="col-md-6 ">
                                <div className='MainDivOfInstakr'>
                                    <img className='ImageOfIntaskr' src={InTaskr} alt="" />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                <h3 className='IntaskrEveryOne'><span style={{ color: "#00AC47", marginRight: "8px" }}>Intaskr</span>
<br />

<span style={{ color: "#9F1EF5" }}>for everyone</span>
 </h3>
                            </div>
                        </div>
                        <div className="row RowOfInntaskr">
                            <div className="col-md-4">
                                <div className="card MainCardOfDocument">
                                    <div className='DivOfAvatarr'>
                                        <img className='ImageOfAvatar' src={Avatar1} alt="" />
                                        <div className='MainDivAvatars'>
                                            <p className='PataFirstOfAvatar'>Deborah Mecca </p>
                                            <p className='SecParaFirstOfAvatar'>@DebMeecca</p>

                                        </div>
                                    </div>
                                    <p className='ParaOfDocument'>I used to HATE documenting things. And 
                                        then I started using  <span style={{color:"blue"}}>
                                    @intaskr
                                    </span>   and I
                                        document a lot.  Now I just realize that it wasn't that I hated documenting, I just hated Google Docs.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card MainCardOfDocument">
                                    <div className='DivOfAvatarr'>
                                        <img className='ImageOfAvatar' src={Avatar2} alt="" />
                                        <div className='MainDivAvatars'>
                                            <p className='PataFirstOfAvatar'>André Blackman</p>
                                            <p className='SecParaFirstOfAvatar'>@mindofanedre</p>

                                        </div>
                                    </div>
                                    <p className='ParaOfDocument'>One of the most incredible things about  <span style={{color:"blue"}}>
                                    @intaskr
                                    </span>   is the dynamic community
                                        being built - creating and sharing at its
                                        best.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card MainCardOfDocument">
                                    <div className='DivOfAvatarr'>
                                        <img className='ImageOfAvatar' src={Avatar3} alt="" />
                                        <div className='MainDivAvatars'>
                                            <p className='PataFirstOfAvatar'>Oliver Peyre</p>
                                            <p className='SecParaFirstOfAvatar'>@opeyreee</p>
                                        </div>
                                    </div>
                                    <p className='ParaOfDocument'>  <span style={{color:"blue"}}>
                                    @intaskr
                                    </span>   Truly impressed by the 
                                        velocity and quality of your work. 
                                        Making using Intaskr even more fun
                                        week after week!</p>
                                </div>
                            </div>
                        </div>
                        <div className='DivOfTemplatePic'>
                            <img className='ImageOfTemplate' src={TemplatePic} alt="" />

                        </div>
                        <h3 className='TextOfTemplate'>Templates to get you started</h3>
                        <p className='SecTextOfTemplate'>Access 50+ templates for free when you sign up.</p>


                        <h4 className='IntaskKrTextOfTemplate '>InTaskr:</h4>
                        <h5 className='IntaskKrSecTextOfTemplate'>Interactive Task and Schedule Keeper, Ready!</h5>
                        
                        
                        <div className='DivOfInput '>
                          <Subscribe/>
                        </div>




                        <h3 className='TextOfQuestion'>Questions & answers</h3>









                        <div className='MainDivOfAccordion'>
                            <div className='MainFAQSection'>
                            <hr />

                            <div className="accordion accordion-flush" id="accordionFlushExample">


                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        What is Intaskr? 
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Intaskr is a software solution designed to simplify task management, team collaboration, and business development. We offer innovative tools to help businesses streamline operations and boost productivity.</div>
                                    </div>
                                </div>





                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Who can benefit from using Intaskr? 
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">Intaskr is suitable for businesses of all sizes and industries. From small startups to large enterprises, our platform can help teams work more efficiently and achieve their goals.</div>
                                    </div>
                                </div>





                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingThree">
                                        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                        How does Intaskr help with task management? 
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div class="accordion-body">Intaskr provides features like task creation, assignment, prioritization, and tracking, enabling you to manage your workload effectively. You can also set deadlines, add reminders, and collaborate with team members seamlessly.</div>
                                    </div>
                                </div>




                            

                            <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingFour">
                                        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                                        What kind of teams can use Intaskr? 
                                        </button>
                                    </h2>
                                    <div id="flush-collapseFour" className="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">Intaskr is versatile and can be used by various teams, including marketing, sales, customer support, project management, and more.</div>
                                    </div>
                                </div>


                                <div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingFive">
        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
        Does Intaskr offer integration with other tools? 
        </button>
    </h2>
    <div id="flush-collapseFive" className="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">Yes, Intaskr integrates with popular productivity and business tools to enhance your workflow.</div>
    </div>
</div>



<div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingSix">
        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
        Is there a mobile app for Intaskr? 
        </button>
    </h2>
    <div id="flush-collapseSix" className="accordion-collapse collapse" aria-labelledby="flush-headingSix" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">Yes, we offer a mobile app for both iOS and Android devices, allowing you to manage tasks and collaborate on the go.</div>
    </div>
</div>












<div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingSeven">
        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
        How much does Intaskr cost? 
        </button>
    </h2>
    <div id="flush-collapseSeven" className="accordion-collapse collapse" aria-labelledby="flush-headingSeven" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">We offer flexible pricing plans to suit different business needs. Please visit our pricing page for detailed information</div>
    </div>
</div>

<div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingEight">
        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
        What kind of support do you offer? 
        </button>
    </h2>
    <div id="flush-collapseEight" className="accordion-collapse collapse" aria-labelledby="flush-headingEight" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body"> Intaskr provides comprehensive customer support through email, live chat, and detailed documentation. Our dedicated support team is always ready to assist you.</div>
    </div>
</div>

<div className="accordion-item">
    <h2 className="accordion-header" id="flush-headingNine">
        <button className="accordion-button collapsed fw-custom" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
        Is there a free trial available? 
        </button>
    </h2>
    <div id="flush-collapseNine" className="accordion-collapse collapse" aria-labelledby="flush-headingNine" data-bs-parent="#accordionFlushExample">
        <div className="accordion-body">Yes, we offer a free trial to allow you to explore Intaskr's features and benefits before committing.</div>
    </div>
</div>



                            </div>
                            <hr />
                            </div>





                            
                            <p className='ParagraphOfquestion '>Still have more questions? <br />
                                Learn more in our help center.</p>
                        </div>
                    </div>
                </div>
            </section>












            <section>
                <div className="container">
                    <hr className='GetStartedHrtag'/>
                    <h3 className='TextOfGetStarted'>Get started for free</h3>
                    <p className='SecTextOfGetStarted'>Play around with it first. Pay and add your team later.</p>
                    <div className='MainDivOfButtonreq'>
                        <button className='ButtonOfIntaskr' onClick={() =>  handleLoginNavigate()}>Try Intaskr free <IoIosArrowRoundForward /></button>
                        <button className='SecButtonOfIntaskr' onClick={() =>  handleLoginNavigate()}>Request a demo <IoIosArrowRoundForward /></button>
                    </div>
                    <div className='MainDivOfGetStarted'>
                        <img className='ImageOfGetStarted' src={GetStartedPic} alt="" />
                    </div>

                </div>
            </section>

          
        </>
    )
}

export default GetStarted
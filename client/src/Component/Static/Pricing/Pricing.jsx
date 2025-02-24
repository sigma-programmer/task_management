import React from 'react'
import './Pricing.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import pixer from '../../Images/pixar.png'
import loom from '../../Images/loom2.png'
import kincart from '../../Images/Kincart.png'
import curology from '../../Images/curology.png'
import headspace from '../../Images/headspace.png'
import pricing from '../../Images/pricingpic.png'
import calenderFrame from '../../Images/calenderFrame.png'
import Right from '../../Images/Write.png'
import instakar from '../../Images/Intaskar2.png'
import seatingboy from '../../Images/seatingboy.png'
import innovativeTeam from '../../Images/innovateTeam.png'
import FPerson from '../../Images/FPerson.png'
import SPerson from '../../Images/SPerson.png'
import girl from '../../Images/girl.png'
import PixerFrame from '../../Images/PixerFrame.png'
import customerLovePic from '../../Images/CustomerLovePic.png'
import userloveus from '../../Images/usersloveus.png'
import star from '../../Images/Star.png'
import PricingHouse1 from '../../Images/PricingHouse1.png'
import PricingHouse2 from '../../Images/PricingHouse2.png'
import PricingHouse3 from '../../Images/PricingHouse3.png'
import write from '../../Images/Right.png'
import elephant2 from '../../Images/elephant2.png'
import TrryInstakrToday from '../../Images/TrryInstakrToday2.png'
import { FaPlus } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import PricingFAQ from './PricingFAQ/PricingFAQ'

function Pricing() {
    return (
        <>
            <Navbar />
            <section className='pt-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <h3 className='Prricing'>Pricing</h3>
                            <h2 className='TextOfOneTool'>One tool for your whole company. <br />
                                Free for teams to try.</h2>
                            <p className='Trusted'>Trusted by MINDS at</p>
                            <div className='MainDivOfImagess'>
                                <img className='MainDivOfImagessPixer' src={pixer} />
                                <img className='MainDivOfImagessPixer' src={loom} />
                                <img className='MainDivOfImagessPixer' src={kincart} />
                                <img className='MainDivOfImagessPixer' src={curology} />
                                <img className='MainDivOfImagessPixer' src={headspace} />
                            </div>
                        </div>
                        <div className='col-md-4 pt-2 ImageOfPricingggDiv'>
                            <img className='ImageOfPricinggg' src={pricing} />
                        </div>
                    </div>
                    <div>
                        <p className='ParagraphOfInstaCalender'>Try  Intaskr Calendar for free, with any plan.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='row RowwOfCard'>
                        <div className='card CardOfPricing'>
                            <div className='FirstDDivOfPrricingFree'>
                                <img className='ImageOfCrdPricing' src={PricingHouse1} />
                                <p className='Free'>Free</p>
                                <p className='ParaOfCardPrricing'>For organizing every corner of <br /> your work & life.</p>
                            </div>
                            <div className='DDivOfPrricingFree'>
                                <h5 className='ParaaOfFrreee'>Free</h5>
                                <p className='ParaaOfUnlimitedFree'>Unlimited blocks for individuals <br />Limited block trial for teams</p>
                                <button className='ButtonOfPricingGetStarted'>Get started</button>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Collaborative workspace</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Basic page analytics</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Unlimited text a day</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Invite 10 guests</p>
                                </div>
                            </div>
                        </div>
                        <div className='card CardOfPricing'>
                            <div className='FirstDDivOfPrricingFree'>
                                <img className='ImageOfCrdPricing' src={PricingHouse2} />
                                <p className='Plus'>Plus <span className='SpanOfPlus'>Formerly Team</span> </p>
                                <p className='ParaOfCardPrricing'>A place for small groups to plan & get organized.</p>
                            </div>
                            <div className='DDivOfPrricingFree'>
                                <h4 className='ParaaOfFrreee'>$8</h4>
                                <p className='ParaaOfUnlimitedFree'>per user / month <br />
                                    billed annually <br />
                                    $10 billed monthly</p>
                                <button className='ButtonOfPricingGetStartedd'>Get started</button>
                                <p>Everything in Free, and</p>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Unlimited blocks for teams</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Unlimited file uploads</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>UInvite 100 guests</p>
                                </div>
                            </div>
                        </div>
                        <div className='card CardOfPricing'>
                            <div className='FirstDDivOfPrricingFree'>
                                <img className='ImageOfCrdPricing' src={PricingHouse3} />
                                <p className='Business'>Business <span className='SpanOfPlus'>New</span> </p>
                                <p className='ParaOfCardPrricing'>For companies using Intaskr to connect several teams & tools.</p>
                            </div>
                            <div className='DDivOfPrricingFree'>
                                <h4 className='ParaaOfFrreee'>$15</h4>
                                <p className='ParaaOfUnlimitedFree'>per user / month <br />
                                    billed annually <br />
                                    $18 billed monthly</p>
                                <button className='ButtonOfPricingGetStarted'>Get started</button>
                                <p>or Request a Trial</p>
                                <h6>Everything in Plus, and</h6>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Private teamspaces</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Bulk PDF export</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Advanced page analytics</p>
                                </div>
                                <div className='DivOffWrite'>
                                    <img className='IamgeOffWrite' src={write} />
                                    <p className='ParaOfWritee'>Invite 250 guests</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='row  FirstRowOfadd-on'>
                        <div className='col-md-7'>
                            <div>
                                <p className='ParagraphOfOptionalAddOn' ><img src={star} /> Optional add-on</p>
                                <h3 className='ParaOfIntaskarCalendar' >Intaskr Calendar</h3>
                                <p className='ParagraphOfAnnually'>Add to any  plan for annually. $10 per member / month for <br /> monthly billing and Free plans.</p>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <img src={Right} />
                                        <h3 className='FirstWorkFaster'>Work faster</h3>
                                        <p className='ParagraphOfGenerateSummaries'>Generate summaries, <br /> action items & insights</p>
                                    </div>
                                    <div className="col">
                                        <img src={Right} />
                                        <h3 className='FirstWorkFaster'>Write better</h3>
                                        <p className='ParagraphOfGenerateSummaries'>Rewrite task to be <br /> clear and effective</p>
                                    </div>
                                    <div className="col">
                                        <img src={Right} />
                                        <h3 className='FirstWorkFaster'>Think bigger</h3>
                                        <p className='ParagraphOfGenerateSummaries'>Brainstorm new ideas <br /> and first drafts</p>
                                    </div>
                                </div>
                            </div>
                            <div className='MainDivOfButtons'>
                                <button className='ButtonOfGetStarted' >Get started</button>
                                <button className='ButtonOfReadFAQ' >Read FAQ</button>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <img className='ImageOfCalenderFrame' src={calenderFrame} />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h3 className='TextOfTryInstakrTooday'>Pricing, side-by-side</h3>
                            <p className='ParagraphOfTryInstakrTooday'>You can also try Intaskr for free. See all pricing plans.</p>
                            <div className='MainDivOfInputInstakr'>
                                <input className='InputOfInstakrTodayFree' placeholder='Enter your email...' />
                                <button className='ButtonOfTryInstakrFreeee'>Sign up</button>
                            </div>
                            <div className='DivOfEmailCard'>
                                <div className='card col-md-6 ColumnOfCardEle '>
                                    <div className='ColumnOfEmailDiv'>
                                        <img className='ImagesOfElephantt' src={elephant2} />
                                        <h4 className='TextOfEvernote'>Evernote Premium</h4>
                                        <p className='TextOfBasic'>Basic note taking.</p>
                                    </div>


                                    <div className='MainDdivOfHeadingEight'>
                                        <div>
                                            <h3 className='HeadingOfEight'>$8</h3>
                                            <p className='BilledMonthly'>$8 billed monthly</p>
                                        </div>
                                        <div className='MainSecondDivOfEightWrite'>
                                            <div className='DivOffWrite'>
                                                <img className='IamgeOffWrite' src={write} />
                                                <p className='ParaOfWritee'>Notes</p>
                                            </div>
                                            <div className='DivOffWrite'>
                                                <img className='IamgeOffWrite' src={write} />
                                                <p className='ParaOfWritee'>Tags</p>
                                            </div>
                                            <div className='DivOffWrite'>
                                                <img className='IamgeOffWrite' src={write} />
                                                <p className='ParaOfWritee'>Reminders</p>
                                            </div>
                                            <div className='DivOffWrite'>
                                                <img className='IamgeOffWrite' src={write} />
                                                <p className='ParaOfWritee'>Web clipper</p>
                                            </div>
                                            <div className='DivOffWrite'>
                                                <img className='IamgeOffWrite' src={write} />
                                                <p className='ParaOfWritee'>Two-level hierarchy</p>
                                            </div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                            <div className='IamgeOffWrite' ></div>
                                        </div>

                                    </div>
                                </div>
                                <div className='card col-md-6 ColumnOfCardEle'>
                                    <div className='ColumnOfEmailDiv'>
                                        <img className='ImagesOfElephantt' src={instakar} />
                                        <h4 className='TextOfEvernote'>Intaskr Personal</h4>
                                        <p className='TextOfBasic'>For organizing every corner of <br /> your life.</p>
                                    </div>

                                    <div className='MainDdivOfHeadingEight'>
                                        <div>
                                            <h3 className='HeadingOfEight'>Free</h3>
                                            <p className='BilledMonthly'>for individuals</p>
                                        </div>
                                        <div className='MainSecondDivOfEightWrite'>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Notes</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Tags</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Reminders</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Web clipper</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Infinite hierarchy</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Real-time collaboration</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Markdown support</p>
                                        </div>
                                        <div className='DivOffWrite'>
                                            <img className='IamgeOffWrite' src={write} />
                                            <p className='ParaOfWritee'>Databases</p>
                                        </div>
                                        <div className='IamgeOffWrite' ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='MainDivOfSecondElephantt1'>
                                <img className='SecondImagesOfElephantt' src={instakar} />
                            </div>
                            <h3 className='TextOfTryInstakrTooday'>Try Intaskr today</h3>
                            <p className='ParagraphOfTryInstakrTooday'>Get started for free. <br />
                                Add your whole team as your needs grow.</p>
                            <div className='MainDivOfSecondElephantt'>
                                <button className='ButtonOfTryInstakrFree'>Try Intaskr free</button>
                            </div>
                            <p className='ParaaaOfBigTeamm'>On a big team? <span className='SpanOfBigTeamm'> Request a demo</span></p>
                            <div className='MainDivOfSecondElephantt'>
                                <img className='ImagesOfTrryInstakrTodayy' src={TrryInstakrToday} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>

                    <div>
                        <h3 className='TextOfCustomersLoveUs'>See why customers love us</h3>
                        <div className='MainDivOfBestGoogle'>
                            <div className='row RowOfBestGoogle'>
                                <div className='col-md-4'>
                                    <h5 className='TextOfBesttGoogle'>Intaskr is rated the best on Google</h5>
                                    <p className='ParagraphOfBestGoogle'>Intaskr consistently ranks as the Google <br />
                                        industry leader based on hundreds of customer 
                                        reviews. But don't take our word for it. Give out 
                                        your reviews for more improvement.</p>
                                </div>
                                <div className='col-md-4 ColumnOfUsersLoveUs'>
                                    <img className='MainDivOfColumnOfUsersLoveUs' src={userloveus} />
                                </div>
                            </div>
                            <div className='row SecondRowOfBestGooglee'>
                                <div className='col-md-2 ColumnOfBestGooglee'>
                                    <p className='NumberOfGoogleBest'>86%</p>
                                    <p className='TextOfGoogleBest'>Ease of use</p>
                                </div>
                                <div className='col-md-2 ColumnOfBestGooglee'>
                                    <p className='NumberOfGoogleBest'>90%</p>
                                    <p className='TextOfGoogleBest'>Ease of admin</p>
                                </div>
                                <div className='col-md-2 ColumnOfBestGooglee'>
                                    <p className='NumberOfGoogleBest'>91%</p>
                                    <p className='TextOfGoogleBest'>Meets requirements</p>
                                </div>
                                <div className='col-md-2 ColumnOfBestGooglee'>
                                    <p className='NumberOfGoogleBest'>86%</p>
                                    <p className='TextOfGoogleBest'>Ease of setup</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div>
                        <h3 className='TextOfThousandConnected'>Keeping teams of tens and <br /> thousands connected</h3>
                        <div className='MainDivOfPixerFrame'>
                            <img className='ImageOfMainDivOfPixerFrame' src={PixerFrame} />
                        </div>
                        <p className='ParagraphOfHallmarks'>“Intaskr’s ease of use is one of its hallmarks. It helps you <br /> visually navigate content and remember where something is.”</p>
                        <div className='MainDivOfFreelancer'>
                            <img src={girl} />
                            <div className=''>
                                <p className='ArchitaTiwari'>Archita Tiwari</p>
                                <p className='Freelancer'>Freelancer,College student</p>
                            </div>
                        </div>
                        <div className='MainDivOfImageCustomerLovePic'>
                            <img className='ImasgesOfCustLoovePic' src={customerLovePic} />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className='container'>
                    <div className='row RowOfInnovatiteTeam'>
                        <div className='col-md-6'>
                            <h3 className='TextOfInnovativeTeams'>Used by the world’s <br /> most innovative teams</h3>
                            <div className='MainDivOfButtonOfReadAllCust'>
                            <button className='ButtonOfReadAllCust'>Read all customer stories <FaArrowRight /></button>
                            </div>
                        </div>
                        <div className='col-md-6 ImageOfInnovativeTeam'>
                            <img src={innovativeTeam} />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row RowOfAdaptsneeds">
                            <div className="col-md-4">
                                <p className='ParagraphOfWorkSpace'>Intaskr is a workspace that adapts to your needs. It’s as minimal or as powerful as you need it to be.</p>
                                <div className='MAinDivOfImageOfPerson'>
                                    <img src={FPerson} />
                                    <div>
                                        <p className='ArchitaTiwari'>S.B. </p>
                                        <p className='Freelancer'>Director of Product</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <p className='ParagraphOfWorkSpace'>Intaskr continues to be the easiest way to get information centralized somewhere and shout it out to someone else. For us, that’s extremely important because half our team is remote.</p>
                                <div className='MAinDivOfImageOfPerson'>
                                    <img src={SPerson} />
                                    <div>
                                        <p className='ArchitaTiwari'>AmarDeep</p>
                                        <p className='Freelancer'>Co-founder and Head of Intubeweb</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <p className='ParagraphOfWorkSpace'>Intaskr’s ease of use is one of its hallmarks. It helps you visually navigate content and remember where something is.</p>
                                <div className='MAinDivOfImageOfPerson'>
                                    <img src={girl} />
                                    <div>
                                        <p className='ArchitaTiwari'>Archita Tiwari</p>
                                        <p className='Freelancer'>Freelancer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
<hr/>
                </div>


            </section>

<PricingFAQ/>

            <section>
                <div className='container'>

                <hr/>
                    <div className='MainDivOffImagesInstakkr'>
                        <div className='MainDivOfImageInstakr'>
                            <img src={instakar} />
                        </div>
                        <h4 className='TryInstaskrToday'>Try Intaskr today</h4>
                        <p className='ParagraphOfTryInstaskr'>Get started for free. <br />
                            Add your whole team as your needs grow.</p>
                        <div className='row'>
                            <div className='col-md-4'>
                                <img className='' src={seatingboy} />
                            </div>
                            <div className='col-md-8'>
                                <button className='ButtonOfFreeInstaskr'>Try Intaskr free</button>
                                <p className='SecondParagraphOfFreeInstakr'>On a big team? <span className='SpanOfDemo'>Request a demo </span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )
}

export default Pricing

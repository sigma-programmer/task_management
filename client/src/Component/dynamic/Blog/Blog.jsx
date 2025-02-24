import React from 'react'
import './Blog.css'
import Navbar from '../../Static/Navbar/Navbar'
import Footer from '../../Static/Footer/Footer'
import SecondBlogImage from '../../Images/Sec-BlogImage.png'
import Post1 from '../../Images/Post1.png'
import Post2 from '../../Images/Post2.png'
import Post3 from '../../Images/Post3.png'
import Post4 from '../../Images/Post4.png'
import Post5 from '../../Images/Post5.png'
import Post6 from '../../Images/Post6.png'
import Post7 from '../../Images/Post7.png'
import Post8 from '../../Images/Post8.png'
import Post9 from '../../Images/Post9.png'
import BlogImage from '../../Images/BlogImage.png'

const Blog = () => {
    return (
        <div>
            <Navbar />
            <section>
                <div className='container'>
                    <img src={SecondBlogImage} className='ImageOfSecondBlogImage' />
                    <div className='FirstMainDivOfAdvertisement'>
                        <div className='MainDivOfAdvertisement'>
                            <h6 className='TextOfAdvertisement'>Advertisement</h6>
                            <h5 className='TextOfYouCanPlaceAds'>You can place ads</h5>
                            <h6 className='TextOfNumber'>750x100</h6>
                        </div>
                    </div>

                    <div>
                        <div className='row RowOfFirstBlogPostt'>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post1} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Time Management</div>
                                        <h3 className='TextOfMasterArt'>Master the Art of Time: Effective Strategies for Productivity</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post2} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Time Management</div>
                                        <h3 className='TextOfMasterArt'>Beat the Clock: Time Management Hacks for a Stress-Free Life</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post3} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Time Management</div>
                                        <h3 className='TextOfMasterArt'>Prioritize Your Way to Success: A Guide to Effective Time Allocation</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row RowOfBlogPost'>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post4} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Daily Task</div>
                                        <h3 className='TextOfMasterArt'>Create Your Ideal Day: The Power of Effective Scheduling</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post5} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Technology</div>
                                        <h3 className='TextOfMasterArt'>Time Blocking: A Proven Method for Productivity and Focus</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post6} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Daily Task</div>
                                        <h3 className='TextOfMasterArt'>Calendar Mastery: Tips for Organizing Your Schedule Like a Pro</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row RowOfBlogPost'>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post7} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Technology</div>
                                        <h3 className='TextOfMasterArt'>Lead the Way: Effective Time Management Strategies for Teams</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post8} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Technology</div>
                                        <h3 className='TextOfMasterArt'>Delegate with Confidence: How to Empower Your Team Members</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card ColumnOfBloggPost">
                                    <img src={Post9} className='ImageOfBloggPost' />
                                    <div className="card-body BlogOfCard">
                                        <div className='TextOfTimeManagement'>Technology</div>
                                        <h3 className='TextOfMasterArt'>Streamline Your Workflow: Tools and Techniques for Efficient Team Collaboration</h3>
                                        <div className='MainDivOfBlogImage'>
                                            <img src={BlogImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='SecondMainDivOfAdvertisement'>
                        <div className='MainDivOfAdvertisement'>
                            <h6 className='TextOfAdvertisement'>Advertisement</h6>
                            <h5 className='TextOfYouCanPlaceAds'>You can place ads</h5>
                            <h6 className='TextOfNumber'>750x100</h6>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Blog

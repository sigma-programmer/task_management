// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import SettingImage from '../../../Component/Images/ProfileImage.png';

const Profile = ({handleChange,userData,handleSubmit}) => {

    return (
        <div className='MainSectionDivOfSetting'>
            <div className='row RowOfSettingProfiles'>
                <div className='col'>
                    <div className='MainDivOfSettingImage'>
                        <div className='DivOfSettingImage'>
                            <img src={SettingImage} alt="Profile" />
                        </div>
                        <div className='SecondDivOfProfileSettingName'>
                            <h4 className='SttingName'>{userData.name || 'User Name'}</h4>
                            <p className='EmailOfSetting'>{userData.email}</p>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='SecondMainDivOfSettingButton'>
                        <button className='ButtonOfProfileSettingSave' onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='row RowOfSettingProfiles'>
                        <div className='col'>
                            <label htmlFor="name" className="form-label SettingOfFormName">Name</label>
                            <input type="text" name="name" className="form-control SettingOfInPutFormControl" id="name" value={userData.name} onChange={handleChange} placeholder="Your First Name" />
                        </div>
                        <div className='col'>
                            <label htmlFor="nickName" className="form-label SettingOfFormName">Nick Name</label>
                            <input type="text" name="nickName" className="form-control SettingOfInPutFormControl" id="nickName" value={userData.nickName} onChange={handleChange} placeholder="Your Nick Name" />
                        </div>
                    </div>

                    <div className='row RowOfSettingProfiles'>
                        <div className='col'>
                            <label htmlFor="gender" className="form-label SettingOfFormName">Gender</label>
                            <select name="gender" className="form-select SettingOfInPutFormControl" id="gender" value={userData.gender} onChange={handleChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='col'>
                            <label htmlFor="country" className="form-label SettingOfFormName">Country</label>
                            <select name="country" className="form-select SettingOfInPutFormControl" id="country" value={userData.country} onChange={handleChange}>
                                <option value="">Select Country</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                {/* Add more countries as needed */}
                            </select>
                        </div>
                    </div>

                    <div className='row RowOfSettingProfiles'>
                        <div className='col'>
                            <label htmlFor="language" className="form-label SettingOfFormName">Language</label>
                            <select name="language" className="form-select SettingOfInPutFormControl" id="language" value={userData.language} onChange={handleChange}>
                                <option value="">Choose Language</option>
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Spanish">Spanish</option>
                                {/* Add more languages as needed */}
                            </select>
                        </div>
                        <div className='col'>
                            <label htmlFor="phoneNumber" className="form-label SettingOfFormName">Phone Number</label>
                            <input type="text" name="phoneNumber" className="form-control SettingOfInPutFormControl" id="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Enter Your Phone Number" />
                        </div>
                    </div>

                    <div className='row RowOfSettingProfiles'>
                        <h3 className='TextOfMyemailAddress'>My email Address</h3>
                        <div className="col-12">
                            <div className="form-check SEttingForCheck">
                                <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                                <label className="form-check-label" htmlFor="inlineFormCheck">
                                    <h4 className='TextOfEEmail'>{userData.email}</h4>
                                    <h6 className='TextOf1MonthAgo'>1 month ago</h6>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* <div className='TextOfChangeEmailAddress'>Change Email Address</div> */}
                </form>
            </div>
        </div>
    );
};

export default Profile;



// import React from 'react'
// import './Profile.css'
// import SettingImage from '../../../Component/Images/ProfileImage.png'

// const Profile = () => {
//     return (
//         <div className='MainSectionDivOfSetting'>
//             <div className='row RowOfSettingProfiles'>
//                 <div className='col'>
//                     <div className='MainDivOfSettingImage'>
//                         <div className='DivOfSettingImage'>
//                             <img src={SettingImage} />
//                         </div>
//                         <div className='SecondDivOfProfileSettingName'>
//                             <h4 className='SttingName'>Archita Tiwari</h4>
//                             <p className='EmailOfSetting'>aled2134@gmail.com</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='col'>
//                     <div className='SecondMainDivOfSettingButton'>
//                         <button className='ButtonOfProfileSettingSave'>Save</button>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <form>
//                     <div className='row RowOfSettingProfiles'>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Name</label>
//                             <input type="text" className="form-control SettingOfInPutFormControl" id="exampleFormControlInput1" placeholder="Your First Name" />
//                         </div>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Nick Name</label>
//                             <input type="text" className="form-control SettingOfInPutFormControl" id="exampleFormControlInput1" placeholder="Your Nick Name" />
//                         </div>
//                     </div>


//                     <div className='row RowOfSettingProfiles'>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Gender</label>
//                             <select className="form-select SettingOfInPutFormControl" aria-label="Default select example">
//                                 <option selected>Gender</option>
//                                 <option value="1">One</option>
//                                 <option value="2">Two</option>
//                                 <option value="3">Three</option>
//                             </select>
//                         </div>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Country</label>
//                             <select className="form-select SettingOfInPutFormControl" aria-label="Default select example">
//                                 <option selected>Country</option>
//                                 <option value="1">One</option>
//                                 <option value="2">Two</option>
//                                 <option value="3">Three</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className='row RowOfSettingProfiles'>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Language</label>
//                             <select className="form-select SettingOfInPutFormControl" aria-label="Default select example">
//                                 <option selected>Choose Language</option>
//                                 <option value="1">One</option>
//                                 <option value="2">Two</option>
//                                 <option value="3">Three</option>
//                             </select>
//                         </div>
//                         <div className='col'>
//                             <label for="exampleFormControlInput1" className="form-label SettingOfFormName">Phone Number</label>
//                             <div class="input-group">
//                                 <div className="input-group-text InputSettingOfMobileNumber SettingOfInPutFormControl ">
//                                     <select className="form-select SettingOfInPutFormControl" id="specificSizeSelect">
//                                         <option selected>+ 91</option>
//                                         <option value="1">One</option>
//                                         <option value="2">Two</option>
//                                         <option value="3">Three</option>
//                                     </select>
//                                 </div>
//                                 <input type="number" className="form-control SettingOfInPutFormControl" id="specificSizeInputGroupUsername" placeholder="Enter Your Phone Number" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='row RowOfSettingProfiles'>
//                     <h3 className='TextOfMyemailAddress'>My email Address</h3>
//                         <div class="col-12">
//                             <div class="form-check SEttingForCheck">
//                                 <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
//                                 <label class="form-check-label" for="inlineFormCheck">
//                                 <h4 className='TextOfEEmail'>aled2134@gmail.com</h4>
//                                 <h6 className='TextOf1MonthAgo'>1 month ago</h6>
//                                 </label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='TextOfChangeEmailAddress'>Change Email Address</div>

//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Profile

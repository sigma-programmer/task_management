import React, { useState, useEffect } from 'react';
import PreviewPhoto from '../../../../Component/Images/SPerson.png';
import './MasterData.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon

const MasterData = ({UserId ,previewPhoto,handleImageUpload,companyAddress,setCompanyAddress,appPassword,setAppPassword ,email,setEmail,handleUpdate,companyGST,setCompanyGST,handleRemoveImage,    meetingLink,
    setMeetingLink
}) => {
   
    return (
        <div>
            <div className='DivOfPreviewPhoto'>
                {/* <img src={previewPhoto} className='ImageOfPreviewPhoto' alt="Preview" />
                <button className="remove-image-btn" onClick={handleRemoveImage}>
                            <AiOutlineClose />
                        </button> */}
                        {previewPhoto && (
                    <div className="image-container">
                        <img src={previewPhoto} className="ImageOfPreviewPhoto" alt="Preview" />
                        <button className="remove-image-btn" onClick={handleRemoveImage}>
                            <AiOutlineClose />
                        </button>
                    </div>
                )}
            </div>
            <div>
                <input
                    type="file"
                    accept="image/*"
                    id="fileUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <button
                    className='SettingOfInPutFormControlMasterData'
                    onClick={() => document.getElementById('fileUpload').click()}
                >
                    <FaCloudUploadAlt /> Upload Company Logo
                </button>
            </div>
            <div className='row RowOfSettingProfiles'>
                <div className='col'>
                    <label htmlFor="companyGST" className="form-label SettingOfFormName">Company GST</label>
                    <input
                        type="text"
                        name="companyGST"
                        className="form-control SettingOfInPutFormControl"
                        id="companyGST"
                        placeholder="Company GST"
                        value={companyGST}
                        onChange={(e) => setCompanyGST(e.target.value)}
                    />
                </div>
                <div className='col'>
                    <label htmlFor="companyAddress" className="form-label SettingOfFormName">Company Address</label>
                    <input
                        type="text"
                        name="companyAddress"
                        className="form-control SettingOfInPutFormControl"
                        id="companyAddress"
                        placeholder="Company Address"
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                </div>
            </div>
            <div className='row RowOfSettingProfiles'>
              
                <div className='col'>
                    <label htmlFor="email" className="form-label SettingOfFormName">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control SettingOfInPutFormControl"
                        id="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='col'>
                    <label htmlFor="appPassword" className="form-label SettingOfFormName">App Password</label>
                    <input
                        type="password"
                        name="appPassword"
                        className="form-control SettingOfInPutFormControl"
                        id="appPassword"
                        placeholder="App Password"
                        value={appPassword}
                        onChange={(e) => setAppPassword(e.target.value)}
                    />
                </div>
            </div>


            <div className='row RowOfSettingProfiles'>
                <div className='col'>
                    <label htmlFor="meetingLink" className="form-label SettingOfFormName">Meeting Link</label>
                    <input
                        type="url"
                        name="meetingLink"
                        className="form-control SettingOfInPutFormControl"
                        id="meetingLink"
                        placeholder="Meeting Link"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                    />
                </div>
            </div>

            <button className="btn btn-primary mt-3" onClick={handleUpdate}>
                Update
            </button>
        </div>
    );
};

export default MasterData;

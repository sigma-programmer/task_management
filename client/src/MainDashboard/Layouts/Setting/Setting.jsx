import React from 'react';
import './Setting.css'; // Import your CSS file for styling
import MasterData from './MasterData/MasterData';

const Setting = ({UserId ,previewPhoto,handleImageUpload,companyAddress,setCompanyAddress,appPassword,setAppPassword ,email,setEmail,handleUpdate,companyGST,setCompanyGST,handleRemoveImage ,    meetingLink,
    setMeetingLink}) => {
    return (
        <>
            <div>
                <MasterData UserId={UserId} previewPhoto={previewPhoto} handleImageUpload={handleImageUpload} companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} appPassword={appPassword} setAppPassword={setAppPassword} email={email} setEmail={setEmail} handleUpdate={handleUpdate} companyGST={companyGST} setCompanyGST={setCompanyGST} handleRemoveImage={handleRemoveImage} meetingLink={meetingLink} setMeetingLink={setMeetingLink} />
            </div>
        </>
    );
};

export default Setting;

import React from 'react';
import './Overview.css';
import GrowthCards1 from './GrowthCards1';
import { HiOutlineChevronDown } from 'react-icons/hi'; // Down arrow icon
import SecondRowGraph2 from './SecondRowGraph2';
import Third3rdRowGraph from './Third3rdRowGraph';
import Fourth4ThRowGrapg from './Fourth4ThRowGrapg';

const Overview = ({cardData}) => {
    return (
        <section className="OverviewContainer">

            {/* Header section with Overview on the left and Today on the right */}
            <div className="Header">
                <div className="HeaderLeft">
                    Overview
                </div>
                <div className="HeaderRight">
                    Today
                    <HiOutlineChevronDown className="ArrowIcon" />
                </div>
            </div>
            
            {/*-----------------------------4 cards for progress--------------------- */}

          
            <GrowthCards1 cardData={cardData}/>

            {/*-----------------------------Two boxes below------------------------- */}
          <SecondRowGraph2/>


          {/* ----------------------3rd row boxes-------------- */}

      
          <Third3rdRowGraph/>
{/* ----------------4th row box------------- */}

<Fourth4ThRowGrapg/>


        </section>
    );
};

export default Overview;

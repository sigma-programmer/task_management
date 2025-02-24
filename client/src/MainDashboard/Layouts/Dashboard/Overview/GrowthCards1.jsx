


import React, { useEffect, useState } from 'react';
import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import axios from 'axios'; // Make sure to install axios
import "./GrowthCards1.css";

const GrowthCards1 = ({cardData}) => {
  
  return (
    <>
      {cardData.map(card => (
        <div
          key={card.id}
          className={`Card Card${card.id}`}
          style={{ backgroundColor: card.bgColor }} // Set background color
        >
          <div className="CardContent">
            <div className="Row1" style={{ color: card.textColor }}>
              {card.title}
            </div>
            <div className="Row2">
              <span className='TotalCount' style={{ color: card.textColor }}>
                {card.count}
              </span>
              <span className="Growth" style={{ color: card.textColor }}>
                {card.growth} {card.count >= 0 ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GrowthCards1;





// import React from 'react'
// import { HiArrowTrendingUp } from "react-icons/hi2";
// import { HiArrowTrendingDown } from "react-icons/hi2";
// import "./GrowthCards1.css"






// const cardData = [
//     {
//         id: 1,
//         title: "Total Task Scheduled",
//         count: 3,  // Use a number instead of string
//         growth: "+11.00%",
//         bgColor: "#2185F7", // Card 1 background color
//         textColor: "white" // Card 1 text color
//     },
//     {
//         id: 2,
//         title: "Total Task Completed ",
//         count: 1, // Use a number instead of string
//         growth: "-15.00%",
//         bgColor: "#9BCAFF", // Card 2 background color
//         textColor: "black" // Card 2 text color
//     },
//     {
//         id: 3,
//         title: "Total Task Not Completed On Time",
//         count: 5, // Use a number instead of string
//         growth: "+15.00%",
//         bgColor: "#2185F7", // Card 3 background color
//         textColor: "white" // Card 3 text color
//     },
//     {
//         id: 4,
//         title: "Total Numbers Of Meetings",
//         count: 7, // Use a number instead of string
//         growth: "+8.00%",
//         bgColor: "#9BCAFF", // Card 4 background color
//         textColor: "black" // Card 4 text color
//     }
// ];


// const GrowthCards1 = () => {
//     return (
//         <>

// {cardData.map(card => (
//                 <div
//                     key={card.id}
//                     className={`Card Card${card.id}`}
//                     style={{ backgroundColor: card.bgColor }} // Set background color
//                 >
//                     <div className="CardContent">
//                         <div className="Row1" style={{ color: card.textColor }}>{card.title}</div>
//                         <div className="Row2">
//                             <span className='TotalCount' style={{ color: card.textColor }}>
//                                 {card.count}
//                             </span>
//                             <span className="Growth" style={{ color: card.textColor }}>
//                                 {card.growth} {card.count >= 0 ? <HiArrowTrendingUp /> : <HiArrowTrendingDown />}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
            
//         </>
//     )
// }

// export default GrowthCards1

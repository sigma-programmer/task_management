import React from 'react'
import "./Third3rdRowGraph.css"
import MyChart from '../../../Charts/MyChart'
import StackedBarChart from '../../../Charts/StackedBarChart'
import image121 from "../../../../Component/Images/Block (2).png"
import image12331 from "../../../../Component/Images/Block (3).png"
const Third3rdRowGraph = () => {
    return (
        <>
          <div className="AdditionalBoxesContainer3rdRow com-sm-12">
                {/* Third box */}
                <div className="Box3rdRow Box33rdRow col-sm-6">
                {/* <p className='TextOfProjectWebsite'>Project by Website</p> */}
                {/* <StackedBarChart/> */}

                <img src={image121} style={{width:"100%"}} alt="Description of the image" />
      
                </div>

                {/* Fourth box */}
                <div className="Box3rdRow Box43rdRow col-sm-6">
                {/* <p className='TextOfProjectWebsite'>Project by Website</p> */}
                {/* <MyChart/> */}

                <img src={image12331} style={{width:"100%"}} alt="Description of the image" />
      
                </div>
            </div>
            
        </>
    )
}

export default Third3rdRowGraph

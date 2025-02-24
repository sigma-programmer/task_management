import React from 'react'
import "./SecondRowGraph2.css"
import TemperatureChart from '../../../Charts/LineChart'
import Image11 from "../../../../Component/Images/Block.png"
const SecondRowGraph2 = () => {
  return (
    <>
      <div className="BoxesContainer">
        {/* First box with specific width and height */}
        <div className="Box Box1">
         {/* <TemperatureChart/> */}



         <img src={Image11} style={{width:"100%"}} alt="Description of the image" />
      
        </div>

        {/* Second box with specific width and height */}
        <div className="Box Box2">
          <p className='TextOfProjectWebsite'>Project by Website</p>

<div style={{display: "flex", flexDirection: "column", gap: "7px"}}>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>Client 1</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>Client 2</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>Client 3</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>Client 4</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>Instagram</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>

          <div className='DivOfTextOfClienttt'>
            <p className='TextOfClienttt'>LinkedIn</p> <span className='SpanOfTextOfClienttt'>-- - -</span>
          </div>
</div>
        </div>
      </div>

    </>
  )
}

export default SecondRowGraph2

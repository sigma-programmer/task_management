import React from 'react'
import { FaWhatsapp, FaTelegramPlane, FaDiscord } from 'react-icons/fa'; // Import icons
function CommunityPlatformsLinks() {
  return (
    <>
           <div className="community-icons">
  <a href="https://chat.whatsapp.com/CrLImdb7BpF2qb3XbaekY7" target="_blank" rel="noopener noreferrer">
    <FaWhatsapp size="2em" className="icon whatsapp" />
  </a>
  <a href="https://t.me/+2Nd-OP-sBkFiMzM9" target="_blank" rel="noopener noreferrer">
    <FaTelegramPlane size="2em" className="icon telegram" />
  </a>
  <a href="https://discord.com/invite/EqxjQrgWzb" target="_blank" rel="noopener noreferrer">
    <FaDiscord size="2em" className="icon discord" />
  </a>
</div>
      
    </>
  )
}

export default CommunityPlatformsLinks

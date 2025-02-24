import React, { useState, useEffect, useRef } from "react";
import GoogleCalendarIcon from "../../../Component/Images/googlecalender.png";
import "./Chat.css";

const ChatInterface = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChannelListOpen, setIsChannelListOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 992) {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Avatar data
  const topAvatars = [
    { id: 1, img: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, img: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 3, img: "https://randomuser.me/api/portraits/men/3.jpg" },
  ];

  // Messages data
  const [messages] = useState([
    {
      id: 1,
      author: "Kenny Park",
      time: "11:55",
      content: (
        <>
          Really need to give some kudos to{" "}
          <a href="#" className="ChatLink">
            @Emily
          </a>{" "}
          for helping out with the new influx of tweets yesterday.
          <br />
          Team was really really excited about yesterday's announcements!
        </>
      ),
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      author: "Paul Leung",
      time: "11:56",
      content: "No! It was my pleasure! Great to see the enthusiasm out there.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 3,
      author: (
        <>
          Google Calendar <span className="AppBadge">App</span>
        </>
      ),
      time: "12:45",
      content: (
        <>
          Event starting in 15 minutes:
          <div className="EventContainer">
            <div className="EventIndicator"></div>
            <div className="EventContent">
              <div className="EventTitle">
                Team Status Meeting
                <i className="bx bx-pencil EventEditIcon"></i>
              </div>
              <div className="EventTime">Today from 13:00 to 13:30</div>
            </div>
          </div>
        </>
      ),
      avatar: GoogleCalendarIcon,
    },
    {
      id: 4,
      author: "Emily Anderson",
      time: "12:59",
      content: (
        <>
          Meeting notes from our sync with{" "}
          <a href="#" className="ChatLink">
            @Lisa
          </a>
          <br />
          <span className="Post">
            Post<i class="bx bx-chevron-down"></i>
          </span>
          <div className="DocumentPreview">
            <i className="bx bx-file DocumentIcon"></i>
            <div className="DocumentInfo">
              <strong>1/9 meeting notes</strong>
              <span className="DocumentMeta">Last edited just now</span>
            </div>
          </div>
        </>
      ),
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleChannelList = () => {
    setIsChannelListOpen(!isChannelListOpen);
  };

  return (
  //  <div className="d-flex">
  //  <div className="bg-dark leftsidebar"></div>
    <div className="ChatApp1 w-100">
      {/* Backdrop for mobile */}
      {isSidebarOpen && windowWidth < 992 && (
        <div className="SidebarBackdrop11" onClick={toggleSidebar}></div>
      )}

      {/* Sidebar */}
      <div
        className={`ChatSidebar11 ${isSidebarOpen ? "SidebarOpen11" : "SidebarClosed11"}`}
      >
        <div className="SidebarHeader11">
          <span className="CompanyName11">Company Name</span>
          <button className="IconButton11">
            <i className="bx bx-edit"></i>
          </button>
        </div>

        <nav className="SidebarNav11">
          <ul className="NavList11">
            <li className="NavItem11">
              <i className="bx bx-chat NavIcon11"></i>
              <span>All DMs</span>
            </li>
            <li className="NavItem11">
              <i className="bx bx-file-blank NavIcon11"></i>
              <span>Drafts</span>
            </li>
            <li className="NavItem11">
              <i className="bx bx-at NavIcon11"></i>
              <span>Mentions & reactions</span>
            </li>
            <li className="NavItem11">
              <i className="bx bx-bookmark NavIcon11"></i>
              <span>Saved items</span>
            </li>
            <li className="NavItem11">
              <i className="bx bx-dots-vertical-rounded me-2"></i>
              <span>More</span>
            </li>
          </ul>

          <div className="ChannelSection11">
            <div
              className="ChannelHeader11"
              onClick={toggleChannelList}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span>⭐ Company</span>
              <i
                className={`bx ${
                  isChannelListOpen ? "bx-chevron-down" : "bx-chevron-right"
                }`}
              ></i>
            </div>
            {isChannelListOpen && (
              <ul className="ChannelList11">
                <li id="darkitem" className="ChannelItem11">
                  # design-team
                </li>
                <li id="darkitem" className="ChannelItem11 ActiveChannel11">
                  # Social-Media
                </li>
                <li id="darkitem" className="ChannelItem11">
                  # SEO
                </li>
                <li className="ChannelItem11"># announcements</li>
                <li className="ChannelItem11"># pr</li>
                <li className="ChannelItem11 AddChannel11">+ add channel</li>
              </ul>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="MainContent11">
        {/* Header */}
        <header className="ChatHeader">
          <div className="HeaderLeft">
            <button className="MenuButton" onClick={toggleSidebar}>
              <i className="bx bx-menu"></i>
            </button>
            <h1 className="ChannelTitle">
              #social-media
              <span className="ChannelDescription">
                <i className="bx bx-chevron-down"></i>
                Track and coordinate social media
              </span>
            </h1>
          </div>

          <div className="HeaderRight">
            <div className="AvatarGroup">
              {topAvatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className="AvatarWrapper"
                  style={{
                    marginLeft: index > 0 ? "-8px" : "0",
                    zIndex: topAvatars.length - index,
                  }}
                >
                  <img
                    src={avatar.img}
                    alt={`User ${avatar.id}`}
                    className="AvatarImage"
                  />
                </div>
              ))}
            </div>
            <span className="MemberCount">74</span>
          </div>
        </header>

        {/* Messages */}

        <div className="MessageContainer">
          {messages.map((message) => (
            <div key={message.id} className="MessageWrapper">
              <img
                src={message.avatar}
                alt={message.author}
                className="MessageAvatar"
              />
              <div className="MessageContent">
                <div className="MessageHeader">
                  <span className="AuthorName">{message.author}</span>
                  <span className="MessageTime">{message.time}</span>
                </div>
                <div className="MessageBody">{message.content}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="InputArea">
          <div className="InputWrapper">
            <input
              type="text"
              className="MessageInput"
              placeholder="Message #social-media"
            />
            <div className="ToolbarWrapper">
              <div className="ToolbarLeft">
                {[
                  "battery",
                  "bold",
                  "italic",
                  "dollar",
                  "code",
                  "paperclip",
                  "dots-horizontal-rounded",
                ].map((icon, index) => (
                  <button key={index} className="ToolbarButton">
                    <i className={`bx bx-${icon}`}></i>
                  </button>
                ))}
              </div>
              <div className="ToolbarRight">
                {["text", "at", "smile", "paperclip"].map((icon, index) => (
                  <button key={index} className="ToolbarButton">
                    <i className={`bx bx-${icon}`}></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // </div>
  );
};

export default ChatInterface;

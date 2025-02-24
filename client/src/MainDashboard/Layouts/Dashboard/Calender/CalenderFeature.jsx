import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { Spin } from 'antd';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { FaPlus, FaTimes ,FaTrash } from "react-icons/fa";
import './CalendarComponent.css';
// import EventList from './EventList';
import AllEventTable from './AllEventTable';
// Configure moment for localization
const localizer = momentLocalizer(moment);

const CalendarComponent = ({meetingLink,setMeetingLink}) => {
  const [events, setEvents] = useState([]);
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  // const [meetingLink, setMeetingLink] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [view, setView] = useState('calendar'); // State to manage view


  const [showPopupCreateEvent, setShowPopupCreateEvent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch events from server on component mount
  useEffect(() => {
    const UserId = localStorage.getItem('IntaskrUser');

    axios
      .get(`${process.env.REACT_APP_API}/api/events/${UserId}`)
      .then((response) => {
        setEvents(
          response.data.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        );
      })
      .catch((error) => {
        console.error('Failed to load events:', error);
        // toast.error('Failed to load events.');
      });
  }, []);

  // Adding notification logic
  useEffect(() => {
    const now = new Date();
    events.forEach((event) => {
      if (new Date(event.start) > now && new Date(event.start) - now < 5000) {
        toast.info(`Reminder: ${event.title} is about to start!`);
      }
    });
  }, [events]);

  const addEvent = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation


    const UserId = localStorage.getItem('IntaskrUser');

    const title = e.target.title.value;
    const start = e.target.start.value;
    // const end = e.target.end.value;
    const end = e.target.start.value;
    const newEvent = {
      UserId,
      title,
      start: new Date(start),
      end: new Date(end),
      // end: new Date(start),
      link: meetingLink,
      emails,
    };

    axios
      .post(`${process.env.REACT_APP_API}/api/events`, newEvent)
      .then((response) => {
        toast.success('Event added and email sent successfully!');
        setEvents([...events, newEvent]);

        setEmails([]);
    setMeetingLink("");
    setShowPopupCreateEvent(false);
      })
      .catch((error) => {
        toast.error('Failed to add event.');
      }) .finally(() => {
        setLoading(false); // Stop loading animation
      });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const addEmail = (e) => {
    e.preventDefault(); // Prevent form submission when adding email
    if (email) {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const deleteEmail = (emailToDelete) => {
    setEmails(emails.filter((email) => email !== emailToDelete));
  };

  const deleteEvent = (eventToDelete) => {
    const UserId = localStorage.getItem('IntaskrUser'); // Fetch UserId from local storage
    
    axios
      .delete(`${process.env.REACT_APP_API}/api/events/${eventToDelete._id}`, {
        data: { UserId } // Send UserId in the request body
      })
      .then(() => {
        setEvents(events.filter((event) => event._id !== eventToDelete._id));
        toast.success('Event deleted successfully!');
      })
      .catch(() => {
        toast.error('Failed to delete event.');
      });
  };
  
  const openEditPopup = (event) => {
    setEditingEvent(event);
    setEmails(event.emails);
    setMeetingLink(event.link);
    setShowPopup(true);
  };


  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };



  const saveEdit = (e) => {
    e.preventDefault();
    const UserId = localStorage.getItem('IntaskrUser');
    const updatedEvent = {
      ...editingEvent,
      UserId,
      emails,
      link: meetingLink,
    };

    axios
      .put(`${process.env.REACT_APP_API}/api/events/${editingEvent._id}`, updatedEvent)
      .then((response) => {
        setEvents(
          events.map((event) =>
            event._id === editingEvent._id ? updatedEvent : event
          )
        );
        setShowPopup(false);
        setEmail('');
        toast.success('Event updated successfully!');
      })
      .catch((error) => {
        toast.error('Failed to update event.');
      });
  };
  const handleCloseButton = () => {
    setShowPopupCreateEvent(false);
    setEmail('');
    setShowPopup(false);
};
  const handleCloseAnotherButton = () => {
    setShowPopupCreateEvent(false);
    setEmail('');
    setShowPopup(false);
};

const handleOpenTheCreateEventPopup=()=>{

  setEmails([])
  setShowPopupCreateEvent(true)
  }

  return (
    <main>
      {/* View Toggle Buttons */}
      {/* <div style={{ marginBottom: '20px', display: "flex", gap: "15px" }}>
        <button onClick={() => setView('calendar')}  className='ButtonOfevent-form'>Show Calendar</button>
        <button onClick={() => setView('list')}  className='ButtonOfevent-form'>Show Event List</button>
      </div> */}

      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
      <button
        onClick={() => setView('calendar')}
        className={`ButtonOfevent-form ${view === 'calendar' ? 'activeButton' : ''}`}
      >
        Set Event
      </button>
      <button
        onClick={() => setView('list')}
        className={`ButtonOfevent-form ${view === 'list' ? 'activeButton' : ''}`}
      >
        Event List
      </button>
    </div>

        {/* Conditional Rendering */}
        {view === 'calendar' ? (
          <>
      <Card className="p-4 p-xl-5 my-3 my-xl-4">
    

          {/* const [showPopupCreateEvent, setShowPopupCreateEvent] = useState(false); */}

     {/* + Icon for adding an event */}

    <div
        className="AddEventIcon"
        onClick={() => handleOpenTheCreateEventPopup()}
        title="Create Your Event"
      >
        <FaPlus />
      </div>

  {showPopupCreateEvent && (
        <div className="PopupOverlayNew">
          <div className="PopupCreateYourEvent">
            <button
              type="button"
              className="CloseBtnCreateYourEvent"
              onClick={() => handleCloseButton()}
            >

            
              <FaTimes />
            </button>
            <form onSubmit={addEvent} className="EventForm">
              <div className="MainDivOfEventTitle">
                <div className="">

                {loading ? (
                  <div className='LoadingContainer'>
                            <Spin size="large" />
                        </div>
          ) : (
            <>
               <button type="submit" className="BtnOfAddEventttt">
                    <FaPlus /> Add Event
                  </button>
            </>
          )}
                  {/* <button type="submit" className="BtnOfAddEventttt">
                    <FaPlus /> Add Event
                  </button> */}
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Event Title"
                  required
                  className="InputOfEventTitle"
                />
                <input
                  type="datetime-local"
                  name="start"
                  required
                  className="InputOfEventTitle"
                />
                {/* <input
                  type="datetime-local"
                  name="end"
                  required
                  className="InputOfEventTitle"
                /> */}
                <input
                  type="text"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Meeting Link"
                  className="InputOfEventTitle"
                />
              </div>
              <div>
                <div className="MainDivOfEventTitle">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Add Email"
                    className="InputOfEmailHandle"
                  />
                  <button
                    type="button"
                    onClick={addEmail}
                    className="ButtonOfAddEmailll"
                  >
                        <FaPlus />
                                   </button>
                </div>
                <div className="EmailItemList">
                  {emails.map((email, index) => (
                    <div key={index} className="EmailItem">
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => deleteEmail(email)}
                        className="ButtonOfAddEmail"
                      >
                           <FaTrash  />

    
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="CalendarWrapper">
  <div className="CalendarContainer">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      className="ResponsiveCalendar"
    />
  </div>
</div>



        
</Card>
          </>
        ) : (
          <>

          <AllEventTable
        events={events}
        openEditPopup={openEditPopup}
        deleteEvent={deleteEvent}
      />
          {/* <EventList
        events={events}
        openEditPopup={openEditPopup}
        deleteEvent={deleteEvent}
      /> */}
          </>
        )}
   

   {/* Edit Popup */}
{showPopup && (
  <div className="EditPopup">
    <h3 className="PopupEditEventTitle">Edit Event</h3>

    <form onSubmit={saveEdit} className="EventForm">
    <div type="button" onClick={() => handleCloseAnotherButton()} className='DivOfCrossAddEvent'>
    <FaTimes className='IconOfCrossAddEvent' />
      </div>
      <input
        type="text"
        name="title"
        value={editingEvent.title}
        onChange={handlePopupChange}
        placeholder="Event Title"
        className="EventInput"
        required
      />
      <input
        type="datetime-local"
        name="start"
        value={moment(editingEvent.start).format('YYYY-MM-DDTHH:mm')}
        onChange={handlePopupChange}
        className="EventInput InputOfCalenderFeature"
        required
      />
      {/* <input
        type="datetime-local"
        name="end"
        value={moment(editingEvent.end).format('YYYY-MM-DDTHH:mm')}
        onChange={handlePopupChange}
        className="EventInput InputOfCalenderFeature"
        required
      /> */}
      <input
        type="text"
        value={meetingLink}
        onChange={(e) => setMeetingLink(e.target.value)}
        placeholder="Meeting Link"
        className="EventInput"
      />

      <div className="EmailSection">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Add Email"
          className="EventInput"
        />
        <span type="button" onClick={addEmail} className="AddButton">
        <FaPlus />
        </span>
        <div className="EmailsList">
          {emails.map((email, index) => (
            <div key={index} className="EmailItem">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => deleteEmail(email)}
                className="RemoveButton"
              >
                 <FaTrash  />

    
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="SaveButton" type="submit">
        Update
      </button>
 
    </form>
  </div>
)}

      <ToastContainer />
    </main>
  );
};

export default CalendarComponent;



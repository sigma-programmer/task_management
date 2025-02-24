



import React, { useState } from 'react';
import moment from 'moment';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdEmail } from 'react-icons/md'; // Import the email icon
import { SlCalender } from "react-icons/sl";
import "../Invoice/Table.css"
import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";



const AllEventTable = ({ events, openEditPopup, deleteEvent }) => {
  const [activeMenu, setActiveMenu] = useState(null); // State to track active dropdown menu
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageNumbersToShow = 4; // Maximum number of pages to show at once in pagination

  const handleDotsClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index); // Toggle active menu on click
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let startPage, endPage;

    if (totalPages <= maxPageNumbersToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(maxPageNumbersToShow / 2)) {
        startPage = 1;
        endPage = maxPageNumbersToShow;
      } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
        startPage = totalPages - (maxPageNumbersToShow - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
        endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="table-container">

{events.length === 0 ? (
        <p>No Data Found</p>
      ) : (
<>

      <table className="responsive-table">


   
        <thead>
          <tr>
            <th></th>
            <th> SL No. <MdOutlineArrowDropDown /></th>
            <th>Title <MdOutlineArrowDropDown /></th>
            {/* <th>Invoice Id <MdOutlineArrowDropDown /></th>
            <th>Name <MdOutlineArrowDropDown /></th> */}
            <th>Date <MdOutlineArrowDropDown /></th>
            <th>Time <MdOutlineArrowDropDown /></th>
            {/* <th>End <MdOutlineArrowDropDown /></th> */}
            <th>Emails <MdOutlineArrowDropDown /></th>
            {/* <th><FaTrashAlt /></th> */}
            <th></th>
          </tr>
        </thead>
      
        <tbody>
        {currentItems.map((event, index) => (
            <tr key={index} id='TableRowData11' className={`MainDivOfTRInvoice ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
              <td></td>
              {/* <td><input type="checkbox" /></td> */}
              <td>{indexOfFirstItem + index + 1}.</td>
              <td>{event.title}</td>
              {/* <td>{moment(event.start).format('YYYY-MM-DD HH:mm')}</td> */}
              <td>{moment(event.start).format('MMMM DD YYYY')}</td>
              <td>{moment(event.start).format('HH:mm')}</td>

              {/* <td>{moment(event.end).format('YYYY-MM-DD HH:mm')}</td> */}
              <td>{(event.emails || []).join(', ')}</td>


              <td className='TableOfStar-Iconn'>
                {/* <FaStar className="star-icon" /> */}
                <div className="MainDivOfdots-container" onClick={() => handleDotsClick(index)}>
                  <BsThreeDots />
                  {activeMenu === index && (
                    <div className="dropdown-menuNeww">
                      <button onClick={() => openEditPopup(event)} ><BiEditAlt className='IconOfEditInvoice'   /> Edit</button>
                      <button onClick={() => deleteEvent(event)}><MdDelete className='IconOfEditInvoice'  /> Delete</button>
                      {/* <button><FaEye className='IconOfEditInvoice' /> Preview</button> */}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className='MainDivOfPaginattionn'>
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>{'<'}</button>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>{'>'}</button>
        )}
      </div>
      </div>
</>

    )}
    </div>
  );
};

export default AllEventTable;






// --------------------------






// import React, { useState } from 'react';
// import moment from 'moment';
// import { FaStar, FaTrashAlt } from 'react-icons/fa';
// import { BsThreeDots } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";
// import { BiEditAlt } from "react-icons/bi";
// import { FaEye } from "react-icons/fa6";


// const data = [
//   { id: '#876364', name: 'Client 1', email: 'email1@gmail.com', date: '12 Dec, 2024', status: 'Complete' },
//   { id: '#876123', name: 'Client 2', email: 'email2@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
//   { id: '#876213', name: 'Client 3', email: 'email3@gmail.com', date: '09 Dec, 2024', status: 'Complete' },
//   { id: '#876987', name: 'Client 4', email: 'email4@gmail.com', date: '09 Dec, 2024', status: 'Cancel' },
//   { id: '#876345', name: 'Client 5', email: 'email5@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
//   { id: '#876235', name: 'Client 6', email: 'email6@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
//   { id: '#876246', name: 'Client 7', email: 'email7@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
//   { id: '#876345', name: 'Client 8', email: 'email8@gmail.com', date: '08 Dec, 2024', status: 'Complete' },
//   { id: '#876364', name: 'Client 9', email: 'email9@gmail.com', date: '02 Dec, 2024', status: 'Cancel' },
//   { id: '#876769', name: 'Client 10', email: 'email10@gmail.com', date: '01 Dec, 2024', status: 'Pending' },
// ];

// const AllEventTable = ({ events, openEditPopup, deleteEvent }) => {
//   const [activeMenu, setActiveMenu] = useState(null); // State to track active dropdown menu

//   const handleDotsClick = (index) => {
//     setActiveMenu(activeMenu === index ? null : index); // Toggle active menu on click
//   };

//   return (
//     <div className="table-container">


// {events.length === 0 ? (
//         <p>No Data Found</p>
//       ) : (

//       <table className="responsive-table">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Title</th>
//             <th>Start</th>
//             <th>End</th>
//             <th>Link</th>
//             {/* <th>Emails</th> */}
//             <th><FaTrashAlt /></th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((event, index) => (
//             <tr key={index} className='MainDivOfTRInvoice'>
//               <td><input type="checkbox" /></td>
//               <td>{event.title}</td>
//               <td>{moment(event.start).format('YYYY-MM-DD HH:mm')}</td>
//               <td>{moment(event.end).format('YYYY-MM-DD HH:mm')}</td>
//               <td>{event.link}</td>
//               {/* <td>
//                 <span className={`status ${item.status.toLowerCase()}`}>
//                   {(event.emails || []).join(', ')}
//                 </span>
//               </td> */}
//               <td className='TableOfStar-Iconn'>
//                 <FaStar className="star-icon" />
//                 <div className="dots-container" onClick={() => handleDotsClick(index)}>
//                   <BsThreeDots />
//                   {activeMenu === index && (
//                     <div className="dropdown-menuNew">
//                       <button><BiEditAlt className='IconOfEditInvoice' /> Edit</button>
//                       <button><MdDelete  className='IconOfEditInvoice' />  Delete</button>
//                       <button><FaEye  className='IconOfEditInvoice' /> Preview</button>
//                     </div>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//     </div>
//   );
// };

// export default AllEventTable;







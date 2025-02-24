

import React, { useState } from 'react';
import './Table.css';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { MdEmail } from 'react-icons/md'; // Import the email icon
import { SlCalender } from "react-icons/sl";

import { FaStar, FaTrashAlt } from 'react-icons/fa';
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";

const data = [
  { id: '#876364', name: 'Client 1', email: 'email1@gmail.com', date: '12 Dec, 2024', status: 'Complete' },
  { id: '#876123', name: 'Client 2', email: 'email2@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876213', name: 'Client 3', email: 'email3@gmail.com', date: '09 Dec, 2024', status: 'Complete' },
  { id: '#876987', name: 'Client 4', email: 'email4@gmail.com', date: '09 Dec, 2024', status: 'Cancel' },
  { id: '#876345', name: 'Client 5', email: 'email5@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876235', name: 'Client 6', email: 'email6@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876246', name: 'Client 7', email: 'email7@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876345', name: 'Client 8', email: 'email8@gmail.com', date: '08 Dec, 2024', status: 'Complete' },
  { id: '#876364', name: 'Client 9', email: 'email9@gmail.com', date: '02 Dec, 2024', status: 'Cancel' },
  { id: '#876769', name: 'Client 10', email: 'email10@gmail.com', date: '01 Dec, 2024', status: 'Pending' },
  { id: '#876779', name: 'Client 11', email: 'email11@gmail.com', date: '11 Dec, 2024', status: 'Complete' },
  { id: '#876889', name: 'Client 12', email: 'email12@gmail.com', date: '12 Dec, 2024', status: 'Pending' },
  { id: '#876999', name: 'Client 13', email: 'email13@gmail.com', date: '13 Dec, 2024', status: 'Cancel' },
  { id: '#877009', name: 'Client 14', email: 'email14@gmail.com', date: '14 Dec, 2024', status: 'Complete' },
  { id: '#877119', name: 'Client 15', email: 'email15@gmail.com', date: '15 Dec, 2024', status: 'Pending' },
  { id: '#877229', name: 'Client 16', email: 'email16@gmail.com', date: '16 Dec, 2024', status: 'Complete' },
  { id: '#877339', name: 'Client 17', email: 'email17@gmail.com', date: '17 Dec, 2024', status: 'Complete' },
  { id: '#877449', name: 'Client 18', email: 'email18@gmail.com', date: '18 Dec, 2024', status: 'Cancel' },
  { id: '#877559', name: 'Client 19', email: 'email19@gmail.com', date: '19 Dec, 2024', status: 'Pending' },
  { id: '#877669', name: 'Client 20', email: 'email20@gmail.com', date: '20 Dec, 2024', status: 'Complete' },



  { id: '#876364', name: 'Client 1', email: 'email1@gmail.com', date: '12 Dec, 2024', status: 'Complete' },
  { id: '#876123', name: 'Client 2', email: 'email2@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876213', name: 'Client 3', email: 'email3@gmail.com', date: '09 Dec, 2024', status: 'Complete' },
  { id: '#876987', name: 'Client 4', email: 'email4@gmail.com', date: '09 Dec, 2024', status: 'Cancel' },
  { id: '#876345', name: 'Client 5', email: 'email5@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876235', name: 'Client 6', email: 'email6@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876246', name: 'Client 7', email: 'email7@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876345', name: 'Client 8', email: 'email8@gmail.com', date: '08 Dec, 2024', status: 'Complete' },
  { id: '#876364', name: 'Client 9', email: 'email9@gmail.com', date: '02 Dec, 2024', status: 'Cancel' },
  { id: '#876769', name: 'Client 10', email: 'email10@gmail.com', date: '01 Dec, 2024', status: 'Pending' },
  { id: '#876779', name: 'Client 11', email: 'email11@gmail.com', date: '11 Dec, 2024', status: 'Complete' },
  { id: '#876889', name: 'Client 12', email: 'email12@gmail.com', date: '12 Dec, 2024', status: 'Pending' },
  { id: '#876999', name: 'Client 13', email: 'email13@gmail.com', date: '13 Dec, 2024', status: 'Cancel' },
  { id: '#877009', name: 'Client 14', email: 'email14@gmail.com', date: '14 Dec, 2024', status: 'Complete' },
  { id: '#877119', name: 'Client 15', email: 'email15@gmail.com', date: '15 Dec, 2024', status: 'Pending' },
  { id: '#877229', name: 'Client 16', email: 'email16@gmail.com', date: '16 Dec, 2024', status: 'Complete' },
  { id: '#877339', name: 'Client 17', email: 'email17@gmail.com', date: '17 Dec, 2024', status: 'Complete' },
  { id: '#877449', name: 'Client 18', email: 'email18@gmail.com', date: '18 Dec, 2024', status: 'Cancel' },
  { id: '#877559', name: 'Client 19', email: 'email19@gmail.com', date: '19 Dec, 2024', status: 'Pending' },
  { id: '#877669', name: 'Client 20', email: 'email20@gmail.com', date: '20 Dec, 2024', status: 'Complete' },


  { id: '#876364', name: 'Client 1', email: 'email1@gmail.com', date: '12 Dec, 2024', status: 'Complete' },
  { id: '#876123', name: 'Client 2', email: 'email2@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876213', name: 'Client 3', email: 'email3@gmail.com', date: '09 Dec, 2024', status: 'Complete' },
  { id: '#876987', name: 'Client 4', email: 'email4@gmail.com', date: '09 Dec, 2024', status: 'Cancel' },
  { id: '#876345', name: 'Client 5', email: 'email5@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876235', name: 'Client 6', email: 'email6@gmail.com', date: '10 Dec, 2024', status: 'Pending' },
  { id: '#876246', name: 'Client 7', email: 'email7@gmail.com', date: '10 Dec, 2024', status: 'Complete' },
  { id: '#876345', name: 'Client 8', email: 'email8@gmail.com', date: '08 Dec, 2024', status: 'Complete' },
  { id: '#876364', name: 'Client 9', email: 'email9@gmail.com', date: '02 Dec, 2024', status: 'Cancel' },
  { id: '#876769', name: 'Client 10', email: 'email10@gmail.com', date: '01 Dec, 2024', status: 'Pending' },
  { id: '#876779', name: 'Client 11', email: 'email11@gmail.com', date: '11 Dec, 2024', status: 'Complete' },
  { id: '#876889', name: 'Client 12', email: 'email12@gmail.com', date: '12 Dec, 2024', status: 'Pending' },
  { id: '#876999', name: 'Client 13', email: 'email13@gmail.com', date: '13 Dec, 2024', status: 'Cancel' },
  { id: '#877009', name: 'Client 14', email: 'email14@gmail.com', date: '14 Dec, 2024', status: 'Complete' },
  { id: '#877119', name: 'Client 15', email: 'email15@gmail.com', date: '15 Dec, 2024', status: 'Pending' },
  { id: '#877229', name: 'Client 16', email: 'email16@gmail.com', date: '16 Dec, 2024', status: 'Complete' },
  { id: '#877339', name: 'Client 17', email: 'email17@gmail.com', date: '17 Dec, 2024', status: 'Complete' },
  { id: '#877449', name: 'Client 18', email: 'email18@gmail.com', date: '18 Dec, 2024', status: 'Cancel' },
  { id: '#877559', name: 'Client 19', email: 'email19@gmail.com', date: '19 Dec, 2024', status: 'Pending' },
  { id: '#877669', name: 'Client 20', email: 'email20@gmail.com', date: '20 Dec, 2024', status: 'Complete' },

];

const FinalInvoice = () => {
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
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
  const getRandomColor = () => {
    const colors = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th></th>
            <th>Invoice Id <MdOutlineArrowDropDown /></th>
            <th>Name <MdOutlineArrowDropDown /></th>
            <th>Email <MdOutlineArrowDropDown /></th>
            <th>Date <MdOutlineArrowDropDown /></th>
            <th>Status <MdOutlineArrowDropDown /></th>
            {/* <th><FaTrashAlt /></th> */}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} id='TableRowData11' className={`MainDivOfTRInvoice ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
              <td></td>
              {/* <td><input type="checkbox" /></td> */}
              <td>{item.id}</td>
              {/* <td>{item.name}</td> */}
              <div className="name-with-avatar">
                  <span className="profile-avatar" style={{ backgroundColor: getRandomColor() }}>
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                  {item.name}
                </div>
              <td> 
              <span className="email-icon">
    <MdEmail /> {item.email}
  </span>
          
  </td>
              <td>    <span className="email-icon">
              <SlCalender />{item.date}
  </span></td>
              <td>
                {/* <span className={`status ${item.status.toLowerCase()}`}> */}
                <span className={`status ${item.status.toLowerCase()}`}>
    {item.status}
  </span>
              </td>
              <td className='TableOfStar-Iconn'>
                {/* <FaStar className="star-icon" /> */}
                <div className="MainDivOfdots-container" onClick={() => handleDotsClick(index)}>
                  <BsThreeDots />
                  {activeMenu === index && (
                    <div className="dropdown-menuNeww">
                      <button><BiEditAlt className='IconOfEditInvoice'  />{" "} Edit</button>
                      <button><MdDelete className='IconOfEditInvoice'  /> {" "} Delete</button>
                      <button><FaEye className='IconOfEditInvoice'  /> {" "} Preview</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
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
    </div>
  );
};

export default FinalInvoice;




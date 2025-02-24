


import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { MdOutlineArrowDropDown, MdEmail, MdDelete } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaEye } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { FaShareAlt } from "react-icons/fa";
import FromListPreview from './FromListPreview';

const InvoiceListAll = ({previewPhoto,companyAddress,companyGST}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageNumbersToShow = 4;
  const UserId = localStorage.getItem('IntaskrUser');
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  const [showSharePopup, setShowSharePopup] = useState(false);
  const [clickedItem, setClickedItem] = useState("");
    const [isCopied, setIsCopied] = useState(false); // State for copy status
    const [emailInput, setEmailInput] = useState('');
    const [shareEmails, setShareEmails] = useState([]);
    


    const handleEmailInput = (e) => {
      setEmailInput(e.target.value);
  };
  
  const addEmail = () => {
      const trimmedEmail = emailInput.trim();
      if (trimmedEmail && /^\S+@\S+\.\S+$/.test(trimmedEmail)) {
          setShareEmails((prevEmails) => [...prevEmails, trimmedEmail]);
          setEmailInput(''); // Clear the input after adding
      }
  };
  
// Inside your React component
const sendEmails = async () => {
  try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/send-bulk-emails`, {
          emails: shareEmails, // Ensure shareEmails is an array
          subject: "Invoice", // Ensure shareEmails is an array
          url: `${process.env.REACT_APP_URL_FRONTEND}/invoice/${clickedItem}` // Your URL logic
      });
      console.log('Emails sent:', response.data);
      setShareEmails([]); // Clear the list after sending
      setShowSharePopup(false); // Close the popup
  } catch (error) {
      console.error('Error sending emails:', error);
      // Optionally display an error message to the user
  }
};

  const removeEmail = (index) => {
      setShareEmails((prevEmails) => prevEmails.filter((_, i) => i !== index));
  };

  const handleCopy = () => {
      navigator.clipboard.writeText(`${process.env.REACT_APP_URL_FRONTEND}/invoice/${clickedItem}`);
      setIsCopied(true); // Set copied status to true
      setTimeout(() => {
          setIsCopied(false); // Reset after 2 seconds
      }, 2000);
  };
  
 
  // Fetch invoice data
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/invoices/${UserId}`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [UserId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
        try {
            // Call the delete endpoint
            await axios.delete(`${process.env.REACT_APP_API}/api/invoices-delete/${id}/${UserId}`);
            // Refresh the invoices list
            fetchInvoices();
            // Display success message
            toast.success('Invoice deleted successfully!');
        } catch (error) {
            console.error('Failed to delete invoice:', error);
            toast.error('Failed to delete invoice.');
        }
    }
};


  const handlePreview = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedInvoice(null);
  };
// Sorting invoices by invoiceDate in descending order
const sortedInvoices = [...invoices].sort((a, b) => {
  const dateA = new Date(a.InvoiceDetailsMain[0]?.invoiceDetails?.invoiceDate || 0);
  console.log(dateA)
  const dateB = new Date(b.InvoiceDetailsMain[0]?.invoiceDetails?.invoiceDate || 0);
  return dateB - dateA; // Most recent dates first
});
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = sortedInvoices.slice(indexOfFirstItem, indexOfLastItem);


  // const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(' ', ', ');
  };








  const handleShare = (item) => {
    setShowSharePopup(true);
    setClickedItem(item._id);
    
};





  return (

    <>

    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th></th>
            <th>Invoice Id <MdOutlineArrowDropDown /></th>
            <th>Name <MdOutlineArrowDropDown /></th>
            <th>Email <MdOutlineArrowDropDown /></th>
            <th>Release Date <MdOutlineArrowDropDown /></th>
            <th>Due Date <MdOutlineArrowDropDown /></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((invoice, index) =>
            invoice.InvoiceDetailsMain.map((item, detailIndex) => (
              <tr key={detailIndex} className={`MainDivOfTRInvoice ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <td></td>
                <td>{item.invoiceDetails ? item.invoiceDetails.invoiceNumber : ''}</td>
                <td>{item.billTo.receiverName}</td>
                <td><MdEmail /> {item.billTo.receiverEmail}</td>
                <td><SlCalender /> {item.invoiceDetails ? formatDate(item.invoiceDetails.invoiceDate) : ''}</td>
                <td><SlCalender /> {item.invoiceDetails ? formatDate(item.invoiceDetails.dueDate) : ''}</td>
                <td className='TableOfStar-Iconn'>
                  <div className="MainDivOfdots-container" onClick={() => setActiveMenu(activeMenu === detailIndex ? null : detailIndex)}>
                    <BsThreeDots />
                    {activeMenu === detailIndex && (
                      <div className="dropdown-menuNeww">
                        <button onClick={() => handleDelete(item._id)}><MdDelete  className='IconOfEditInvoice'/> Delete</button>
                        <button onClick={() => handlePreview(item)}><FaEye className='IconOfEditInvoice' /> Preview</button>
                        <button onClick={() => handleShare(item)}><FaShareAlt className='IconOfEditInvoice' /> Share</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
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

      {isPreviewOpen && (
        <div className="popup-overlayInvoice111">
          <div className="popup-contentInvoice111">
            <FromListPreview  previewPhoto={previewPhoto} companyAddress={companyAddress} companyGST={companyGST}   invoiceData={selectedInvoice} setIsPreviewOpen={setIsPreviewOpen} />
           
          </div>
        </div>
      )}
    </div>

    
    {showSharePopup && (
    <div className='BaackShareScreen'>
        <div className='share-bUILKsHARE'>
                        {/* Close Icon */}
                        <span className='close-iconffff' onClick={() => setShowSharePopup(false)}>
                ✖ {/* You can replace this with an actual icon if needed */}
            </span>
            <h4>Share Invoice</h4>

            <div className='url-container'>
                <input 
                    type="text" 
                    value={`${process.env.REACT_APP_URL_FRONTEND}/invoice/${clickedItem}`} 
                    readOnly // Make it read-only
                    className='url-input'
                />
                   <span 
                            className='copy-button' 
                            onClick={handleCopy} // Call handleCopy function
                        >
                            {isCopied ? '✅' : '📋'} {/* Change icon based on isCopied */}
                        </span>
            </div>

            <input 
                type="text" 
                placeholder="Enter emails separated by commas" 
                value={emailInput}
                onChange={handleEmailInput}
                onKeyDown={(e) => {
                    if (e.key === ' ') {
                        addEmail(); // Add email on space key
                    }
                }}
                className={`email-inputBuilShare ${/^\S+@\S+\.\S+$/.test(emailInput) ? 'valid' : 'invalid'}`}
            />
            <div className='email-bULKsHARE'>
    {shareEmails.map((email, index) => (
        <span key={index} className='email-itemBulkShare'>
            {email}
            <span 
                className='delete-button11' 
                onClick={() => removeEmail(index)} // Call the removeEmail function
            >
                ✖ {/* Cross icon for deleting */}
            </span>
        </span>
    ))}
</div>

            
            <button onClick={sendEmails}>Send</button>
        </div>
    </div>
)}
    </>
  );
};

export default InvoiceListAll;





// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import { MdOutlineArrowDropDown, MdEmail, MdDelete } from "react-icons/md";
// import { SlCalender } from "react-icons/sl";
// import { FaEye } from "react-icons/fa6";
// import { BsThreeDots } from "react-icons/bs";
// import { FaShareAlt } from "react-icons/fa";
// import FromListPreview from './FromListPreview';

// const InvoiceListAll = () => {
//   const [activeMenu, setActiveMenu] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const maxPageNumbersToShow = 4;
//   const UserId = localStorage.getItem('IntaskrUser');
//   const [invoices, setInvoices] = useState([]);
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Fetch invoice data
//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API}/api/invoices/${UserId}`);
//       setInvoices(response.data);
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   };

//   useEffect(() => {
//     fetchInvoices();
//   }, [UserId]);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this invoice?')) {
//         try {
//             // Call the delete endpoint
//             await axios.delete(`${process.env.REACT_APP_API}/api/invoices-delete/${id}/${UserId}`);
//             // Refresh the invoices list
//             fetchInvoices();
//             // Display success message
//             toast.success('Invoice deleted successfully!');
//         } catch (error) {
//             console.error('Failed to delete invoice:', error);
//             toast.error('Failed to delete invoice.');
//         }
//     }
// };


//   const handlePreview = (invoice) => {
//     setSelectedInvoice(invoice);
//     setIsPreviewOpen(true);
//   };

//   const closePreview = () => {
//     setIsPreviewOpen(false);
//     setSelectedInvoice(null);
//   };

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(invoices.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderPageNumbers = () => {
//     let startPage, endPage;

//     if (totalPages <= maxPageNumbersToShow) {
//       startPage = 1;
//       endPage = totalPages;
//     } else {
//       if (currentPage <= Math.floor(maxPageNumbersToShow / 2)) {
//         startPage = 1;
//         endPage = maxPageNumbersToShow;
//       } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
//         startPage = totalPages - (maxPageNumbersToShow - 1);
//         endPage = totalPages;
//       } else {
//         startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
//         endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
//       }
//     }

//     const pages = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={currentPage === i ? 'active' : ''}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     }).replace(' ', ', ');
//   };








//   const handleShare = (item) => {
//     const shareUrl = `${process.env.REACT_APP_URL_FRONTEND}/invoice/${item._id}`; // Assuming this is your sharing URL structure
//     if (navigator.share) {
//         navigator.share({
//             title: item.title,
//             text: 'Check out this note!',
//             url: shareUrl,
//         })
//         .then(() => console.log('Share successful'))
//         .catch((error) => console.error('Error sharing:', error));
//     } else {
//         // Fallback for browsers that don't support the Web Share API
//         navigator.clipboard.writeText(shareUrl).then(() => {
//             alert('Link copied to clipboard: ' + shareUrl);
//         }).catch(err => {
//             console.error('Failed to copy: ', err);
//         });
//     }
// };





//   return (
//     <div className="table-container">
//       <table className="responsive-table">
//         <thead>
//           <tr>
//             <th></th>
//             <th>Invoice Id <MdOutlineArrowDropDown /></th>
//             <th>Name <MdOutlineArrowDropDown /></th>
//             <th>Email <MdOutlineArrowDropDown /></th>
//             <th>Release Date <MdOutlineArrowDropDown /></th>
//             <th>Due Date <MdOutlineArrowDropDown /></th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((invoice, index) =>
//             invoice.InvoiceDetailsMain.map((item, detailIndex) => (
//               <tr key={detailIndex} className={`MainDivOfTRInvoice ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
//                 <td></td>
//                 <td>{item.invoiceDetails ? item.invoiceDetails.invoiceNumber : ''}</td>
//                 <td>{item.billTo.receiverName}</td>
//                 <td><MdEmail /> {item.billTo.receiverEmail}</td>
//                 <td><SlCalender /> {item.invoiceDetails ? formatDate(item.invoiceDetails.invoiceDate) : ''}</td>
//                 <td><SlCalender /> {item.invoiceDetails ? formatDate(item.invoiceDetails.dueDate) : ''}</td>
//                 <td className='TableOfStar-Iconn'>
//                   <div className="MainDivOfdots-container" onClick={() => setActiveMenu(activeMenu === detailIndex ? null : detailIndex)}>
//                     <BsThreeDots />
//                     {activeMenu === detailIndex && (
//                       <div className="dropdown-menuNeww">
//                         <button onClick={() => handleDelete(item._id)}><MdDelete /> Delete</button>
//                         <button onClick={() => handlePreview(item)}><FaEye /> Preview</button>
//                         <button onClick={() => handleShare(item)}><FaShareAlt /> Share</button>
//                       </div>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       <div className='MainDivOfPaginattionn'>
//         <div className="pagination">
//           {currentPage > 1 && (
//             <button onClick={() => handlePageChange(currentPage - 1)}>{'<'}</button>
//           )}
//           {renderPageNumbers()}
//           {currentPage < totalPages && (
//             <button onClick={() => handlePageChange(currentPage + 1)}>{'>'}</button>
//           )}
//         </div>
//       </div>

//       {isPreviewOpen && (
//         <div className="popup-overlayInvoice111">
//           <div className="popup-contentInvoice111">
//             <FromListPreview invoiceData={selectedInvoice} setIsPreviewOpen={setIsPreviewOpen} />
           
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceListAll;


// // import React, { useState,useEffect } from 'react';
// // import { ToastContainer, toast } from 'react-toastify';
// // import axios from 'axios';
// // import { MdOutlineArrowDropDown } from "react-icons/md";
// // import { MdEmail } from 'react-icons/md'; // Import the email icon
// // import { SlCalender } from "react-icons/sl";

// // import { FaStar, FaTrashAlt } from 'react-icons/fa';
// // import { BsThreeDots } from "react-icons/bs";
// // import { MdDelete } from "react-icons/md";
// // import { BiEditAlt } from "react-icons/bi";
// // import { FaEye } from "react-icons/fa6";



// // const InvoiceListAll = () => {
// //   const [activeMenu, setActiveMenu] = useState(null); // State to track active dropdown menu
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 10;
// //   const maxPageNumbersToShow = 4; // Maximum number of pages to show at once in pagination
// //   const UserId = localStorage.getItem('IntaskrUser');
// //   const [invoices, setInvoices] = useState([]);
// //   const [selectedInvoice, setSelectedInvoice] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const handleDotsClick = (index) => {
// //     setActiveMenu(activeMenu === index ? null : index); // Toggle active menu on click
// //   };

// //   // Pagination logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(invoices.length / itemsPerPage);
// // // -------------------------------------

// //   // Fetch invoice data
// //   const fetchInvoices = async () => {
// //     try {
// //       const response = await axios.get(`${process.env.REACT_APP_API}/api/invoices/${UserId}`);
// //       setInvoices(response.data);
// //     } catch (error) {
// //       console.error('Error fetching invoices:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchInvoices();
// //   }, [UserId]);

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this invoice?')) {
// //       try {
// //         await axios.delete(`${process.env.REACT_APP_API}/api/invoices-delete/${id}/${UserId}`);
// //         fetchInvoices();
// //         toast.success('Invoice deleted successfully!');
// //       } catch (error) {
// //         console.error('Failed to delete invoice:', error);
// //         toast.error('Failed to delete invoice.');
// //       }
// //     }
// //   };

// //   const handlePreview = (detail) => {
// //     setSelectedInvoice(detail);
// //     setShowModal(true);
// //   };

// //   const closeModal = () => {
// //     setShowModal(false);
// //     setSelectedInvoice(null);
// //   };

// // // --------------------------------------
// //   const handlePageChange = (pageNumber) => {
// //     setCurrentPage(pageNumber);
// //   };

// //   const renderPageNumbers = () => {
// //     let startPage, endPage;

// //     if (totalPages <= maxPageNumbersToShow) {
// //       startPage = 1;
// //       endPage = totalPages;
// //     } else {
// //       if (currentPage <= Math.floor(maxPageNumbersToShow / 2)) {
// //         startPage = 1;
// //         endPage = maxPageNumbersToShow;
// //       } else if (currentPage + Math.floor(maxPageNumbersToShow / 2) >= totalPages) {
// //         startPage = totalPages - (maxPageNumbersToShow - 1);
// //         endPage = totalPages;
// //       } else {
// //         startPage = currentPage - Math.floor(maxPageNumbersToShow / 2);
// //         endPage = currentPage + Math.floor(maxPageNumbersToShow / 2);
// //       }
// //     }

// //     const pages = [];
// //     for (let i = startPage; i <= endPage; i++) {
// //       pages.push(
// //         <button
// //           key={i}
// //           className={currentPage === i ? 'active' : ''}
// //           onClick={() => handlePageChange(i)}
// //         >
// //           {i}
// //         </button>
// //       );
// //     }

// //     return pages;
// //   };
// //   const getRandomColor = () => {
// //     const colors = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'];
// //     return colors[Math.floor(Math.random() * colors.length)];
// //   };


// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-GB', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric',
// //     }).replace(' ', ', ');
// //   };
// //   return (
// //     <div className="table-container">
// //       <table className="responsive-table">
// //         <thead>
// //           <tr>
// //             <th></th>
// //             <th>Invoice Id <MdOutlineArrowDropDown /></th>
// //             <th>Name <MdOutlineArrowDropDown /></th>
// //             <th>Email <MdOutlineArrowDropDown /></th>
// //             <th>Release Date <MdOutlineArrowDropDown /></th>
// //             <th>Due Date <MdOutlineArrowDropDown /></th>
// //             {/* <th>Status <MdOutlineArrowDropDown /></th> */}
// //             {/* <th><FaTrashAlt /></th> */}
// //             <th></th>
// //           </tr>
// //         </thead>
// //         <tbody>
       
// //         {currentItems.map((invoice, index) => (
// //             invoice.InvoiceDetailsMain.map((item, detailIndex) => (
// //             <tr key={detailIndex} id='TableRowData11' className={`MainDivOfTRInvoice ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
// //               <td></td>
// //               {/* <td><input type="checkbox" /></td> */}
// //               <td>
// //   {item.invoiceDetails ? (
// //     item.invoiceDetails.invoiceNumber
// //   ) : (
// //     <span></span> // or just leave it as <td></td>
// //   )}
// // </td>

// //               {/* <td>{item.billTo.receiverName}</td> */}
             
// //               <div className="name-with-avatar">
// //                   <span className="profile-avatar" style={{ backgroundColor: getRandomColor() }}>
// //                     {item.billTo.receiverName.charAt(0).toUpperCase()}
// //                   </span>
// //                   {item.billTo.receiverName}
// //                 </div>
// //               <td> 
// //               <span className="email-icon">
// //     <MdEmail /> {item.billTo.receiverEmail}
// //   </span>
          
// //   </td>
// //               <td>    <span className="email-icon">
// //               <SlCalender />
              
              
          
// //   {item.invoiceDetails ? (
// //     formatDate(item.invoiceDetails.invoiceDate)
// //   ) : (
// //     <span></span> // or just leave it as <td></td>
// //   )}

              
// //               {/* {item.date} */}
// //   </span></td>
// //               <td>    <span className="email-icon">
// //               <SlCalender />
              
              
          
// //   {item.invoiceDetails ? (
// //     formatDate(item.invoiceDetails.dueDate)
// //   ) : (
// //     <span></span> // or just leave it as <td></td>
// //   )}

              
// //               {/* {item.date} */}
// //   </span></td>
// //               {/* <td> */}
            
// //                 {/* <span className={`status ${item.status.toLowerCase()}`}>
// //     {item.status}
// //   </span> */}
// //               {/* </td> */}
// //               <td className='TableOfStar-Iconn'>
// //                 {/* <FaStar className="star-icon" /> */}
// //                 <div className="MainDivOfdots-container" onClick={() => handleDotsClick(detailIndex)}>
// //                   <BsThreeDots />
// //                   {activeMenu === detailIndex && (
// //                     <div className="dropdown-menuNeww">
// //                       {/* <button><BiEditAlt className='IconOfEditInvoice' /> Edit</button> */}
// //                       <button  onClick={() => handleDelete(item._id)}><MdDelete className='IconOfEditInvoice'   /> Delete</button>
// //                       <button  onClick={() => handlePreview(item)}><FaEye className='IconOfEditInvoice' /> Preview</button>
// //                     </div>
// //                   )}
// //                 </div>
// //               </td>
// //             </tr>
// //         ))
// //     ))}
// //         </tbody>
// //       </table>

// //       {/* Pagination controls */}
// //       <div className='MainDivOfPaginattionn'>
// //       <div className="pagination">
// //         {currentPage > 1 && (
// //           <button onClick={() => handlePageChange(currentPage - 1)}>{'<'}</button>
// //         )}

// //         {renderPageNumbers()}

// //         {currentPage < totalPages && (
// //           <button onClick={() => handlePageChange(currentPage + 1)}>{'>'}</button>
// //         )}



// //       </div>
// //       </div>







      
// //     </div>
// //   );
// // };

// // export default InvoiceListAll;




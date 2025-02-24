import React, { useRef } from 'react';
import './PreviewFirstInvoice.css';
import axios from 'axios'; 
import circleIntasker from '../../../../Component/Images/CircleIntaskr.png';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PreviewFirstInvoice = ({ invoiceData ,setIsPreviewOpen,logoPreview,previewPhoto,companyAddress,companyGST}) => {
    const {
        invoiceDetails,
        billTo,
        billFrom,
        businessAddress,
        financials,
    } = invoiceData;
    const pageRef = useRef();

    const { dueDate, invoiceDate, invoiceNumber, reference } = invoiceDetails;
    const { receiverName, receiverEmail, receiverAddress } = billTo;
    const { senderName, senderEmail, senderAddress } = billFrom;
    const { address, gstId } = businessAddress;
    const {
        items,
        subtotal,
        discountPercent,
        discountAmount,
        taxPercent,
        taxAmount,
        selectedCurrency,
        currentDate,
    } = financials;

    const totalDue = subtotal - discountAmount + taxAmount;

    const invoiceRef = useRef();

    // Function to handle PDF download
    const handleDownloadPDF = () => {
        html2canvas(invoiceRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190;
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save('invoice.pdf');
        });
    };
    const handleDownloadImage = async () => {
        try {
            // Capture the HTML element as a canvas
            const element = pageRef.current; // Replace with your reference to the HTML element
            const canvas = await html2canvas(element, { scale: 2 });
    
            // Convert the canvas to an image (base64 format)
            const imageData = canvas.toDataURL('image/png');
    
            // Pass the image data to the PDF generation function
            downloadImageAsFullPagePDF(imageData);
        } catch (error) {
            console.log('Failed to generate the PDF. Please try again.', error);
        }
    };
    
    function downloadImageAsFullPagePDF(imageData) {
        // Create a new jsPDF instance
        const pdf = new jsPDF();
    
        // Get the page dimensions
        const pageWidth = pdf.internal.pageSize.width;
        const pageHeight = pdf.internal.pageSize.height;
    
        // Add the image to cover the full PDF page
        pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight);
    
        // Trigger PDF download
        pdf.save('invoice.pdf');
    }
    
    // const handleDownloadImage = async () => {
    //     try {
    //         // Capture the HTML element as a canvas
    //         const element = pageRef.current; // Replace with your reference to the HTML element
    //         const canvas = await html2canvas(element, { scale: 2 });
    
    //         // Convert the canvas to an image (base64 format)
    //         const imageData = canvas.toDataURL('image/png');
    
    //         // Pass the image data to the PDF generation function
    //         downloadImageAsPDF(imageData);
    //     } catch (error) {
    //         console.log('Failed to generate the PDF. Please try again.', error);
    //     }
    // };
    
    // function downloadImageAsPDF(imageData) {
    //     // Create a new jsPDF instance
    //     const pdf = new jsPDF();
    
    //     // Set image dimensions to fit within the PDF page
    //     const imgWidth = 190; // Adjust width based on layout
    //     const pageWidth = pdf.internal.pageSize.width;
    //     const pageHeight = pdf.internal.pageSize.height;
    
    //     const img = new Image();
    //     img.src = imageData;
    
    //     img.onload = () => {
    //         const imgHeight = (img.height * imgWidth) / img.width; // Maintain aspect ratio
    //         const x = (pageWidth - imgWidth) / 2; // Center horizontally
    //         const y = (pageHeight - imgHeight) / 2; // Center vertically
    
    //         pdf.addImage(imageData, 'PNG', x, y, imgWidth, imgHeight);
    //         pdf.save('invoice.pdf'); // Trigger PDF download
    //     };
    // }
    
    // Example usage in JSX (React):
    // <button onClick={handleDownloadAsPDF}>Download PDF</button>
    
    // const handleDownloadImage = async () => {
      
    //     try {
    //       // Proceed with download logic
    //       const element = pageRef.current;
    //       const canvas = await html2canvas(element, { scale: 2 });
    //       const imageData = canvas.toDataURL('image/png');
    //     //   const sanitizedCourseName = course.name.replace(/[\/:*?"<>|]/g, '').replace(/\s+/g, '_');
    //     //   const sanitizedUserName = userName.replace(/[\/:*?"<>|]/g, '').replace(/\s+/g, '_');
    //       const link = document.createElement('a');
    //       link.href = imageData;
    //       link.download = `invoice.png`;
    //       link.click();
      
      
    //     } catch (error) {
    //       console.log('Failed to update certificate status. Please try again.');
    //     }
    //   };


    // Function to handle printing
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }).replace(' ', ', ');
      };

    //   -------------save button------

    
  const handleSave = async (event) => {

    event.preventDefault();

    const UserId = localStorage.getItem('IntaskrUser');

    try {
      // Make sure to include UserId if it's a required field
      const response = await axios.post(`${process.env.REACT_APP_API}/api/invoices`, {
        invoice:invoiceData,
        logoPreview,
        UserId // Assuming UserId is a required field in the backend
      });
      alert('Invoice saved successfully!');
      setIsPreviewOpen(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error saving invoice:', error);
      alert('Error saving invoice.');
    }
  };
  

//   ----------------------------------
    return (
        <>
        <div className='d-flex align-items-center justify-content-between  PreviewInvoiceMainBox'>
<div>

            <button className="invoice-button print-button" 
        onClick={() => handleDownloadImage()}>Print Invoice</button>
            {/* <button className="invoice-button print-button" onClick={handlePrint}>Print Invoice</button> */}
<button className="invoice-button save-button" onClick={handleSave}>Save</button>
</div>
<button className="close-button111" onClick={() => setIsPreviewOpen(false)}>
  <span className="close-icon111">&times;</span> 
</button>
        </div>
        <div className='MainLoadedInvoicePreviewBody'>

            {/* <button onClick={handleDownloadPDF}>Download as PDF</button> */}

            {/* <div className="invoice-container" pageRef={pageRef}  ref={invoiceRef}> */}
            <div className="invoice-container" ref={pageRef} >
                <header className="invoice-header">
                    <div className="company-logo d-flex align-items-center justify-content-start" >


                    {previewPhoto && (
  <img 
    src={previewPhoto} 
    alt="Company Logo" 
    style={{ 
      maxWidth: "100px", 
      maxHeight: "100px", 
      objectFit: "cover" 
    }} 
  />
)}
                    {/* {previewPhoto ? (
        <img src={previewPhoto} alt="Company Logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ) : (
        <h1 className="HeadingOfInvoice">
          A <span className="SpanOfInvoice">Invoice</span>
        </h1>
      )} */}
                        {/* <h1 className="HeadingOfInvoice">
                            A <span className="SpanOfInvoice">Invoice</span>
                        </h1> */}
                    </div>
                    <div className="mAINhEADERiNVOICE">
                        <div className="BillingToInvoice121">
                            <div className="company-details">
                                <p className="ParaOfcompany-details"><strong>Billed to</strong></p>
                                <p className="SecondParaOfCompany-details">{receiverName}</p>
                                <p className="ThirdParaOfCompany-details">{receiverAddress}</p>
                                <p className="ThirdParaOfCompany-details">{receiverEmail}</p>
                            </div>
                        </div>
                        <div className="cOMPANYaDDRESS321 SecondColumnOfCompanyDetails">
                            <div className="Second-company-details">
                            <p className='ThirdParaOfCompany-details'>Company Address</p>
                                <p className="ThirdParaOfCompany-details">{companyAddress || ""}</p>
                                <p className="ThirdParaOfCompany-details"> {companyGST || ""}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="SecondDivOfInvoicee">
                    <div className="BodyInvoiceMain32434">
                        <div className="LeftSideBodyInvoice212">
                            <div className="invoice-info-left">
                                <p><strong>Invoice #</strong><br /> {invoiceNumber}</p>
                                <p><strong>Invoice date</strong><br /> {formatDate(invoiceDate)}</p>
                                <p><strong>Reference</strong><br /> {reference}</p>
                                <p><strong>Due date</strong><br /> {formatDate(dueDate)}</p>
                            </div>
                        </div>
                        <div className="RightSideMainInvoice32322">
                            <div className="DivVOfInvoice-tabble">
                                <table className="invoice-table">
                                    <thead className="FirstInvoiceOfThead">
                                        <tr>
                                            <th>Services</th>
                                            <th>Qty</th>
                                            <th className="ForthItemOfTextTableInvoice">Rate</th>
                                            <th className="ForthItemOfTextTableInvoice">Line total</th>
                                        </tr>
                                    </thead>

                                    <tbody className="Invoice-ttbody Invoice-ttbodyup">
                                        {items.length > 0 && items.map((item, index) => (
                                            <tr className="FirstInvoiceOfTrr" key={index}>
                                                <td className="item-name">{item.description}</td>
                                                <td>{item.qty}</td>
                                                <td className="ForthItemOfTextTableInvoice">
                                                    {selectedCurrency} {Number(item.rate).toFixed(2)}
                                                </td>
                                                <td className="ForthItemOfTextTableInvoice">
                                                    {selectedCurrency} {(Number(item.rate) * Number(item.qty)).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <table className="invoice-table">
                                    <tfoot className="Invoice-ttbodydown">
                                        <tr className="FirstInvoiceOfTrr">
                                            <td colSpan="3" style={{ textAlign: 'left' }}>Subtotal:</td>
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency} 
                                            {Number(subtotal).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrrrftgyhjkl">
                                            <td colSpan="3" style={{ textAlign: 'left' }}>Discount ({discountPercent}%):</td>
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency} 
                                            {Number(discountAmount).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrr">
                                            <td colSpan="3" style={{ textAlign: 'left' }}>Tax ({taxPercent}%):</td>
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency} 
                                            {Number(taxAmount).toFixed(2)}
                                            </td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrr">
                                            <td colSpan="3" style={{ textAlign: 'left', fontWeight: '700', color: '#4C63ED' }}>Total due:</td>
                                            <td className="ForthItemOfTextTableInvoice" style={{ fontWeight: '700', color: '#4C63ED' }}>
                                                {selectedCurrency} 
                                                {Number(totalDue).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="invoice-paragraph">
                                <p>*Please pay within 15 days of receiving this invoice.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="DivOfInvoiceFooter">
                    <footer>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="MainDivOfCircleIntaskr">
                                    <img src={circleIntasker} className="ImagesOfCircleIntaskr" alt="Circle Intaskr" />
                                    <p className="ParagraphOfThankuBusiness">Thank you for the business!</p>
                                </div>
                            </div>
                            <div className="col-md-6 SecondColumnOfFirstInvoice">
                                <a className="AnkerOfIntasker" href="https://intaskr.com" target="_blank" rel="noopener noreferrer">
                                    intaskr.com
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
        </>
    );
};

export default PreviewFirstInvoice;


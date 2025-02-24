import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import circleIntasker from '../../../../Component/Images/CircleIntaskr.png';
import Navbar from '../../../../Component/Static/Navbar/Navbar';
import "./SinglePageViewOfInvoice.css"
import Footer from '../../../../Component/Static/Footer/Footer';
const SinglePageViewOfInvoice = () => {
    const { invoiceId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const invoiceRef = useRef();

    // Fetch invoice details on component mount
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/api/invoicesbyonlyid/${invoiceId}`);
                setInvoiceData(response.data);
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            }
        };
        fetchInvoice();
    }, [invoiceId]);

    // PDF download handler
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

    // Print handler
    const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
    });

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).replace(' ', ', ');
    };

    if (!invoiceData) return <p>Loading invoice data...</p>;

    const {
        invoiceDetails,
        billTo,
        billFrom,
        businessAddress,
        financials,
    } = invoiceData;

    const { dueDate, invoiceDate, invoiceNumber, reference } = invoiceDetails;
    const { receiverName, receiverEmail, receiverAddress } = billTo;
    const { address, gstId } = businessAddress;
    const {
        items,
        subtotal,
        discountPercent,
        discountAmount,
        taxPercent,
        taxAmount,
        selectedCurrency,
    } = financials;

    const totalDue = subtotal - discountAmount + taxAmount;

    return (

        <>
<Navbar/>
        <div className='PreviewInvoiceBox111'>
            <div className="d-flex col-sm-12 align-items-center justify-content-end">
                <div>
                    {/* <button className="invoice-button print-button" onClick={handlePrint}>Print Invoice</button> */}
                    <button className="invoice-button" onClick={handleDownloadPDF}>Download as PDF</button>
                </div>
            </div>
            <div className="invoice-container" ref={invoiceRef}>
                <header className="invoice-header">
                    <div className="company-logo">
                        <h1 className="HeadingOfInvoice">
                            A <span className="SpanOfInvoice">Invoice</span>
                        </h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="company-details">
                                <p className="ParaOfcompany-details"><strong>Billed to</strong></p>
                                <p className="SecondParaOfCompany-details">{receiverName}</p>
                                <p className="ThirdParaOfCompany-details">{receiverAddress}</p>
                                <p className="ThirdParaOfCompany-details">{receiverEmail}</p>
                            </div>
                        </div>
                        <div className="col-md-6 SecondColumnOfCompanyDetails">
                            <div className="Second-company-details">
                                <p className='ThirdParaOfCompany-details'>Company Address</p>
                                <p className="ThirdParaOfCompany-details">{address}</p>
                                <p className="ThirdParaOfCompany-details">GST ID: {gstId}</p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="SecondDivOfInvoicee">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="invoice-info-left">
                                <p><strong>Invoice #</strong><br /> {invoiceNumber}</p>
                                <p><strong>Invoice date</strong><br /> {formatDate(invoiceDate)}</p>
                                <p><strong>Reference</strong><br /> {reference}</p>
                                <p><strong>Due date</strong><br /> {formatDate(dueDate)}</p>
                            </div>
                        </div>
                        <div className="col-md-10">
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
                                        {items.map((item, index) => (
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
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency}{Number(subtotal).toFixed(2)}</td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrrrftgyhjkl">
                                            <td colSpan="3" style={{ textAlign: 'left' }}>Discount ({discountPercent}%):</td>
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency}{Number(discountAmount).toFixed(2)}</td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrr">
                                            <td colSpan="3" style={{ textAlign: 'left' }}>Tax ({taxPercent}%):</td>
                                            <td className="ForthItemOfTextTableInvoice">{selectedCurrency}{Number(taxAmount).toFixed(2)}</td>
                                        </tr>
                                        <tr className="FirstInvoiceOfTrr">
                                            <td colSpan="3" style={{ textAlign: 'left', fontWeight: '700', color: '#4C63ED' }}>Total due:</td>
                                            <td className="ForthItemOfTextTableInvoice" style={{ fontWeight: '700', color: '#4C63ED' }}>
                                                {selectedCurrency} {Number(totalDue).toFixed(2)}
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

        <Footer/>
        </>
    );
};

export default SinglePageViewOfInvoice;

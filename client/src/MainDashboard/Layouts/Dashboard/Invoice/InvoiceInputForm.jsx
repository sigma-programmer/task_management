
import React, { useState, useEffect } from "react";
import "./InvoiceInputForm.css";
import LogoSecInvoice from "../../../../Component/Images/logo512.png";
import { currencies } from '../../../../Component/api/CurrencyData';
import PreviewFirstInvoice from "./PreviewFirstInvoice";
import InvoiceListAll from "./InvoiceListAll";
const InvoiceInputForm = ({previewPhoto,companyAddress,companyGST}) => {
  const [logo, setLogo] = useState(null); // For storing the uploaded logo
  const [logoPreview, setLogoPreview] = useState(null); // For displaying the logo preview

  const [view, setView] = useState('invoice'); // State to manage view

  const [currentDate, setCurrentDate] = useState('');
  const [items, setItems] = useState([{ description: '', qty: '', rate: '' }]);
  const [subtotal, setSubtotal] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0); // Default to 0
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxPercent, setTaxPercent] = useState(0); // Default to 0
  const [taxAmount, setTaxAmount] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("INR"); // Default currency

// ---------------------------

// const [currentDate] = useState(new Date().toISOString().split('T')[0]);
const [dueDate, setDueDate] = useState(currentDate);
const [invoiceDate, setInvoiceDate] = useState(currentDate);
const [invoiceNumber, setInvoiceNumber] = useState('');
const [reference, setReference] = useState('');
const [receiverName, setReceiverName] = useState('');
const [receiverEmail, setReceiverEmail] = useState('');
const [receiverAddress, setReceiverAddress] = useState('');
const [senderName, setSenderName] = useState('');
const [senderEmail, setSenderEmail] = useState('');
const [senderAddress, setSenderAddress] = useState('');
  // ----------preview button-----------

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Function to handle preview
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  // Function to close the preview
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  // -------------------------------------
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
    setCurrentDate(formattedDate);
  }, []);

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: "", rate: "" }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    let total = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
    setSubtotal(total);
  };

  const calculateDiscount = () => {
    let discount = (discountPercent / 100) * subtotal;
    setDiscountAmount(discount);
  };

  const calculateTax = () => {
    let tax = (taxPercent / 100) * (subtotal - discountAmount);
    setTaxAmount(tax);
  };

  useEffect(() => {
    calculateSubtotal();
    calculateDiscount();
    calculateTax();
  }, [items, subtotal, discountPercent, discountAmount, taxPercent]);
  // Business address details
  const businessAddress = {
    address: "City, State, IN - 000 000",
    gstId: "00XXXXX1234X0XX",
  };

  const invoiceData = {
    invoiceDetails: {
      dueDate,
      invoiceDate,
      invoiceNumber,
      reference,
    },
    billTo: {
      receiverName,
      receiverEmail,
      receiverAddress,
    },
    billFrom: {
      senderName,
      senderEmail,
      senderAddress,
    },
    businessAddress: {
      address: businessAddress.address,
      gstId: businessAddress.gstId,
    },
    financials: {
      items,
      subtotal,
      discountPercent,
      discountAmount,
      taxPercent,
      taxAmount,
      selectedCurrency,
      currentDate,
    },
  };






  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(file);
        setLogoPreview(e.target.result); // Base64 encoded image
      };
      reader.readAsDataURL(file);
    }
  };
  return (

    <>
      <main>

      {/* <button  onClick={handleShowData}>Show</button> */}

<div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
      <button
        onClick={() => setView('invoice')}
        className={`ButtonOfevent-form ${view === 'invoice' ? 'activeButton' : ''}`}
      >
        Generate Invoice
      </button>
      <button
        onClick={() => setView('list')}
        className={`ButtonOfevent-form ${view === 'list' ? 'activeButton' : ''}`}
      >
        Invoice List
      </button>
    </div>
    {view === 'invoice' ? (
    <div className="MainDivOfInvoiceee">

   
      <div>
      {/* {previewPhoto ? (
        <img src={previewPhoto} alt="Company Logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
      ) : (
      
        <h1>
          <img src={LogoSecInvoice} className="ImageOfLogoSecInvoice" alt="logo" />{" "}
          <span className="SpanOfInstaskrInvoiceText">Intaskr Invoice</span>
        </h1>
      )} */}
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

{/* 
        <h1>
          <img src={LogoSecInvoice} className="ImageOfLogoSecInvoice" alt="logo" />{" "}
          <span className="SpanOfInstaskrInvoiceText">Intaskr Invoice</span>
        </h1> */}
      </div>
      {/* <div>
        <label htmlFor="logoUpload" style={{ cursor: "pointer", color: "blue" }}>
          + Upload Logo
        </label>
        <input
          id="logoUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleLogoUpload}
        />
      </div> */}
      <div className="MainDivOfBusinessAddresss">
        <p className="TextOfBusinessAddress">Company address</p>
        {/* <p className="TextOfBusinessAddress">{businessAddress.address}</p>
        <p className="TextOfBusinessAddress">{businessAddress.gstId}</p> */}
        <p className="TextOfBusinessAddress">{companyAddress || ""}</p>
        <p className="TextOfBusinessAddress">{companyGST || ""}</p>
      </div>
        {/* <p className="TextOfBusinessAddress">City, State, IN - 000 000</p>
        <p className="TextOfBusinessAddress">GST ID 00XXXXX1234X0XX</p> */}

      <div className="row justify-content-center align-items-center">
        <div className="col-md-3 col-sm-6 text-center">
          <p className="TextOfDueDate">Due date</p>
          <input
            className="InputOfDueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          {/* <input className="InputOfDueDate" type="date" defaultValue={currentDate} /> */}
        </div>
        <div className="col-md-3 col-sm-6 text-center">
          <p className="TextOfDueDate">Invoice date</p>
          {/* <input className="InputOfDueDate" type="date" defaultValue={currentDate} /> */}
          <input
            className="InputOfDueDate"
            type="date"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-sm-6 text-center">
          <p className="TextOfDueDate">Invoice number</p>
          {/* <input className="InputOfDueDate" type="text" /> */}
          <input
            className="InputOfDueDate"
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-sm-6 text-center">
          <p className="TextOfDueDate">Reference</p>
          <input
            className="InputOfDueDate"
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
          {/* <input className="InputOfDueDate" type="text" /> */}
        </div>
      </div>

      <div className="row SecondRowOfInputInvoice">
        <div className="col-md-6">
          <h3 className="TextOfBillToo">Bill to:</h3>
          <div className="DivOfRecieverName">
          <input
              placeholder="Client’s name"
              className="InputOfRecieverName"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
            />
            <input
              placeholder="Client’s Email address"
              className="InputOfRecieverName"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
            />
            <input
              placeholder="Client’s Billing address"
              className="InputOfRecieverName"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
            />
            {/* <input placeholder="Receiver’s name" className="InputOfRecieverName" />
            <input placeholder="Email address" className="InputOfRecieverName" />
            <input placeholder="Billing address" className="InputOfRecieverName" /> */}
          </div>
        </div>
        <div className="col-md-6 ColumnOfTextBillFrom">
          <h3 className="TextOfBillToo">Bill from:</h3>
          <div className="DivOfRecieverName">
          <input
              placeholder="Your’s name"
              className="InputOfRecieverName"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            <input
              placeholder="Your's Email address"
              className="InputOfRecieverName"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
            />
            <input
              placeholder="Your's Billing address"
              className="InputOfRecieverName"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
            />
            {/* <input placeholder="Sender’s name" className="InputOfRecieverName" />
            <input placeholder="Email address" className="InputOfRecieverName" />
            <input placeholder="Billing address" className="InputOfRecieverName" /> */}
          </div>
        </div>
      </div>

      <div className="row ThirdRowOfInputInvoice">
        <h3 className="TextOfItemDetails">ITEM DETAILS</h3>
        {/* {items.map((item, index) => (
          <div className="row ItemRow" key={index}>
            <div className="col-12 col-md-8">
              <textarea
                placeholder="Item Description"
                name="description"
                value={item.description}
                onChange={(e) => handleChange(index, e)}
                className="InputOfItemDescription textarea-item"
                rows="2"
              />
            </div>
            <div className="col-6 col-md-2">
              <input
                placeholder="Qty"
                name="qty"
                value={item.qty}
                onChange={(e) => handleChange(index, e)}
                className="SEcInputOfItemDescription"
              />
            </div>
            <div className="col-6 col-md-2">
              <input
                placeholder="Rate"
                name="rate"
                value={item.rate}
                onChange={(e) => handleChange(index, e)}
                className="ThirdInputOfItemDescription"
              />
            </div>
            <div>
              {index > 0 && (
                <button
                  className="RemoveItemButton"
                  onClick={() => handleRemoveItem(index)}
                >
                  -
                </button>
              )}
            </div>
          </div>
        ))} */}

        <div className="item-list">
      <div className="row master-header">
        <div className="col-12 col-md-8">
          <h3 className="ColHeadingName">Service description*</h3>
        </div>
        <div className="col-6 col-md-2">
          <h3 className="ColHeadingName">Qty</h3>
        </div>
        <div className="col-6 col-md-2">
          <h3 className="ColHeadingName">Rate</h3>
        </div>
      </div>
      {items.map((item, index) => (
        <div className="row ItemRow" key={index}>
          <div className="col-12 col-md-8">
            <textarea
              placeholder="Item Description"
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              className="InputOfItemDescription textarea-item"
              rows="2"
            />
          </div>
          <div className="col-6 col-md-2">
            <input
              placeholder="Qty"
              name="qty"
              value={item.qty}
              onChange={(e) => handleChange(index, e)}
              className="SEcInputOfItemDescription"
            />
          </div>
          <div className="col-6 col-md-2">
            <input
              placeholder="Rate"
              name="rate"
              value={item.rate}
              onChange={(e) => handleChange(index, e)}
              className="ThirdInputOfItemDescription"
            />
          </div>
          <div className="col-12 text-right">
            {index > 0 && (
              <button
                className="RemoveItemButton"
                onClick={() => handleRemoveItem(index)}
              >
                -
              </button>
            )}
          </div>
        </div>
      ))}
    </div>



        <div className="row">
          <div className="col-12">
            <button className="ButtonOfAddItems" onClick={handleAddItem}>
              Add Item
            </button>
          </div>
        </div>
      </div>

      {/* New Input Fields for GST, Tax, and Discount */}
      <div className="row justify-content-md-end">
        <div className="col-md-4 col-12 SubtotalSection">
          <div className="d-flex justify-content-between mt-3">
            <label className="Label">Discount Rate (%):</label>
            <input
              type="number"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="ValueInput"
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <label className="Label">Tax Rate (%):</label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(Number(e.target.value))}
              className="ValueInput"
            />
          </div>
          <div className="d-flex justify-content-between mt-3">
            <label className="Label">Currency:</label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="CurrencySelect"
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className="InvoiceDetails">

          <div className="d-flex justify-content-between">
            <label className="Label">Subtotal:</label>
            <span className="Value">{currencies.find(c => c.code === selectedCurrency).symbol}{subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <label className="Label">Discount:</label>
            <span className="Value">{currencies.find(c => c.code === selectedCurrency).symbol}{discountAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <label className="Label">Tax:</label>
            <span className="Value">{currencies.find(c => c.code === selectedCurrency).symbol}{taxAmount.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between">
            <label className="Label">Total:</label>
            <span className="Value">
              {currencies.find(c => c.code === selectedCurrency).symbol}{(subtotal - discountAmount + taxAmount).toFixed(2)}
            </span>
          </div>


        </div>
       <h4 className="TextOfNote">NOTE</h4>
  <div className="LastDivOfTextOfNote">Thanks for your business!!</div>


  <div className="col-sm-12 d-flex align-items-center justify-content-center">

<button onClick={handlePreview}  className="preview-button11">
    Preview Invoice
  </button>
</div>
      </div>
    </div>
  ) : (
<>

<InvoiceListAll previewPhoto={previewPhoto} companyAddress={companyAddress} companyGST={companyGST}/>
</>
  )}



  {isPreviewOpen && (
  <div className="popup-overlayInvoice111">
    <div className="popup-contentInvoice111">
     
        {/* Replace the below line with your actual invoice details */}
       
        <PreviewFirstInvoice previewPhoto={previewPhoto} companyAddress={companyAddress} companyGST={companyGST} logoPreview={logoPreview} invoiceData={invoiceData} setIsPreviewOpen={setIsPreviewOpen}/>
   
    </div>
  </div>
)}


</main>
    </>
  );
};

export default InvoiceInputForm;


// import React, { useState, useEffect } from "react";
// import "./InvoiceInputForm.css";
// import LogoSecInvoice from "../../../../Component/Images/logo512.png";

// const InvoiceInputForm = () => {
//   const [currentDate, setCurrentDate] = useState('');
//   const [items, setItems] = useState([{ description: '', qty: 0, rate: 0 }]);
//   const [subtotal, setSubtotal] = useState(0);
//   const [discountPercent, setDiscountPercent] = useState(0); // Default to 0
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [taxPercent, setTaxPercent] = useState(0); // Default to 0
//   const [taxAmount, setTaxAmount] = useState(0);

//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
//     setCurrentDate(formattedDate);
//   }, []);

//   const handleAddItem = () => {
//     setItems([...items, { description: "", qty: "", rate: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedItems = items.map((item, i) =>
//       i === index ? { ...item, [name]: value } : item
//     );
//     setItems(updatedItems);
//   };

//   const calculateSubtotal = () => {
//     let total = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
//     setSubtotal(total);
//   };

//   const calculateDiscount = () => {
//     let discount = (discountPercent / 100) * subtotal;
//     setDiscountAmount(discount);
//   };

//   const calculateTax = () => {
//     let tax = (taxPercent / 100) * (subtotal - discountAmount);
//     setTaxAmount(tax);
//   };

//   useEffect(() => {
//     calculateSubtotal();
//     calculateDiscount();
//     calculateTax();
//   }, [items, subtotal, discountPercent, discountAmount, taxPercent]);

//   return (
//     <div className="MainDivOfInvoiceee">
//       <div>
//         <h1>
//           <img src={LogoSecInvoice} className="ImageOfLogoSecInvoice" alt="logo" />{" "}
//           <span className="SpanOfInstaskrInvoiceText">Intaskr Invoice</span>
//         </h1>
//       </div>
//       <div className="MainDivOfBusinessAddresss">
//         <p className="TextOfBusinessAddress">Business address</p>
//         <p className="TextOfBusinessAddress">City, State, IN - 000 000</p>
//         <p className="TextOfBusinessAddress">GST ID 00XXXXX1234X0XX</p>
//       </div>

//       <div className="row justify-content-center align-items-center">
//         <div className="col-md-3 col-sm-6 text-center">
//           <p className="TextOfDueDate">Due date</p>
//           <input className="InputOfDueDate" type="date" defaultValue={currentDate} />
//         </div>
//         <div className="col-md-3 col-sm-6 text-center">
//           <p className="TextOfDueDate">Invoice date</p>
//           <input className="InputOfDueDate" type="date" defaultValue={currentDate} />
//         </div>
//         <div className="col-md-3 col-sm-6 text-center">
//           <p className="TextOfDueDate">Invoice number</p>
//           <input className="InputOfDueDate" type="text" />
//         </div>
//         <div className="col-md-3 col-sm-6 text-center">
//           <p className="TextOfDueDate">Reference</p>
//           <input className="InputOfDueDate" type="text" />
//         </div>
//       </div>

//       <div className="row SecondRowOfInputInvoice">
//         <div className="col-md-6">
//           <h3 className="TextOfBillToo">Bill to:</h3>
//           <div className="DivOfRecieverName">
//             <input placeholder="Receiver’s name" className="InputOfRecieverName" />
//             <input placeholder="Email address" className="InputOfRecieverName" />
//             <input placeholder="Billing address" className="InputOfRecieverName" />
//           </div>
//         </div>
//         <div className="col-md-6 ColumnOfTextBillFrom">
//           <h3 className="TextOfBillToo">Bill from:</h3>
//           <div className="DivOfRecieverName">
//             <input placeholder="Sender’s name" className="InputOfRecieverName" />
//             <input placeholder="Email address" className="InputOfRecieverName" />
//             <input placeholder="Billing address" className="InputOfRecieverName" />
//           </div>
//         </div>
//       </div>

//       <div className="row ThirdRowOfInputInvoice">
//         <h3 className="TextOfItemDetails">ITEM DETAILS</h3>
//         {items.map((item, index) => (
//           <div className="row ItemRow" key={index}>
//             <div className="col-12 col-md-8">
//               <textarea
//                 placeholder="Item Description"
//                 name="description"
//                 value={item.description}
//                 onChange={(e) => handleChange(index, e)}
//                 className="InputOfItemDescription textarea-item"
//                 rows="2"
//               />
//             </div>
//             <div className="col-6 col-md-2">
//               <input
//                 placeholder="Qty"
//                 name="qty"
//                 value={item.qty}
//                 onChange={(e) => handleChange(index, e)}
//                 className="SEcInputOfItemDescription"
//               />
//             </div>
//             <div className="col-6 col-md-2">
//               <input
//                 placeholder="Rate"
//                 name="rate"
//                 value={item.rate}
//                 onChange={(e) => handleChange(index, e)}
//                 className="ThirdInputOfItemDescription"
//               />
//             </div>
//             <div>
//               {index > 0 && (
//                 <button
//                   className="RemoveItemButton"
//                   onClick={() => handleRemoveItem(index)}
//                 >
//                   -
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         <div className="row">
//           <div className="col-12">
//             <button className="ButtonOfAddItems" onClick={handleAddItem}>
//               Add Item
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* New Input Fields for GST, Tax, and Discount */}
//       <div className="row justify-content-md-end">
//         <div className="col-md-4 col-12 SubtotalSection">
//           <div className="d-flex justify-content-between  mt-3">
//             <label className="Label">Discount Rate (%):</label>
//             <input
//               type="number"
//               value={discountPercent}
//               onChange={(e) => setDiscountPercent(Number(e.target.value))}
//               className="ValueInput"
//             />
//           </div>
//           <div className="d-flex justify-content-between mt-3">
//             <label className="Label">Tax Rate (%):</label>
//             <input
//               type="number"
//               value={taxPercent}
//               onChange={(e) => setTaxPercent(Number(e.target.value))}
//               className="ValueInput"
//             />
//           </div>
//           <div className="d-flex justify-content-between  mt-3">
//             <label className="Label">GST:</label>
//             <input
//               type="number"
//               value={taxPercent}
//               onChange={(e) => setTaxPercent(Number(e.target.value))}
//               className="ValueInput"
//             />
//           </div>
          
//         </div>
//       </div>










//       <div>
//   <div className="InvoiceDetails">
//     <div className="d-flex justify-content-between">
//       <label className="Label">Subtotal:</label>
//       <span className="Value">${subtotal.toFixed(2)}</span>
//     </div>
//     <div className="d-flex justify-content-between">
//       <label className="Label">Discount:</label>
//       <span className="Value">({discountPercent}%) ${discountAmount.toFixed(2)}</span>
//     </div>
//     <div className="d-flex justify-content-between">
//       <label className="Label">Tax:</label>
//       <span className="Value">({taxPercent}%) ${taxAmount.toFixed(2)}</span>
//     </div>
//   </div>
//   <h4 className="TextOfNote">NOTE</h4>
//   <div className="LastDivOfTextOfNote">Thanks for your business!!</div>

// </div>

//     </div>
//   );
// };

// export default InvoiceInputForm;


// import React, { useState,useEffect } from "react";
// import "./InvoiceInputForm.css";
// import LogoSecInvoice from "../../../../Component/Images/logo512.png";

// const InvoiceInputForm = () => {

//   const [currentDate, setCurrentDate] = useState('');

  
//   const handleAddItem = () => {
//     setItems([...items, { description: "", qty: "", rate: "" }]);
//   };

//   const handleRemoveItem = (index) => {
//     const updatedItems = items.filter((_, i) => i !== index);
//     setItems(updatedItems);
//   };

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedItems = items.map((item, i) =>
//       i === index ? { ...item, [name]: value } : item
//     );
//     setItems(updatedItems);
//   };




  
//   useEffect(() => {
//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format
//     setCurrentDate(formattedDate);
//   }, []);
//  // Define state for items, subtotal, discount, and tax
//  const [items, setItems] = useState([
//   { description: '', qty: 0, rate: 0 }
// ]);
// const [subtotal, setSubtotal] = useState(0);
// const [discountPercent, setDiscountPercent] = useState(4); // Example default percentage
// const [discountAmount, setDiscountAmount] = useState(0);
// const [taxPercent, setTaxPercent] = useState(3); // Example default percentage
// const [taxAmount, setTaxAmount] = useState(0);

// // Function to calculate subtotal
// const calculateSubtotal = () => {
//   let total = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
//   setSubtotal(total);
// };

// // Function to calculate discount amount
// const calculateDiscount = () => {
//   let discount = (discountPercent / 100) * subtotal;
//   setDiscountAmount(discount);
// };

// // Function to calculate tax amount
// const calculateTax = () => {
//   let tax = (taxPercent / 100) * (subtotal - discountAmount);
//   setTaxAmount(tax);
// };

// // Call the calculation functions whenever items or percentages change
// React.useEffect(() => {
//   calculateSubtotal();
//   calculateDiscount();
//   calculateTax();
// }, [items, subtotal, discountPercent, discountAmount, taxPercent]);

//   return (
//     <div className="MainDivOfInvoiceee">
//       <div>
//         <h1>
//           <img src={LogoSecInvoice} className="ImageOfLogoSecInvoice" alt="logo" />{" "}
//           <span className="SpanOfInstaskrInvoiceText">Intaskr Invoice</span>
//         </h1>
//       </div>
//       <div className="MainDivOfBusinessAddresss">
//         <p className="TextOfBusinessAddress">Business address</p>
//         <p className="TextOfBusinessAddress">City, State, IN - 000 000</p>
//         <p className="TextOfBusinessAddress">GST ID 00XXXXX1234X0XX</p>
//       </div>

//       <div className="row justify-content-center align-items-center">
//       <div className="col-md-3 col-sm-6 text-center">
//         <p className="TextOfDueDate">Due date</p>
//         <input className="InputOfDueDate" type="date" defaultValue={currentDate} />
//       </div>
//       <div className="col-md-3 col-sm-6 text-center">
//         <p className="TextOfDueDate">Invoice date</p>
//         <input className="InputOfDueDate" type="date" defaultValue={currentDate} />
//       </div>
//       <div className="col-md-3 col-sm-6 text-center">
//         <p className="TextOfDueDate">Invoice number</p>
//         <input className="InputOfDueDate" type="text" />
//       </div>
//       <div className="col-md-3 col-sm-6 text-center">
//         <p className="TextOfDueDate">Reference</p>
//         <input className="InputOfDueDate" type="text" />
//       </div>
//     </div>




//       <div className="row SecondRowOfInputInvoice">
//         <div className="col-md-6">
//           <h3 className="TextOfBillToo">Bill to:</h3>
//           <div className="DivOfRecieverName">
//             <input placeholder="Receiver’s name" className="InputOfRecieverName" />
//             <input placeholder="Email address" className="InputOfRecieverName" />
//             <input placeholder="Billing address" className="InputOfRecieverName" />
//           </div>
//         </div>
//         <div className="col-md-6 ColumnOfTextBillFrom">
//           <h3 className="TextOfBillToo">Bill from:</h3>
//           <div className="DivOfRecieverName">
//             <input placeholder="Sender’s name" className="InputOfRecieverName" />
//             <input placeholder="Email address" className="InputOfRecieverName" />
//             <input placeholder="Billing address" className="InputOfRecieverName" />
//           </div>
//         </div>
//       </div>






//       {/* <div className="row ThirdRowOfInputInvoice">
//         <h3 className="TextOfItemDetails">ITEM DETAILS</h3>
//         {items.map((item, index) => (
//           <div className="row ItemRow" key={index}>
//             <div className="col-md-6">
//               <input
//                 placeholder="Item Description"
//                 name="description"
//                 value={item.description}
//                 onChange={(e) => handleChange(index, e)}
//                 className="InputOfItemDescription"
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 placeholder="Qty"
//                 name="qty"
//                 value={item.qty}
//                 onChange={(e) => handleChange(index, e)}
//                 className="SEcInputOfItemDescription"
//               />
//             </div>
//             <div className="col-md-2">
//               <input
//                 placeholder="Rate"
//                 name="rate"
//                 value={item.rate}
//                 onChange={(e) => handleChange(index, e)}
//                 className="ThirdInputOfItemDescription"
//               />
//             </div>
//             <div className="col-md-2">
//               {index > 0 && (
//                 <button
//                   className="RemoveItemButton"
//                   onClick={() => handleRemoveItem(index)}
//                 >
//                   -
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         <button className="ButtonOfAddItems" onClick={handleAddItem}>
//           Add Item
//         </button>
//       </div> */}

//       <div className="row ThirdRowOfInputInvoice">
//   <h3 className="TextOfItemDetails">ITEM DETAILS</h3>
//   {items.map((item, index) => (
//     <div className="row ItemRow" key={index}>
//       <div className="col-12 col-md-8">
//         <textarea
//           placeholder="Item Description"
//           name="description"
//           value={item.description}
//           onChange={(e) => handleChange(index, e)}
//           className="InputOfItemDescription textarea-item"
//           rows="2"
//         />
//       </div>
//       <div className="col-6 col-md-2">
//         <input
//           placeholder="Qty"
//           name="qty"
//           value={item.qty}
//           onChange={(e) => handleChange(index, e)}
//           className="SEcInputOfItemDescription"
//         />
//       </div>
//       <div className="col-6 col-md-2">
//         <input
//           placeholder="Rate"
//           name="rate"
//           value={item.rate}
//           onChange={(e) => handleChange(index, e)}
//           className="ThirdInputOfItemDescription"
//         />
//       </div>
//       <div >
//         {index > 0 && (
//           <button
//             className="RemoveItemButton"
//             onClick={() => handleRemoveItem(index)}
//           >
//             -
//           </button>
//         )}
//       </div>
//     </div>
//   ))}
//   <div className="row">
//     <div className="col-12">
//       <button className="ButtonOfAddItems" onClick={handleAddItem}>
//         Add Item
//       </button>
//     </div>
//   </div>
// </div>






//       <div>
//         <h4 className="TextOfNote">NOTE</h4>
//         <div className="LastDivOfTextOfNote">Thanks for your business!!</div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceInputForm;



// import React, { useState } from "react";
// import "./InvoiceInputForm.css";
// import LogoSecInvoice from '../../../../Component/Images/logo512.png'

// const InvoiceInputForm = () => {

//   return (
//     <>
//       <div className="MainDivOfInvoiceee">

//         <div>
//           <h1>
//             <img src={LogoSecInvoice} className="ImageOfLogoSecInvoice" /> <spna className="SpanOfInstaskrInvoiceText" >Intaskr Invoice</spna>
//           </h1>
//         </div>
//         <div className="MainDivOfBusinessAddresss">
//           <p className="TextOfBusinessAddress">Business address</p>
//           <p className="TextOfBusinessAddress">City, State, IN - 000 000</p>
//           <p className="TextOfBusinessAddress">GST ID 00XXXXX1234X0XX</p>
//         </div>


//         <div className="row ">
//           <div className="col-md-3">
//             <p className="TexxttOfDueDatee">Due date</p>
//             <input className="DivInputOfDueDate" />
//           </div>
//           <div className="col-md-3">
//             <p className="TexxttOfDueDatee">Invoice date</p>
//             <input className="DivInputOfDueDate" />
//           </div>
//           <div className="col-md-3">
//             <p className="TexxttOfDueDatee">Invoice number</p>
//             <input className="DivInputOfDueDate" />
//           </div>
//           <div className="col-md-1"></div>
//           <div className="col-md-2">
//             <p className="TexxttOfDueDatee">Reference</p>
//             <input className="DivIInputOfDueDate" />
//           </div>
//         </div>


//         <div className="row SecondRowOfInputInvoice">
//           <div className="col-md-6">
//             <h3 className="TextOfBillToo">Bill to :</h3>
//             <div className="DivOfRecieverName">
//               <input placeholder="Reciever’s name" className="InputOfRecieverName" />
//               <input placeholder="Email address" className="InputOfRecieverName" />
//               <input placeholder="Billing address" className="InputOfRecieverName" />
//             </div>
//           </div>
//           <div className="col-md-6 ColumnOfTextBillFrom">
//             <h3 className="TextOfBillToo">Bill from :</h3>
//             <div className="DivOfRecieverName">
//               <input placeholder="Senderr’s name" className="InputOfRecieverName" />
//               <input placeholder="Email address" className="InputOfRecieverName" />
//               <input placeholder="Billing address" className="InputOfRecieverName" />
//             </div>
//           </div>
//         </div>


//         <div className="row ThirdRowOfInputInvoice">
//           <h3 className="TextOfItemDetails">ITEM DETIALS</h3>
//           <div className="col-md-6">
//             <p className="TexxttOfItemDescriptin">Item description*</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//               <input placeholder="Item Name 1" className="InputOfItemDescription" />
//               <input placeholder="Item Name 2" className="InputOfItemDescription" />
//             </div>
//           </div>
//           <div className="col-md-2">
//             <p className="TexxttOfItemDescriptin">Qty</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//               <input className="SEcInputOfItemDescription" />
//               <input className="SEcInputOfItemDescription" />
//             </div>
//           </div>
//           <div className="col-md-2">
//             <p className="TexxttOfItemDescriptin">Rate</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//               <input className="ThirdInputOfItemDescription" />
//               <input className="ThirdInputOfItemDescription" />
//             </div>
//           </div>
//           <div className="col-md-2">
//             <p className="TexxttOfItemDescriptin">Rate</p>
//             <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//               <input className="ThirdInputOfItemDescription" />
//               <input className="ThirdInputOfItemDescription" />
//             </div>
//           </div>
//           <button className="ButtonOfAddItems">Add Item</button>
//         </div>

//         <div>
//           <h4 className="TextOfNote">NOTE</h4>
//           <div className="LastDivOfTextOfNote">
//             Thanks for your business!!
//           </div>
//         </div>

//       </div>
//     </>
//   );
// };

// export default InvoiceInputForm;


const Invoice = require('../../model/Invoice/Invoice');
const User = require('../../model/User');

// Create or update an invoice
exports.createInvoice = async (req, res) => {
  try {
    const { UserId, invoice,logoPreview } = req.body;
console.log("-------------------------------")
console.log(logoPreview)
console.log("-------------------------------")
    // Check if the UserId exists in the User collection
    const userExists = await User.findById(UserId);
    if (!userExists) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if an invoice document already exists for the UserId
    let userInvoice = await Invoice.findOne({ OrgId: UserId });
console.log("--------------------------------")
// console.log(userInvoice)
console.log("--------------------------------")
    if (userInvoice) {
      // If an invoice document exists, push the new invoice details
      invoice.logoPreview = logoPreview; // Ensure logoPreview is part of the invoice details

      userInvoice.InvoiceDetailsMain.push(invoice);
      await userInvoice.save();
      return res.status(200).json(userInvoice);
    } else {
      // If no existing invoice document is found, create a new one
      const newInvoice = new Invoice({
        OrgId: UserId,
        InvoiceDetailsMain: [{ ...invoice, logoPreview }] // Add logoPreview here

        // InvoiceDetailsMain: [invoice]
      });

      await newInvoice.save();
      return res.status(201).json(newInvoice);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Get all invoices for a specific user
// exports.getAllInvoices = async (req, res) => {
//     try {
//       const { UserId } = req.params;
//       const invoices = await Invoice.find({ OrgId: UserId });
//       res.status(200).json(invoices);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

  exports.getAllInvoices = async (req, res) => {
    try {
      const { UserId } = req.params;
  
      // Fetch all invoices for the given OrgId (UserId)
      const invoices = await Invoice.find({ OrgId: UserId });
  
      // Reverse sort the InvoiceDetailsMain array by invoiceDate
      const sortedInvoices = invoices.map(invoice => {
        invoice.InvoiceDetailsMain.sort((a, b) => {
          const dateA = new Date(a.invoiceDetails.invoiceDate || 0);
          const dateB = new Date(b.invoiceDetails.invoiceDate || 0);
          return dateB - dateA; // Descending order
        });
        return invoice;
      });
  
      res.status(200).json(sortedInvoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
// Get an invoice by invoice ID and UserId and return matched InvoiceDetails element
exports.getInvoiceById = async (req, res) => {
  try {
    const { id, UserId } = req.params;

    // Find the invoice for the user and check if the item with the id exists in InvoiceDetails
    const invoice = await Invoice.findOne({ OrgId: UserId, 'InvoiceDetailsMain._id': id }, { 'InvoiceDetailsMain.$': 1 });

    if (!invoice || invoice.InvoiceDetailsMain.length === 0) {
      return res.status(404).json({ message: 'Invoice or Invoice Item not found' });
    }

    // Return the matched InvoiceDetails array element
    return res.status(200).json(invoice.InvoiceDetailsMain[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ---------------onlu invoice id base show data--------





// Controller to get an invoice by invoice ID only
exports.getInvoiceByOnlyId = async (req, res) => {
  try {
    const { invoiceId } = req.params;

    console.log(invoiceId)
    // Query to find the invoice based on the specific invoice ID within InvoiceDetailsMain
    const invoice = await Invoice.findOne(
      { 'InvoiceDetailsMain._id': invoiceId },
      { 'InvoiceDetailsMain.$': 1 } // Projection to get only the matched InvoiceDetails element
    );
    // Check if the specific InvoiceDetails item is not found
    if (!invoice || invoice.InvoiceDetailsMain.length === 0) {
      return res.status(404).json({ message: 'Invoice or Invoice Item not found' });
    }

    // Return the matched InvoiceDetails array element
    return res.status(200).json(invoice.InvoiceDetailsMain[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};









// Controller to delete an invoice detail by invoice ID and UserId
exports.deleteInvoiceDetail = async (req, res) => {
  const { id, UserId } = req.params;

  try {
      // Find the invoice by OrgId (UserId) and remove the specified invoice by its ID
      const invoice = await Invoice.findOneAndUpdate(
          { OrgId: UserId },
          { $pull: { InvoiceDetailsMain: { _id: id } } },
          { new: true }
      );

      // If no invoice is found, send a 404 response
      if (!invoice) return res.status(404).json({ message: 'Invoice not found.' });

      res.status(200).json({ message: 'Invoice deleted successfully.' });
  } catch (error) {
      console.error('Error deleting invoice:', error);
      res.status(500).json({ message: 'Failed to delete invoice.' });
  }
};




//   exports.deleteInvoiceDetail = async (req, res) => {
//     const { id, UserId } = req.params;

   

//     try {
//         // Find the invoice document and update the array
//         const result = await Invoice.findOne(
//             { OrgId: UserId, 'InvoiceDetails._id': id },
//             { $pull: { InvoiceDetails: { _id: id } } }
//         );

//        console.log(result)

//         res.status(200).json({ message: 'Invoice detail deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting invoice detail:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

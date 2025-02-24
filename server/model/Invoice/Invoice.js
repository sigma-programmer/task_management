const mongoose = require('mongoose');

// Define the item schema inside financials
const ItemSchema = new mongoose.Schema({
  id: String,
  // name: String,
  rate: Number,
  description: String,
  qty: Number
});

const InvoiceSchema = new mongoose.Schema({
  OrgId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user (OrgId)

  InvoiceDetailsMain: [
    {
      invoiceDetails: {
        dueDate: String,
        invoiceDate: String,
        invoiceNumber: String,
        reference: String,
      },
      billTo: {
        receiverName: String,
        receiverEmail: String,
        receiverAddress: String,
      },
      logoPreview:String,
      billFrom: {
        senderName: String,
        senderEmail: String,
        senderAddress: String,
      },
      businessAddress: {
        address: String,
        gstId: String,
      },
      financials: {
        items: [ItemSchema], // Array of items following the ItemSchema
        subtotal: Number,
        discountPercent: Number,
        discountAmount: Number,
        taxPercent: Number,
        taxAmount: Number,
        selectedCurrency: String,
        currentDate: String,
      }
    }
  ]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);



// const mongoose = require('mongoose');

// const InvoiceSchema = new mongoose.Schema({


//     OrgId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user (OrgId)
//    InvoiceDetailsMain: [
//       {
//   invoiceNumber: Number,
//   dateOfIssue: Date,
//   billTo: String,
//   billToEmail: String,
//   billToAddress: String,
//   billFrom: String,
//   billFromEmail: String,
//   billFromAddress: String,
//   items: [{
//     id: String,
//     name: String,
//     price: String,
//     description: String,
//     quantity: Number
//   }],
//   currency: String,
//   taxRate: Number,
//   discountRate: Number,
//   subTotal: String,
//   taxAmount: String,
//   discountAmount: String,
//   total: String,
//   notes: String

// }]
// });

// module.exports = mongoose.model('Invoice', InvoiceSchema);

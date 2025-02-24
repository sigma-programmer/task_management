const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({


    OrgId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user (OrgId)
    QuotationDetails: [
      {
  clientDetails: {
    name: String,
    email: String,
    phone: String,
  },
  companyDetails: {
    name: String,
    orgName: String,
    email: String,
    socialLinks: String,
  },
  dateOfIssue: Date,
  invoiceNumber: Number,
  projectDescription: String,
  costItems: [
    {
      service: String,
      hours: Number,
      rate: Number,
      total: Number,
    },
  ],
  logo: String, // URL or path to the logo image
  gst: Number,
  discount: Number,
  currency: String,

}]
});

module.exports = mongoose.model('Quotation', quotationSchema);

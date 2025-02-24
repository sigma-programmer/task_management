const express = require('express');
const router = express.Router();
const invoiceController = require('../../controller/Invoice/invoiceController');

// Define routes
router.post('/invoices', invoiceController.createInvoice);
router.get('/invoices/:UserId', invoiceController.getAllInvoices);
router.get('/invoices/:id/:UserId', invoiceController.getInvoiceById);



router.get('/invoicesbyonlyid/:invoiceId', invoiceController.getInvoiceByOnlyId);


router.delete('/invoices-delete/:id/:UserId', invoiceController.deleteInvoiceDetail);


router.put('/invoices/:id', invoiceController.updateInvoice);
module.exports = router;

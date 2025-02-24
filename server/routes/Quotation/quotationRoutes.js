const express = require('express');
const router = express.Router();
const {
    createQuotation,
    getQuotations,
    getQuotationById,
    
    updateQuotation,
    deleteQuotation
  }= require('../../controller/Quotation/quotationController');

router.post('/quotations', createQuotation);
// Route to get all quotations for a specific OrgId
// Get all quotations for a specific OrgId
router.get('/quotations/:orgId', getQuotations);

// Get a single quotation by id
router.get('/quotations-new/:orgId/:id', getQuotationById);


// Update a quotation
router.put('/quotations/:orgId/:id', updateQuotation);




// Delete a quotation
router.delete('/quotations/:orgId/:id', deleteQuotation);

module.exports = router;

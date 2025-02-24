
const Quotation = require('../../model/Quotation/Quotation');
const User = require('../../model/User');

// Create or update a quotation
exports.createQuotation = async (req, res) => {
    try {
      const { UserId, QuotationDetails } = req.body;
  
      // Check if UserId exists
      const userExists = await User.findById(UserId);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if a quotation with the given OrgId already exists
      let quotation = await Quotation.findOne({ OrgId: UserId });
  
      if (quotation) {
        // If the quotation exists, update it
        quotation.QuotationDetails.push(QuotationDetails); // Add new details to the array
        await quotation.save();
      } else {
        // If the quotation does not exist, create a new one
        quotation = new Quotation({
          OrgId: UserId,
          QuotationDetails: [QuotationDetails] // Initialize with the provided details
        });
        await quotation.save();
      }
  
      res.status(200).json(quotation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };





// Get all quotations for a specific OrgId
exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ OrgId: req.params.orgId });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single quotation by id
exports.getQuotationById = async (req, res) => {
  try {
    // Find the quotation document by OrgId
    const quotation = await Quotation.findOne({ OrgId: req.params.orgId });

    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    // Find the specific QuotationDetail by id
    const quotationDetail = quotation.QuotationDetails.find(
      detail => detail._id.toString() === req.params.id
    );

    if (!quotationDetail) {
      return res.status(404).json({ error: 'QuotationDetail not found' });
    }

    res.json(quotationDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a quotation
exports.updateQuotation = async (req, res) => {
  try {
    const { orgId, id } = req.params; // OrgId and Quotation ID

    // Update the specific QuotationDetails inside the Quotation document
    const updatedQuotation = await Quotation.findOneAndUpdate(
      { OrgId: orgId, 'QuotationDetails._id': id }, // Match by OrgId and nested QuotationDetails._id
      {
        $set: {
          'QuotationDetails.$': req.body, // Set the updated details
        }
      },
      { new: true } // Return the updated document
    );

    // Log the updated quotation to the console
    console.log('Updated Quotation:', updatedQuotation);

    // Respond with the updated quotation
    res.json(updatedQuotation);
  } catch (error) {
    // Log the error to the console
    console.error('Error updating quotation:', error);

    // Respond with the error message
    res.status(400).json({ error: error.message });
  }
};







exports.deleteQuotation = async (req, res) => {
  try {
    const { orgId, id } = req.params;
    console.log(orgId);
    console.log(id);

    // Find the quotation document with the matching OrgId and remove the specified quotation
    const result = await Quotation.findOneAndUpdate(
      { OrgId: orgId },
      { $pull: { QuotationDetails: { _id: id } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    // Send success message with status code 200
    res.status(200).json({ message: 'Quotation successfully deleted',success:true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new quotation
export const createQuotation = async (data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/quotations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error('Error creating quotation:', error);
  }
};

// Get all quotations for a specific OrgId
export const getAllQuotations = async (OrgId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/quotations/${OrgId}`);
      return response.json();
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };






// Get a single quotation by ID
export const getQuotationById = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/quotations/${id}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching quotation:', error);
  }
};

// Update a quotation by ID
export const updateQuotation = async (id, data) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/quotations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  } catch (error) {
    console.error('Error updating quotation:', error);
  }
};




// api/quotationService.js

export const deleteQuotation = async (id, OrgId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/api/quotations/${id}/${OrgId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting quotation:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

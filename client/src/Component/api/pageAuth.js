// src/apiUtils.js

export const fetchPageAuth = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("IntaskrToken");
  
      if (!token) {
        throw new Error("No token found");
      }
  
      const res = await fetch(`${process.env.REACT_APP_API}/api/intaskr/page/pageauth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (!res.ok) {
        const error = new Error("Unauthorized or Error fetching data");
        throw error;
      }
  
      const data = await res.json();
      return data;
  
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error to handle it in the component
    }
  };
  
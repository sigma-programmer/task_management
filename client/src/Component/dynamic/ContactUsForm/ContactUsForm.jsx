import React, { useEffect, useState } from 'react';
import CustomButton from '../../ReusableComponents/CustomButton/CustomButton';
import { fetchCountries } from '../../api/countryApi'; // Adjust the import path as necessary
import { fetchIpAddress } from '../../api/ipApi'; 
import axios from 'axios';
import Notification from '../../Notification/Notification'; // Adjust the import path as necessary

const ContactUsForm = () => {
  const [countries, setCountries] = useState([]);
  const [ipAddress, setIPAddress] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    companySize: '',
    countryRegion: 'India',
    anythingElse: ''
  });






  const [notification, setNotification] = useState(null);

  const showNotification = (message, textColor, backgroundColor) => {
      setNotification({ message, textColor, backgroundColor });
  };

  const closeNotification = () => {
      setNotification(null);
  };



  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const data = await fetchIpAddress();
        setIPAddress(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    getIpAddress();
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    getCountries();
  }, []);

  const handleSubmit = async (event) => {
    console.log(ipAddress)
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/contact`, {
        ...formData,
        ipAddress: ipAddress // Optional: add logic to fetch IP address if needed
      });
      console.log('Form submitted successfully:', response.data);
      showNotification('Form submitted successfully!', '#fff', '#28a745'); // Green background for success
       // Clear form inputs
       setFormData({
        firstName: '',
        lastName: '',
        workEmail: '',
        companyName: '',
        companySize: '',
        countryRegion: 'India',
        anythingElse: ''
    });
    } catch (error) {
      console.error('Error submitting form:', error);
      showNotification('Error submitting form!', '#fff', '#dc3545'); // Red background for error
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="MainContactUsForm mt-5">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label LabelOfName">
                First name <span className="SpanOfName">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Intaskr"
                className="form-control InputOfName"
                id="firstName"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label LabelOfName">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="last"
                className="form-control InputOfName"
                id="lastName"
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="workEmail" className="form-label LabelOfName">
            Work email <span className="SpanOfName">*</span>
          </label>
          <input
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="support@intaskr.com"
            className="form-control InputOfName"
            id="workEmail"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label LabelOfName">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Lovelace Inc."
            className="form-control InputOfName"
            id="companyName"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companySize" className="form-label LabelOfName">
            Company size
          </label>
          <select
            className="form-select InputOfName"
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
          >
            <option value="" disabled>Please select…</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="more">More..</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="countryRegion" className="form-label LabelOfName">
            Country or region <span className="SpanOfName">*</span>
          </label>
          <select
            className="form-select InputOfName"
            id="countryRegion"
            name="countryRegion"
            value={formData.countryRegion}
            onChange={(event) => {
              handleChange(event);
              // setSelectedCountry(event.target.value);
            }}
            required
          >
            <option value="" disabled>Please select…</option>
            {countries.map((country) => (
              <option key={country.cca3} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label LabelOfName">
            Anything else?
          </label>
          <textarea
            className="form-control InputOfName2"
            id="exampleFormControlTextarea1"
            name="anythingElse"
            value={formData.anythingElse}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <div>
          <p>
            By submitting this form, I acknowledge receipt of the <br /> Intaskr Privacy Policy.
          </p>
          <p>Fields marked with an asterisk (*) are required.</p>
        </div>
        <CustomButton backgroundColor="#EA4E43" type="submit">
          Submit
        </CustomButton>
      </form>
      {notification && (
                <Notification
                    message={notification.message}
                    textColor={notification.textColor}
                    backgroundColor={notification.backgroundColor}
                    onClose={closeNotification}
                />
            )}
    </div>
  );
};

export default ContactUsForm;


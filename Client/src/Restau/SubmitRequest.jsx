import { useState } from 'react';
import axios from 'axios';

const SubmitRequest = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    num_tel: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server using Axios
      const response = await axios.post('/api/admin/SubmitRequest', formData);

      if (response.status === 200) {
        console.log('Request submitted successfully');
      } else {
        console.error('Failed to submit request');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Submit Restaurant Request</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each piece of data */}
        <label>
          Business Name:
          <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
        </label>
        {/* Repeat similar lines for other input fields */}

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default SubmitRequest;

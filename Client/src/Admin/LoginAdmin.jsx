import { useState } from 'react';
import axios from 'axios';

const LoginAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend login endpoint
      const response = await axios.post('http://localhost:5000/api/admin/authAdmin', formData);

      // Handle success (you may redirect to a dashboard or show a success message)
      console.log('Login successful', response.data);
    } catch (error) {
      // Handle error (you may show an error message to the user)
      console.error('Login failed', error.response.data);
    }
  };

  return (
    <div>
      <h2>Login Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginAdmin;

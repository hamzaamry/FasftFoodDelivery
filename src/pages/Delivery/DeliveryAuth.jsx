import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';

const DeliveryAuth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        'http://localhost:5000/api/deliveryGuy/AuthDeliveryGuy',
        formData
      );
      console.log(response)
      Navigate('/DeliveryGuyOrders');
    } catch (error) {
      console.error('Authentication error:', error);
      setSnackbarOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center">
          Delivery Authentication
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginBottom: '16px' }}
          />
          <TextField
            variant="outlined"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ marginBottom: '16px' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              backgroundColor: '#32a84c',
              marginTop: '16px',
            }}
          >
            Sign In
          </Button>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: '100%' }}
          >
            Authentication failed. Please check your credentials.
          </MuiAlert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default DeliveryAuth;

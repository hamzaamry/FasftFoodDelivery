import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Snackbar, Link } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const DeliveryRequest = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    num_tel: '',
    age: '',
    vehiculeType: '',
    city: '',
  });

  const resetForm = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
      num_tel: '',
      age: '',
      vehiculeType: '',
      city: '',
    });
  };


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
      await axios.post('http://localhost:5000/api/deliveryGuy/SubmitRequest', formData);
      setSnackbarOpen(true);
      resetForm()
      
      console.log('Request submitted successfully');
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande :', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center">
          Delivery Driver Request Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="userName"
                label="Nom d'utilisateur"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />

            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Adresse Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Mot de Passe"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="num_tel"
                label="Numéro de Téléphone"
                name="num_tel"
                type="tel"
                value={formData.num_tel}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="age"
                label="Âge"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="vehiculeType"
                label="Type de Véhicule"
                name="vehiculeType"
                value={formData.vehiculeType}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="city"
                label="Ville"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary"   style={{
            backgroundColor: '#32a84c', marginTop:'3rem'
           }}>
            Soumettre la Demande
          </Button>
        </form>


        <Typography variant="h6" align="center"style={{ marginTop: "16px" , marginBottom:'5rem' }}>
          Already have an account?{" "}
          <Link href="/DeliveryAuth" variant="h6">
            Sign in
          </Link>
        </Typography>



        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Your request was submitted successfully. We will review your application.
          </MuiAlert>
        </Snackbar>


      </div>
    </Container>
  );
};

export default DeliveryRequest;




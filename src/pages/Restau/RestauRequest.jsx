import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Snackbar,
  Link,
} from "@mui/material";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

const RestauRequest = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    num_tel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setFormData({
      businessName: "",
      businessAddress: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      num_tel: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/restau/SubmitRequest",
        formData
      );
      setSnackbarOpen(true);
      resetForm();
      console.log("Demande soumise avec succès");
    } catch (error) {
      console.error("Erreur lors de la soumission de la demande :", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography variant="h5" align="center">
          Restaurant Request Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="businessName"
                label="Nom du Restaurant"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="businessAddress"
                label="Adresse du Restaurant"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="firstName"
                label="Prénom"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Nom de Famille"
                name="lastName"
                value={formData.lastName}
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
           style={{
            backgroundColor: '#32a84c',
            marginTop: "25px"
           }}
          >
            Submit Request
          </Button>
        </form>

        <Typography variant="h6" align="center"style={{ marginTop: "16px" , marginBottom:'5rem' }}>
          Already have an account?{" "}
          <Link href="/RestauAuth" variant="h6">
            Sign in
          </Link>
        </Typography>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Your restaurant request was submitted successfully. We will review
            your application.
          </MuiAlert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default RestauRequest;

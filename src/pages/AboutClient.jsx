import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const AboutClient = () => {
  const Navigate = useNavigate();

  const [vegetables, setVegetables] = useState('None');
  const [cuisine, setCuisine] = useState('');
  const [dishRating, setDishRating] = useState(5);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleVegetablesChange = (event) => {
    setVegetables(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setDishRating(newValue);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const handleSubmit = () => {
    console.log('Submitted:', {
      vegetables,
      cuisine,
      dishRating,
    });

    setIsSnackbarOpen(true);

    // Redirect to "/Home" after 3 seconds
    setTimeout(() => {
      Navigate('/Home');
    }, 2000);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Let us help you with ordering
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 5 }}>
        <InputLabel>Vegetables or none!</InputLabel>
        <Select value={vegetables} onChange={handleVegetablesChange}      style= {{ width:"70%" , justifyContent: 'center' , alignItems: 'center' }} >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Vegetables">Vegetables</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 5 }}>
        <InputLabel>Choose your favorite cuisine</InputLabel>
        <Select value={cuisine} onChange={handleCuisineChange}      style= {{ width:"70%" , justifyContent: 'center' , alignItems: 'center' }} >
          <MenuItem value="Italian">Italian</MenuItem>
          <MenuItem value="Mexican">Mexican</MenuItem>
          <MenuItem value="Japanese">Japanese</MenuItem>
          <MenuItem value="Frensh">Japanese</MenuItem>
     
        </Select>
      </FormControl>

      <Typography variant="body1" gutterBottom>
        How well do you want the dish to be? (Rating: {dishRating})
      </Typography>
      <Slider
        value={dishRating}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={0}
        max={10}
        sx={{ color: '#32a84c' }} 
        style= {{ width:"70%" , justifyContent: 'center' , alignItems: 'center' }}
      />

      <Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ backgroundColor: '#32a84c', color: '#ffffff' }} 
        >
          
          Submit
        </Button>
      </Grid>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Thank you for your preferences!
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AboutClient;

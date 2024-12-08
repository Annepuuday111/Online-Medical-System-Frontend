import React, { useState } from 'react';
import { Drawer, Typography, Box, IconButton, TextField, Button, Select, MenuItem } from '@mui/material';
import AdminSidebar from './AdminSidebar'; 
import MenuIcon from '@mui/icons-material/Menu';

function AddFeedback() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [treatmentFeedback, setTreatmentFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can handle form submission, e.g., sending data to your API
    const feedbackData = {
      doctorId,
      treatmentFeedback,
      rating,
      recommendation,
    };
    console.log('Feedback Data:', feedbackData);
    // Send feedbackData to your API
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <PatientSidebar />
      <Box
        className="content"
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '16px',
          marginLeft: '19%',
        }}
      >
        <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h5" gutterBottom textAlign="center">
          Add Feedback
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            mt: 2,
            maxWidth: '500px',
            margin: '0 auto',
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Doctor ID"
              variant="outlined"
              required
              type="number"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />
            <TextField
              fullWidth
              label="Treatment Feedback"
              variant="outlined"
              required
              multiline
              rows={4}
              value={treatmentFeedback}
              onChange={(e) => setTreatmentFeedback(e.target.value)}
            />
            <TextField
              fullWidth
              label="Rating (1-5)"
              variant="outlined"
              required
              type="number"
              inputProps={{ min: 1, max: 5 }}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <TextField
              fullWidth
              label="Recommendation"
              variant="outlined"
              required
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
            />
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Add Feedback
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default AddFeedback;

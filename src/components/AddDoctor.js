import React, { useState } from 'react';
import { Drawer, Typography, Box, IconButton, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

function AddDoctor() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const [doctorId, setDoctorId] = useState(''); 
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [email, setEmail] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [password, setPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!doctorId) {
      setErrorMessage('Doctor ID is required.');
      return;
    }

    const newDoctor = { doctorId, fullName, gender, dob, qualification, specialist, email, mobNo, password };

    try {
      await axios.post('http://localhost:8080/api/doctors', newDoctor);

      setSuccessMessage('Doctor added successfully!');
      setErrorMessage('');

      setDoctorId('');
      setFullName('');
      setGender('');
      setDob('');
      setQualification('');
      setSpecialist('');
      setEmail('');
      setMobNo('');
      setPassword('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error adding doctor. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
        <MenuIcon />
      </IconButton>
      <AdminSidebar />
      <Box
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
        <Typography variant="h4" gutterBottom textAlign="center">
          <br />
          Add New Doctor
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{
            mt: 2,
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor ID"
                variant="outlined"
                required
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Doctor's Name"
                variant="outlined"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                variant="outlined"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Qualification"
                variant="outlined"
                required
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Specialization"
                variant="outlined"
                required
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                required
                value={mobNo}
                onChange={(e) => setMobNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                  Add Doctor
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AddDoctor;

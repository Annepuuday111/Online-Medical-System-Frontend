import React, { useState, useEffect } from 'react';
import { Drawer, Typography, Box, IconButton, TextField, Button, Alert, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import PatientSidebar from './PatientSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

function AddAppointment() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [appoinDate, setAppoinDate] = useState('');
  const [email, setEmail] = useState('');
  const [phNo, setPhNo] = useState('');
  const [diseases, setDiseases] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [doctors, setDoctors] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedDoctor = doctors.find((doc) => doc.id === doctorId); // Find the selected doctor
    const newAppointment = { 
      fullName, 
      gender, 
      age, 
      appoinDate, 
      email, 
      phNo, 
      diseases, 
      doctorId, 
      doctorName: selectedDoctor ? selectedDoctor.fullName : '', // Include doctor's name
      address, 
      status 
    };

    try {
      const response = await axios.post('http://localhost:8080/api/appointments', newAppointment);
      console.log('Appointment added:', response.data);
      setSuccessMessage('Appointment added successfully!');
      setErrorMessage('');
      setFullName('');
      setGender('');
      setAge('');
      setAppoinDate('');
      setEmail('');
      setPhNo('');
      setDiseases('');
      setDoctorId('');
      setAddress('');
      setStatus('Scheduled');
    } catch (error) {
      console.error('Error adding appointment:', error);
      setSuccessMessage('');
      setErrorMessage('Error adding appointment. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <PatientSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
        <MenuIcon />
      </IconButton>
      <PatientSidebar />
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
        <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 3 }}>
          <br />
          Book New Appointment
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Age"
                variant="outlined"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Appointment Date"
                variant="outlined"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={appoinDate}
                onChange={(e) => setAppoinDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                required
                value={phNo}
                onChange={(e) => setPhNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diseases"
                variant="outlined"
                required
                value={diseases}
                onChange={(e) => setDiseases(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Select Doctor</InputLabel>
                <Select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  label="Select Doctor"
                >
                  {doctors.length > 0 ? (
                    doctors.map((doctor) => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.doctorId} - {doctor.fullName} - {doctor.specialist}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No doctors available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                  Add Appointment
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AddAppointment;

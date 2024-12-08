import React, { useEffect, useState } from 'react';
import { Drawer, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { MedicalServices, CalendarToday, LocalHospital } from '@mui/icons-material';
import PatientSidebar from './PatientSidebar';
import axios from 'axios';

function PatientDashboard({ userEmail }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [counts, setCounts] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    totalSpecialists: 0,
  });
  const [user, setUser] = useState({ name: '' }); 

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/name?email=${userEmail}`)
      .then(response => {
        setUser({ name: response.data.name });
      })
      .catch(error => {
        console.error('Error fetching user name:', error);
      });
  }, [userEmail]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const doctorsResponse = await axios.get('http://localhost:8080/api/doctors/counts');
        const appointmentCountResponse = await axios.get('http://localhost:8080/api/appointments/counts');
        const specialistsResponse = await axios.get('http://localhost:8080/api/specialists/count');

        setCounts({
          totalDoctors: doctorsResponse.data.totalDoctors || 0,
          totalAppointments: appointmentCountResponse.data.totalAppointments || 0,
          totalSpecialists: specialistsResponse.data || 0,
        });
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchCounts();
  }, []);

  const cardData = [
    { title: 'Doctors', count: counts.totalDoctors, icon: <MedicalServices fontSize="large" sx={{ color: '#1976d2' }} />, color: '#1976d2' },
    { title: 'My Appointments', count: counts.totalAppointments, icon: <CalendarToday fontSize="large" sx={{ color: '#fbc02d' }} />, color: '#fbc02d' },
    { title: 'Specialists', count: counts.totalSpecialists, icon: <LocalHospital fontSize="large" sx={{ color: '#e53935' }} />, color: '#e53935' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <PatientSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <PatientSidebar />

      <Box
        sx={{
          position: 'fixed', 
          top: 16,
          right: 16,
          backgroundColor: 'green',
          padding: '8px 16px',
          borderRadius: '8px',
          boxShadow: 2,
          color: 'white',
          zIndex: 1000, 
        }}
      >
        <Typography variant="body1">Welcome</Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          overflowY: 'auto',
          padding: '16px',
          textAlign: 'center',
          marginLeft: '310px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          <br />
          Welcome to the Users Dashboard
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: '8px',
                  textAlign: 'center',
                  width: '300px',
                  margin: '16px',
                }}
              >
                <CardContent>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box mb={1}>
                      <Box width="90px" height="60px" display="flex" alignItems="center" justifyContent="center">
                        {card.icon}
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ color: 'black' }}>
                      {card.count}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'black' }}>
                      {card.title}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default PatientDashboard;

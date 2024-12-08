import React, { useEffect, useState } from 'react';
import { Drawer, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { People, MedicalServices, CalendarToday, LocalHospital } from '@mui/icons-material';
import DoctorSidebar from './DoctorSidebar';
import axios from 'axios';

function DoctorDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [counts, setCounts] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    totalSpecialists: 0,
  });
  const [email, setEmail] = useState(''); // Store the email

  useEffect(() => {
    // Retrieve email from session storage
    const storedEmail = sessionStorage.getItem('doctorEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    const fetchCounts = async () => {
      try {
        const doctorsResponse = await axios.get('http://localhost:8080/api/doctors/counts');
        const usersResponse = await axios.get('http://localhost:8080/api/users/counts');
        const appointmentCountResponse = await axios.get('http://localhost:8080/api/appointments/counts');
        const specialistsResponse = await axios.get('http://localhost:8080/api/specialists/count');

        setCounts({
          totalDoctors: doctorsResponse.data.totalDoctors || 0,
          totalUsers: usersResponse.data.totalUsers || 0,
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
    { title: 'Users', count: counts.totalUsers, icon: <People fontSize="large" sx={{ color: '#43a047' }} />, color: '#43a047' },
    { title: 'Appointments', count: counts.totalAppointments, icon: <CalendarToday fontSize="large" sx={{ color: '#fbc02d' }} />, color: '#fbc02d' },
    { title: 'Specialists', count: counts.totalSpecialists, icon: <LocalHospital fontSize="large" sx={{ color: '#e53935' }} />, color: '#e53935' },
  ];

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className="app" style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DoctorSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <DoctorSidebar />
      <div
        className="content"
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          width: '100%',
          overflowY: 'auto',
          position: 'relative',
          padding: '16px',
          textAlign: 'center',
          margin: '0 auto',
          marginLeft: '310px',
        }}
      >
        <Typography variant="h6" sx={{ position: 'absolute', top: '16px', right: '16px', color: '#1976d2' }}>
          Welcome
        </Typography>

        <Typography variant="h4" gutterBottom>
          <br />
          Welcome to the Doctors Dashboard
        </Typography>
        <br />

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
      </div>
    </div>
  );
}

export default DoctorDashboard;

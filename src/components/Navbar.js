import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Container } from '@mui/material';
import { MailOutline, Phone, AccessTime, LocalHospital } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#e3f2fd', color: '#000' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="start" color="inherit" aria-label="time">
                <AccessTime />
              </IconButton>
              <Typography variant="body2" sx={{ color: '#1976d2', marginLeft: 1 }}>
                Opening Hours: Mon - Sun: 6.00 am - 10.00 pm
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton edge="start" color="inherit" aria-label="mail">
                <MailOutline />
              </IconButton>
              <Typography variant="body2" sx={{ marginLeft: 1, marginRight: 2 }}>
                medicalservices@gmail.com
              </Typography>
              <IconButton edge="start" color="inherit" aria-label="phone">
                <Phone />
              </IconButton>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                +917075285071
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar position="static" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <LocalHospital style={{ fontSize: 40, color: '#0d6efd', marginRight: '10px' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d6efd' }}>
                Medical
              </Typography>
            </Box>

            <Button component={Link} to="/" color="inherit" sx={{ color: '#000', marginRight: 2 }}>
              Home
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ color: '#000', marginRight: 2 }}>
              About
            </Button>
            <Button component={Link} to="/services" color="inherit" sx={{ color: '#000', marginRight: 2 }}>
              Services
            </Button>
            <Button component={Link} to="/contact" color="inherit" sx={{ color: '#000', marginRight: 2 }}>
              Contact
            </Button>
            <Button component={Link} to="/login" color="inherit" sx={{ color: '#000', marginRight: 2 }}>
              Login
            </Button>

            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#0d6efd' }}
            >
              Appointment
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;

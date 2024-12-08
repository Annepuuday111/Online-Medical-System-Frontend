import React, { useState } from 'react';
import { Drawer, Typography, Box, Button, Avatar, Paper, TextField } from '@mui/material';
import PatientSidebar from './PatientSidebar';

function UserProfile() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'KL University',
    email: 'klu@gmail.com',
    location: 'Vijayawada',
    occupation: 'Web Developer',
    about: 'Currently Studying B.Tech 3rd Year in KL University, Vijayawada, Andhra Pradesh 522302.',
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await fetch('/api/saveProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log('Profile saved successfully.');
      } else {
        console.error('Failed to save profile.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <PatientSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <PatientSidebar />

      <div
        className="content"
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          padding: '16px',
          marginLeft: '175px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '-170px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            maxWidth: '1000px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '0.9px solid black',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              backgroundColor: '#1976d2',
              width: '20%',
              padding: '24px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt="User Profile"
              src="/path-to-your-avatar-image.jpg"
              sx={{
                width: 130,
                height: 130,
                marginRight: '-10px',
                marginLeft: '40px',
              }}
            />
          </Paper>

          <Box
            sx={{
              width: '80%',
              backgroundColor: 'white',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              marginTop: isEditing ? '40px' : '0', 
              borderRadius: '8px', 
              boxShadow: isEditing ? 3 : 0, 
            }}
          >
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Occupation"
                  name="occupation"
                  value={profileData.occupation}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="About Me"
                  name="about"
                  value={profileData.about}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                  multiline
                  rows={4}
                />
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {profileData.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {profileData.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Location:</strong> {profileData.location}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Occupation:</strong> {profileData.occupation}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>About me:</strong> {profileData.about}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            style={{ marginTop: '20px' }}
          >
            Save Profile
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditClick}
            style={{ marginTop: '20px' }}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <Button
        variant="outlined"
        onClick={toggleDrawer(true)}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
        }}
      >
        Open Menu
      </Button>
    </div>
  );
}

export default UserProfile;

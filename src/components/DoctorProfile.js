import React, { useState, useEffect } from 'react';
import { Drawer, Typography, Box, Button, Avatar, Paper, TextField } from '@mui/material';
import DoctorSidebar from './DoctorSidebar';

function DoctorProfile({ doctorId }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    qualification: '',
    specialist: '',
    email: '',
    mobNo: ''
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch doctor data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

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
      const response = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        console.log('Profile updated successfully.');
      } else {
        console.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app" style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
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
              src={profileData.avatar || "/path-to-your-avatar-image.jpg"}
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
                  name="fullName"
                  value={profileData.fullName || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Gender"
                  name="gender"
                  value={profileData.gender || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Date of Birth"
                  name="dob"
                  value={profileData.dob || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Qualification"
                  name="qualification"
                  value={profileData.qualification || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Specialist"
                  name="specialist"
                  value={profileData.specialist || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Email"
                  name="email"
                  value={profileData.email || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  label="Mobile"
                  name="mobNo"
                  value={profileData.mobNo || ''}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                />
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {profileData.fullName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Gender:</strong> {profileData.gender}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Date of Birth:</strong> {profileData.dob}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Qualification:</strong> {profileData.qualification}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Specialist:</strong> {profileData.specialist}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Email:</strong> {profileData.email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Mobile:</strong> {profileData.mobNo}
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

export default DoctorProfile;

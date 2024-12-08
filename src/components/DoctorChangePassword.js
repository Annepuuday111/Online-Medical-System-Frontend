import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { Lock } from '@mui/icons-material';
import DoctorSidebar from './DoctorSidebar'; 

function DoctorChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = () => {
    if (passwordData.newPassword === passwordData.confirmPassword) {
      alert('Password changed successfully!');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
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
          marginLeft: '175px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          <br></br>
          Change Password
        </Typography>

        <Box sx={{ maxWidth: 400, margin: '0 auto' }}>
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={passwordData.oldPassword}
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={passwordData.newPassword}
          />
          <TextField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            value={passwordData.confirmPassword}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Lock />}
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
            fullWidth
          >
            Update Password
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default DoctorChangePassword;

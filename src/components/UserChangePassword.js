import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { Lock } from '@mui/icons-material';
import PatientSidebar from './PatientSidebar';

function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userId = 1;
      const response = await fetch(`http://localhost:8080/api/users/${userId}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        }),
      });      

      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Password changed successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update password.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <PatientSidebar />
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
          <br />
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

export default ChangePassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, IconButton } from '@mui/material';
import { Lock as LockIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import Navbar from './Navbar';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin') {
      onLogin('admin');
      navigate('/admin');
      return;
    }

    // Medical store login
    if (email === 'medical@gmail.com' && password === 'Medical') {
      onLogin('medical');
      navigate('/medicalstore');
      return;
    }

    // Patient login
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        onLogin('patient');
        navigate('/patient');
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error during login. Please try again later.');
    }

    // Doctor login
    try {
      const response = await fetch('http://localhost:8080/api/doctors/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.text();

      if (response.ok) {
        onLogin('doctor');
        navigate('/doctor');
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error during login. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 8,
        }}
      >
        <Container
          component={Paper}
          elevation={6}
          sx={{
            padding: 4,
            margin: 1,
            width: '400px', 
            height: '400px', 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            backgroundImage: 'url("https://img.freepik.com/premium-vector/doctor-explaining-diagnosis-patient-through-video-call_676904-17044.jpg?w=1060")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </Container>
        <Container
          component={Paper}
          elevation={6}
          sx={{
            padding: 4,
            margin: 1,
            width: '500px', 
            height: '400px', 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {errorMessage && (
            <Typography color="error" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <AccountCircleIcon />
                  </IconButton>
                ),
              }}
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <LockIcon />
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2, padding: 1 }}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/signup')}
              variant="text"
              fullWidth
              sx={{ marginTop: 1, color: '#1976d2' }}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Alert, CircularProgress } from '@mui/material';
import Navbar from './Navbar';
import axios from 'axios';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (password === confirmPassword) {
      const newUser = { name, email, password };

      try {
        await axios.post('http://localhost:8080/api/users/register', newUser);
        setSuccessMessage('User registered successfully!');
        setErrorMessage('');
        setLoading(false);

        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error adding user. Please try again.');
        }
        setSuccessMessage('');
      }
    } else {
      setLoading(false);
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
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
            height: '500px',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            backgroundImage: 'url("https://img.freepik.com/free-vector/cloud-robotics-abstract-concept-illustration_335657-3801.jpg?t=st=1727893750~exp=1727897350~hmac=8a335887aa68498f4d4520fe5036dbe83d184b990257f2e9ad7bb1ac827e58a2&w=1060")', 
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
            height: '500px', 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
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

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              sx={{ backgroundColor: '#ffffff' }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
          </form>
        </Container>
      </Container>
    </>
  );
};

export default SignupPage;

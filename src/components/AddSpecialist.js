import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

function AddSpecialist() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [specialistName, setSpecialistName] = useState('');
  const [specialists, setSpecialists] = useState([]);
  const [editingSpecialistId, setEditingSpecialistId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const fetchSpecialists = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/specialists');
      const sortedSpecialists = response.data.sort((a, b) => a.id - b.id);
      setSpecialists(sortedSpecialists);
    } catch (error) {
      console.error('Error fetching specialists:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!specialistName) {
      setErrorMessage('Specialist name is required');
      setSuccessMessage('');
      return;
    }
    const specialistData = { specialistName };

    try {
      if (editingSpecialistId) {
        await axios.put(`http://localhost:8080/api/specialists/${editingSpecialistId}`, specialistData);
        setSuccessMessage('Specialist updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/specialists', specialistData);
        setSuccessMessage('Specialist added successfully!');
      }
      setErrorMessage('');
      setSpecialistName('');
      setEditingSpecialistId(null);
      fetchSpecialists();
    } catch (error) {
      setErrorMessage('Failed to save specialist. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleEdit = (specialist) => {
    setSpecialistName(specialist.specialistName);
    setEditingSpecialistId(specialist.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/specialists/${id}`);
      setSuccessMessage('Specialist deleted successfully!');
      setErrorMessage('');
      fetchSpecialists();
    } catch (error) {
      setErrorMessage('Failed to delete specialist. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}
      >
        <MenuIcon />
      </IconButton>
      <AdminSidebar />
      <Box
        className="content"
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
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom textAlign="center" sx={{ marginBottom: '24px' }}>
          <br></br>
          {editingSpecialistId ? 'Edit Specialist' : 'Add Specialist'}
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
          sx={{
            mt: 2,
            maxWidth: '500px',
            margin: '0 auto',
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              label="Enter Specialization Name"
              variant="outlined"
              required
              value={specialistName}
              onChange={(e) => setSpecialistName(e.target.value)}
            />
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                {editingSpecialistId ? 'Update' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Box>

        <Typography variant="h4" gutterBottom sx={{ mt: 4 }} textAlign="center">
          Specialists List
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2, maxWidth: '500px', margin: '0 auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>ID</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Specialist Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {specialists.map((specialist, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{specialist.id}</TableCell>
                  <TableCell align="center">{specialist.specialistName}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleEdit(specialist)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(specialist.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default AddSpecialist;

import React, { useEffect, useState, useCallback } from 'react';
import {
  Drawer,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Button,
  Alert,
} from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

function AdminViewAppointments() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      console.log("Fetched appointments:", response.data); 
      setAppointments(response.data);
    } catch (err) {
      setError('Error fetching appointments: ' + (err.response?.data?.message || ''));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${appointmentId}`);
      setAppointments(appointments.filter((appointment) => appointment.id !== appointmentId));
      console.log(`Deleted appointment ID: ${appointmentId}`);
    } catch (err) {
      setError('Error deleting appointment: ' + (err.response?.data?.message || ''));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <AdminSidebar />

      <Box
        className="content"
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '24px',
          marginLeft: '250px',
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            <br />
            View Appointments
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
            Loading...
          </Typography>
        ) : (
          <Box sx={{ padding: '0', maxWidth: '95%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  {['ID', 'Name', 'Gender', 'Age', 'Appointment', 'Email', 'Phone', 'Disease', 'Address', 'Actions'].map((header, index) => (
                    <TableCell key={index} align="center" sx={{ color: 'white' }}><strong>{header}</strong></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell align="center">{appointment.id}</TableCell>
                      <TableCell align="center">{appointment.fullName}</TableCell>
                      <TableCell align="center">{appointment.gender}</TableCell>
                      <TableCell align="center">{appointment.age}</TableCell>
                      <TableCell align="center">{new Date(appointment.appoinDate).toLocaleDateString()}</TableCell>
                      <TableCell align="center">{appointment.email}</TableCell>
                      <TableCell align="center">{appointment.phNo}</TableCell>
                      <TableCell align="center">{appointment.diseases}</TableCell>
                      <TableCell align="center">{appointment.address}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                          sx={{ fontSize: '0.75rem' }}
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={11} align="center">
                      <Typography variant="h6" color="textSecondary" sx={{ fontSize: '1rem' }}>
                        No Appointments Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default AdminViewAppointments;

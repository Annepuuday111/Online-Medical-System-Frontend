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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DoctorSidebar from './DoctorSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import MedicationIcon from '@mui/icons-material/Medication';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

function DoctorViewAppointments() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [suggestedMedicines, setSuggestedMedicines] = useState([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      const appointmentsWithStatus = await Promise.all(
        response.data.map(async (appointment) => {
          const res = await axios.get(`http://localhost:8080/api/medicine/${appointment.id}`);
          return {
            ...appointment,
            suggested: res.data.length > 0,
          };
        })
      );
      setAppointments(appointmentsWithStatus);
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

  const handleSuggestMedicine = async (appointment) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/medicine/${appointment.id}`);
      if (response.data.length > 0) {
        setInfoMessage('Medicines already suggested for this appointment.');
        setTimeout(() => setInfoMessage(''), 3000);
      } else {
        setSelectedAppointment(appointment);
        setOpenDialog(true);
      }
    } catch (err) {
      setError('Error checking medicines for this appointment: ' + (err.response?.data?.message || ''));
    }
  };

  const handleViewMedicines = async (appointment) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/medicine/${appointment.id}`);
      setSuggestedMedicines(response.data);
      setOpenViewDialog(true);
    } catch (err) {
      setError('Error fetching medicines for this appointment: ' + (err.response?.data?.message || ''));
    }
  };

  const handleMedicineSubmit = async () => {
    if (!medicineName || !dosage || !frequency) return;

    const medicineDetails = { name: medicineName, dosage, frequency };

    try {
      await axios.post(`http://localhost:8080/api/medicine/${selectedAppointment.id}`, medicineDetails);
      setOpenDialog(false);
      setMedicineName('');
      setDosage('');
      setFrequency('');
      setSuccessMessage('Medicine suggested successfully!');
      fetchAppointments();
    } catch (err) {
      setError('Error suggesting medicine: ' + (err.response?.data?.message || ''));
    }
  };

  const handleMeeting = async (appointment) => {
    console.log(`Scheduling meeting for appointment ID: ${appointment.id}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DoctorSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <DoctorSidebar />

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

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {infoMessage && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {infoMessage}
          </Alert>
        )}

        {loading ? (
          <Typography variant="h6" align="center" sx={{ fontSize: '1rem' }}>
            Loading...
          </Typography>
        ) : (
          <Box sx={{ padding: '0', maxWidth: '99%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  {['ID', 'Name', 'Gender', 'Age', 'Appointment', 'Phone', 'Disease', 'Medicine Status', 'Actions'].map((header, index) => (
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
                      <TableCell align="center">{appointment.phNo}</TableCell>
                      <TableCell align="center">{appointment.diseases}</TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 'bold',
                            color: appointment.suggested ? 'green' : 'red',
                          }}
                        >
                          {appointment.suggested ? 'Suggested' : 'Not Suggested'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: '#ff9999' } }}
                            startIcon={<VideoCallIcon />}
                            onClick={() => handleMeeting(appointment)}
                          />
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<MedicationIcon />}
                            onClick={() => handleSuggestMedicine(appointment)}
                          />
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: 'gray', color: 'white', '&:hover': { backgroundColor: 'lightgray' } }}
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewMedicines(appointment)}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
                      <Typography variant="h6">No appointments found.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Suggest Medicine</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Medicine Name"
              type="text"
              fullWidth
              variant="outlined"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Dosage"
              type="text"
              fullWidth
              variant="outlined"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Frequency"
              type="text"
              fullWidth
              variant="outlined"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleMedicineSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)}>
          <DialogTitle>Suggested Medicines</DialogTitle>
          <DialogContent dividers>
            <List>
              {suggestedMedicines.length > 0 ? (
                suggestedMedicines.map((medicine, index) => (
                  <ListItem key={index} sx={{ alignItems: 'flex-start' }}>
                    <ListItemText
                      primary={<strong>{medicine.name}</strong>}
                      secondary={
                        <span>
                          <strong>Dosage:</strong> {medicine.dosage}<br />
                          <strong>Frequency:</strong> {medicine.frequency}
                        </span>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Typography align="center" color="textSecondary">
                  No medicines suggested yet.
                </Typography>
              )}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenViewDialog(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default DoctorViewAppointments;


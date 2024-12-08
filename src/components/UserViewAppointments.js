import React, { useEffect, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  MenuItem,
} from '@mui/material';
import PatientSidebar from './PatientSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import MedicationIcon from '@mui/icons-material/Medication';
import FeedbackIcon from '@mui/icons-material/Feedback';
import VideoCall from '@mui/icons-material/VideoCall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ChatIcon from '@mui/icons-material/Chat';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function UserViewAppointments({ userId }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedMedicines, setSuggestedMedicines] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openMeetingDialog, setOpenMeetingDialog] = useState(false);
  const [meetingMessage, setMeetingMessage] = useState('');
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rating, setRating] = useState(1);
  const [recommendation, setRecommendation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [feedbackGivenBy, setFeedbackGivenBy] = useState('');
  const [isOrderFormOpen, setOrderFormOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [openForm, setOpenForm] = useState(true);


  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching appointments');
      setLoading(false);
    }
  };

  const fetchMedicines = async (appointmentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/medicine/${appointmentId}`);
      setSuggestedMedicines(response.data);
      setOpenViewDialog(true);
    } catch (err) {
      setError('Error fetching medicines');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors');
      setDoctors(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching doctors data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleViewMedicines = (appointment) => {
    fetchMedicines(appointment.id);
  };

  const handleFeedback = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenFeedbackDialog(true);
    setError('');
  };

  const handleAttendMeeting = (appointment) => {
    if (appointment.meetingLink) {
      window.open(appointment.meetingLink, '_blank');
    } else {
      setMeetingMessage('The doctor has not provided a meeting link yet.');
      setOpenMeetingDialog(true);
    }
  };

  const handleCloseMedicinesDialog = () => {
    setOpenViewDialog(false);
  };

  const handleCloseMeetingDialog = () => {
    setOpenMeetingDialog(false);
  };

  const handleOrderNowClick = () => {
    setOrderFormOpen(true);
  };

  const handleCloseOrderForm = () => {
    setOrderFormOpen(false);
  };

  const handleCloseFeedbackDialog = () => {
    setOpenFeedbackDialog(false);
    setFeedback('');
    setRating(1);
    setRecommendation('');
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage('');
    setError('');
  };

  const handleSubmitOrder = async () => {
    if (!fullName || !address || !contactNumber || !notes) {
      setError('Please fill in all fields.');
      return;
    }

    const orderData = { fullName, address, contactNumber, notes };

    try {
      const response = await axios.post('http://localhost:8080/api/orders/save', orderData);

      if (response.status === 200) {
        setFullName('');
        setAddress('');
        setContactNumber('');
        setNotes('');

        setSuccessMessage('Order submitted successfully!');
        setSuccessDialogOpen(true);
        setOpenForm(false);
      } else {
        setError('Failed to submit order');
      }
    } catch (err) {
      setError('Error submitting order: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedback || rating < 1 || !recommendation) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/feedback/feedbacks', {
        appointmentId: selectedAppointment.id,
        treatmentFeedback: feedback,
        rating: rating,
        recommendation: recommendation,
        feedbackGivenBy: feedbackGivenBy,
      });
      setFeedback('');
      setRating(1);
      setRecommendation('Yes');
      setFeedbackGivenBy('');

      setSuccessMessage('Feedback submitted successfully!');

      handleCloseFeedbackDialog();
      fetchAppointments();
    } catch (err) {
      setError('Error submitting feedback: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <PatientSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: 'flex', md: 'none' }, position: 'fixed', top: 10, left: 10, zIndex: 1300 }}
      >
        <MenuIcon />
      </IconButton>
      <PatientSidebar />
      <Box
        className="content"
        style={{
          flexGrow: 1,
          backgroundColor: 'white',
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          padding: '24px',
          marginLeft: '240px',
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
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : (
          <Box sx={{ padding: '0', maxWidth: '95%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>ID</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Full Name</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Appointment</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Email</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Disease</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Doctor</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell align="center">{appointment.id}</TableCell>
                      <TableCell align="center">{appointment.fullName}</TableCell>
                      <TableCell align="center">{new Date(appointment.appoinDate).toLocaleDateString()}</TableCell>
                      <TableCell align="center">{appointment.email}</TableCell>
                      <TableCell align="center">{appointment.diseases}</TableCell>
                      <TableCell align="center">
                        {(() => {
                          const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
                          return doctor ? `${doctor.doctorId} - ${doctor.fullName}` : 'N/A';
                        })()}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" gap={1} justifyContent="center">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleAttendMeeting(appointment)}
                            startIcon={<VideoCall />}
                          />
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleViewMedicines(appointment)}
                            startIcon={<MedicationIcon />}
                          />
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleFeedback(appointment)}
                            startIcon={<FeedbackIcon />}
                          />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography variant="h6" color="textSecondary">
                        No Appointments Found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        )}

        <Dialog open={openViewDialog} onClose={handleCloseMedicinesDialog} fullWidth maxWidth="md" sx={{ width: '600px', maxWidth: '90%', margin: 'auto' }}>
          <DialogContent
            dividers
            sx={{
              padding: 3,
              fontFamily: 'serif',
              backgroundImage: 'url(" ")',
              backgroundSize: '70%',
              backgroundPosition: 'center calc(80% + 20px)',
              backgroundRepeat: 'no-repeat',
              marginLeft: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Online Medical Service's</Typography>
              <Typography variant="body1" color="textSecondary">
                K L E F Deemed To Be University
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Green Fields, Vaddeswaram, Andhra Pradesh 522302
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '50%', pr: 2 }}>
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <div key={index}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>Dr. {doctor.fullName}</Typography>
                      <Typography variant="body2">Specialist: {doctor.specialist}</Typography>
                      <Typography variant="body2">Qualification: {doctor.qualification}</Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>Doctor-ID: {doctor.doctorId}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
                    No doctors available.
                  </Typography>
                )}
              </Box>

              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

              <Box sx={{ width: '100%', pl: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2', textAlign: 'left', mb: 2 }}>
                  Suggested Medicines
                </Typography>
                <List sx={{ width: '100%' }}>
                  {suggestedMedicines.length > 0 ? (
                    suggestedMedicines.map((medicine, index) => (
                      <ListItem key={index} sx={{ alignItems: 'flex-start', pb: 2, mb: 2 }}>
                        <ListItemText
                          primary={<Typography variant="body1" sx={{ fontWeight: 'bold', color: '#004d40' }}><strong>Medicine Name:</strong> {medicine.name}</Typography>}
                          secondary={
                            <>
                              <Typography variant="body2"><strong>Dosage:</strong> {medicine.dosage}</Typography>
                              <Typography variant="body2"><strong>Frequency:</strong> {medicine.frequency}</Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography align="center" color="textSecondary" sx={{ mt: 4 }}>
                      No medicines suggested yet.
                    </Typography>
                  )}
                </List>
              </Box>
            </Box>

          </DialogContent>

          <Box sx={{ mt: 1, textAlign: 'left', padding: 2 }}>
            <Typography variant="body2">
              <strong style={{ fontWeight: 'bold', color: 'red', marginLeft: '15px', }}>Note*</strong>: This is a Computer Generated Receipt. No signature is required.
            </Typography>
          </Box>

          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button onClick={handleCloseMedicinesDialog} color="primary" sx={{ mr: 2 }}>Close</Button>
            {suggestedMedicines.length > 0 && (
              <Button
                variant="contained"
                color="success"
                startIcon={<ShoppingCartIcon />}
                onClick={handleOrderNowClick}
                sx={{ fontWeight: 'bold', backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#388e3c' } }}
              >
                Order Now
              </Button>
            )}
          </DialogActions>

          <Dialog open={isOrderFormOpen} onClose={handleCloseOrderForm}>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent>
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleCloseOrderForm} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmitOrder}
              >
                Submit Order
              </Button>

              <Dialog
                open={successDialogOpen}
                onClose={() => setSuccessDialogOpen(false)}
                aria-labelledby="success-dialog-title"
                aria-describedby="success-dialog-description"
              >
                <DialogTitle id="success-dialog-title">Order Successful</DialogTitle>
                <DialogContent>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <CheckCircleIcon style={{ color: 'green', fontSize: 50, marginBottom: 20 }} />
                    <div>{successMessage}</div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </DialogActions>

          </Dialog>
        </Dialog>

        <Dialog
          open={openMeetingDialog}
          onClose={handleCloseMeetingDialog}
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'white',
              color: 'black',
              width: '600px',
              maxWidth: '100%',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', borderBottom: '1px solid white' }}>
            <Typography variant="h5">Meeting Information</Typography>
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: '#121212',
                borderRadius: '10px',
                width: '100%',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                boxShadow: 3,
                padding: '20px',
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
                {meetingMessage}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '40px', position: 'absolute', bottom: '20px' }}>
                <IconButton sx={{ color: '#f44336', fontSize: '2rem' }} aria-label="toggle microphone">
                  <MicOffIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: '#4caf50', fontSize: '2rem' }} aria-label="toggle camera">
                  <CameraAltIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: '#f44336', fontSize: '2rem' }} aria-label="end call">
                  <CallEndIcon fontSize="large" />
                </IconButton>
                <IconButton sx={{ color: '#2196f3', fontSize: '2rem' }} aria-label="chat">
                  <ChatIcon fontSize="large" />
                </IconButton>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button onClick={handleCloseMeetingDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openFeedbackDialog} onClose={handleCloseFeedbackDialog}>
          <DialogTitle>Feedback</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel>Doctor</InputLabel>
              <Select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                label="Doctor"
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {`${doctor.doctorId} - ${doctor.fullName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Enter your feedback"
              type="text"
              fullWidth
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Your Name"
              type="text"
              fullWidth
              variant="outlined"
              value={feedbackGivenBy}
              onChange={(e) => setFeedbackGivenBy(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Rating (1-5)"
              type="number"
              fullWidth
              variant="outlined"
              value={rating}
              onChange={(e) => setRating(Math.max(1, Math.min(5, e.target.value)))}
              inputProps={{ min: 1, max: 5 }}
            />
            <FormControl fullWidth margin="dense" variant="outlined">
              <InputLabel>Recommendation</InputLabel>
              <Select
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                label="Recommendation"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFeedbackDialog} color="primary">Cancel</Button>
            <Button onClick={handleSubmitFeedback} color="primary">Submit</Button>
          </DialogActions>
          <Snackbar
            open={Boolean(successMessage)}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={successMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={error}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
        </Dialog>


      </Box>
    </div>
  );
}

export default UserViewAppointments;

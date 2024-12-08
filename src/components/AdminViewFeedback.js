import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Drawer,
  IconButton,
  Box,
} from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const Star = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? "gold" : "lightgray"}
  >
    <path d={filled ? "M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.64L12 2 10.18 8.6 1 9.24l5.46 4.73L5.82 21z" : "M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.64L12 2 10.18 8.6 1 9.24l5.46 4.73L5.82 21z"} />
  </svg>
);

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i} filled={i <= rating} />);
  }
  return <div>{stars}</div>;
};

const AdminViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/feedback/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      setError('Error fetching feedback data');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/doctors');
      setDoctors(response.data);
    } catch (err) {
      setError('Error fetching doctors data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchFeedbacks(), fetchDoctors()]);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/feedback/feedbacks/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
    } catch (err) {
      setError('Error deleting feedback');
    }
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <AdminSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
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
          marginLeft: '240px',
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            <br />
            View Feedback
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">{error}</Typography>
        ) : (
          <Box sx={{ padding: '0px', maxWidth: '85%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>SL.NO</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Feedback Given By</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Doctor</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Feedback</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Rating</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Recommendation</strong></TableCell>
                  <TableCell sx={{ color: 'white', textAlign: 'center' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback, index) => {
                    const doctor = doctors.find((doc) => doc.id === feedback.doctorId);
                    return (
                      <TableRow key={feedback.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'white' } }}>
                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{feedback.feedbackGivenBy}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {doctor ? `${doctor.doctorId} - ${doctor.fullName}` : 'N/A'}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{feedback.treatmentFeedback}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <StarRating rating={feedback.rating} />
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>{feedback.recommendation}</TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Button 
                            onClick={() => handleDelete(feedback.id)} 
                            variant="outlined"
                            color="error"
                            size="small"
                            sx={{ borderColor: 'red', color: 'red', '&:hover': { borderColor: 'darkred', color: 'darkred' } }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6" color="textSecondary">
                        No Data Found
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
};

export default AdminViewFeedback;

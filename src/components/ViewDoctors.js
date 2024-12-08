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
  Stack 
} from '@mui/material';
import AdminSidebar from './AdminSidebar';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

function ViewDoctors() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDoctor, setEditDoctor] = useState(null);
  const [formValues, setFormValues] = useState({
    id: '',
    doctorId: '',
    fullName: '',
    gender: '',
    dob: '',
    qualification: '',
    specialist: '',
    email: '',
    mobNo: '',
    password: ''
  });

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
    fetchDoctors();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setFormValues({
      id: doctor.id,
      doctorId: doctor.doctorId,
      fullName: doctor.fullName,
      gender: doctor.gender,
      dob: doctor.dob,
      qualification: doctor.qualification,
      specialist: doctor.specialist,
      email: doctor.email,
      mobNo: doctor.mobNo,
      password: doctor.password,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (err) {
      setError('Error deleting doctor');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/doctors/${formValues.id}`, formValues);
      setDoctors(doctors.map((doctor) => (doctor.id === formValues.id ? formValues : doctor)));
      setEditDoctor(null);
      setFormValues({
        id: '',
        doctorId: '',
        fullName: '',
        gender: '',
        dob: '',
        qualification: '',
        specialist: '',
        email: '',
        mobNo: '',
        password: ''
      });
    } catch (err) {
      setError('Error updating doctor');
    }
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
            View Doctors
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">{error}</Typography>
        ) : (
          <Box sx={{ padding: '0px', maxWidth: '95%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableCell sx={{ color: 'white' }}><strong>SL.NO</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>DoctorID</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Name</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Gender</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>DOB</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Qualification</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Specialty</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Email</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Contact</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <TableRow key={doctor.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{doctor.doctorId}</TableCell>
                      <TableCell>{doctor.fullName}</TableCell>
                      <TableCell>{doctor.gender}</TableCell>
                      <TableCell>{doctor.dob}</TableCell>
                      <TableCell align="center">{doctor.qualification}</TableCell>
                      <TableCell>{doctor.specialist}</TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell align="center">{doctor.mobNo}</TableCell>
                      <TableCell>
                        <Stack direction="column" spacing={1} alignItems="center">
                          <Button variant="outlined" size="small" onClick={() => handleEdit(doctor)}>Edit</Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(doctor.id)}>
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
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

        {editDoctor && (
          <Box sx={{ mt: 4, padding: '15px', backgroundColor: '#fff', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>Edit Doctor</Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <input
                type="text"
                value={formValues.doctorId}
                onChange={(e) => setFormValues({ ...formValues, doctorId: e.target.value })}
                placeholder="Doctor ID"
                required
              />
              <input
                type="text"
                value={formValues.fullName}
                onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                value={formValues.gender}
                onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
                placeholder="Gender"
                required
              />
              <input
                type="date"
                value={formValues.dob}
                onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
                required
              />
              <input
                type="text"
                value={formValues.qualification}
                onChange={(e) => setFormValues({ ...formValues, qualification: e.target.value })}
                placeholder="Qualification"
                required
              />
              <input
                type="text"
                value={formValues.specialist}
                onChange={(e) => setFormValues({ ...formValues, specialist: e.target.value })}
                placeholder="Specialty"
                required
              />
              <input
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                placeholder="Email"
                required
              />
              <input
                type="text"
                value={formValues.mobNo}
                onChange={(e) => setFormValues({ ...formValues, mobNo: e.target.value })}
                placeholder="Mobile No"
                required
              />
              <input
                type="password"
                value={formValues.password}
                onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                placeholder="Password"
                required
              />
              <Button type="submit" variant="contained" color="primary">Update</Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditDoctor(null)}>Cancel</Button>
            </form>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ViewDoctors;

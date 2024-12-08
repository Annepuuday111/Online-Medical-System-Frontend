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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import DoctorSidebar from './DoctorSidebar';

function ViewUsers() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err) {
        setError('Error deleting user. Please try again.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', padding: 0 }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <DoctorSidebar toggleDrawer={toggleDrawer} />
      </Drawer>
      <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-start' }}>
        <MenuIcon />
      </IconButton>
      <DoctorSidebar />
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
            View Users
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">{error}</Typography>
        ) : (
          <Box sx={{ padding: '0px', maxWidth: '50%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableCell align='center' sx={{ color: 'white' }}><strong>ID</strong></TableCell>
                  <TableCell align='center' sx={{ color: 'white' }}><strong>Name of the User</strong></TableCell>
                  <TableCell align='center' sx={{ color: 'white' }}><strong>Email Id of the User</strong></TableCell>
                  <TableCell align='center' sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                      <TableCell align='center'>{user.id}</TableCell>
                      <TableCell align='center'>{user.name}</TableCell>
                      <TableCell align='center'>{user.email}</TableCell>
                      <TableCell align='center'>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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
}

export default ViewUsers;

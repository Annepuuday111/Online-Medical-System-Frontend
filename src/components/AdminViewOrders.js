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

function ViewOrders() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [formValues, setFormValues] = useState({
    id: '',
    fullName: '',
    address: '',
    contactNumber: '',
    notes: ''
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders');
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching orders data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleEdit = (order) => {
    setEditOrder(order);
    setFormValues({
      id: order.id,
      fullName: order.fullName,
      address: order.address,
      contactNumber: order.contactNumber,
      notes: order.notes,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${id}`);
      setOrders(orders.filter((order) => order.id !== id));
    } catch (err) {
      setError('Error deleting order');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${formValues.id}`, formValues);
      setOrders(orders.map((order) => (order.id === formValues.id ? formValues : order)));
      setEditOrder(null);
      setFormValues({
        id: '',
        fullName: '',
        address: '',
        contactNumber: '',
        notes: ''
      });
    } catch (err) {
      setError('Error updating order');
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
            View Orders
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : error ? (
          <Typography variant="h6" color="error" align="center">{error}</Typography>
        ) : (
          <Box sx={{ padding: '0px', maxWidth: '70%', margin: '0 auto', boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}>
                  <TableCell sx={{ color: 'white' }}><strong>SL.NO</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Full Name</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Address</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Contact Number</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Notes</strong></TableCell>
                  <TableCell sx={{ color: 'white' }}><strong>Status of Delivery</strong></TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <TableRow key={order.id} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f2f2f2' } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{order.fullName}</TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell align="center">{order.contactNumber}</TableCell>
                      <TableCell>{order.notes}</TableCell>
                      <TableCell>{}</TableCell>
                      <TableCell>
                        <Stack direction="column" spacing={1} alignItems="center">
                          <Button variant="outlined" size="small" onClick={() => handleEdit(order)}>Edit</Button>
                          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(order.id)}>
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
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

        {editOrder && (
          <Box sx={{ mt: 4, padding: '15px', backgroundColor: '#fff', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>Edit Order</Typography>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
              <input
                type="text"
                value={formValues.fullName}
                onChange={(e) => setFormValues({ ...formValues, fullName: e.target.value })}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                value={formValues.address}
                onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                placeholder="Address"
                required
              />
              <input
                type="text"
                value={formValues.contactNumber}
                onChange={(e) => setFormValues({ ...formValues, contactNumber: e.target.value })}
                placeholder="Contact Number"
                required
              />
              <input
                type="text"
                value={formValues.notes}
                onChange={(e) => setFormValues({ ...formValues, notes: e.target.value })}
                placeholder="Notes"
              />
              <Button type="submit" variant="contained" color="primary">Update</Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditOrder(null)}>Cancel</Button>
            </form>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default ViewOrders;

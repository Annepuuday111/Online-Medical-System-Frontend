import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddDoctorIcon from '@mui/icons-material/MedicalServices';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ViewListIcon from '@mui/icons-material/List';
import ViewPatientIcon from '@mui/icons-material/People';
import CommentIcon from '@mui/icons-material/Comment';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { LocalHospital } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AdminSidebar({ toggleDrawer }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      role="presentation"
      onClick={toggleDrawer ? toggleDrawer(false) : null}
      onKeyDown={toggleDrawer ? toggleDrawer(false) : null}
      style={{
        width: '240px',
        backgroundColor: '#f5f5f5',
        height: '100vh',
        padding: '15px',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 1000,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
        <LocalHospital style={{ fontSize: 40, color: '#1976d2', marginRight: '10px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: 24, color: '#1976d2' }}>
          Medical
        </Typography>
      </Box>

      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation('/admin')}>
          <ListItemIcon>
            <HomeIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/add-specialist')}>
          <ListItemIcon>
            <PersonAddIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Add Specialist" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/add-doctor')}>
          <ListItemIcon>
            <AddDoctorIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="Add Doctor" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/view-doctor')}>
          <ListItemIcon>
            <ViewListIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="View Doctors" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/view-users')}>
          <ListItemIcon>
            <ViewPatientIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="View Users" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/admin-view-appointments')}>
          <ListItemIcon>
            <EventIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="View Appointments" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/admin-view-orders')}>
          <ListItemIcon>
          <ShoppingCart style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="View Orders" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/admin-view-feedback')}>
          <ListItemIcon>
          <CommentIcon style={{ color: '#1976d2' }} />
          </ListItemIcon>
          <ListItemText primary="View Feedback" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>
        
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon style={{ color: '#d32f2f' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" primaryTypographyProps={{ style: { marginLeft: '-20px', fontWeight: 'bold' } }} />
        </ListItem>
      </List>
    </div>
  );
}

export default AdminSidebar;

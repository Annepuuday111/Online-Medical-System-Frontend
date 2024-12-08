import React, { useEffect, useState } from 'react';
import { Drawer, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { People, MedicalServices, CalendarToday, LocalHospital } from '@mui/icons-material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';

function AdminDashboard() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [counts, setCounts] = useState({
        totalDoctors: 0,
        totalUsers: 0,
        totalAppointments: 0,
        totalSpecialists: 0,
        totalOrders: 0,
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const doctorsResponse = await axios.get('http://localhost:8080/api/doctors/counts');
                const usersResponse = await axios.get('http://localhost:8080/api/users/counts');
                const appointmentCountResponse = await axios.get('http://localhost:8080/api/appointments/counts');
                const specialistsResponse = await axios.get('http://localhost:8080/api/specialists/count');
                const ordersResponse = await axios.get('http://localhost:8080/api/orders/counts');

                setCounts({
                    totalDoctors: doctorsResponse.data.totalDoctors || 0,
                    totalUsers: usersResponse.data.totalUsers || 0,
                    totalAppointments: appointmentCountResponse.data.totalAppointments || 0,
                    totalSpecialists: specialistsResponse.data || 0,
                    totalOrders: ordersResponse.data.totalOrders || 0,  
                });
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchCounts();
    }, []);

    const cardData = [
        { title: 'Doctors', count: counts.totalDoctors, icon: <MedicalServices fontSize="large" sx={{ color: '#1976d2' }} />, color: '#1976d2' },
        { title: 'Users', count: counts.totalUsers, icon: <People fontSize="large" sx={{ color: '#43a047' }} />, color: '#43a047' },
        { title: 'Appointments', count: counts.totalAppointments || 0, icon: <CalendarToday fontSize="large" sx={{ color: '#fbc02d' }} />, color: '#fbc02d' },
        { title: 'Specialists', count: counts.totalSpecialists || 0, icon: <LocalHospital fontSize="large" sx={{ color: '#e53935' }} />, color: '#e53935' },
        { title: 'Orders', count: counts.totalOrders, icon: <ShoppingCart fontSize="large" sx={{ color: '#1976d2' }} />, color: '#1976d2' },
    ];

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <div className="app" style={{ display: 'flex', height: '100vh', padding: 0 }}>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <AdminSidebar toggleDrawer={toggleDrawer} />
            </Drawer>
            <AdminSidebar />
            <div
                className="content"
                style={{
                    flexGrow: 1,
                    backgroundColor: 'white',
                    height: '100vh',
                    width: '100%',
                    overflowY: 'auto',
                    position: 'relative',
                    padding: '16px',
                    textAlign: 'center',
                    margin: '0 auto',
                    marginLeft: '310px',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    <br />
                    Welcome to the Admin Dashboard
                </Typography>
                <br />

                <Grid container spacing={2} justifyContent="center">
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <Card
                                sx={{
                                    boxShadow: 2,
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    width: '300px',
                                    margin: '16px',
                                }}
                            >
                                <CardContent>
                                    <Box display="flex" flexDirection="column" alignItems="center">
                                        <Box mb={1}>
                                            <Box width="90px" height="60px" display="flex" alignItems="center" justifyContent="center">
                                                {card.icon}
                                            </Box>
                                        </Box>
                                        <Typography variant="h4" sx={{ color: 'black' }}>
                                            {card.count}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: 'black' }}>
                                            {card.title}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default AdminDashboard;

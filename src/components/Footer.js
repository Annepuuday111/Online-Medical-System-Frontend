import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      sx={{ 
        position: 'fixed',
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: 2, 
        backgroundColor: '#1976d2', 
        color: 'white', 
        textAlign: 'center' 
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} MedicalServices. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit" sx={{ margin: '0 5px' }}>
          Privacy Policy
        </Link>
        | 
        <Link href="#" color="inherit" sx={{ margin: '0 5px' }}>
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;

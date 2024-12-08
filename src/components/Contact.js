import React, { useState } from 'react';
import { Typography, Button, Card, CardContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer'; 
import './Contact.css';

const contactMethods = [
  { name: 'Phone', icon: '📞', detail: '+91 7075285071\n+91 7993955106' },
  { name: 'Email', icon: '📧', detail: '2200031007@kluniversity.in\n2200032761@kluniversity.in' },
  { name: 'Address', icon: '📍', detail: 'Green Fields, Vaddeswaram, Andhra Pradesh 522302' },
  { name: 'Live Chat', icon: '💬', detail: 'Available 24/7' },
  { name: 'Social Media', icon: '🌐', detail: 'Follow us on our social platforms' },
  { name: 'FAQ', icon: '❓', detail: 'Frequently Asked Questions' },
];

const Contact = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '32px', marginTop: '40px', marginBottom: '50px', maxWidth: '100%', margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Get in Touch with Us
        </Typography>
        <br />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {contactMethods.slice(0, showMore ? contactMethods.length : 3).map((method, index) => (
            <Card 
              key={index}
              sx={{ 
                margin: '8px', 
                border: '1px solid lightgray', 
                textAlign: 'center', 
                transition: 'transform 0.2s', 
                width: { xs: '100%', sm: '100%', md: '20%' }, 
                '&:hover': {
                  transform: 'scale(1.05)', 
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontSize: 50 }}>
                  {method.icon}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}> 
                  {method.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', whiteSpace: 'pre-line', marginBottom: '16px' }}>
                  {method.detail}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {contactMethods.length > 3 && (
          <Button 
            variant="outlined" 
            onClick={toggleShowMore} 
            sx={{ display: 'block', margin: '15px auto', marginBottom: '60px' }}
          >
            {showMore ? 'See Less' : 'See More'}
          </Button>
        )}

        <Typography variant="h4" align="center" gutterBottom fontWeight="bold" sx={{ marginTop: '40px' }}>
          Have Any Questions?
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '20px' }}>
          It is a long established fact that a reader will be distracted <br /> content of a page when looking.
        </Typography>
        
        <form style={{ maxWidth: '600px', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div className="form-row">
            <TextField 
              fullWidth 
              label="Name" 
              variant="outlined" 
              sx={{ marginBottom: '16px', marginRight: '8px' }} 
            />
            <TextField 
              fullWidth 
              label="Email" 
              variant="outlined" 
              sx={{ marginBottom: '16px', marginRight: '8px' }} 
            />
          </div>
          <div className="form-row">
            <TextField 
              fullWidth 
              label="Phone" 
              variant="outlined" 
              sx={{ marginBottom: '16px', marginRight: '8px' }} 
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: '16px', marginRight: '8px' }}>
              <InputLabel>Service Type</InputLabel>
              <Select>
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="support">Support</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="feedback">Feedback</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField 
            fullWidth 
            label="Message" 
            variant="outlined" 
            multiline 
            rows={4} 
            sx={{ marginBottom: '20px' }} 
          />
          <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ width: '100%', marginBottom: '50px' }}
          >
            Submit
          </Button>
        </form>
      </div>
      <Footer /> 
    </>
  );
};

export default Contact;

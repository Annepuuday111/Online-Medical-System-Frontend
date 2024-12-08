import React, { useState } from 'react';
import { Typography, TextField, Button, Card, CardContent } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer'; 
import './Services.css';

const specializations = [
  { name: 'Cardiology', icon: '❤️' },
  { name: 'Dermatology', icon: '🧴' },
  { name: 'Neurology', icon: '🧠' },
  { name: 'Pediatrics', icon: '👶' },
  { name: 'Orthopedics', icon: '🦴' },
  { name: 'Psychiatry', icon: '🧘‍♂️' },
  { name: 'Urology', icon: '💧' }, 
  { name: 'Allergy', icon: '🌼' }, 
  { name: 'Gastrology', icon: '🍽️' }, 
  { name: 'HIV/AIDS', icon: '🩸' }, 
  { name: 'Otolaryngology', icon: '👂' }, 
  { name: 'Dentistry', icon: '🦷' }, 
];

const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '32px', marginTop: '40px', marginBottom: '50px', maxWidth: '100%', margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Find the Best Doctor (or) Department for <br></br> Perfect Treatment
        </Typography>
        <br />
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', flex: 1 }}>
          <TextField
            variant="outlined"
            label="Search for a doctor or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              marginRight: 1, 
              width: '70%', 
              margin: '0 8px', 
            }} 
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {specializations.slice(0, showMore ? specializations.length : 6).map((spec, index) => (
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
                  {spec.icon}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}> 
                  {spec.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {specializations.length > 6 && (
          <Button 
            variant="outlined" 
            onClick={toggleShowMore} 
            sx={{ display: 'block', margin: '15px auto', marginBottom: '60px' }}
          >
            {showMore ? 'See Less' : 'See More'}
          </Button>
        )}
      </div>
      <Footer /> 
    </>
  );
};

export default Services;
